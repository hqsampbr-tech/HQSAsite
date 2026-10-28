const body = document.body;
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
const filmSection = document.querySelector('#film');

body.classList.add('snap-intro');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.18 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

let introComplete = false;
let snapInProgress = false;
let touchStartY = 0;

const homeSection = document.querySelector('#home');
const openingVideo = document.querySelector('#opening-video');
const playPauseButton = document.querySelector('#play-pause-button');
const playPauseIcon = playPauseButton?.querySelector('.play-pause-icon');
const soundToggle = document.querySelector('#sound-toggle');
const soundIcon = soundToggle?.querySelector('.sound-icon');
const volumeSlider = document.querySelector('#volume-slider');
const seekSlider = document.querySelector('#video-seek');
const currentTimeLabel = document.querySelector('#current-time');
const durationTimeLabel = document.querySelector('#duration-time');
const fullscreenButton = document.querySelector('#fullscreen-button');
const fullscreenIcon = fullscreenButton?.querySelector('.fullscreen-icon');

function setFilmActive(active) {
  filmSection?.classList.toggle('is-active', active);
}

function snapToFilm() {
  if (!filmSection || snapInProgress) return;

  snapInProgress = true;
  filmSection.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

  window.setTimeout(() => {
    snapInProgress = false;
    introComplete = true;
    document.documentElement.style.scrollSnapType = 'none';
    setFilmActive(true);
    openingVideo?.play().catch(() => {});
  }, 760);
}

function onWheel(event) {
  if (introComplete || snapInProgress || event.deltaY <= 8) return;
  if (!homeSection) return;

  const nearTop = Math.abs(homeSection.getBoundingClientRect().top) < window.innerHeight * 0.35;
  if (!nearTop) return;

  event.preventDefault();
  snapToFilm();
}

function onTouchStart(event) {
  touchStartY = event.touches[0]?.clientY ?? 0;
}

function onTouchEnd(event) {
  if (introComplete || snapInProgress) return;

  const endY = event.changedTouches[0]?.clientY ?? touchStartY;
  if (touchStartY - endY > 42) snapToFilm();
}

window.addEventListener('wheel', onWheel, { passive: false });
window.addEventListener('touchstart', onTouchStart, { passive: true });
window.addEventListener('touchend', onTouchEnd, { passive: true });

window.addEventListener('scroll', () => {
  if (!filmSection) return;

  const filmRect = filmSection.getBoundingClientRect();
  const filmMostlyVisible =
    filmRect.top < window.innerHeight * 0.32 &&
    filmRect.bottom > window.innerHeight * 0.68;

  setFilmActive(filmMostlyVisible);

  if (window.scrollY < window.innerHeight * 0.15) {
    introComplete = false;
    document.documentElement.style.scrollSnapType = 'y mandatory';
  }

  const filmBottom = filmSection.offsetTop + filmSection.offsetHeight;
  if (window.scrollY > filmBottom - window.innerHeight * 0.12) {
    introComplete = true;
    document.documentElement.style.scrollSnapType = 'none';
  }
}, { passive: true });

