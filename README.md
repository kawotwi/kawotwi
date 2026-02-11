# Portfolio — Kawotwi

A minimal, cinematic portfolio site with a full-screen hero video carousel, unified sticky header, light/dark theme toggle, and responsive layout. Built with vanilla HTML, CSS, and JavaScript (no framework).

---

## Project structure overview

| Directory / file | Purpose |
|------------------|--------|
| **`/css`** | Stylesheets: `header.css` (sticky nav), `hero.css` (hero + carousel), `theme.css` (light/dark), `images.css` (auto-fit images). |
| **`/js`** | Scripts: `header.js` (condense + mobile menu), `theme.js` (light/dark + persistence), `footer-social.js` (injects links from `data/social.js`), `hero.js` (carousel + parallax, homepage only). |
| **`/data`** | `projectVideos.js` (hero carousel), `social.js` (email, GitHub, LinkedIn — single source for footer links). |
| **`/projects`** | One HTML file per project: `project-1.html` … `project-N.html`, plus `template.html` for new projects. |
| **`/assets`** | Images and icons: `placeholder.jpg`, `icons/` (email.svg, github.svg, linkedin.svg, sun.svg, moon.svg). |

### Main components

- **Sticky header** — Same on every page. Transparent over hero; condenses on scroll. Holds logo, nav, theme toggle (sun/moon), “Let’s Talk”, and **Menu** (opens mobile drawer on small screens).
- **Hero video carousel** — Homepage only. Full-viewport muted autoplay video; overlay with project title (links to project page), short description, prev/next controls. Fade transition; keyboard (←/→) and touch swipe.
- **Project pages** — Detail layout with header, project title, tags, featured image (auto-fit), sections (Overview, Objectives, etc.), footer with social links.
- **Dark / light theme** — `body.theme-dark` or `body.theme-light`. No hero = default dark. Toggle in header persists in `localStorage` and overrides default.
- **Social footer** — Links come from **`data/social.js`**; `js/footer-social.js` injects them into every page. Edit `social.email`, `social.github`, `social.linkedIn` in one place. Icons in `assets/icons/`; theme-aware.
- **Image auto-fit** — `.auto-fit-img` in `css/images.css`; project card and detail images use it. **Lazy loading:** project images use `loading="lazy"`.
- **Mobile menu** — On viewports &lt; 769px, “Menu” opens a slide-out drawer with nav links; overlay click or link click closes it.
- **Reduced motion** — `theme.js` and `theme.css` / `header.css` respect `prefers-reduced-motion: reduce` (short or no transitions).

---

## How to customize each component

### Hero carousel data (`/data/projectVideos.js`)

- **title** — Shown over the hero video.
- **description** — Short line under the title.
- **videoUrl** — Full URL to an MP4 (same-origin or CORS-friendly for autoplay).
- **thumbnailUrl** — Fallback image if video fails or autoplay is blocked (e.g. `assets/placeholder.jpg`).
- **slug** — Must match project filename: `projects/[slug].html`.

Add, remove, or reorder entries in the `projectVideos` array. No code changes elsewhere needed.

### Branding (logo, header text, nav)

- **Single source (recommended):** Edit **`partials/header.html`** and **`partials/footer.html`**, then run **`node build.js`** to inject into all pages. Use `{{base}}` in partials (replaced with `""` for root pages and `"../"` for project pages).
- **Logo / nav** — In `partials/header.html`: change the two `<span>`s in `.header-logo`, and the nav links. Build script sets `class="active"` per page (see `build.js` → `PAGES` → `activeHref`).
- **“Let’s Talk”** — In the header partial, point the `.btn` link to your contact page or mailto.

### Hero behavior

- **Condense threshold** — `js/header.js`: `CONDENSE_SCROLL_THRESHOLD` (default `50` px).
- **Carousel fade** — `css/hero.css`: `--carousel-fade-duration` (default `0.5s`).
- **Parallax** — `js/hero.js`: `initHeroParallax()` (rate and max offset). Remove the call to disable.

