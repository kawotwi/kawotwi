import { projectVideos } from '../data/projectVideos.js';

const CONDENSE_SCROLL_THRESHOLD = 50;
const CAROUSEL_FADE_MS = 500;

function getProjectUrl(slug) {
  return `projects/${slug}.html`;
}

function initStickyHeader() {
  const header = document.querySelector('.sticky-header');
  if (!header) return;

  function updateHeader() {
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle('is-condensed', scrolled > CONDENSE_SCROLL_THRESHOLD);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

function initHeroParallax() {
  const videoWrap = document.querySelector('.hero-video-wrap');
  if (!videoWrap) return;

  function updateParallax() {
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    const rate = 0.2;
    const y = Math.min(scrolled * rate, window.innerHeight * 0.2);
    videoWrap.style.transform = `translate3d(0, ${-y}px, 0)`;
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();
}

function initHeroCarousel() {
  const heroSection = document.querySelector('.hero-section');
  const videoWrap = document.querySelector('.hero-video-wrap');
  const overlayTitle = document.querySelector('.hero-carousel-title');
  const overlayDescription = document.querySelector('.hero-carousel-description');
  const titleLink = document.querySelector('.hero-carousel-title-link');
  const prevBtn = document.querySelector('.hero-carousel-prev');
  const nextBtn = document.querySelector('.hero-carousel-next');
  const indicatorCurrent = document.querySelector('.hero-carousel-indicator .current');
  const indicatorTotal = document.querySelector('.hero-carousel-indicator .total');

  if (!heroSection || !videoWrap || projectVideos.length === 0) return;

  let currentIndex = 0;
  const total = projectVideos.length;

  function getCurrent() {
    return projectVideos[currentIndex];
  }

  function switchTo(index) {
    const next = (index + total) % total;
    if (next === currentIndex) return;
    currentIndex = next;
    render();
  }

  function render() {
    const item = getCurrent();
    const slides = videoWrap.querySelectorAll('.hero-video-slide');
    const captions = heroSection.querySelectorAll('.hero-carousel-caption');

    slides.forEach((el, i) => {
      el.classList.toggle('is-active', i === currentIndex);
    });
    captions.forEach((el, i) => {
      el.classList.toggle('is-active', i === currentIndex);
    });

    if (overlayTitle) overlayTitle.textContent = item.title;
    if (overlayDescription) overlayDescription.textContent = item.description;
    if (titleLink) {
      titleLink.href = getProjectUrl(item.slug);
      titleLink.setAttribute('aria-label', `View project: ${item.title}`);
    }
    if (indicatorCurrent) indicatorCurrent.textContent = String(currentIndex + 1).padStart(2, '0');
    if (indicatorTotal) indicatorTotal.textContent = String(total).padStart(2, '0');
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { switchTo(currentIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', () => { switchTo(currentIndex + 1); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') switchTo(currentIndex - 1);
    if (e.key === 'ArrowRight') switchTo(currentIndex + 1);
  });

  let touchStartX = 0;
  heroSection.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  heroSection.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx > 0) switchTo(currentIndex - 1);
      else switchTo(currentIndex + 1);
    }
  }, { passive: true });

  render();
}

function buildHeroMarkup() {
  const heroSection = document.querySelector('.hero-section');
  const videoWrap = document.querySelector('.hero-video-wrap');
  if (!heroSection || !videoWrap || projectVideos.length === 0) return;

  videoWrap.innerHTML = '';

  projectVideos.forEach((item, i) => {
    const slide = document.createElement('div');
    slide.className = `hero-video-slide ${i === 0 ? 'is-active' : ''}`;

    const video = document.createElement('video');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.preload = 'auto';
    const source = document.createElement('source');
    source.src = item.videoUrl;
    source.type = 'video/mp4';
    video.appendChild(source);

    video.addEventListener('error', () => {
      const wrap = video.closest('.hero-video-wrap');
      if (wrap && !wrap.classList.contains('is-fallback')) {
        wrap.classList.add('is-fallback');
        const fallback = wrap.querySelector('.hero-fallback');
        if (fallback && item.thumbnailUrl) fallback.src = item.thumbnailUrl;
      }
    });

    slide.appendChild(video);
    videoWrap.appendChild(slide);

    if (i === 0) {
      try {
        const play = video.play();
        if (play && typeof play.catch === 'function') {
          play.catch(() => {
            const wrap = video.closest('.hero-video-wrap');
            if (wrap) wrap.classList.add('is-fallback');
          });
        }
      } catch (_) {
        videoWrap.classList.add('is-fallback');
      }
    }
  });

  const fallbackImg = document.createElement('img');
  fallbackImg.className = 'hero-fallback';
  fallbackImg.alt = '';
  fallbackImg.src = projectVideos[0].thumbnailUrl || 'assets/placeholder.jpg';
  videoWrap.appendChild(fallbackImg);
}

function playActiveVideo() {
  const activeSlide = document.querySelector('.hero-video-slide.is-active video');
  if (activeSlide && typeof activeSlide.play === 'function') {
    activeSlide.play().catch(() => {});
  }
}

function pauseInactiveVideos() {
  document.querySelectorAll('.hero-video-slide:not(.is-active) video').forEach((v) => {
    v.pause();
  });
}

function initCarouselVideoPlayback() {
  const videoWrap = document.querySelector('.hero-video-wrap');
  if (!videoWrap) return;

  const observer = new MutationObserver(() => {
    playActiveVideo();
    pauseInactiveVideos();
  });

  observer.observe(videoWrap, { attributes: true, subtree: true, attributeFilter: ['class'] });
  playActiveVideo();
  pauseInactiveVideos();
}

function init() {
  buildHeroMarkup();
  initHeroCarousel();
  initCarouselVideoPlayback();
  initStickyHeader();
  initHeroParallax();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
