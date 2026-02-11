/**
 * Light/dark theme toggle. Persists preference in localStorage.
 * Toggle overrides page default (hero = transparent header, no-video = dark).
 */
(function () {
  var STORAGE_KEY = 'portfolio-theme';
  var prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TRANSITION_MS = prefersReducedMotion ? 0 : 200;

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStored(value) {
    try {
      if (value) localStorage.setItem(STORAGE_KEY, value);
      else localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  function isDark() {
    return document.body.classList.contains('theme-dark');
  }

  function isLight() {
    return document.body.classList.contains('theme-light');
  }

  function applyTheme(theme) {
    var body = document.body;
    body.style.transition = 'background-color ' + TRANSITION_MS + 'ms ease, color ' + TRANSITION_MS + 'ms ease';
    body.classList.remove('theme-dark', 'theme-light');
    if (theme === 'light') {
      body.classList.add('theme-light');
    } else {
      body.classList.add('theme-dark');
    }
    setStored(theme);
    updateToggleIcon(theme);
  }

  function getBasePath() {
    var base = document.body.getAttribute('data-assets-base');
    return base !== null ? base : '';
  }

  function updateToggleIcon(theme) {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var base = getBasePath();
    var useDark = (theme === 'dark');
    btn.setAttribute('aria-label', useDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.innerHTML = useDark
      ? '<img src="' + base + 'assets/icons/sun.svg" width="24" height="24" alt="" class="theme-toggle-icon">'
      : '<img src="' + base + 'assets/icons/moon.svg" width="24" height="24" alt="" class="theme-toggle-icon">';
  }

  function init() {
    var stored = getStored();
    var body = document.body;
    var hasHero = body.classList.contains('page-with-hero');

    if (stored === 'light' || stored === 'dark') {
      applyTheme(stored);
    } else {
      if (!body.classList.contains('theme-dark') && !body.classList.contains('theme-light')) {
        if (!hasHero) body.classList.add('theme-dark');
      }
    updateToggleIcon(isDark() ? 'dark' : 'light');
    }

    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = isDark() ? 'light' : 'dark';
        applyTheme(next);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
