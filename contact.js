/* A clear email handoff rather than a false in-page submission. */
(() => {
  "use strict";
  const form = document.getElementById("contact-form");
  if (!form) return;
  const $ = id => document.getElementById(id);
  const name = $("contact-name");
  const email = $("contact-email");
  const business = $("contact-business");
  const service = $("contact-service");
  const message = $("contact-message");
  const timing = $("contact-timing");
  const feedback = $("contact-feedback");
  const params = new URLSearchParams(location.search);
  const requested = params.get("service");
  const preset = { essential:"new-website", growth:"new-website", website:"new-website", redesign:"redesign", care:"care", bespoke:"bespoke" };
  if (preset[requested]) service.value = preset[requested];
  const packageName = requested === "essential" ? "Essential" : requested === "growth" ? "Growth" : null;
  const context = params.get("concept") || params.get("industry");
  if (packageName) message.value = "I'm interested in the " + packageName + " website package.\n\n";
  else if (context) message.value = "I'm interested in a website inspired by " + context.replace(/[^a-zA-ZÀ-ÿ0-9 &'-]/g,"").slice(0,70) + ".\n\n";
  const labels = {
    "new-website": "A new website",
    redesign: "A website redesign",
    care: "Website care",
    bespoke: "Bespoke website features",
    unsure: "I'd like advice"
  };
  function getEnquiry() {
    const subject = "Website enquiry" + (business.value.trim() ? " — " + business.value.trim() : "");
    const body = [
      "Hello Allerton Digital,",
      "",
      "Name: " + name.value.trim(),
      "Email: " + email.value.trim(),
      "Business: " + (business.value.trim() || "Not provided"),
      "Interested in: " + (labels[service.value] || "Not sure"),
      "Timing: " + (timing.value || "No particular date"),
      "",
      "What I'd like to achieve:",
      message.value.trim(),
      "",
      "I'd be interested in discussing the next steps."
    ].join("\n");
    return {subject,body};
  }
  function validate() {
    if (!form.checkValidity()) { form.reportValidity(); return false; }
    return true;
  }
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!validate()) return;
    const enquiry = getEnquiry();
    feedback.textContent = "Your email app should open now. Please press Send there to complete your enquiry.";
    location.href = "mailto:hello@allertondigital.co.uk?subject=" + encodeURIComponent(enquiry.subject) + "&body=" + encodeURIComponent(enquiry.body);
  });
  $("copy-enquiry").addEventListener("click", async () => {
    if (!validate()) return;
    const enquiry = getEnquiry();
    try {
      await navigator.clipboard.writeText("To: hello@allertondigital.co.uk\nSubject: " + enquiry.subject + "\n\n" + enquiry.body);
      feedback.textContent = "Copied. Paste it into an email to hello@allertondigital.co.uk and send.";
    } catch {
      feedback.textContent = "Copying is unavailable in this browser. Please use Continue to email or email us directly.";
    }
  });
})();
