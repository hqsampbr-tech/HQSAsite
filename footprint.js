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

const worldStory = document.querySelector('.footprint-world-story');
const worldIntro = document.querySelector('.footprint-world-intro');
const worldMap = document.querySelector('.footprint-world-map');
const trainingLowerThird = document.querySelector('.footprint-training-lower-third');
const operationsHeading = document.querySelector('.footprint-operations-heading');
const countries = [...document.querySelectorAll('.footprint-country:not(.country-afghanistan)')];
const afghanistanMarker = document.querySelector('.country-afghanistan');
const photoTray = document.querySelector('.footprint-photo-tray');
const photoTrayInner = document.querySelector('.footprint-photo-tray-inner');
const primaryOperationCard = document.querySelector('.footprint-operation-card-primary');
const secondaryOperationCard = document.querySelector('.footprint-operation-card-secondary');
const videoModal = document.querySelector('.footprint-video-modal');
const obrVideo = videoModal?.querySelector('video');
const trainingVideoModal = document.querySelector('.footprint-training-video-modal');
const trainingVideoPlayer = trainingVideoModal?.querySelector('video');
const trainingVideoTitle = trainingVideoModal?.querySelector('#footprint-training-video-title');

const countryPhotoData = [
  {
    name: 'New Zealand',
    src: 'assets/footprint-new-zealand.jpg',
    video: 'assets/ZaqyThunderWarrior.mp4',
    videoTitle: 'SMS Zaqy with us in Ex THUNDER WARRIOR'
  },
  {
    name: 'Australia',
    src: 'assets/footprint-australia.jpg',
    video: 'assets/XWB.mp4',
    videoTitle: 'Ex WALLABY'
  },
  {
    name: 'United States',
    src: 'assets/footprint-usa.jpg',
    video: 'assets/DaringWarrior.mp4',
    videoTitle: 'Ex DARING WARRIOR'
  },
  {
    name: 'India',
    src: 'assets/footprint-india.jpg',
    video: 'assets/AgniWarrior18.mp4',
    videoTitle: 'Ex AGNI WARRIOR'
  }
];

const trayThumbs = countryPhotoData.map((item, index) => {
  if (!photoTrayInner) return null;

  const thumb = document.createElement('div');
  thumb.className = 'footprint-photo-thumb';
  thumb.dataset.countryIndex = String(index);
  thumb.innerHTML = `
    <button
      class="footprint-training-video-button"
      type="button"
      data-country-video-index="${index}"
      aria-label="Watch training video from ${item.name}"
    >
      Watch the exercise
    </button>
    <img src="${item.src}" alt="${item.name}" />
    <span>${item.name}</span>
  `;
  photoTrayInner.appendChild(thumb);
  return thumb;
});

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function mapRange(value, start, end) {
  return clamp01((value - start) / Math.max(0.0001, end - start));
}

function getStoryProgress(section) {
  if (!section) return 0;
  const rect = section.getBoundingClientRect();
  const scrollable = section.offsetHeight - window.innerHeight;
  return clamp01((-rect.top) / Math.max(1, scrollable));
}

function setReveal(element, opacity, y = 0, scale = 1) {
  if (!element) return;
  element.style.opacity = String(opacity);
  element.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
  element.style.pointerEvents = opacity > .75 ? 'auto' : 'none';
}