if (openingVideo) {
  openingVideo.muted = true;
  openingVideo.volume = Number(volumeSlider?.value ?? 0.25);

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60);
    return `${minutes}:${String(remainder).padStart(2, '0')}`;
  }

  function refreshPlaybackUI() {
    const isPaused = openingVideo.paused;
    if (playPauseIcon) playPauseIcon.textContent = isPaused ? '▶' : '❚❚';
    playPauseButton?.setAttribute(
      'aria-label',
      isPaused ? 'Play video' : 'Pause video'
    );

    const muted = openingVideo.muted || openingVideo.volume === 0;
    soundToggle?.setAttribute('aria-pressed', String(!muted));
    soundToggle?.setAttribute(
      'aria-label',
      muted ? 'Turn sound on' : 'Mute video'
    );
    if (soundIcon) soundIcon.textContent = muted ? '🔇' : '🔊';

    const isFullscreen =
      document.fullscreenElement === openingVideo ||
      document.webkitFullscreenElement === openingVideo;

    fullscreenButton?.setAttribute('aria-pressed', String(isFullscreen));
    fullscreenButton?.setAttribute(
      'aria-label',
      isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'
    );
    if (fullscreenIcon) fullscreenIcon.textContent = isFullscreen ? '🗗' : '⛶';
  }

  function refreshTimeline() {
    if (currentTimeLabel) {
      currentTimeLabel.textContent = formatTime(openingVideo.currentTime);
    }

    if (durationTimeLabel) {
      durationTimeLabel.textContent = formatTime(openingVideo.duration);
    }

    if (seekSlider && Number.isFinite(openingVideo.duration) && openingVideo.duration > 0) {
      seekSlider.value = String(
        (openingVideo.currentTime / openingVideo.duration) * 100
      );
    }
  }

  playPauseButton?.addEventListener('click', async () => {
    if (openingVideo.paused) {
      try { await openingVideo.play(); } catch (_) {}
    } else {
      openingVideo.pause();
    }
    refreshPlaybackUI();
  });

  seekSlider?.addEventListener('input', () => {
    if (!Number.isFinite(openingVideo.duration) || openingVideo.duration <= 0) return;
    openingVideo.currentTime =
      (Number(seekSlider.value) / 100) * openingVideo.duration;
    refreshTimeline();
  });

  soundToggle?.addEventListener('click', async () => {
    openingVideo.muted = !openingVideo.muted;

    if (!openingVideo.muted && openingVideo.volume === 0) {
      openingVideo.volume = 0.25;
      if (volumeSlider) volumeSlider.value = '0.25';
    }

    try { await openingVideo.play(); } catch (_) {}
    refreshPlaybackUI();
  });

  volumeSlider?.addEventListener('input', () => {
    openingVideo.volume = Number(volumeSlider.value);
    openingVideo.muted = openingVideo.volume === 0;
    refreshPlaybackUI();
  });

  fullscreenButton?.addEventListener('click', async () => {
    try {
      const activeFullscreen =
        document.fullscreenElement || document.webkitFullscreenElement;

      if (activeFullscreen) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      } else {
        /*
         * Fullscreen the video element directly. Fullscreening the entire film
         * section also included the black transition overlay, which could cover
         * the video and produce a black screen.
         */
        openingVideo.controls = true;

        if (openingVideo.requestFullscreen) {
          await openingVideo.requestFullscreen();
        } else if (openingVideo.webkitRequestFullscreen) {
          openingVideo.webkitRequestFullscreen();
        } else if (openingVideo.webkitEnterFullscreen) {
          openingVideo.webkitEnterFullscreen();
        }

        try { await openingVideo.play(); } catch (_) {}
      }
    } catch (_) {}

    refreshPlaybackUI();
  });

  function refreshFullscreenState() {
    const isFullscreen =
      document.fullscreenElement === openingVideo ||
      document.webkitFullscreenElement === openingVideo;

    /*
     * Use the browser's native controls while fullscreen, then return to the
     * custom controls after leaving fullscreen.
     */
    openingVideo.controls = isFullscreen;
    refreshPlaybackUI();
  }

  document.addEventListener('fullscreenchange', refreshFullscreenState);
  document.addEventListener('webkitfullscreenchange', refreshFullscreenState);

  openingVideo.addEventListener('loadedmetadata', refreshTimeline);
  openingVideo.addEventListener('durationchange', refreshTimeline);
  openingVideo.addEventListener('timeupdate', refreshTimeline);
  openingVideo.addEventListener('play', refreshPlaybackUI);
  openingVideo.addEventListener('pause', refreshPlaybackUI);
  openingVideo.addEventListener('volumechange', refreshPlaybackUI);

  const videoObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.intersectionRatio >= 0.55) {
        setFilmActive(true);
        openingVideo.play().catch(() => {});
      } else if (entry.intersectionRatio < 0.15) {
        setFilmActive(false);
        openingVideo.pause();
      }
    }
  }, { threshold: [0, 0.15, 0.55, 1] });

  videoObserver.observe(filmSection);
  refreshPlaybackUI();
  refreshTimeline();
}




