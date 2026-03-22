/* ===== script.js ===== */

// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
(function () {
const dot  = document.createElement(‘div’);
const ring = document.createElement(‘div’);
dot.className  = ‘cursor’;
ring.className = ‘cursor-ring’;
document.body.append(dot, ring);

let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener(‘mousemove’, e => { mx = e.clientX; my = e.clientY; });

function animateCursor() {
dot.style.left  = mx + ‘px’;
dot.style.top   = my + ‘px’;
rx += (mx - rx) * 0.18;
ry += (my - ry) * 0.18;
ring.style.left = rx + ‘px’;
ring.style.top  = ry + ‘px’;
requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll(‘a, button, input, select, textarea’).forEach(el => {
el.addEventListener(‘mouseenter’, () => {
dot.style.width  = ‘20px’; dot.style.height = ‘20px’;
ring.style.width = ‘52px’; ring.style.height = ‘52px’;
});
el.addEventListener(‘mouseleave’, () => {
dot.style.width  = ‘10px’; dot.style.height = ‘10px’;
ring.style.width = ‘36px’; ring.style.height = ‘36px’;
});
});
})();

// ─── FLOATING PETALS (CANVAS) ─────────────────────────────────────────────────
(function () {
const canvas = document.createElement(‘canvas’);
canvas.id = ‘petals-canvas’;
document.body.prepend(canvas);
const ctx = canvas.getContext(‘2d’);

function resize() {
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
}
resize();
window.addEventListener(‘resize’, resize);

const COLORS = [
‘rgba(201,123,132,0.55)’,
‘rgba(232,212,154,0.5)’,
‘rgba(201,168,76,0.4)’,
‘rgba(242,221,214,0.65)’,
‘rgba(255,200,210,0.5)’,
];

function Petal() {
this.reset(true);
}
Petal.prototype.reset = function (init) {
this.x    = Math.random() * canvas.width;
this.y    = init ? Math.random() * canvas.height : -30;
this.size = 7 + Math.random() * 10;
this.speedY = 0.5 + Math.random() * 1.2;
this.speedX = (Math.random() - 0.5) * 0.8;
this.angle  = Math.random() * Math.PI * 2;
this.spin   = (Math.random() - 0.5) * 0.04;
this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
this.opacity = 0.6 + Math.random() * 0.4;
};
Petal.prototype.draw = function () {
ctx.save();
ctx.translate(this.x, this.y);
ctx.rotate(this.angle);
ctx.globalAlpha = this.opacity;
ctx.fillStyle = this.color;
ctx.beginPath();
// simple ellipse petal shape
ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
ctx.fill();
ctx.restore();
};
Petal.prototype.update = function () {
this.y += this.speedY;
this.x += this.speedX + Math.sin(this.y * 0.02) * 0.5;
this.angle += this.spin;
if (this.y > canvas.height + 40) this.reset(false);
};

const petals = Array.from({ length: 38 }, () => new Petal());

function loop() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
petals.forEach(p => { p.update(); p.draw(); });
requestAnimationFrame(loop);
}
loop();
})();

// ─── NAVBAR SCROLL ───────────────────────────────────────────────────────────
(function () {
const nav = document.getElementById(‘navbar’);
window.addEventListener(‘scroll’, () => {
nav.classList.toggle(‘scrolled’, window.scrollY > 60);
});
})();