function updateFootprintStory() {
  if (!worldStory) return;

  const progress = getStoryProgress(worldStory);

  const introIn = mapRange(progress, 0.00, 0.035);
  const introOut = mapRange(progress, 0.095, 0.14);
  const introOpacity = introIn * (1 - introOut);

  if (worldIntro) {
    worldIntro.style.opacity = String(introOpacity);
    worldIntro.style.transform =
      `translate3d(-50%, calc(-50% + ${(1 - introIn) * 24 - introOut * 18}px), 0) scale(${.96 + introIn * .04})`;
  }

  const mapIn = mapRange(progress, 0.105, 0.17);
  if (worldMap) {
    worldMap.style.opacity = String(mapIn);
    worldMap.style.transform =
      `translate3d(-50%, calc(-50% + ${(1 - mapIn) * 30}px), 0) scale(${.94 + mapIn * .06})`;
  }

  const trainingIn = mapRange(progress, 0.16, 0.21);
  const trainingOut = mapRange(progress, 0.58, 0.64);
  const trainingVisibility = trainingIn * (1 - trainingOut);

  if (trainingLowerThird) {
    trainingLowerThird.style.opacity = String(trainingVisibility);
    trainingLowerThird.style.transform =
      `translate3d(0, ${(1 - trainingIn) * 20 - trainingOut * 10}px, 0)`;
  }

  const highlightStarts = [0.19, 0.31, 0.43, 0.55];
  const trainingContentOut = mapRange(progress, 0.59, 0.66);
  let latestActiveIndex = -1;

  countries.forEach((country, index) => {
    const reveal = mapRange(progress, highlightStarts[index], highlightStarts[index] + 0.035);
    const visibility = reveal * (1 - trainingContentOut);
    const active = visibility > 0.01;

    country.classList.toggle('is-active', active);
    country.style.opacity = String(visibility);
    country.style.transform =
      `translate(-50%, -50%) scale(${0.65 + reveal * 0.35})`;

    if (reveal > 0.01) latestActiveIndex = index;
  });

  trayThumbs.forEach((thumb, index) => {
    if (!thumb) return;
    const revealed = latestActiveIndex >= 0 && index <= latestActiveIndex;
    thumb.classList.toggle('is-visible', revealed);
    thumb.style.opacity = String(revealed ? 1 - trainingContentOut : 0);
  });

  if (photoTray) {
    photoTray.style.opacity = String(1 - trainingContentOut);
    photoTray.style.transform = `translate3d(-50%, ${trainingContentOut * 20}px, 0)`;
  }

  const operationsIn = mapRange(progress, 0.62, 0.69);
  const operationsOut = mapRange(progress, 0.96, 1.0);
  const operationsVisibility = operationsIn * (1 - operationsOut);

  if (operationsHeading) {
    operationsHeading.style.opacity = String(operationsVisibility);
    operationsHeading.style.transform =
      `translate3d(0, ${(1 - operationsIn) * 22}px, 0)`;
  }

  const afghanistanIn = mapRange(progress, 0.67, 0.72);
  if (afghanistanMarker) {
    const markerVisibility = afghanistanIn * (1 - operationsOut);
    afghanistanMarker.classList.toggle('is-active', markerVisibility > .01);
    afghanistanMarker.style.opacity = String(markerVisibility);
    afghanistanMarker.style.transform =
      `translate(-50%, -50%) scale(${.68 + afghanistanIn * .32})`;
  }

  const firstCardIn = mapRange(progress, 0.70, 0.78);
  const firstCardVisibility = firstCardIn * (1 - operationsOut);
  setReveal(primaryOperationCard, firstCardVisibility, (1 - firstCardIn) * 30, .97 + firstCardIn * .03);

  const secondCardIn = mapRange(progress, 0.82, 0.90);
  const secondCardVisibility = secondCardIn * (1 - operationsOut);
  setReveal(secondaryOperationCard, secondCardVisibility, (1 - secondCardIn) * 34, .97 + secondCardIn * .03);
}


function openTrainingVideo(index) {
  const item = countryPhotoData[index];
  if (!item || !trainingVideoModal || !trainingVideoPlayer) return;

  trainingVideoPlayer.src = item.video;
  trainingVideoPlayer.load();

  if (trainingVideoTitle) {
    trainingVideoTitle.textContent = item.videoTitle;
  }

  trainingVideoModal.classList.add('is-open');
  trainingVideoModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('footprint-video-open');
}

function closeTrainingVideo() {
  trainingVideoModal?.classList.remove('is-open');
  trainingVideoModal?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('footprint-video-open');

  if (trainingVideoPlayer) {
    trainingVideoPlayer.pause();
    trainingVideoPlayer.removeAttribute('src');
    trainingVideoPlayer.load();
  }
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-country-video-index]');
  if (!button) return;

  openTrainingVideo(Number(button.dataset.countryVideoIndex));
});

document.querySelectorAll('[data-close-training-video]').forEach(element => {
  element.addEventListener('click', closeTrainingVideo);
});

function openObrVideo() {
  if (!videoModal) return;
  videoModal.classList.add('is-open');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('footprint-video-open');
}

function closeObrVideo() {
  videoModal?.classList.remove('is-open');
  videoModal?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('footprint-video-open');
  obrVideo?.pause();
}

document.querySelector('[data-open-obr-video]')?.addEventListener('click', openObrVideo);
document.querySelectorAll('[data-close-obr-video]').forEach(element => {
  element.addEventListener('click', closeObrVideo);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeTrainingVideo();
    closeObrVideo();
  }
});

window.addEventListener('scroll', updateFootprintStory, { passive: true });
window.addEventListener('resize', updateFootprintStory);
updateFootprintStory();
