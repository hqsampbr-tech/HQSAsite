const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = siteNav?.classList.toggle('is-open') || false;
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-placeholder-link]').forEach(link => {
  link.addEventListener('click', event => event.preventDefault());
});

const officerStory = document.querySelector('.officer-story');
const storyTitle = document.querySelector('.officer-section-title');
const roleCards = [...document.querySelectorAll('.officer-role-list article')];
const officerRolesBackground = document.querySelector('.officer-roles-background');

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function updateOfficerStory() {
  if (!officerStory) return;

  const rect = officerStory.getBoundingClientRect();
  const scrollable = officerStory.offsetHeight - window.innerHeight;
  const progress = clamp01((-rect.top) / Math.max(1, scrollable));

  const titleIn = clamp01(progress / .18);
  if (storyTitle) {
    storyTitle.style.opacity = String(titleIn);
    storyTitle.style.transform = `translateY(${(1 - titleIn) * 24}px)`;
  }

  roleCards.forEach((card, index) => {
    const start = .16 + index * .14;
    const reveal = clamp01((progress - start) / .12);
    card.style.opacity = String(reveal);
    card.style.transform = `translateY(${(1 - reveal) * 24}px)`;
  });

  if (officerRolesBackground) {
    const scale = 1.04 + progress * .035;
    const y = -10 * progress;
    officerRolesBackground.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
  }
}

let officerStoryFrame = 0;

function requestOfficerStoryUpdate() {
  if (officerStoryFrame) return;

  officerStoryFrame = window.requestAnimationFrame(() => {
    officerStoryFrame = 0;
    updateOfficerStory();
    updateSneakPeekButton();
  });
}

window.addEventListener('scroll', requestOfficerStoryUpdate, { passive: true });
window.addEventListener('resize', requestOfficerStoryUpdate);
requestOfficerStoryUpdate();




const sneakPeekButton = document.querySelector('.officer-sneak-peek');
const sneakPeekModal = document.querySelector('#officer-sneak-peek-modal');
const sneakPeekVideo = sneakPeekModal?.querySelector('.sneak-peek-video');

function updateSneakPeekButton() {
  if (!officerStory || !sneakPeekButton) return;

  const rect = officerStory.getBoundingClientRect();
  const scrollable = officerStory.offsetHeight - window.innerHeight;
  const progress = clamp01((-rect.top) / Math.max(1, scrollable));

  sneakPeekButton.classList.toggle('is-visible', progress >= 0.015 && progress <= 0.92);
}

function closeSneakPeek() {
  if (!sneakPeekModal) return;
  sneakPeekModal.classList.remove('is-open');
  sneakPeekModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('sneak-peek-open');

  if (sneakPeekVideo) {
    sneakPeekVideo.pause();
    sneakPeekVideo.currentTime = 0;
  }
}

sneakPeekButton?.addEventListener('click', async () => {
  if (!sneakPeekModal || !sneakPeekVideo) return;

  sneakPeekModal.classList.add('is-open');
  sneakPeekModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('sneak-peek-open');

  try {
    await sneakPeekVideo.play();
  } catch (_) {}
});

sneakPeekModal?.querySelectorAll('[data-sneak-peek-close]').forEach(element => {
  element.addEventListener('click', closeSneakPeek);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && sneakPeekModal?.classList.contains('is-open')) {
    closeSneakPeek();
  }
});

requestOfficerStoryUpdate();



// Restored original Officer roadmap image viewer
const roadmapLightbox = document.querySelector('.roadmap-image-lightbox');
const roadmapImageStage = document.querySelector('.roadmap-image-stage');
const roadmapImage = roadmapImageStage?.querySelector('img');

// Keep the lightbox attached directly to <body>. A fixed element nested inside
// an animated/transformed section can otherwise become constrained to that section.
if (roadmapLightbox && roadmapLightbox.parentElement !== document.body) {
  document.body.appendChild(roadmapLightbox);
}