### Dark / light theme colors

- **Dark** — `css/theme.css`: `body.theme-dark` (background `#0a0a0a`, text/overrides). Header dark styles in `css/header.css`.
- **Light** — `css/theme.css`: `body.theme-light` (background `#f5f5f5`, text, cards). Condensed header light style in `header.css`.

Adjust hex values and borders in those rules to match your brand.

### Social links

- **Single source:** Edit **`data/social.js`** — set `email`, `github`, `linkedIn`. `js/footer-social.js` (loaded on every page) injects these into footer links with `data-social="email"`, `data-social="github"`, `data-social="linkedIn"`. No need to edit each HTML file.
- **Icons** — Replace SVGs in `assets/icons/` if you want different art. Keep size ~24–32px so theme filters work.

### Assets (thumbnails, videos)

- Put images in `assets/` (e.g. `assets/placeholder.jpg`). Reference as `assets/…` on root pages and `../assets/…` on project pages.
- Hero videos: use `videoUrl` in `projectVideos.js`. Prefer same-origin or CORS-enabled hosts for reliable autoplay.
- Thumbnails: set `thumbnailUrl` in `projectVideos.js` or use `assets/placeholder.jpg`.

---

## How to add a new project

1. **Add a carousel entry** (optional, for hero)  
   In `data/projectVideos.js`, add an object with `title`, `description`, `videoUrl`, `thumbnailUrl`, and `slug` (e.g. `slug: "my-new-project"`).

2. **Create the project page**  
   - Copy `projects/template.html` and rename to `projects/[slug].html` (e.g. `projects/my-new-project.html`).  
   - Replace `[Project Title]`, `[Tag 1]`, `[Tag 2]`, and all `[ … ]` placeholders with your content.  
   - Set the featured image: keep `class="project-detail-image auto-fit-img"` and point `src` to your image (e.g. `../assets/my-project.jpg`).

3. **Optional video**  
   Add an HTML5 `<video>` in a project section if you want an embedded video. Use the same `auto-fit-img` or a wrapper with `object-fit: contain` if needed.

4. **Confirm routing**  
   Open the homepage: the new project should appear in the hero carousel (if you added it to `projectVideos.js`) and the title should link to `projects/[slug].html`. Update the projects grid on the homepage with a new card if desired.

5. **If using partials**  
   Add an entry to the `PAGES` array in `build.js`: `{ file: 'projects/[slug].html', base: '../', activeHref: '../index.html#projects' }`. Then run `node build.js` so the new page gets the shared header/footer.

---

## Auto-fit images

- **Class:** `.auto-fit-img`  
- **Effect:** `max-width: 100%`, `height: auto`, `object-fit: contain`. Images scale down to fit the container, keep aspect ratio, and do not upscale beyond natural size. No distortion or cropping.
- **Where:** Used on `.project-image` (cards) and `.project-detail-image` (project pages). Add `.auto-fit-img` to any other image (e.g. in galleries) that should behave the same.
- **Styles:** `css/images.css`.

---

## Header/footer partials and build

- **Partials:** `partials/header.html` and `partials/footer.html` use `{{base}}` for path prefix. Edit these once to change header/footer site-wide.
- **Build:** Run **`node build.js`** to replace the `<!-- start header -->` … `<!-- end header -->` and `<!-- start footer -->` … `<!-- end footer -->` blocks in each HTML file with the partial content. Add new pages to the `PAGES` array in `build.js` (file path, `base`, and `activeHref` for the active nav link).

---

## Recommended TODOs

- **Lazy loading** — Project card and detail images already use `loading="lazy"`. Optional: Intersection Observer for offscreen hero slides.
- **Mobile menu** — Implemented: “Menu” opens a drawer; overlay or link click closes it.
- **Video quality** — Optional: multiple sources or quality switcher for hero/project videos.
- **Accessibility** — Expand ARIA labels, focus styles, and keyboard navigation (e.g. carousel focus trap, skip link).
- **Hero preloader** — Optional loading state or animation while the first hero video loads.

