document.documentElement.classList.add('js');

/* ----- Мобильное меню ----- */
const burger = document.getElementById('burger');
const mnav = document.getElementById('mnav');
function toggleMenu(open) {
  mnav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
}
burger.addEventListener('click', () => toggleMenu(!mnav.classList.contains('open')));
mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

/* ----- Появление блоков ----- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 3) * 80 + 'ms';
  io.observe(el);
});

/* ----- Активный раздел в боковой панели ----- */
const railLinks = document.querySelectorAll('.rail-nav a');
const secIo = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      railLinks.forEach(a => a.classList.toggle('active', a.dataset.sec === e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
railLinks.forEach(a => { const s = document.getElementById(a.dataset.sec); if (s) secIo.observe(s); });

/* ----- Плавающая кнопка «Поддержать» после первого экрана ----- */
const floatCta = document.querySelector('.float-cta');
const hero = document.querySelector('.hero');
const supportSec = document.getElementById('support');
let heroVisible = true, supportVisible = false;
const updateCta = () => floatCta.classList.toggle('show', !heroVisible && !supportVisible);
new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; updateCta(); }, { threshold: 0.1 }).observe(hero);
new IntersectionObserver(([e]) => { supportVisible = e.isIntersecting; updateCta(); }, { threshold: 0.2 }).observe(supportSec);

/* ----- Копирование реквизитов ----- */
const toast = document.getElementById('toast');
let toastTimer;
function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}
document.querySelectorAll('.req').forEach(req => {
  const value = req.querySelector('.req-val').dataset.copy;
  req.querySelector('.copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(value); showToast('Скопировано'); }
    catch (e) { showToast(value); }
  });
});

/* ----- Год ----- */
document.getElementById('year').textContent = new Date().getFullYear();
