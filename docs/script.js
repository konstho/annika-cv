const track = document.getElementById("track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const pages = Array.from(document.querySelectorAll(".page"));
const navButtons = document.querySelectorAll(".topnav button");

const names = ["Koti", "Taidot", "Kokemus"];

let i = 0;

function render() {
  const step = 100 / pages.length; // works for 3, 4, 5... pages
  track.style.transform = `translate3d(-${i * step}%, 0, 0)`;


  prevBtn.disabled = i === 0;
  nextBtn.disabled = i === pages.length - 1;

  navButtons.forEach((btn, idx) => {
    btn.classList.toggle("active", idx === i);
  });
}

// Top nav clicks
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    i = Number(btn.dataset.page);
    render();
  });
});

// Arrow buttons
prevBtn.addEventListener("click", () => {
  if (i > 0) i--;
  render();
});
nextBtn.addEventListener("click", () => {
  if (i < pages.length - 1) i++;
  render();
});

// Keyboard
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && i > 0) { i--; render(); }
  if (e.key === "ArrowRight" && i < pages.length - 1) { i++; render(); }
});

// Swipe
let startX = null;
window.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
}, { passive: true });

window.addEventListener("touchend", (e) => {
  if (startX === null) return;
  const dx = e.changedTouches[0].clientX - startX;

  if (Math.abs(dx) > 50) {
    if (dx < 0 && i < pages.length - 1) i++;
    if (dx > 0 && i > 0) i--;
    render();
  }
  startX = null;
}, { passive: true });

render();
