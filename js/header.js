/**
 * Unified sticky header behavior (site-wide).
 * Condenses on scroll; on theme-dark pages starts condensed.
 * Mobile: menu drawer toggle and close on overlay/link.
 */
(function () {
  var CONDENSE_SCROLL_THRESHOLD = 50;

  function closeMenu() {
    document.body.classList.remove('menu-open');
    var drawer = document.getElementById('nav-drawer');
    var overlay = document.getElementById('nav-overlay');
    if (drawer) drawer.setAttribute('aria-hidden', 'true');
    if (overlay) overlay.setAttribute('aria-hidden', 'true');
  }

  function openMenu() {
    document.body.classList.add('menu-open');
    var drawer = document.getElementById('nav-drawer');
    var overlay = document.getElementById('nav-overlay');
    if (drawer) drawer.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.setAttribute('aria-hidden', 'false');
  }

  function init() {
    var header = document.querySelector('.sticky-header');
    if (!header) return;

    function updateHeader() {
      var scrolled = window.scrollY || document.documentElement.scrollTop;
      var isDark = document.body.classList.contains('theme-dark');
      var isLight = document.body.classList.contains('theme-light');
      var hasHero = document.body.classList.contains('page-with-hero');
      var condensed = isDark || (scrolled > CONDENSE_SCROLL_THRESHOLD && (isLight || hasHero));
      header.classList.toggle('is-condensed', condensed);
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    var menuToggle = document.querySelector('.menu-toggle');
    var navOverlay = document.getElementById('nav-overlay');
    var drawerLinks = document.querySelectorAll('.nav-drawer-list a');

    if (menuToggle) {
      menuToggle.addEventListener('click', function () {
        if (document.body.classList.contains('menu-open')) closeMenu();
        else openMenu();
      });
    }
    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }
    drawerLinks.forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
