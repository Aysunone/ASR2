const ring = document.querySelector('.cur-ring');
const dot = document.querySelector('.cur-dot');
let mx = -100, my = -100, cx = -100, cy = -100;

function updateCursor(e) {
    mx = e.touches ? e.touches[0].clientX : e.clientX;
    my = e.touches ? e.touches[0].clientY : e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px)`;
}

document.addEventListener('mousemove', updateCursor);
document.addEventListener('touchmove', updateCursor, { passive: true });
document.addEventListener('touchstart', updateCursor, { passive: true });

(function tick() {
    cx += (mx - cx) * .12; cy += (my - cy) * .12;
    ring.style.transform = `translate(${cx}px,${cy}px)`;
    requestAnimationFrame(tick);
})();

const html = document.documentElement;
const modeIcon = document.getElementById('modeIcon');
const modeTxt = document.getElementById('modeTxt');

function toggleMode() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    modeIcon.textContent = isDark ? '☀️' : '🌙';
    modeTxt.textContent = isDark ? 'Dark' : 'Light';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

const saved = localStorage.getItem('theme');
if (saved && saved !== 'dark') {
    html.setAttribute('data-theme', 'light');
    modeIcon.textContent = '☀️';
    modeTxt.textContent = 'Dark';
}

const IDS = ['hero', 'about', 'services', 'timeline', 'gallery', 'projects', 'knowledge', 'contact'];
const hdr = document.getElementById('hdr');
const fabTop = document.getElementById('fabTop');

window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    hdr.classList.toggle('hdr-sc', sy > 30);
    fabTop.style.display = sy > 500 ? 'flex' : 'none';
    let cur = 'hero';
    IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el && sy >= el.offsetTop - 140) cur = id;
    });
    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.toggle('active', btn.id === 'nl-' + cur);
    });
}, { passive: true });

function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMob();
}

const mobNav = document.getElementById('mobNav');
const hamIcon = document.getElementById('hamIcon');
const hamBtn = document.getElementById('hamBtn');
let mobOpen = false;

function toggleMob() {
    mobOpen = !mobOpen;
    mobNav.classList.toggle('open', mobOpen);

    document.body.style.overflow = mobOpen ? 'hidden' : '';

    hamIcon.innerHTML = mobOpen
        ? '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
        : '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>';
}

function closeMob() {
    mobOpen = false;
    mobNav.classList.remove('open');
    document.body.style.overflow = '';
    hamIcon.innerHTML = '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>';
}

document.addEventListener('click', (e) => {
    if (mobOpen && !mobNav.contains(e.target) && !hamBtn.contains(e.target)) {
        closeMob();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && mobOpen) {
        closeMob();
    }
});

let dropTimer = null;
document.querySelectorAll('.has-drop').forEach(ni => {
    const id = ni.id.replace('dd-', '');
    const drop = document.getElementById('drop-' + id);
    if (!drop) return;
    ni.addEventListener('mouseenter', () => { clearTimeout(dropTimer); drop.classList.add('open') });
    ni.addEventListener('mouseleave', () => { dropTimer = setTimeout(() => drop.classList.remove('open'), 120) });
    drop.addEventListener('mouseenter', () => clearTimeout(dropTimer));
    drop.addEventListener('mouseleave', () => { dropTimer = setTimeout(() => drop.classList.remove('open'), 120) });
});

function filterGal(btn, cat) {
    document.querySelectorAll('.filt-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    document.querySelectorAll('#galGrid .gal-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
}

const STAT_TARGETS = [50, 100, 15, 30];
const STAT_SUFFIX = ['+', '+', '+', '+'];
let statsRan = false;

function countUp(el, target, suffix, dur = 1700) {
    let t0 = null;
    function step(ts) {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(e * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
}

const statsInner = document.getElementById('statsInner');
new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !statsRan) {
        statsRan = true;
        STAT_TARGETS.forEach((t, i) => countUp(document.getElementById('s' + i), t, STAT_SUFFIX[i]));
    }
}, { threshold: 0.25 }).observe(statsInner);

const BAND = [
    { txt: 'ISO 22000', gold: true }, { txt: 'HACCP', gold: true },
    { txt: 'AQTA', gold: false }, { txt: 'BRCGS', gold: false },
    { txt: 'IFS', gold: false }, { txt: 'Ət Sektoru', gold: false },
    { txt: 'Süd Sektoru', gold: false }, { txt: 'HoReCa', gold: false },
    { txt: 'UN FAO', gold: false }, { txt: 'Strateji Planlaşdırma', gold: false },
    { txt: 'Feasibility Analizi', gold: false }, { txt: 'HR Audit', gold: false },
];
const track = document.getElementById('marqueeTrack');
[...BAND, ...BAND].forEach(item => {
    track.innerHTML += `<span class="mq-chunk"><span class="${item.gold ? 'mq-item mq-gold' : 'mq-item'}">${item.txt}</span><span class="mq-sep">◆</span></span>`;
});
function toggleMode() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');

    // Loqonu tapın
    const logo = document.querySelector('.logo-img');

    // Əgər dark-dan light-a keçiriksə (isDark true idisə), logo1.png qoy, yoxsa logo.png
    if (logo) {
        logo.src = isDark ? 'images/logo1.png' : 'images/logo.png';
    }

    modeIcon.textContent = isDark ? '☀️' : '🌙';
    modeTxt.textContent = isDark ? 'Dark' : 'Light';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}
window.addEventListener('DOMContentLoaded', () => {
    const currentTheme = html.getAttribute('data-theme');
    const logo = document.querySelector('.logo-img');

    if (logo && currentTheme === 'light') {
        logo.src = 'images/logo4.jpeg';
    }
});
