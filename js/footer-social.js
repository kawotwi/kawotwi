/**
 * Injects social URLs from data/social.js into footer links.
 * Use data-social="email" | "github" | "linkedIn" on each <a>.
 */
import { social } from '../data/social.js';

function init() {
  const links = document.querySelectorAll('.footer-social a[data-social]');
  links.forEach((a) => {
    const key = a.getAttribute('data-social');
    const href = key === 'linkedIn' ? social.linkedIn : social[key];
    if (href) a.setAttribute('href', href);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
