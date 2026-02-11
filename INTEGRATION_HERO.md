# 1820-Style Hero Integration

This document describes the hero video carousel and sticky header added to the portfolio (branch `test_deployment`).

## What Was Added

- **Full-screen hero** – First screen is 100vh with an autoplay muted video; scrolling transitions into content below.
- **Video carousel** – Multiple project videos with centered title/description overlay, prev/next controls, and fade transitions. Clicking the title goes to `projects/[slug].html`.
- **Sticky header** – Minimal bar that condenses (smaller height + solid background) after scrolling past 50px.
- **Scroll indicator** – Subtle arrow at the bottom center of the hero.
- **Responsive** – Layout and controls adapt for mobile; touch swipe and keyboard (←/→) work for the carousel.

## Directory Structure

```
kawotwi/
├── index.html              # Landing page with hero + content
├── css/
│   └── hero.css            # Hero, carousel, sticky header styles
├── js/
│   └── hero.js             # Carousel logic, header condense, parallax (ES module)
├── data/
│   └── projectVideos.js    # ProjectVideo entries for the carousel
├── projects/
│   └── project-1.html …    # Project detail pages (linked by slug)
└── assets/
    └── placeholder.jpg     # Fallback image when video fails or autoplay is blocked
```

## Data: `data/projectVideos.js`

Each entry has:

- `title` – Shown in the hero overlay
- `description` – Short line under the title
- `videoUrl` – URL to an MP4 (muted autoplay works best with same-origin or CORS-friendly hosts)
- `thumbnailUrl` – Optional; used as fallback image if video fails or autoplay is blocked
- `slug` – Used for the project link: `projects/${slug}.html`

Add or edit items in `projectVideos` to change hero videos and project links.

## How to Run

1. Serve the repo over **HTTP** (ES modules need a real origin, not `file://`):
   - From repo root: `npx serve .` or `python -m http.server 8080`
   - Or use Live Server / similar from the folder containing `index.html`
2. Open the root URL (e.g. `http://localhost:3000/`). The hero loads the first video and carousel; scroll to see the sticky header condense and content below.

## Browser Notes

- **Autoplay**: Video uses `muted`, `playsInline`, and `autoPlay`. If autoplay is blocked, the script falls back to `thumbnailUrl` (or `assets/placeholder.jpg`).
- **Keyboard**: ← / → change the carousel slide.
- **Touch**: Swipe left/right on the hero to change the slide.

## Customization

- **Header**: Edit `.sticky-header` and `.header-logo` / `.header-nav` in `css/hero.css`. Condense threshold is in `js/hero.js` (`CONDENSE_SCROLL_THRESHOLD`, default 50).
- **Parallax**: In `js/hero.js`, `initHeroParallax()` uses a 0.2 rate and 20% viewport cap; adjust or remove the call to change/disable.
- **Carousel speed**: `--carousel-fade-duration` in `css/hero.css` (default 0.5s).

## Optional Next Steps

- Add scroll snapping for the first section (e.g. `scroll-snap-type: y mandatory` on the main scroll container and `scroll-snap-align: start` on the hero).
- Lazy-load offscreen videos (e.g. only set `src` when the slide becomes active).
- Add a simple mobile menu for the header nav when the “Menu” button is used.
