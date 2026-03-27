# PREFUSPA.es — Hugo Site Guidelines

## Project Overview
Corporate website for PREFUSPA (Prefabricats de fusta i palla) — sustainable prefab houses in Alicante, Spain. Migrated from WordPress/Elementor to Hugo static site. Hosted on Netlify.

## Languages
- **ES** (default, root `/`), **EN** (`/en/`), **CA** (`/ca/` — Valencian, AVL normative)
- Use `i18n` function for all UI strings: `{{ i18n "key" }}`
- Content files: ES at `content/`, EN at `content/en/`, CA at `content/ca/`
- Link translations via matching directory structure (Hugo auto-links by path)

## Hugo Conventions

### Templates
- `baseof.html` defines the HTML shell; pages override `{{ block "main" . }}`
- Use `partialCached` for expensive partials that don't vary per page (header, footer)
- Keep partials small and focused — one file per component
- Shortcodes go in `layouts/shortcodes/`, partials in `layouts/partials/`

### Content
- Front matter in YAML (between `---`)
- Use `translationKey` only when paths don't match between languages
- Page-specific layouts via `layout` front matter field or `layouts/page/` directory

### Assets & SCSS
- SCSS source in `assets/scss/`, compiled natively by Hugo extended
- Entry point: `assets/scss/main.scss`
- Pipeline in head partial: `resources.Get | toCSS | minify | fingerprint`
- Organization:
  - `_variables.scss` — colors, fonts, spacing, breakpoints
  - `_mixins.scss` — reusable patterns (responsive, flex, grid)
  - `_base.scss` — reset, typography, global styles
  - `components/` — self-contained UI pieces (header, footer, cards, buttons)
  - `layouts/` — page-specific styles (home, services, gallery)
- Mobile-first approach: base styles for mobile, `@media (min-width:)` for larger

### Images
- Store in `assets/images/` for Hugo processing, `static/img/` for pass-through (logo, icons)
- Use placeholder images during development (via `placehold.co` or solid color divs)
- When real images arrive: `resources.Get` + `.Resize` + WebP conversion

### SEO
- hreflang: auto-generate via `.AllTranslations` loop in head partial
- Include `x-default` pointing to ES version
- Schema.org: LocalBusiness JSON-LD on all pages
- Open Graph + Twitter Cards via Hugo internal templates
- Canonical URLs on every page
- `<html lang="{{ .Site.Language.Lang }}">`

### Accessibility
- Semantic HTML: `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`
- Skip-to-content link as first element in body
- All images need `alt` text
- Focus states on all interactive elements
- Proper heading hierarchy (single h1 per page)
- ARIA labels on icon-only buttons (language switcher, WhatsApp, mobile menu)

## Design Tokens
```scss
// Colors
$color-cream: #FFF9EB;      // Background
$color-green: #B6E6C7;      // Accent (eco/sustainability)
$color-pink: #B66A6A;       // Accent (warmth/CTA)
$color-black: #000000;      // Text
$color-white: #FFFFFF;       // Cards/contrast

// Typography
$font-family: 'Montserrat', sans-serif;
$font-size-base: 16px;
$font-size-h1: 44px;
$font-size-h2: 32px;
$font-size-h3: 24px;

// Breakpoints (mobile-first)
$bp-tablet: 768px;
$bp-desktop: 1024px;
$bp-wide: 1280px;

// Spacing
$spacing-unit: 8px;
$container-max: 1200px;
```

## Key Decisions
- No build tools beyond Hugo (no npm, no PostCSS, no Tailwind)
- No contact form — phone + WhatsApp button only
- WhatsApp: CSS-only floating button → `wa.me/34653772074`
- YouTube video: facade pattern (thumbnail + lazy iframe on click)
- Google Reviews: dynamic widget with static fallback
- No cookie banner, no analytics widgets from old site
- No Kit Digital logos in footer

## File Naming
- Partials: `kebab-case.html` (e.g., `language-switcher.html`)
- SCSS: `_kebab-case.scss` with underscore prefix for partials
- Content: match URL slugs (e.g., `servicios.md` → `/servicios/`)
- i18n keys: `snake_case` (e.g., `contact_us`, `our_services`)

## Commands
```bash
hugo server          # Dev server at localhost:1313
hugo                 # Build to public/
hugo --gc --minify   # Production build (used by Netlify)
```
