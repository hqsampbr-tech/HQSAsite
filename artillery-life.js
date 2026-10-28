const menuButton=document.querySelector('.menu-button');
const siteNav=document.querySelector('.site-nav');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));siteNav?.classList.toggle('is-open',!open);});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible');}),{threshold:.18});
document.querySelectorAll('.reveal-on-scroll').forEach(el=>observer.observe(el));
const story=document.querySelector('.artillery-life-story');
const bg=document.querySelector('.artillery-life-story-bg');
function update(){if(!story||!bg)return;const r=story.getBoundingClientRect();const p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));bg.style.transform=`scale(1.06) translate3d(0, ${(p-.5)*36}px, 0)`;}
addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();