// Light/dark toggle. Follows the system setting until the visitor picks one.
(function () {
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function saved() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }
  function current() {
    return root.getAttribute('data-theme') || (media.matches ? 'dark' : 'light');
  }
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
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
  });

  // Footer year
  document.addEventListener('DOMContentLoaded', function () {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });
})();
