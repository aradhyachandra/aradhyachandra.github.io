// Theme toggle, active-section nav and fade-in on scroll. No dependencies.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  // ---- Light/dark: follows the system until the visitor picks one ----
  function saved() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
  function current() { return root.getAttribute('data-theme') || (media.matches ? 'dark' : 'light'); }
  function sync() {
    var t = current();
    root.setAttribute('data-theme-current', t);
    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  var s = saved();
  if (s === 'light' || s === 'dark') root.setAttribute('data-theme', s);
  sync();
  if (media.addEventListener) media.addEventListener('change', sync);

  document.addEventListener('DOMContentLoaded', function () {
    sync();
    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });

    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
      return;
    }

    // ---- Fade/slide in (CSS skips it under prefers-reduced-motion) ----
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

    // ---- Highlight the nav link (or "On this page" link) of the section in view ----
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href*="#"], .toc a[href^="#"]'));
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute('href').split('#')[1];
      var sec = id && document.getElementById(id);
      if (sec) { (map[id] = map[id] || []).push(a); }
    });
    var ids = Object.keys(map);
    if (!ids.length) return;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('active'); a.removeAttribute('aria-current'); });
        map[e.target.id].forEach(function (a) { a.classList.add('active'); a.setAttribute('aria-current', 'true'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach(function (id) { spy.observe(document.getElementById(id)); });
  });
})();
