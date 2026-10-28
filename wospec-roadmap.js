const menuButton=document.querySelector('.menu-button');const siteNav=document.querySelector('.site-nav');menuButton?.addEventListener('click',()=>{const open=siteNav?.classList.toggle('is-open')||false;menuButton.setAttribute('aria-expanded',String(open));});
const stages=[...document.querySelectorAll('[data-wospec-stage]')];const clamp=v=>Math.max(0,Math.min(1,v));const smooth=(a,b,v)=>{const x=clamp((v-a)/Math.max(.0001,b-a));return x*x*(3-2*x)};const win=(p,a,b,c,d)=>clamp(smooth(a,b,p)*(1-smooth(c,d,p)));function prog(s){const r=s.getBoundingClientRect();return clamp(-r.top/Math.max(1,s.offsetHeight-innerHeight))}function show(el,o){if(!el)return;el.style.opacity=o;el.style.transform=`translate3d(0,${(1-o)*28}px,0)`;el.style.visibility=o<.015?'hidden':'visible';el.style.pointerEvents=o>.78?'auto':'none'}function update(){stages.forEach(s=>{const p=prog(s);show(s.querySelector('[data-wospec-beat="growth"]'),win(p,0,.07,.24,.34));show(s.querySelector('[data-wospec-beat="education"]'),win(p,.28,.38,.56,.66));show(s.querySelector('[data-wospec-beat="service"]'),win(p,.60,.70,.95,1));s.style.setProperty('--wp',p.toFixed(3));});}addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();


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

enableRoadmapScrollChaining('.wospec-story-panel');
