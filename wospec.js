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

const wospecStory = document.querySelector('.wospec-story');
const storyTitle = document.querySelector('.wospec-section-title');
const roleCards = [...document.querySelectorAll('.wospec-role-list article')];
const wospecRolesBackground = document.querySelector('.wospec-roles-background');

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function updateWospecStory() {
  if (!wospecStory) return;

  const rect = wospecStory.getBoundingClientRect();
  const scrollable = wospecStory.offsetHeight - window.innerHeight;
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

  if (wospecRolesBackground) {
    const scale = 1.04 + progress * .035;
    const y = -10 * progress;
    wospecRolesBackground.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
  }
}


window.addEventListener('scroll', updateWospecStory, { passive: true });
window.addEventListener('resize', updateWospecStory);
updateWospecStory();


const sneakPeekButton = document.querySelector('.wospec-sneak-peek');
const sneakPeekModal = document.querySelector('#wospec-sneak-peek-modal');
const sneakPeekVideo = sneakPeekModal?.querySelector('.sneak-peek-video');

function updateSneakPeekButton() {
  if (!wospecStory || !sneakPeekButton) return;

  const rect = wospecStory.getBoundingClientRect();
  const scrollable = wospecStory.offsetHeight - window.innerHeight;
  const progress = clamp01((-rect.top) / Math.max(1, scrollable));

  sneakPeekButton.classList.toggle('is-visible', progress >= 0.44 && progress <= 0.86);
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

window.addEventListener('scroll', updateSneakPeekButton, { passive: true });
window.addEventListener('resize', updateSneakPeekButton);
updateSneakPeekButton();


// V128 WOSpec full-roadmap image viewer
const wospecRoadmapOpen = document.querySelector('[data-open-wospec-roadmap-image]');
const wospecRoadmapLightbox = document.querySelector('.wospec-roadmap-image-lightbox');
const wospecRoadmapStage = wospecRoadmapLightbox?.querySelector('.roadmap-image-stage');
const wospecRoadmapImage = wospecRoadmapStage?.querySelector('img');

if (wospecRoadmapLightbox && wospecRoadmapLightbox.parentElement !== document.body) {
  document.body.appendChild(wospecRoadmapLightbox);
}

let wospecRoadmapScale = 1;
let wospecRoadmapX = 0;
let wospecRoadmapY = 0;
let wospecRoadmapDragging = false;
let wospecRoadmapPointerX = 0;
let wospecRoadmapPointerY = 0;
let wospecRoadmapLockedScrollY = 0;

function applyWospecRoadmapTransform() {
  if (!wospecRoadmapImage) return;
  wospecRoadmapImage.style.transform =
    `translate3d(${wospecRoadmapX}px, ${wospecRoadmapY}px, 0) scale(${wospecRoadmapScale})`;
}

function resetWospecRoadmapTransform() {
  wospecRoadmapScale = 1;
  wospecRoadmapX = 0;
  wospecRoadmapY = 0;
  applyWospecRoadmapTransform();
}

function openWospecRoadmapImage() {
  if (!wospecRoadmapLightbox) return;

  wospecRoadmapLockedScrollY = window.scrollY;
  document.body.style.top = `-${wospecRoadmapLockedScrollY}px`;
  document.body.classList.add('roadmap-lightbox-open');

  wospecRoadmapLightbox.classList.add('is-open');
  wospecRoadmapLightbox.setAttribute('aria-hidden', 'false');
  resetWospecRoadmapTransform();

  window.requestAnimationFrame(() => {
    wospecRoadmapLightbox.querySelector('[data-close-wospec-roadmap-image]')?.focus();
  });
}

function closeWospecRoadmapImage() {
  if (!wospecRoadmapLightbox?.classList.contains('is-open')) return;

  wospecRoadmapLightbox.classList.remove('is-open');
  wospecRoadmapLightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('roadmap-lightbox-open');
  document.body.style.top = '';
  window.scrollTo(0, wospecRoadmapLockedScrollY);
  wospecRoadmapOpen?.focus();
}

function zoomWospecRoadmap(delta) {
  wospecRoadmapScale = Math.min(4, Math.max(.75, wospecRoadmapScale + delta));
  applyWospecRoadmapTransform();
}

wospecRoadmapOpen?.addEventListener('click', openWospecRoadmapImage);
document.querySelectorAll('[data-close-wospec-roadmap-image]').forEach(button => {
  button.addEventListener('click', closeWospecRoadmapImage);
});
document.querySelector('[data-wospec-roadmap-zoom-in]')?.addEventListener('click', () => zoomWospecRoadmap(.25));
document.querySelector('[data-wospec-roadmap-zoom-out]')?.addEventListener('click', () => zoomWospecRoadmap(-.25));
document.querySelector('[data-wospec-roadmap-reset]')?.addEventListener('click', resetWospecRoadmapTransform);

wospecRoadmapStage?.addEventListener('wheel', event => {
  event.preventDefault();
  zoomWospecRoadmap(event.deltaY < 0 ? .12 : -.12);
}, { passive: false });

wospecRoadmapStage?.addEventListener('pointerdown', event => {
  wospecRoadmapDragging = true;
  wospecRoadmapPointerX = event.clientX;
  wospecRoadmapPointerY = event.clientY;
  wospecRoadmapStage.setPointerCapture(event.pointerId);
});

wospecRoadmapStage?.addEventListener('pointermove', event => {
  if (!wospecRoadmapDragging) return;
  wospecRoadmapX += event.clientX - wospecRoadmapPointerX;
  wospecRoadmapY += event.clientY - wospecRoadmapPointerY;
  wospecRoadmapPointerX = event.clientX;
  wospecRoadmapPointerY = event.clientY;
  applyWospecRoadmapTransform();
});

wospecRoadmapStage?.addEventListener('pointerup', event => {
  wospecRoadmapDragging = false;
  wospecRoadmapStage.releasePointerCapture(event.pointerId);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeWospecRoadmapImage();
});