let roadmapLockedScrollY = 0;
let roadmapScale = 1;
let roadmapTranslateX = 0;
let roadmapTranslateY = 0;
let roadmapDragging = false;
let roadmapPointerX = 0;
let roadmapPointerY = 0;

function applyRoadmapTransform() {
  if (!roadmapImage) return;
  roadmapImage.style.transform =
    `translate3d(${roadmapTranslateX}px, ${roadmapTranslateY}px, 0) scale(${roadmapScale})`;
}

function resetRoadmapTransform() {
  roadmapScale = 1;
  roadmapTranslateX = 0;
  roadmapTranslateY = 0;
  applyRoadmapTransform();
}

function openRoadmapImage() {
  if (!roadmapLightbox) return;

  roadmapLockedScrollY = window.scrollY;
  document.body.style.top = `-${roadmapLockedScrollY}px`;
  document.body.classList.add('roadmap-lightbox-open');

  roadmapLightbox.classList.add('is-open');
  roadmapLightbox.setAttribute('aria-hidden', 'false');
  resetRoadmapTransform();

  window.requestAnimationFrame(() => {
    roadmapLightbox.querySelector('[data-close-roadmap-image]')?.focus();
  });
}

function closeRoadmapImage() {
  if (!roadmapLightbox?.classList.contains('is-open')) return;

  roadmapLightbox.classList.remove('is-open');
  roadmapLightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('roadmap-lightbox-open');
  document.body.style.top = '';

  window.scrollTo(0, roadmapLockedScrollY);
  document.querySelector('[data-open-roadmap-image]')?.focus();
}

function zoomRoadmap(delta) {
  roadmapScale = Math.min(4, Math.max(.7, roadmapScale + delta));
  applyRoadmapTransform();
}

document.querySelector('[data-open-roadmap-image]')?.addEventListener('click', openRoadmapImage);
document.querySelectorAll('[data-close-roadmap-image]').forEach(el => {
  el.addEventListener('click', closeRoadmapImage);
});
document.querySelector('[data-roadmap-zoom-in]')?.addEventListener('click', () => zoomRoadmap(.25));
document.querySelector('[data-roadmap-zoom-out]')?.addEventListener('click', () => zoomRoadmap(-.25));
document.querySelector('[data-roadmap-reset]')?.addEventListener('click', resetRoadmapTransform);

roadmapImageStage?.addEventListener('wheel', event => {
  event.preventDefault();
  zoomRoadmap(event.deltaY < 0 ? .15 : -.15);
}, { passive: false });

roadmapImageStage?.addEventListener('pointerdown', event => {
  roadmapDragging = true;
  roadmapPointerX = event.clientX - roadmapTranslateX;
  roadmapPointerY = event.clientY - roadmapTranslateY;
  roadmapImageStage.setPointerCapture(event.pointerId);
});

roadmapImageStage?.addEventListener('pointermove', event => {
  if (!roadmapDragging) return;
  roadmapTranslateX = event.clientX - roadmapPointerX;
  roadmapTranslateY = event.clientY - roadmapPointerY;
  applyRoadmapTransform();
});

roadmapImageStage?.addEventListener('pointerup', () => {
  roadmapDragging = false;
});

roadmapImageStage?.addEventListener('pointercancel', () => {
  roadmapDragging = false;
});

let initialPinchDistance = null;
let initialPinchScale = 1;

roadmapImageStage?.addEventListener('touchmove', event => {
  if (event.touches.length !== 2) return;
  event.preventDefault();

  const [a, b] = event.touches;
  const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

  if (initialPinchDistance === null) {
    initialPinchDistance = distance;
    initialPinchScale = roadmapScale;
    return;
  }

  roadmapScale = Math.min(4, Math.max(.7, initialPinchScale * (distance / initialPinchDistance)));
  applyRoadmapTransform();
}, { passive: false });

roadmapImageStage?.addEventListener('touchend', () => {
  initialPinchDistance = null;
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeRoadmapImage();
});
