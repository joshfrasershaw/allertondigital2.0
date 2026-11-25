
document.documentElement.classList.add('js');
try{var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}})},{threshold:.1});
document.querySelectorAll('.rv').forEach(function(n){io.observe(n)})}catch(e){document.querySelectorAll('.rv').forEach(function(n){n.classList.add('on')})}
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,mw=document.querySelector('.mqw'),pz=document.getElementById('pz');
if(rm){pz.hidden=true}else{document.querySelectorAll('.mq').forEach(function(m){
  var t=m.firstElementChild, originals=Array.from(t.children), lastWidth=0, lastCount=0;
  function fill(){
    var period=originals.reduce(function(w,c){var cs=getComputedStyle(c);return w+c.getBoundingClientRect().width+parseFloat(cs.marginLeft||0)+parseFloat(cs.marginRight||0)},0);
    if(!period||!m.clientWidth)return;
    var count=Math.max(1,Math.ceil(m.clientWidth/period))+1;
    if(count!==lastCount){
      Array.from(t.children).slice(originals.length).forEach(function(c){c.remove()});
      for(var i=1;i<count;i++) originals.forEach(function(c){var k=c.cloneNode(true);k.setAttribute('aria-hidden','true');k.removeAttribute('id');k.querySelectorAll('a').forEach(function(a){a.tabIndex=-1});t.appendChild(k)});
      lastCount=count;
    }
    if(period!==lastWidth){t.style.setProperty('--loop-distance',period+'px');lastWidth=period;}
    m.classList.add('run');
  }
  fill();
  if('ResizeObserver' in window){var observer=new ResizeObserver(fill);observer.observe(m);observer.observe(originals[0]);}
  window.addEventListener('resize',fill);
});
pz.addEventListener('click',function(){var q=mw.classList.toggle('paused');pz.setAttribute('aria-pressed',q);pz.textContent=q?'Play':'Pause';pz.setAttribute('aria-label',q?'Play scrolling cards':'Pause scrolling cards')})}
document.getElementById('f').addEventListener('submit',function(ev){ev.preventDefault();var d=new FormData(this),g=function(k){return d.get(k)||''};
var b='Name: '+g('n')+'\nBusiness: '+g('b')+'\nEmail: '+g('e')+'\nService: '+g('s')+'\n\n'+g('m');
location.href='mailto:hello@allertondigital.co.uk?subject='+encodeURIComponent('Enquiry from '+g('n'))+'&body='+encodeURIComponent(b)});

(()=>{const v=document.querySelector('.news-viewport'),t=v?.firstElementChild,b=document.querySelector('#news-pause');if(!v||!t||!b||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const cards=[...t.children];let period=0,paused=false,hover=false,last=0,offset=0;function fill(){t.querySelectorAll('[data-clone]').forEach(n=>n.remove());const gap=parseFloat(getComputedStyle(t).gap)||0;period=cards.reduce((a,c)=>a+c.getBoundingClientRect().width+gap,0);if(!period)return;for(let i=0;i<Math.ceil(v.clientWidth/period)+1;i++)for(const c of cards){const n=c.cloneNode(true);n.dataset.clone='';n.setAttribute('aria-hidden','true');n.querySelectorAll('a').forEach(a=>a.tabIndex=-1);t.append(n)}}fill();new ResizeObserver(fill).observe(v);b.onclick=()=>{paused=!paused;b.setAttribute('aria-pressed',String(paused));b.textContent=paused?'Play':'Pause'};v.addEventListener('mouseenter',()=>hover=true);v.addEventListener('mouseleave',()=>hover=false);v.addEventListener('touchstart',()=>{paused=true;b.textContent='Play';b.setAttribute('aria-pressed','true')},{passive:true});function frame(now){if(!paused&&!hover&&!v.contains(document.activeElement)&&period){offset=v.scrollLeft+(last?Math.min(now-last,50)*.035:0);if(offset>=period)offset%=period;/* fractional carry for browsers rounding scrollLeft */ carry+=last?Math.min(now-last,50)*.035:0;if(carry>=1){v.scrollLeft=(v.scrollLeft+Math.floor(carry))%period;carry%=1}}last=now;requestAnimationFrame(frame)}let carry=0;requestAnimationFrame(frame)})();