// ─── COUNTDOWN ───────────────────────────────────────────────────────────────
(function () {
const weddingDate = new Date(‘2026-06-04T10:30:00’).getTime();

function pad(n) { return String(n).padStart(2, ‘0’); }

function tick() {
const now  = Date.now();
const diff = weddingDate - now;

```
if (diff <= 0) {
  document.getElementById('countdown').innerHTML =
    '<p style="font-family:var(--font-display);font-size:1.6rem;color:var(--gold-dark);font-style:italic;">🎊 Hôm nay là ngày trọng đại! 🎊</p>';
  return;
}

const days    = Math.floor(diff / 86400000);
const hours   = Math.floor((diff % 86400000) / 3600000);
const minutes = Math.floor((diff % 3600000) / 60000);
const seconds = Math.floor((diff % 60000) / 1000);

document.getElementById('days').textContent    = pad(days);
document.getElementById('hours').textContent   = pad(hours);
document.getElementById('minutes').textContent = pad(minutes);
document.getElementById('seconds').textContent = pad(seconds);
```

}

tick();
setInterval(tick, 1000);
})();

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
(function () {
const observer = new IntersectionObserver(
entries => entries.forEach(e => {
if (e.isIntersecting) {
e.target.classList.add(‘visible’);
observer.unobserve(e.target);
}
}),
{ threshold: 0.12 }
);

document.querySelectorAll(’.reveal’).forEach(el => observer.observe(el));
})();

// ─── MUSIC TOGGLE ─────────────────────────────────────────────────────────────
(function () {
const btn   = document.getElementById(‘music-toggle’);
const audio = document.getElementById(‘bg-music’);
let playing = false;

btn.addEventListener(‘click’, () => {
playing = !playing;
if (playing) {
audio.play().catch(() => {});
btn.textContent = ‘⏸ Tắt nhạc nền’;
btn.classList.add(‘playing’);
} else {
audio.pause();
btn.textContent = ‘🎵 Bật nhạc nền’;
btn.classList.remove(‘playing’);
}
});
})();

// ─── RSVP FORM ───────────────────────────────────────────────────────────────
(function () {
const form = document.querySelector(’.rsvp-form’);
if (!form) return;

form.addEventListener(‘submit’, e => {
e.preventDefault();

```
// animate button
const btn = form.querySelector('.btn-primary');
btn.textContent = 'Đang gửi... ✨';
btn.disabled = true;

setTimeout(() => {
  form.style.display = 'none';

  let success = document.querySelector('.rsvp-success');
  if (!success) {
    success = document.createElement('div');
    success.className = 'rsvp-success';
    success.innerHTML =
      '🎊 Cảm ơn bạn rất nhiều!<br>' +
      '<span style="font-size:1rem;color:var(--muted);font-family:var(--font-body);font-style:normal;">' +
      'Chúng mình đã nhận được xác nhận của bạn và rất mong được gặp bạn trong ngày vui!</span>';
    form.parentElement.appendChild(success);
  }
  success.style.display = 'block';
}, 1200);
```

});
})();

// ─── SMOOTH SCROLL FOR NAV LINKS ─────────────────────────────────────────────
document.querySelectorAll(‘a[href^=”#”]’).forEach(link => {
link.addEventListener(‘click’, e => {
const target = document.querySelector(link.getAttribute(‘href’));
if (target) {
e.preventDefault();
target.scrollIntoView({ behavior: ‘smooth’, block: ‘start’ });
}
});
});

// ─── SCROLL INDICATOR ─────────────────────────────────────────────────────────
(function () {
const hero = document.querySelector(’.hero-section’);
if (!hero) return;

const ind = document.createElement(‘div’);
ind.className = ‘scroll-indicator’;
ind.innerHTML = ` <span>Cuộn xuống</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"> <polyline points="6 9 12 15 18 9"></polyline> </svg>`;
hero.appendChild(ind);

window.addEventListener(‘scroll’, () => {
ind.style.opacity = window.scrollY > 80 ? ‘0’ : ‘1’;
});
})();

// ─── DECORATE H1 (wrap names in gold span) ────────────────────────────────────
(function () {
const h1 = document.querySelector(’.hero-content h1’);
if (!h1) return;
const text = h1.textContent;
const parts = text.split(’&’);
if (parts.length === 2) {
h1.innerHTML =
`<span style="color:var(--gold-dark)">${parts[0].trim()}</span>` +
`<span style="color:var(--rose);font-size:0.6em;vertical-align:middle">❤</span>` +
`<span style="color:var(--gold-dark)">${parts[1].trim()}</span>`;
}
})();