function updateFilmToCapabilitiesTransition() {
  if (!filmSection || !capabilitiesSection) return;

  const rect = capabilitiesSection.getBoundingClientRect();
  const vh = window.innerHeight;

  // Begin fading the film as the capabilities section approaches.
  const progress = Math.max(
    0,
    Math.min(1, (vh * 1.05 - rect.top) / (vh * 0.82))
  );

  const blackout = Math.min(1, progress / 0.62);
  const reveal = Math.max(0, Math.min(1, (progress - 0.36) / 0.64));

  filmSection.style.setProperty('--film-blackout', String(blackout));
  capabilitiesSection.style.setProperty('--capabilities-reveal', String(reveal));
}

window.addEventListener('scroll', updateFilmToCapabilitiesTransition, { passive: true });
window.addEventListener('resize', updateFilmToCapabilitiesTransition);

const introTitle = document.querySelector('.scroll-fade');
const capabilitiesSection = document.querySelector('.capabilities-intro');

function updateCapabilitiesParallax() {
  if (!introTitle) return;

  const section = introTitle.closest('.capabilities-intro');
  if (!section) return;

  const rect = section.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const progress = Math.max(
    0,
    Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height))
  );

  const y = 110 - progress * 220;
  const scale = 0.92 + progress * 0.14;

  introTitle.style.transform =
    `translate3d(0, ${y}px, 0) scale(${scale})`;
  introTitle.style.opacity = '1';
}

window.addEventListener('scroll', updateCapabilitiesParallax, { passive: true });
window.addEventListener('resize', updateCapabilitiesParallax);
updateCapabilitiesParallax();
updateFilmToCapabilitiesTransition();

const himarsStory = document.querySelector('.himars-story');
const himarsVehicleWrap = document.querySelector('.himars-visual-wrap');
const himarsTitle = document.querySelector('.himars-title');
const himarsDescription = document.querySelector('.himars-description');
const himarsVideoCard = document.querySelector('.himars-video-card');
const himarsProgress = document.querySelector('.himars-progress span');

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function mapRange(value, start, end) {
  return clamp01((value - start) / (end - start));
}

function updateHimarsStory() {
  if (!himarsStory) return;

  const rect = himarsStory.getBoundingClientRect();
  const totalScrollable = himarsStory.offsetHeight - window.innerHeight;
  const travelled = -rect.top;
  const progress = clamp01(travelled / Math.max(1, totalScrollable));

  /*
   * 0.00–0.10: vehicle enters quickly after the transition.
   */
  const vehicleIn = mapRange(progress, 0.00, 0.10);
  const vehicleExit = mapRange(progress, 0.90, 0.98);
  const vehicleY = 150 * (1 - vehicleIn);
  const vehicleScale = (0.84 + vehicleIn * 0.16) * (1 - vehicleExit * 0.08);
  himarsVehicleWrap.style.opacity = String(vehicleIn * (1 - vehicleExit));
  himarsVehicleWrap.style.transform =
    `translate3d(0, ${vehicleY}px, 0) scale(${vehicleScale})`;

  /*
   * 0.16–0.30: title enters.
   * 0.72–0.84: title fades away together with the description as video enters.
   */
  const titleIn = mapRange(progress, 0.10, 0.23);
  const titleOut = mapRange(progress, 0.72, 0.84);
  const titleOpacity = titleIn * (1 - titleOut);
  himarsTitle.style.opacity = String(titleOpacity);
  himarsTitle.style.transform =
    `translate3d(${(1 - titleIn) * 70}px, 0, 0)`;

  /*
   * 0.28–0.42: description appears.
   * It stays fully visible through 0.68, then fades slowly by 0.84.
   */
  const descriptionIn = mapRange(progress, 0.22, 0.36);
  const descriptionOut = mapRange(progress, 0.68, 0.84);
  const descriptionOpacity = descriptionIn * (1 - descriptionOut);
  himarsDescription.style.opacity = String(descriptionOpacity);
  himarsDescription.style.transform =
    `translate3d(0, ${(1 - descriptionIn) * 36}px, 0)`;

  /*
   * 0.72–0.84: video fades in.
   * 0.90–0.98: video and HIMARS shrink slightly and fade in place.
   */
  const videoIn = mapRange(progress, 0.66, 0.80);
  const videoExit = mapRange(progress, 0.90, 0.98);
  const videoScale = (0.96 + videoIn * 0.04) * (1 - videoExit * 0.08);
  himarsVideoCard.style.opacity = String(videoIn * (1 - videoExit));
  himarsVideoCard.style.transform =
    `translate3d(0, ${(1 - videoIn) * 20}px, 0) scale(${videoScale})`;

}

