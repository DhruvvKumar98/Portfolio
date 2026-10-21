# Portfolio Session Log

## Session: 2026-10-21 — Photo & Content Polish + Bug Fixes

### What Changed

**Photo Marquee**
- Replaced `painting-session.jpg` (personal photo with Julia) with `class-gathering.jpg` (group class photo from `polaroid_3_gathering.png`)
- Reason: user felt the painting session photo was too personal/invasive for a professional portfolio. Group photos are fine.
- Source: `C:\Users\dk103\OneDrive\Pictures\Saved Pictures\polaroid_3_gathering.png`
- Compressed with Pillow to 800px wide, quality 80 → saved as `public/photos/class-gathering.jpg`

**Project Screenshots**
- Added 10 project screenshots to `public/projects/` (30-60KB each, compressed with Pillow)
- 4 live Streamlit apps: took screenshots of running dashboards (had to wake them from sleep)
- 6 GitHub-only repos: took screenshots of their repo pages
- Updated `ProjectList` component to show actual project images on cursor hover instead of blue placeholder blocks

**Photo Compression**
- All 6 marquee photos compressed from ~20MB total to ~960KB
- Used Python Pillow: max 800px width, JPEG quality 80
- `night-out.png` converted to `night-out.jpg` (and reference updated in code)

**Writing Section Fix**
- All 4 writing entries in `writing.js` have `url: '#'` (no published articles yet)
- Fixed `WritingQuotes` component: renders as `<div>` instead of `<a>` when URL is `#`, preventing broken link navigation
- Arrow indicator (`→`) only shown when a real URL exists

**Status Board Fix**
- Same pattern: `StatusBoard` now renders `<div>` instead of `<a>` for items with `repo: '#'` (Knowledge Graph)
- Prevents `<a>` without `href` (accessibility issue)

**Mobile Responsive Fixes**
- Added `.writing-grid` and `.status-grid` CSS classes to their respective grids
- Added responsive rule: both collapse to single column on screens < 768px
- Previously these grids were `1fr 1fr` inline style only — squeezed on mobile

### Files Modified

| File | Change |
|------|--------|
| `src/pages/Home.jsx` | PHOTOS constant: painting-session → class-gathering; ProjectList: colored blocks → project images; WritingQuotes: safe link handling; StatusBoard: safe link handling + CSS class; added .writing-grid and .status-grid classes |
| `src/styles/index.css` | Added `.writing-grid, .status-grid` mobile collapse rule |
| `src/data/building.js` | (Previous session) Fixed "Retro Mac" reference |
| `public/photos/class-gathering.jpg` | New — group class photo replacement |
| `public/photos/painting-session.jpg` | Deleted — replaced by class-gathering.jpg |
| `public/photos/night-out.jpg` | Converted from PNG |
| `public/projects/*.jpg` | 10 new project screenshots |

### Files NOT Modified (but reviewed)

| File | Status |
|------|--------|
| `src/data/writing.js` | URLs are still `#` — no published articles to link to. Component handles this gracefully now. |
| `src/data/profile.js` | `resumeUrl` points to `resume.pdf` which exists in `public/`. No changes needed. |
| `src/components/Nav.jsx` | Clean — scroll nav works, mobile hamburger works |
| `src/components/Footer.jsx` | Clean — links correct |
| `index.html` | SEO meta tags, OG tags, JSON-LD all correct |
| `public/404.html` | SPA redirect exists and works |
| `.github/workflows/deploy.yml` | Deploys on push to `main` via `peaceiris/actions-gh-pages@v4` |

### Architecture Reference

- **Stack**: React + Vite + Tailwind CSS v3
- **Base URL**: `/Portfolio/` (vite.config.js)
- **Deployment**: GitHub Pages via Actions, auto-deploys on push to `main`
- **Sections** (single page scroll): Hero, Projects, PhotoMarquee, ExperienceScroll, StatusBoard, WritingQuotes, HumanBounce, ContactTerminal
- **Design tokens**: `src/design/tokens.css` — CSS custom properties for all colors, spacing, fonts
- **All photos** in `public/photos/`, all project screenshots in `public/projects/`
- **Data files**: `src/data/projects.js`, `experience.js`, `building.js`, `writing.js`, `profile.js`

### Previous Session Changes (already committed)

- Retro Mac/Susan Kare pixel-art theme → scrapped, reverted to clean modern look
- 8-section single-page scroll layout built from scratch
- IntersectionObserver scroll-spy + reveal animations
- requestAnimationFrame bouncing physics for "Human" section
- CSS @keyframes infinite marquee for photo strip
- Cursor-following positioned element for project hover reveal
- SEO: meta tags, OG tags, JSON-LD structured data
- SPA routing: 404.html redirect for GitHub Pages
- Responsive: mobile hamburger nav, grid collapses, reduced-motion support

### Git History

```
a06189a feat: consulting highlight, hero animations, page transitions
4b3a4c0 feat: portfolio overhaul — new sections, content, responsive, SEO
23c4539 Theme: retro Mac/Susan Kare pixel-art aesthetic
a89a2f9 add: Email Command Center project
88ac689 Theme: midnight charcoal + mint accent — sleek dark palette
```

### Decisions

1. **Group photos only in marquee** — no 1-on-1 personal photos. Ambiguous group shots are fine.
2. **Writing URLs left as `#`** — component handles gracefully, links will work when articles are published (just update `writing.js`).
3. **Project images via cursor hover** — not inline thumbnails. Keeps the clean text-list design.
4. **No dark mode** — design uses warm off-white paper background. Single theme.
5. **Inline styles + CSS classes** — hybrid approach. Critical responsive rules in CSS, component-specific layout in inline styles.

### To Do (Future Sessions)

- [ ] Publish writing articles and update URLs in `src/data/writing.js`
- [ ] Add more photos to marquee if desired
- [ ] Consider dark mode support
- [ ] Resume PDF may need updating (check content periodically)
