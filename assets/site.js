
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const header=document.getElementById('site-header'), prog=document.getElementById('progress');
function onScroll(){const h=document.documentElement;const sc=h.scrollTop,max=h.scrollHeight-h.clientHeight;
  prog.style.width=(max>0?sc/max*100:0)+'%';header.classList.toggle('scrolled', sc>60);}
addEventListener('scroll',onScroll,{passive:true}); onScroll();
const burger=document.getElementById('hamburger'), links=document.getElementById('navLinks');
burger.addEventListener('click',()=>{burger.classList.toggle('open');links.classList.toggle('open')});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');links.classList.remove('open')}));
const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.14});
document.querySelectorAll('.reveal,.venn-stage').forEach(el=>io.observe(el));
function runCount(el){const target=+el.dataset.count, suf=el.dataset.suffix||'', pre=el.dataset.prefix||'';
  const render=v=>{el.innerHTML=pre+v+(suf?'<span class="u">'+suf+'</span>':'');};
  if(reduce){render(target);return;}
  let s=null,dur=1500;function step(t){if(!s)s=t;const p=Math.min((t-s)/dur,1);
    render(Math.floor((1-Math.pow(1-p,3))*target));
    if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);}
const cio=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('[data-count]').forEach(runCount);cio.unobserve(e.target)}}),{threshold:.3});
document.querySelectorAll('.impact').forEach(el=>cio.observe(el));
if(!reduce && matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('.tilt').forEach(card=>{
    card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-6px)`;});
    card.addEventListener('pointerleave',()=>card.style.transform='');});
}
const _para=[].slice.call(document.querySelectorAll('.atmos .leaf'));
function _plx(){const vh=innerHeight;_para.forEach(el=>{const r=el.getBoundingClientRect();const c=r.top+r.height/2-vh/2;el.style.transform='translateY('+(c*-(parseFloat(el.dataset.parallax)||0)).toFixed(1)+'px)';});}
if(!reduce){addEventListener('scroll',()=>requestAnimationFrame(_plx),{passive:true});addEventListener('resize',_plx);_plx();}
(function(){if(reduce)return;const c=document.getElementById('leafCanvas');if(!c)return;
  const ctx=c.getContext('2d');let w,h,parts=[];
  function size(){w=c.width=c.offsetWidth;h=c.height=c.offsetHeight;}
  function mk(initial){return{x:Math.random()*w,y:initial?(h*0.55+Math.random()*h*0.6):(h+10+Math.random()*40),
    r:6+Math.random()*7,s:.22+Math.random()*.55,sway:Math.random()*Math.PI*2,sw:.004+Math.random()*.009,
    o:.14+Math.random()*.24,rot:Math.random()*Math.PI*2,rs:(Math.random()-.5)*.018};}
  function init(){size();parts=Array.from({length:Math.min(40,Math.floor(w/34))},()=>mk(true));}
  function leaf(r){ctx.beginPath();ctx.moveTo(0,-r);
    ctx.bezierCurveTo(r*0.78,-r*0.55, r*0.62,r*0.62, 0,r);
    ctx.bezierCurveTo(-r*0.62,r*0.62, -r*0.78,-r*0.55, 0,-r);
    ctx.closePath();}
  function draw(){ctx.clearRect(0,0,w,h);parts.forEach(p=>{p.y-=p.s;p.sway+=p.sw;p.x+=Math.sin(p.sway)*.55;p.rot+=p.rs;
    if(p.y<-18){p.y=h+10+Math.random()*60;p.x=Math.random()*w;}
    var f=1; if(p.y>h*0.82){f=(h-p.y)/(h*0.18);} else if(p.y<h*0.28){f=p.y/(h*0.28);}
    f=Math.max(0,Math.min(1,f)); var a=p.o*f;
    const r=p.r;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
    leaf(r);ctx.fillStyle='rgba(182,205,102,'+a+')';ctx.fill();
    ctx.strokeStyle='rgba(140,165,80,'+(a*0.8)+')';ctx.lineWidth=Math.max(.5,r*0.07);
    ctx.beginPath();ctx.moveTo(0,-r*0.86);ctx.lineTo(0,r*0.86);ctx.stroke();
    ctx.restore();});requestAnimationFrame(draw);}
  init();draw();addEventListener('resize',init);})();

/* ---- Leader bio popups ---- */
(function(){
  var modal=document.getElementById('bioModal');
  if(!modal) return;
  var content=document.getElementById('bioContent');
  function openBio(id){var d=document.getElementById('bio-'+id);if(!d)return;content.innerHTML=d.innerHTML;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
  function closeBio(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  document.querySelectorAll('.bio-btn').forEach(function(b){b.addEventListener('click',function(){openBio(b.getAttribute('data-person'));});});
  modal.addEventListener('click',function(e){if(e.target.classList.contains('bio-overlay')||e.target.classList.contains('bio-close'))closeBio();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('open'))closeBio();});
})();