window.addEventListener('scroll', updateHimarsStory, { passive: true });
window.addEventListener('resize', updateHimarsStory);
updateHimarsStory();


const himarsInlinePlayer = document.querySelector('#himars-inline-player');
const himarsInlinePlay = document.querySelector('#himars-inline-play');
const himarsInlineVideo = document.querySelector('#himars-inline-video');

if (himarsInlineVideo) {
  // Start the HIMARS clip at 30% volume.
  himarsInlineVideo.volume = 0.30;

  // Pause automatically once the player is mostly out of view.
  const himarsVideoVisibilityObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio < 0.35 && !himarsInlineVideo.paused) {
          himarsInlineVideo.pause();
        }
      }
    },
    {
      threshold: [0, 0.35, 0.6, 1],
    }
  );

  himarsVideoVisibilityObserver.observe(himarsInlinePlayer);
}

himarsInlinePlay?.addEventListener('click', async () => {
  himarsInlinePlayer?.classList.add('is-playing');

  if (himarsInlineVideo && himarsInlineVideo.currentTime >= himarsInlineVideo.duration) {
    himarsInlineVideo.currentTime = 0;
  }

  try {
    await himarsInlineVideo?.play();
  } catch (_) {}
});

himarsInlineVideo?.addEventListener('ended', () => {
  himarsInlinePlayer?.classList.remove('is-playing');
  if (himarsInlineVideo) himarsInlineVideo.currentTime = 0;
});

const fhStory = document.querySelector('.fh-story');
const fhVisualWrap = document.querySelector('.fh-visual-wrap');
const fhTitle = document.querySelector('.fh-title');
const fhDescription = document.querySelector('.fh-description');
const fhVideoCard = document.querySelector('.fh-video-card');
const fhProgress = document.querySelector('.fh-progress span');

function updateFhStory() {
  if (!fhStory) return;

  const rect = fhStory.getBoundingClientRect();
  const totalScrollable = fhStory.offsetHeight - window.innerHeight;
  const travelled = -rect.top;
  const progress = clamp01(travelled / Math.max(1, totalScrollable));

  /*
   * 0.00–0.14: image enters from the right.
   */
  const imageIn = mapRange(progress, 0.00, 0.12);
  const imageExit = mapRange(progress, 0.88, 0.98);
  const imageX = 90 * (1 - imageIn);
  const imageScale = (0.88 + imageIn * 0.12) * (1 - imageExit * 0.07);
  fhVisualWrap.style.opacity = String(imageIn * (1 - imageExit));
  fhVisualWrap.style.transform =
    `translate3d(${imageX}px, 0, 0) scale(${imageScale})`;

  /*
   * 0.12–0.28: title enters from the left.
   * 0.72–0.84: title fades away as the video comes in.
   */
  const titleIn = mapRange(progress, 0.08, 0.22);
  const titleOut = mapRange(progress, 0.72, 0.84);
  fhTitle.style.opacity = String(titleIn * (1 - titleOut));
  fhTitle.style.transform =
    `translate3d(${(1 - titleIn) * -70}px, ${titleOut * -12}px, 0)`;

  /*
   * 0.26–0.40: description appears and stays longer.
   */
  const descriptionIn = mapRange(progress, 0.18, 0.32);
  const descriptionOut = mapRange(progress, 0.68, 0.84);
  fhDescription.style.opacity = String(descriptionIn * (1 - descriptionOut));
  fhDescription.style.transform =
    `translate3d(0, ${(1 - descriptionIn) * 36 - descriptionOut * 10}px, 0)`;

  /*
   * 0.72–0.84: video fades into the same content area.
   */
  const videoIn = mapRange(progress, 0.72, 0.84);
  const videoExit = mapRange(progress, 0.88, 0.98);
  const videoScale = (0.96 + videoIn * 0.04) * (1 - videoExit * 0.07);
  fhVideoCard.style.opacity = String(videoIn * (1 - videoExit));
  fhVideoCard.style.transform =
    `translate3d(0, ${(1 - videoIn) * 20}px, 0) scale(${videoScale})`;

}

