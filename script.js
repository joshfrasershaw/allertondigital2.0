/* Allerton Digital 2.0 — progressively enhanced, accessible interactions */
(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("main-menu");
  const stage = document.getElementById("concept-stage");
  const track = document.getElementById("concept-track");
  const cards = Array.from(document.querySelectorAll(".concept-card"));
  const counter = document.getElementById("concept-counter");
  const activeTitle = document.getElementById("active-concept-title");
  const activeType = document.getElementById("active-concept-type");
  const dialog = document.getElementById("concept-dialog");
  const preview = document.getElementById("dialog-preview");
  const closeDialog = document.getElementById("dialog-close");
  let current = 1;
  let dragging = false;
  let touchStartX = 0;
  let touchStartY = 0;

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 36);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  function closeMenu() {
    if (!menu || !menuToggle) return;
    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
  menuToggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", event => {
    if (menu?.classList.contains("is-open") && !event.target.closest(".nav-shell")) closeMenu();
  });

  function moveTrack(immediate = false) {
    if (!stage || !track || !cards.length) return;
    const card = cards[current];
    const x = (stage.clientWidth / 2) - (card.offsetLeft + card.offsetWidth / 2);
    if (immediate) track.style.transition = "none";
    track.style.transform = "translate3d(" + x + "px,0,0)";
    if (immediate) {
      requestAnimationFrame(() => { track.style.transition = ""; });
    }
  }
  function setConcept(index, immediate = false) {
    current = (index + cards.length) % cards.length;
    cards.forEach((card, i) => {
      const selected = i === current;
      card.classList.toggle("is-current", selected);
      card.querySelector(".concept-open")?.setAttribute("tabindex", selected ? "0" : "-1");
    });
    if (counter) counter.textContent = String(current + 1).padStart(2, "0") + " / " + String(cards.length).padStart(2, "0");
    if (activeTitle) activeTitle.textContent = cards[current].dataset.title || "";
    if (activeType) activeType.textContent = cards[current].dataset.industry || "";
    moveTrack(immediate);
  }
  document.getElementById("concept-prev")?.addEventListener("click", () => setConcept(current - 1));
  document.getElementById("concept-next")?.addEventListener("click", () => setConcept(current + 1));
  stage?.setAttribute("tabindex", "0");
  stage?.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") { event.preventDefault(); setConcept(current - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); setConcept(current + 1); }
  });
  stage?.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
    dragging = false;
  }, { passive: true });
  stage?.addEventListener("touchend", event => {
    const dx = event.changedTouches[0].screenX - touchStartX;
    const dy = event.changedTouches[0].screenY - touchStartY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      dragging = true;
      setConcept(current + (dx < 0 ? 1 : -1));
      window.setTimeout(() => { dragging = false; }, 250);
    }
  }, { passive: true });

  function showConcept(index) {
    const card = cards[index];
    if (!card || !dialog || !preview) return;
    setConcept(index);
    document.getElementById("dialog-title").textContent = card.dataset.title || "";
    document.getElementById("dialog-type").textContent = card.dataset.industry || "";
    document.getElementById("dialog-description").textContent = card.dataset.description || "";
    preview.replaceChildren(card.querySelector(".concept-art").cloneNode(true));
    preview.querySelectorAll("img").forEach(img => { img.loading = "eager"; });
    dialog.showModal();
    closeDialog?.focus();
  }
  cards.forEach((card, i) => {
    card.addEventListener("click", event => {
      if (dragging) return;
      if (i !== current) { setConcept(i); return; }
      showConcept(i);
    });
    card.querySelector(".concept-open")?.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showConcept(i);
      }
    });
  });
  closeDialog?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
  document.querySelectorAll("[data-show-concept]").forEach(button => {
    button.addEventListener("click", () => showConcept(Number(button.dataset.showConcept)));
  });
  let resizeFrame;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => moveTrack(true));
    if (window.innerWidth > 680) closeMenu();
  }, { passive: true });
  window.addEventListener("load", () => setConcept(current, true), { once: true });
  setConcept(current, true);

  const industryData = {
    hospitality: {
      text: "Restaurants, cafés, hotels and venues need inviting design with clear menus, bookings and reasons to visit.",
      label: "Discuss a hospitality website",
      subject: "Hospitality website enquiry"
    },
    property: {
      text: "Property brands need exceptional imagery, easy-to-find listings, smart enquiry journeys and a sense of place.",
      label: "Discuss a property website",
      subject: "Property website enquiry"
    },
    healthcare: {
      text: "Professional, reassuring experiences that communicate expertise clearly and help people find the right next step.",
      label: "Discuss a healthcare website",
      subject: "Healthcare website enquiry"
    },
    professional: {
      text: "For advisers, consultancies and practices: considered design, credible credentials and straightforward ways to get in touch.",
      label: "Discuss a professional website",
      subject: "Professional services website enquiry"
    },
    trades: {
      text: "Show the quality of your work, explain what you offer and make it effortless for customers to request a quote.",
      label: "Discuss a trades website",
      subject: "Trades and service business website enquiry"
    },
    logistics: {
      text: "Clear capabilities, geographical coverage and practical enquiry routes for firms that keep businesses moving.",
      label: "Discuss a logistics website",
      subject: "Logistics website enquiry"
    },
    education: {
      text: "Welcoming, accessible sites that make courses, programmes and important information easy to explore.",
      label: "Discuss an education website",
      subject: "Education website enquiry"
    },
    other: {
      text: "Something a little different? Allerton designs around your business, not a fixed set of industries.",
      label: "Tell us about your idea",
      subject: "A new website idea"
    }
  };
  const industryButtons = document.querySelectorAll(".industry-card");
  const industryText = document.getElementById("industry-detail-text");
  const industryLink = document.getElementById("industry-detail-link");
  industryButtons.forEach(button => {
    button.addEventListener("click", () => {
      industryButtons.forEach(other => {
        other.classList.remove("is-selected");
        other.setAttribute("aria-pressed", "false");
      });
      button.classList.add("is-selected");
      button.setAttribute("aria-pressed", "true");
      const details = industryData[button.dataset.industry];
      if (!details) return;
      industryText.textContent = details.text;
      industryLink.innerHTML = "";
      industryLink.append(document.createTextNode(details.label + " "));
      const arrow = document.createElement("span");
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";
      industryLink.append(arrow);
      industryLink.href = "mailto:hello@allertondigital.co.uk?subject=" + encodeURIComponent(details.subject);
    });
  });

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Image failures degrade to the intentionally styled card backgrounds.
  document.querySelectorAll(".concept-image, .showcase-tile img").forEach(img => {
    img.addEventListener("error", () => { img.style.opacity = "0"; }, { once: true });
  });
})();