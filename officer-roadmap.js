const roadmapMenuButton = document.querySelector('.menu-button');
const roadmapSiteNav = document.querySelector('.site-nav');

roadmapMenuButton?.addEventListener('click', () => {
  const isOpen = roadmapMenuButton.getAttribute('aria-expanded') === 'true';
  roadmapMenuButton.setAttribute('aria-expanded', String(!isOpen));
  roadmapSiteNav?.classList.toggle('is-open', !isOpen);
});

const journeyStages = [...document.querySelectorAll('[data-stage]')];

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function stageProgress(stage) {
  const rect = stage.getBoundingClientRect();
  const distance = Math.max(1, stage.offsetHeight - window.innerHeight);
  return clamp01(-rect.top / distance);
}

function smoothstep(start, end, value) {
  const x = clamp01((value - start) / Math.max(0.0001, end - start));
  return x * x * (3 - 2 * x);
}

function windowOpacity(progress, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd) {
  const fadeIn = smoothstep(fadeInStart, fadeInEnd, progress);
  const fadeOut = 1 - smoothstep(fadeOutStart, fadeOutEnd, progress);
  return clamp01(fadeIn * fadeOut);
}

function setBeat(element, opacity, y = 24) {
  if (!element) return;
  element.style.opacity = String(opacity);
  element.style.transform = `translate3d(0, ${(1 - opacity) * y}px, 0)`;
  element.style.pointerEvents = opacity > .78 ? 'auto' : 'none';
  element.style.visibility = opacity < .015 ? 'hidden' : 'visible';
}

function updateJourneyRoadmap() {
  journeyStages.forEach(stage => {
    const progress = stageProgress(stage);

    // Only one story layer is fully visible at a time.
    const growth = windowOpacity(progress, 0.00, 0.08, 0.24, 0.34);
    const education = windowOpacity(progress, 0.28, 0.38, 0.56, 0.66);
    const service = windowOpacity(progress, 0.60, 0.70, 0.94, 1.00);

    setBeat(stage.querySelector('[data-beat="growth"]'), growth, 28);
    setBeat(stage.querySelector('[data-beat="education"]'), education, 34);
    setBeat(stage.querySelector('[data-beat="service"]'), service, 34);

    stage.style.setProperty('--stage-progress', progress.toFixed(3));
    stage.classList.toggle('is-active', progress > .01 && progress < .99);
  });
}

window.addEventListener('scroll', updateJourneyRoadmap, { passive: true });
window.addEventListener('resize', updateJourneyRoadmap);
updateJourneyRoadmap();


// V121: prevent nested roadmap panels from trapping mouse-wheel scrolling.
function enableRoadmapScrollChaining(panelSelector) {
  document.querySelectorAll(panelSelector).forEach(panel => {
    panel.addEventListener('wheel', event => {
      const canScroll = panel.scrollHeight > panel.clientHeight + 2;
      const movingDown = event.deltaY > 0;
      const movingUp = event.deltaY < 0;
      const atTop = panel.scrollTop <= 1;
      const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;

      if (!canScroll || (movingDown && atBottom) || (movingUp && atTop)) {
        event.preventDefault();
        window.scrollBy({
          top: event.deltaY,
          left: 0,
          behavior: 'auto'
        });
      }
    }, { passive: false });
  });
}

enableRoadmapScrollChaining('.journey-stage-header, .journey-layer');