window.addEventListener('scroll', updateFhStory, { passive: true });
window.addEventListener('resize', updateFhStory);
updateFhStory();

const fhInlinePlayer = document.querySelector('#fh-inline-player');
const fhInlinePlay = document.querySelector('#fh-inline-play');
const fhInlineVideo = document.querySelector('#fh-inline-video');

if (fhInlineVideo) {
  fhInlineVideo.volume = 0.30;

  const fhVideoVisibilityObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio < 0.35 && !fhInlineVideo.paused) {
          fhInlineVideo.pause();
        }
      }
    },
    { threshold: [0, 0.35, 0.6, 1] }
  );

  fhVideoVisibilityObserver.observe(fhInlinePlayer);
}

fhInlinePlay?.addEventListener('click', async () => {
  fhInlinePlayer?.classList.add('is-playing');

  if (fhInlineVideo && fhInlineVideo.currentTime >= fhInlineVideo.duration) {
    fhInlineVideo.currentTime = 0;
  }

  try {
    await fhInlineVideo?.play();
  } catch (_) {}
});

fhInlineVideo?.addEventListener('ended', () => {
  fhInlinePlayer?.classList.remove('is-playing');
  if (fhInlineVideo) fhInlineVideo.currentTime = 0;
});



const moreCapabilitiesStory = document.querySelector('.more-capabilities-story');
const moreCapabilitiesIntro = document.querySelector('.more-capabilities-intro');
const moreCapabilityItems = [...document.querySelectorAll('.more-capability-item')];

function updateMoreCapabilitiesStory() {
  if (!moreCapabilitiesStory) return;

  const progress = getStoryProgress(moreCapabilitiesStory);

  /*
   * 0.00–0.18: centered “and many more”.
   */
  const introIn = mapRange(progress, 0.00, 0.025);
  const introOut = mapRange(progress, 0.12, 0.19);
  const introOpacity = introIn * (1 - introOut);
  const introY = (1 - introIn) * 18 - introOut * 18;
  const introScale = 0.96 + introIn * 0.04 - introOut * 0.04;

  if (moreCapabilitiesIntro) {
    moreCapabilitiesIntro.style.opacity = String(introOpacity);
    moreCapabilitiesIntro.style.transform =
      `translate3d(-50%, calc(-50% + ${introY}px), 0) scale(${introScale})`;
  }

  /*
   * 0.28–1.00: five centered capability reveals in sequence.
   */
  const sequenceStart = 0.19;
  const sequenceSpan = 0.81;
  const block = sequenceSpan / Math.max(1, moreCapabilityItems.length);

  moreCapabilityItems.forEach((item, index) => {
    const start = sequenceStart + index * block;
    const end = start + block;
    const local = mapRange(progress, start, end);
    const inP = mapRange(local, 0.00, 0.24);
    const outP = mapRange(local, 0.70, 1.00);
    const opacity = inP * (1 - outP);
    const y = (1 - inP) * 28 - outP * 22;
    const scale = 0.94 + inP * 0.06 - outP * 0.05;

    const isActive = opacity > 0.01;
    item.classList.toggle('is-active', isActive);
    item.style.opacity = String(opacity);
    item.style.transform =
      `translate3d(-50%, calc(-50% + ${y}px), 0) scale(${scale})`;
  });

  /*
   * Once the user starts the additional sequence, pause the FH2000 inline video
   * so it does not keep playing off-screen.
   */
  if (progress > 0.01 && fhInlineVideo && !fhInlineVideo.paused) {
    fhInlineVideo.pause();
  }
}

