/* Accessible, touch-friendly horizontal Insights carousel. */
(() => {
  "use strict";
  const track=document.getElementById("insights-carousel");
  const previous=document.getElementById("insights-prev");
  const next=document.getElementById("insights-next");
  if(!track||!previous||!next)return;
  const cards=Array.from(track.querySelectorAll(".insight-home-card"));
  function step(){const card=cards[0];if(!card)return 340;const style=getComputedStyle(track);return card.getBoundingClientRect().width + (parseFloat(style.columnGap)||parseFloat(style.gap)||22);}
  function update(){const end=track.scrollWidth-track.clientWidth;previous.disabled=track.scrollLeft<=2;next.disabled=track.scrollLeft>=end-2;previous.setAttribute("aria-disabled",String(previous.disabled));next.setAttribute("aria-disabled",String(next.disabled));}
  previous.addEventListener("click",()=>track.scrollBy({left:-step(),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"}));
  next.addEventListener("click",()=>track.scrollBy({left:step(),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"}));
  track.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();track.scrollBy({left:(e.key==="ArrowRight"?1:-1)*step(),behavior:"smooth"});}});
  track.addEventListener("scroll",update,{passive:true});
  window.addEventListener("resize",update,{passive:true});
  update();
})();