---

## Local development

1. **Optional: regenerate header/footer from partials**
   ```bash
   node build.js
   ```
   Run after editing `partials/header.html` or `partials/footer.html`.

2. **Serve over HTTP** (required for ES modules):
   ```bash
   npx serve .
   ```
   Or: `python -m http.server 8080` from repo root, or your editor’s “Live Server”.

3. Open the root URL. Homepage: hero carousel, condense header, theme toggle, mobile menu (resize to &lt; 769px), footer social (from `data/social.js`). Other pages: same header/footer, dark default.

4. **Branch:** `test_deployment`. Merge to `main` when ready.

---

## Architecture (Option B — modular vanilla JS)

The site uses **vanilla HTML/CSS/JS** with a clear split of behavior:

- **Header** — One script (`header.js`) and one stylesheet (`header.css`) used on every page. Header condenses on scroll; on `theme-dark` it starts condensed; on `theme-light` / `page-with-hero` it condenses after the scroll threshold.
- **Theme** — One script (`theme.js`) and `theme.css`. Toggle reads/writes `localStorage` and applies `theme-dark` or `theme-light` to `body`. Overrides the default (no hero = dark, hero = transparent header + light text).
- **Hero** — One script (`hero.js`, ES module) and `hero.css` only on the homepage. Builds carousel from `projectVideos.js`, handles prev/next, keyboard, touch, parallax, and video fallback.

No React/Next.js; no build step. Easy to edit HTML and data files directly. Option B was chosen over Web Components to keep the stack consistent and to avoid introducing custom elements while still keeping header, theme, and hero logic in separate, maintainable modules.

---

## Theme toggle logic (short)

- **Stored preference:** `localStorage` key `portfolio-theme`: `"light"` or `"dark"`. If missing, page default is used.
- **Default:** Homepage (`body.page-with-hero`) = no theme class initially → transparent header, light text over video; content below uses default light styles. Other pages = `theme-dark` by default.
- **After toggle:** Body gets `theme-light` or `theme-dark`; preference is saved. All pages (home, about, contact, resume, projects) and the footer use the same theme. Header over hero stays transparent until scrolled; once condensed, it uses the chosen theme (dark or light bar).
- **Project pages:** Use `data-assets-base="../"` so the theme toggle icon and any asset paths in scripts resolve correctly from `projects/*.html`.

---

## File summary

| Path | Role |
|------|------|
| `index.html` | Home: hero, content sections, footer. Classes: `page-with-hero`; theme class added by toggle. |
| `about.html`, `contact.html`, `resume.html` | Same header/footer/theme; `theme-dark` by default. |
| `projects/*.html` | Same header/footer/theme; `data-assets-base="../"`; `theme-dark` by default. |
| `projects/template.html` | Copy this to add new projects; rename to `[slug].html`. |
| `css/header.css` | Sticky header only. |
| `css/hero.css` | Hero section + carousel only. |
| `css/theme.css` | Dark and light theme overrides. |
| `css/images.css` | `.auto-fit-img` and project image containment. |
| `js/header.js` | Condense logic. |
| `js/theme.js` | Toggle + localStorage. |
| `js/hero.js` | Carousel + parallax (homepage). |
| `js/footer-social.js` | Injects `data/social.js` into footer links. |
| `data/projectVideos.js` | Hero carousel data. |
| `data/social.js` | Email, GitHub, LinkedIn (single source). |
| `partials/header.html`, `partials/footer.html` | Header/footer markup; `node build.js` injects into pages. |
| `build.js` | Node script: injects partials, sets `{{base}}` and active nav link. |
| `assets/icons/*.svg` | Email, GitHub, LinkedIn, sun, moon. |

Replace placeholder branding (e.g. “KWAMENA”, “Your Name”, “your.email@example.com”) across the repo with your own details.
