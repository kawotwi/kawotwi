# Hero, Header & Theme Integration

This document describes the hero video carousel, **unified sticky header**, and **dark minimalist theme** used across the portfolio (branch `test_deployment`).

---

## 1. Theme Rules

The site uses two visual modes, controlled by a **body class**:

### A. Page with fullscreen video (homepage only)

- **Body class:** `page-with-hero`
- **Header:** Transparent over the hero video; condenses (smaller height + dark background) when scroll > 50px.
- **Content:** Hero at 100vh, then light-background content below (e.g. projects grid).

### B. No video (all other pages)

- **Body class:** `theme-dark`
- **Header:** Always dark (slightly transparent), condensed from the start. Same height/typography as homepage.
- **Content:** Dark minimalist theme:
  - Dark gray/black background (`#0a0a0a`)
  - Light text, monochrome accents
  - 1px borders where needed
  - Cards/sections use subtle light borders and dark surfaces

**Rule:** Use **one** of these classes per page. Do not mix. Homepage = `page-with-hero`; About, Contact, Resume, and every project page = `theme-dark`.

---

## 2. Header Usage Guidelines

### Single header for the whole site

- **Markup:** `<header class="sticky-header">` with logo, `.header-nav`, and `.header-cta`.
- **Styles:** `css/header.css` (import on every page).
- **Behavior:** `js/header.js` (plain script, no modules). Import on every page.

### Stylesheet order

On **root-level pages** (index, about, contact, resume):

```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="css/header.css">
<link rel="stylesheet" href="css/theme.css">   <!-- only if body has theme-dark -->
```

On **project pages** (inside `projects/`):

```html
<link rel="stylesheet" href="../styles.css">
<link rel="stylesheet" href="../css/header.css">
<link rel="stylesheet" href="../css/theme.css">
```

### Logo / branding

- Replace the placeholder logo text in the header with your own:
  - In **root pages:** `<a href="index.html" class="header-logo">` with `<span>YOUR NAME</span>` and optional second line (e.g. `<span>PORTFOLIO</span>`).
  - In **project pages:** same structure but `href="../index.html"`.
- Current placeholder: **KWAMENA** / **PORTFOLIO**. Change in every file that contains the header, or centralize later with a shared include/template if you add a build step.

### Active link

- Add class `active` to the current page’s nav link for emphasis (e.g. `<a href="about.html" class="active">About</a>` on the About page).

### Condense behavior

- **Homepage:** Header starts transparent; after 50px scroll it gets class `is-condensed` (smaller height, dark background).
- **theme-dark pages:** Header is always condensed (dark, compact). Threshold is in `js/header.js` (`CONDENSE_SCROLL_THRESHOLD`).

---

## 3. How to Add a New Project Page

1. **Create the HTML file**
   - Add `projects/your-slug.html` (e.g. `projects/project-5.html`).

2. **Use the same layout**
   - `<body class="theme-dark">`
   - Same head links: `../styles.css`, `../css/header.css`, `../css/theme.css`
   - Same `<header class="sticky-header">` block as other project pages (with `../` for links).
   - Main content in `<main class="container"><div class="project-detail">...</div></main>`
   - Footer + `<script src="../js/header.js"></script>`

3. **Add a hero carousel entry (optional)**
   - In `data/projectVideos.js`, add an object with `title`, `description`, `videoUrl`, `thumbnailUrl`, and `slug` matching the new file (e.g. `slug: "project-5"`). The hero will show it and link to `projects/project-5.html`.

---

## 4. How to Customize Metadata or Video List

All hero carousel data lives in **`data/projectVideos.js`**.

Each entry shape:

- **title** – Line shown over the hero video (e.g. project name).
- **description** – Short tagline under the title.
- **videoUrl** – Full URL to an MP4. Use same-origin or CORS-friendly hosts for reliable autoplay.
- **thumbnailUrl** – Optional; fallback image if video fails or autoplay is blocked (e.g. `assets/placeholder.jpg`).
- **slug** – Must match the project filename without `.html`. Link target is `projects/[slug].html`.

You can:

- Add/remove/reorder entries in the `projectVideos` array.
- Change titles and descriptions without touching other code.
- Point `videoUrl` and `thumbnailUrl` to your own assets.

No 1820 or other third-party branding remains in this file; use your own project names and media.

---

## 5. Directory Structure (Current)

```
kawotwi/
├── index.html              # Landing: hero + content (body.page-with-hero)
├── about.html, contact.html, resume.html   # theme-dark, same header
├── css/
│   ├── header.css           # Sticky header (site-wide)
│   ├── theme.css           # Dark theme (body.theme-dark)
│   └── hero.css            # Hero + carousel only (homepage)
├── js/
│   ├── header.js            # Header condense (all pages, plain script)
│   └── hero.js              # Carousel + parallax (homepage only, ES module)
├── data/
│   └── projectVideos.js     # Carousel entries (title, description, videoUrl, slug, …)
├── projects/
│   └── project-1.html …     # theme-dark, same header, same stylesheet set
└── assets/
    └── placeholder.jpg     # Fallback for video/autoplay
```

---

## 6. How to Run

1. Serve the repo over **HTTP** (required for ES modules on the homepage):
   - e.g. `npx serve .` or `python -m http.server 8080` from repo root.
2. Open the root URL. Homepage shows the hero carousel and scroll-to-condense header.
3. Navigate to About, Contact, Resume, or any project page: same header, dark theme, no video.

---

## 7. Customization Quick Reference

| What | Where |
|------|--------|
| Logo / site name | Header markup in each HTML file (or future shared partial). |
| Condense scroll threshold | `js/header.js` → `CONDENSE_SCROLL_THRESHOLD` (default 50). |
| Header heights | `css/header.css` → `--header-height`, `--header-height-condensed`. |
| Dark theme colors | `css/theme.css` (background, text, borders). |
| Carousel fade speed | `css/hero.css` → `--carousel-fade-duration`. |
| Hero parallax | `js/hero.js` → `initHeroParallax()` (rate and cap). |
| Project list for hero | `data/projectVideos.js` → add/edit/remove entries. |

---

## 8. Optional Next Steps

- **Mobile menu:** Wire the “Menu” button in the header to show/hide nav links on small screens.
- **Lazy-load videos:** Set video `src` only when a slide becomes active to save bandwidth.
- **Scroll snap:** Already used on homepage (body.page-with-hero); tune in `css/hero.css` if desired.
