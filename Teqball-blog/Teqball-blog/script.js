const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];
const articleLinks = [...document.querySelectorAll(".rail-link")];
const sections = articleLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute(
    "aria-label",
    isExpanded ? "Buka menu navigasi" : "Tutup menu navigasi",
  );
  siteNav.classList.toggle("is-open", !isExpanded);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    siteNav.classList.remove("is-open");
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

    if (!visibleSection) return;

    articleLinks.forEach((link) => {
      const isActive = link.hash === `#${visibleSection.target.id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  },
  { rootMargin: "-18% 0px -67% 0px", threshold: [0, 0.15, 0.4] },
);

sections.forEach((section) => sectionObserver.observe(section));