window.addEventListener('scroll', updateMoreCapabilitiesStory, { passive: true });
window.addEventListener('resize', updateMoreCapabilitiesStory);
updateMoreCapabilitiesStory();

const capabilityProgress = document.querySelector('#capability-progress');
const capabilityProgressYellow = document.querySelector('#capability-progress-yellow');
const capabilityProgressWhite = document.querySelector('#capability-progress-white');

function getStoryProgress(section) {
  if (!section) return 0;
  const rect = section.getBoundingClientRect();
  const totalScrollable = section.offsetHeight - window.innerHeight;
  return clamp01((-rect.top) / Math.max(1, totalScrollable));
}

function updateCapabilityProgress() {
  if (!capabilityProgress || !himarsStory || !fhStory) return;

  const himarsRect = himarsStory.getBoundingClientRect();
  const fhRect = fhStory.getBoundingClientRect();
  const moreRect = moreCapabilitiesStory
    ? moreCapabilitiesStory.getBoundingClientRect()
    : null;

  const himarsVisible =
    himarsRect.bottom > 0 &&
    himarsRect.top < window.innerHeight;

  const fhVisible =
    fhRect.bottom > 0 &&
    fhRect.top < window.innerHeight;

  const moreVisible =
    !!moreRect &&
    moreRect.bottom > 0 &&
    moreRect.top < window.innerHeight;

  /*
   * Keep the shared bar visible while any capabilities sequence is active.
   */
  capabilityProgress.classList.toggle(
    'is-visible',
    himarsVisible || fhVisible || moreVisible
  );

  const himarsP = getStoryProgress(himarsStory);
  const fhP = getStoryProgress(fhStory);
  const moreP = getStoryProgress(moreCapabilitiesStory);

  let yellowWidth = 0;
  let whiteWidth = 0;

  if (moreVisible || moreP > 0) {
    /*
     * The additional capability sequence starts the yellow fill again.
     */
    yellowWidth = Math.min(100, moreP * 100);
    whiteWidth = 0;
  } else if (fhP > 0) {
    /*
     * HIMARS yellow remains full while FH2000 fills in white over it.
     */
    yellowWidth = 100;
    whiteWidth = Math.min(100, fhP * 100);
  } else if (himarsP > 0) {
    yellowWidth = Math.min(100, himarsP * 100);
    whiteWidth = 0;
  }

  capabilityProgressYellow.style.width = `${yellowWidth}%`;
  capabilityProgressWhite.style.width = `${whiteWidth}%`;
}

window.addEventListener('scroll', updateCapabilityProgress, { passive: true });
window.addEventListener('resize', updateCapabilityProgress);
updateCapabilityProgress();

