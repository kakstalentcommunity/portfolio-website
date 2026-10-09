const roles = ["practical web apps", "data-backed tools", "digital products"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const roleEl = document.getElementById("typedRole");
let roleIndex = 0, charIndex = 0, deleting = false;
function typeRole() {
  if (!roleEl || reduceMotion) return;
  const word = roles[roleIndex];
  charIndex += deleting ? -1 : 1;
  roleEl.textContent = word.slice(0, charIndex);
  let delay = deleting ? 48 : 85;
  if (!deleting && charIndex === word.length) { deleting = true; delay = 1350; }
  else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 350; }
  setTimeout(typeRole, delay);
}
if (!reduceMotion) typeRole();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");
filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(f => { f.classList.remove("active"); f.setAttribute("aria-pressed", "false"); });
  btn.classList.add("active");
  btn.setAttribute("aria-pressed", "true");
  const filter = btn.dataset.filter;
  projects.forEach(card => {
    const show = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("hidden", !show);
    if (show) card.classList.add("visible");
  });
}));

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  document.getElementById("themeToggle").textContent = isLight ? "☾" : "☼";
  document.querySelector('meta[name="theme-color"]').setAttribute("content", isLight ? "#f6f7fb" : "#0b1020");
});
document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("nav");
  const menuToggle = document.getElementById("menuToggle");
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
  document.getElementById("nav").classList.remove("open");
  const menuToggle = document.getElementById("menuToggle");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menuToggle.textContent = "☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();
