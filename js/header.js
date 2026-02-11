/**
 * Unified sticky header behavior (site-wide).
 * Condenses on scroll; on theme-dark pages starts condensed.
 */
(function () {
  var CONDENSE_SCROLL_THRESHOLD = 50;

  function init() {
    var header = document.querySelector('.sticky-header');
    if (!header) return;

    function updateHeader() {
      var scrolled = window.scrollY || document.documentElement.scrollTop;
      var isDark = document.body.classList.contains('theme-dark');
      var condensed = isDark || scrolled > CONDENSE_SCROLL_THRESHOLD;
      header.classList.toggle('is-condensed', condensed);
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