const modal = document.querySelector('#video-modal');
const modalTitle = document.querySelector('#modal-title');
const videoNames = {
  intro: 'Opening Film',
  himars: 'HIMARS — Short Film',
  howitzer: '155mm Howitzer — Short Film',
  pegasus: 'Pegasus — Short Film'
};
document.querySelectorAll('[data-video]').forEach(button => {
  button.addEventListener('click', () => {
    modalTitle.textContent = videoNames[button.dataset.video] || 'Video Placeholder';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});
document.querySelectorAll('[data-close-modal]').forEach(el => {
  el.addEventListener('click', closeModal);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}


// V75: keep the HIMARS play control interactive during the fade transition.
document.querySelectorAll(
  '.himars-play-button, .himars-video-toggle, [data-himars-play], #himars-play-button'
).forEach((button) => {
  button.style.pointerEvents = 'auto';
  button.style.zIndex = '12';

  button.addEventListener('pointerdown', (event) => {
    event.stopPropagation();
  });
});


// V102 capabilities-at-a-glance interaction
const capabilityDetails = {
  himars: {
    title: 'High Mobility Artillery Rocket System (HIMARS)',
    description: 'Provides our Army with lethal and precise strikes, taking targets up to 70km away, firing six rockets in thirty seconds with 200 lbs of high explosive power in each rocket.',
    image: 'assets/himars-vehicle.jpg',
    video: 'assets/himars-daring-warrior.mp4',
    poster: 'assets/himars-daring-warrior-poster.jpg'
  },
  fh2000: {
    title: 'FH2000 Gun Howitzer',
    description: 'The 155mm FH2000 provides deadly fire support against the enemy, firing three rounds in twenty seconds per gun at a maximum range of 42km.',
    image: 'assets/fh2000-gun-howitzer.png',
    video: 'assets/fh2000-battleking.mp4',
    poster: 'assets/fh2000-battleking-poster.jpg'
  },
  slwh: {
    title: 'Singapore Light Weight Howitzer (SLWH) Pegasus',
    description: 'A heli-portable 155mm 39 calibre howitzer designed for long range support with self-propelled capabilities, allowing it to go wherever the skies are open.',
    image: 'assets/pegasus-howitzer.png'
  },
  ssph: {
    title: 'Singapore Self-Propelled Howitzer (SSPH) Primus',
    video: 'assets/ssph_clip.mp4',
    description: 'A 155mm, 39 calibre tracked-based howitzer, with the range and firepower of Artillery with the protection, speed and manoeuvrability of Armour.',
    image: 'assets/ssph.png'
  },
  arthur: {
    title: 'ARTHUR Weapon Locating Radar',
    description: 'ARTHUR locates artillery fire and mortars of up to a range of 40km and has the ability to track up to 100 rounds per minute and 8 targets simultaneously. It was also operationally deployed in Afghanistan where it detected every rocket fire within its sector.',
    image: 'assets/arthur-radar.png'
  },
  tpq53: {
    title: 'AN/TPQ-53 Weapon Locating Radar',
    description: 'The newest addition in replacement of the TPQ-36 and TPQ-37 WLRs, it provides increased radar coverage of up to 60km, improved accuracy, and reduced manpower requirement. Further, it is capable of operating omnidirectionally compared to its fixed-direction predecessors.',
    image: 'assets/tpq53-radar.png'
  },
  safari: {
    title: 'SAFARI Radar',
    description: 'The SAFARI Weapon Locating Radar that is able to locate mortar and artillery fire of ranges up to 40km and rocket fire of up to 60km respectively. It has a 90% location probability with the ability to track up to 10 targets simultaneously.',
    image: 'assets/safari-radar.png'
  }
};

const capabilityModal = document.querySelector('#capability-detail-modal');
const capabilityModalImage = document.querySelector('#capability-detail-image');
const capabilityModalTitle = document.querySelector('#capability-detail-title');
const capabilityModalDescription = document.querySelector('#capability-detail-description');
const capabilityModalVideoWrap = document.querySelector('#capability-detail-video-wrap');
const capabilityModalVideo = document.querySelector('#capability-detail-video');

function openCapabilityDetail(key) {
  const detail = capabilityDetails[key];
  if (!detail || !capabilityModal) return;

  capabilityModalImage.src = detail.image;
  capabilityModalImage.alt = detail.title;
  capabilityModalTitle.textContent = detail.title;
  capabilityModalDescription.textContent = detail.description;

  if (detail.video) {
    capabilityModalVideoWrap.hidden = false;
    capabilityModalVideo.src = detail.video;
    capabilityModalVideo.poster = detail.poster || '';
    capabilityModalVideo.load();
  } else {
    capabilityModalVideo.pause();
    capabilityModalVideo.removeAttribute('src');
    capabilityModalVideo.removeAttribute('poster');
    capabilityModalVideo.load();
    capabilityModalVideoWrap.hidden = true;
  }

  capabilityModal.classList.add('is-open');
  capabilityModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('capability-modal-open');
}

function closeCapabilityDetail() {
  capabilityModal?.classList.remove('is-open');
  capabilityModal?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('capability-modal-open');
  capabilityModalVideo?.pause();
}

document.querySelectorAll('[data-capability]').forEach(tile => {
  tile.addEventListener('click', () => openCapabilityDetail(tile.dataset.capability));
});

document.querySelectorAll('[data-close-capability]').forEach(element => {
  element.addEventListener('click', closeCapabilityDetail);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeCapabilityDetail();
});
