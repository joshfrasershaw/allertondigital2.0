/* Allerton Digital 2.0: progressively enhanced, accessible interactions */
(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("main-menu");
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

  window.addEventListener("resize", () => { if (window.innerWidth > 680) closeMenu(); }, { passive: true });

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
      industryLink.href = "./contact.html?service=website&industry=" + encodeURIComponent(button.dataset.industry);
    });
  });

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Image failures degrade to the intentionally styled card backgrounds.
  document.querySelectorAll(".showcase-tile img").forEach(img => {
    img.addEventListener("error", () => { img.style.opacity = "0"; }, { once: true });
  });
})();