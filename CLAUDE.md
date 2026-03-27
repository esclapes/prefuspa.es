# PREFUSPA.es — Hugo Site Guidelines

## Project Overview
Corporate website for PREFUSPA (Prefabricats de fusta i palla) — sustainable prefab houses in Alicante, Spain. Migrated from WordPress/Elementor to Hugo static site. Hosted on Netlify.

- **Repo**: `git@github.com:esclapes/prefuspa.es.git`
- **Live**: https://prefuspa.netlify.app/ (production domain `prefuspa.com` pending)
- **Company**: PREFUSPA VIVA S.L., CIF B10843001, Príncipe 25, Vall de Laguar, 03791 Alicante

## Languages
- **ES** (default, root `/`), **EN** (`/en/`), **CA** (`/ca/` — Valencian, AVL normative)
- Content dirs: `content/es/`, `content/en/`, `content/ca/` (symmetric structure)
- Use `i18n` function for ALL UI strings: `{{ i18n "key" }}`
- Use `translationKey` in front matter for ALL pages (slugs differ between languages)
- Pages with custom layouts MUST have `type: page` in front matter
- CA language code is `ca` (ISO standard) but displayed as "VA" in the language switcher

## Hugo Conventions

### Templates
- `baseof.html` defines the HTML shell; pages override `{{ block "main" . }}`
- Header uses `partial` (NOT `partialCached`) because it needs per-page active state
- Footer uses `partialCached` (doesn't vary per page)
- Shortcodes in `layouts/shortcodes/`, partials in `layouts/partials/`
- Page-specific layouts in `layouts/page/` (servicios, galeria, contacto, legal)

### Content
- Front matter in YAML (between `---`)
- Every page needs: `title`, `translationKey`, `description`
- Pages with custom layouts need: `layout: <name>`, `type: page`
- NO hardcoded text in templates — all text comes from i18n, front matter, or hugo.toml params
- Internal links must use language-prefixed URLs in EN/CA content (e.g., `/en/contact/`, `/ca/contacte/`)

### Assets & SCSS
- SCSS compiled with **libsass** (not dart-sass): `toCSS (dict "transpiler" "libsass")`
- Entry point: `assets/scss/main.scss`
- Pipeline: `resources.Get | toCSS | minify | fingerprint` (production only)
- Organization:
  - `_variables.scss` — colors, fonts, spacing, breakpoints
  - `_mixins.scss` — responsive breakpoints, flex helpers, focus-visible
  - `_base.scss` — reset, typography, buttons, utility classes
  - `components/` — header, footer, hero, cards, page, whatsapp, reviews, language-switcher
  - `layouts/` — home, services, gallery, contact (page-specific)
- Mobile-first: base styles for mobile, `@media (min-width:)` for larger
- All colors via variables — no hardcoded hex values in component files

### Images
- **Gallery images**: `static/images/gallery/{project-slug}/` — served directly, no Hugo processing
- **Page images**: `static/images/home/`, `static/images/services/` — served directly
- **Logo**: `static/img/logo.png` (white on transparent — needs dark variant)
- **OG image**: `static/images/og-default.jpg` (JPG for WhatsApp compatibility)
- Hugo `resources.Get` does NOT work with webp in our setup — use `static/` instead

### SEO
- hreflang: auto-generated via `.AllTranslations` loop, x-default → ES version
- Schema.org: LocalBusiness JSON-LD on all pages
- Open Graph + Twitter Cards with og:image (JPG)
- Canonical URLs on every page
- Netlify builds with `-b $URL` to get correct absolute URLs per environment

### Accessibility
- Semantic HTML: `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`
- Skip-to-content link as first element in body
- All images need `alt` text
- Focus states via `@mixin focus-visible` on all interactive elements
- Gallery lightbox uses native `<dialog>` element (keyboard + touch support)
- No redundant ARIA roles on semantic elements

## Design Tokens
```scss
$color-cream: #FFF9EB;      // Background
$color-green: #B6E6C7;      // Accent (eco/sustainability)
$color-pink: #B66A6A;       // Accent (warmth/CTA)
$color-black: #1a1a1a;      // Text
$color-white: #FFFFFF;       // Cards/contrast
$color-whatsapp: #25D366;   // WhatsApp green
$color-stars: #F5A623;      // Review stars

$font-family: 'Montserrat', sans-serif;
$bp-tablet: 768px;
$bp-desktop: 1024px;
$bp-wide: 1280px;
$spacing: 8px;
$container-max: 1200px;
```

## Key Decisions
- No build tools beyond Hugo (no npm, no PostCSS, no Tailwind)
- No contact form — phone + WhatsApp + email only
- WhatsApp: floating button (CSS+SVG) → `wa.me/34653772074`
- Video: native MP4 `<video>` element (not YouTube)
- Google Reviews: static fallback, widget placeholder ready for Trustindex
- Gallery lightbox: native `<dialog>` with JS (no external library)
- Alternating section backgrounds (cream/white) for visual rhythm
- CTA buttons have colored box-shadow + hover lift effect
- Language switcher shows ES/EN/VA (short codes, not full names)
- "Contacto" in header is a styled CTA button, not a nav link
- Nav "Galería" renamed to "Proyectos" / "Projects" / "Projectes"

## Copy Guidelines
- Tone: warm, conversational, concrete — like explaining the work to a friend
- NO "En PREFUSPA, creemos que..." pattern
- NO "sostenible/ecológico" overuse — use specific terms (madera, paja, aislamiento)
- CTAs: invitations not commands ("Hablemos de tu proyecto", not "Contáctenos")
- Consistent tuteo (tú) throughout ES, never usted
- EN: target expats/international buyers, Mediterranean framing, SEO keywords
- CA: AVL normative (ací, este/esta, seua, inchoative -ix verbs), natural not translated

## File Naming
- Partials: `kebab-case.html`
- SCSS: `_kebab-case.scss`
- Content: match URL slugs
- i18n keys: `snake_case`
- Gallery images: `{project-slug}/{number}.webp`

## Commands
```bash
hugo server          # Dev server at localhost:1313
hugo                 # Build to public/
hugo --gc --minify   # Production build (used by Netlify)
```

## Pending Work
- [ ] Connect domain prefuspa.com to Netlify
- [ ] Dark variant of logo (current is white on transparent)
- [ ] Google Reviews widget (need Google Business access → Trustindex)
- [ ] FAQ page/section
- [ ] "How We Work" / process section
- [ ] "About Us" page (team, founder story)
- [ ] Professional email (info@prefuspa.com instead of gmail)
