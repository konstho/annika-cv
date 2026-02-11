const links = Array.from(document.querySelectorAll(".navlink"));
const sections = links
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

links.forEach(link => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", id);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    const id = "#" + visible.target.id;
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
  },
  {
    root: null,
    rootMargin: "-45% 0px -45% 0px",
    threshold: [0.15, 0.25, 0.35, 0.5, 0.65]
  }
);

sections.forEach(sec => observer.observe(sec));
