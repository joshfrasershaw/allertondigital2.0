/* Adapted from the supplied pinned-scroll concept. Natural stacking is the default. */
(() => {
  "use strict";
  const track = document.getElementById("why-pin-track");
  const stage = document.getElementById("why-pin-stage");
  if (!track || !stage) return;
  const scenes = Array.from(track.querySelectorAll("[data-why-scene]"));
  if (scenes.length !== 3) return;
  const desktop = window.matchMedia("(min-width: 960px) and (min-height: 680px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let enabled = false;
  let queued = false;
  const clamp = value => Math.max(0, Math.min(1, value));

  function update() {
    queued = false;
    if (!enabled) return;
    const scrollDistance = Math.max(1, track.offsetHeight - window.innerHeight);
    const progress = clamp(-track.getBoundingClientRect().top / scrollDistance);
    const active = progress * (scenes.length - 1);
    scenes.forEach((scene, i) => {
      scene.style.transform = "translate3d(0," + ((i - active) * 100) + "%,0)";
      scene.inert = Math.abs(i - active) > 0.6;
    });
    stage.style.setProperty("--why-scroll-progress", (progress * 100).toFixed(2) + "%");
  }

  function requestUpdate() {
    if (enabled && !queued) {
      queued = true;
      window.requestAnimationFrame(update);
    }
  }

  function sync() {
    const next = desktop.matches && !reduced.matches;
    if (next !== enabled) {
      enabled = next;
      document.documentElement.classList.toggle("why-pinned", enabled);
      if (!enabled) {
        scenes.forEach(scene => {
          scene.style.removeProperty("transform");
          scene.inert = false;
        });
        stage.style.removeProperty("--why-scroll-progress");
      }
    }
    requestUpdate();
  }

  window.addEventListener("scroll", requestUpdate, {passive:true});
  window.addEventListener("resize", sync, {passive:true});
  desktop.addEventListener("change", sync);
  reduced.addEventListener("change", sync);
  sync();
})();
