# Historias AI Studio — Staged Build Plan (TanStack Start)

A single-route site (`/`) with 9 stacked sections, sticky nav, and a contact server endpoint. Built in 4 stages so each stage is reviewable before the next lands.

## Framework mapping (locked from prior turn)

- Router: TanStack Start file routes under `src/routes/` (single `index.tsx`)
- Server endpoint: `src/routes/api/contact.ts` (Zod-validated POST)
- Fonts: `<link>` in `src/routes/__root.tsx` head (Tailwind v4 requirement)
- Images: `<img>` + Lovable Assets CDN pointers (`.asset.json`)
- Animation: Framer Motion; GSAP/ScrollTrigger only if a scroll effect can't be done with Motion

## Folder structure (created in Stage 1)

```text
src/
  routes/
    __root.tsx              (fonts, meta, favicon)
    index.tsx               (composes all 9 sections)
    api/contact.ts          (POST handler, Zod)
  components/
    layout/                 (Nav, Footer, SectionShell, SectionNumber, CornerMarkers)
    sections/               (Hero, About, Services, Work, Process, Why, Testimonials, Faq, Contact)
    ui/                     (Button, Chip, Field, Select, Textarea, Accordion, Marquee)
    animations/             (FadeIn, SplitText, ScrollReveal)
    portfolio/              (FeaturedCard, ProjectCard, FilterBar)
    forms/                  (ContactForm, contact-schema.ts)
  data/
    demo-projects.ts        (DEMO CONTENT)
    services.ts
    testimonials.ts         (DEMO CONTENT)
    faq.ts
    nav.ts
    clients.ts              (DEMO CONTENT)
  hooks/                    (useActiveSection, useScrolled, useHydrated)
  lib/                      (cn, motion presets)
  types/
  server/
    config/contact.ts       (email + WhatsApp placeholders, empty by default)
    services/               (send-mail stub — logs only in stage 4)
    validation/contact.ts
  styles.css                (tokens, fonts, utilities)
  assets/                   (H logo + generated hero/BTS/architecture .asset.json)
```

## Design tokens (Stage 1, `src/styles.css`)

```text
--obsidian    #050807   background base
--graphite    #111716   layered surface
--edge        #2B3431   borders / dividers
--smoke       #929993   metadata / secondary copy
--cream       #F8EEE3   light canvas / primary type on dark
--mint        #25FFC4   accents only (≤10%)
```

Registered under `@theme inline` so `bg-obsidian`, `text-cream`, `border-edge`, `text-mint`, etc. work as utilities. Obsidian gets depth via a fixed radial + fine grid + faint grain layer (CSS only, no images).

Typography stack (loaded via `<link>` in `__root`):
- Grotesk sans → **Space Grotesk** (headings + body)
- Editorial italic serif → **Instrument Serif** (emotional words)
- Mono labels → **JetBrains Mono** (section numbers, metadata, chips)

Fluid sizing via `clamp()` utilities: `text-display`, `text-h1`, `text-h2`, `text-eyebrow`, `text-meta`.

## Stages

### Stage 1 — Foundation (no section content yet)

1. Install deps: `framer-motion`, `react-hook-form`, `@hookform/resolvers`, `zod`, `clsx`, `tailwind-merge`.
2. Rewrite `src/styles.css` with tokens, font `@theme` names, base reset, obsidian-depth background utility, corner-marker + cut-corner clip-path utilities, thin-grid utility, grain overlay.
3. Update `src/routes/__root.tsx`: real title/description/OG, Google Fonts `<link>` tags, favicon.
4. Upload official H logo via `lovable-assets` → `src/assets/logo-h.png.asset.json`. Never re-render.
5. Build `layout/Nav` (transparent → obsidian glass on scroll, active-section dot, mobile fullscreen sheet), `layout/Footer`, `layout/SectionShell` (handles the outlined section number, corner markers, eyebrow label, id anchor), `ui/Button` (primary cream, secondary ghost).
6. Rewrite `src/routes/index.tsx` to render Nav + 9 empty `SectionShell` placeholders + Footer so scroll/anchor/nav plumbing is verified before content lands.

**Exit check:** nav scrolls to each anchor, active indicator updates, no horizontal overflow at 375 / 768 / 1024 / 1440 / 1920, no console errors, typecheck passes.

### Stage 2 — Content sections 01–05

Static content, real typography and layout, image placeholders generated via `imagegen` (cinematic architecture for hero, BTS studio + vertical futuristic frame for About, car/product still for Services, etc.).

- **01 Hero** — full-viewport, left dark overlay, outlined `01`, vertical rail label, headline split with italic "visible.", primary "View Our Portfolio" → `#work`, secondary "Get Free Consultation" → `#contact`, client-name strip (text placeholders, no fake trademarks).
- **02 About** — split cream/obsidian, italic "story.", stat row, "Discover Our Studio" link, layered rounded frames with mint connector lines (SVG).
- **03 Services** — headline with italic "bring a story to life.", 6-row service list from `data/services.ts`, right-side active card with default `AI Commercial Production`. Active state via `useState` on the list; description + capability list + image swap.
- **04 Selected Work** (primary section) — filter chip row (state only, no filtering logic yet), one large featured card left + two stacked cards right, cut-corner clip-path, circular play glyph, mint outlines. Data from `data/demo-projects.ts` marked `// DEMO CONTENT`.
- **05 Process** — diagonal cream→obsidian background (single `clip-path` element), 5-step timeline (horizontal desktop, vertical mobile), layered production cards (Treatment / Storyboard / Generative / Live Action / Edit / Master), bottom capability strip, `Start a Project` button.

**Exit check:** every section visually matches its reference at 1440; mobile stacks correctly; italic serif appears only on the specified words.

### Stage 3 — Content sections 06–09 + Footer

- **06 Why Historias** — obsidian full-bleed, official H logo used at monumental scale (object-contain, preserved clear space), accordion of 4 reasons (Framer Motion height animation, one open by default), bottom feature bar, "Meet Historias" CTA.
- **07 Client Stories** — headline + italic "ambitious stories.", featured testimonial card (cream) beside cinematic image, right-side client list that swaps the active testimonial, prev/next + slide counter + progress line, bottom feature bar. Data from `data/testimonials.ts` + `data/clients.ts`, both `// DEMO CONTENT`.
- **08 FAQ** — asymmetric diagonal cream/obsidian, left column headline + "Talk to Our Team" CTA + scroll counter, right accordion of 7 questions from `data/faq.ts`, first item open by default.
- **09 Start a Project** — form on the left (RHF + Zod), monumental H logo on the right with soft cream backlight, feature strip below. Fields: name, company, work email, project type (select), timeline (select), budget (optional), project brief (textarea). Primary "Send Project Brief" + secondary "Continue on WhatsApp" (disabled with tooltip "Contact details coming soon" because real number isn't set).
- **Footer** — H logo, nav links, socials, legal, © 2026, Back to Top. Social/legal hrefs pulled from `server/config/contact.ts`; empty strings render as non-interactive text so no fake URLs ship.

**Exit check:** all 9 sections rendered, references vs. output reviewed at 1440 and 375, no lorem ipsum, no fake URLs, no fake email/phone in DOM.

### Stage 4 — Server endpoint, animation polish, QA

1. `src/server/validation/contact.ts` — Zod schema (name/company/email/project type/timeline/budget?/brief, brief ≥ 20 chars).
2. `src/routes/api/contact.ts` — POST handler: parse → validate → for now, log the payload server-side and return `{ ok: true }`. Real email transport is stubbed in `server/services/` behind a `sendContactBrief()` function that currently just `console.log`s (safe on Cloudflare Workers, no Node-only deps). Comment marks where SMTP/Resend/Cloud email will slot in.
3. `forms/ContactForm.tsx` — RHF + zodResolver, submit via `fetch("/api/contact", …)`, success + error states inline, disabled submit while pending, focus-visible mint ring.
4. Motion pass: fade/slide-in on section reveals via a shared `ScrollReveal` wrapper (Intersection Observer + Framer Motion), marquee for client strip, subtle parallax on hero background, accordion height transitions. No layout-shifting animations.
5. QA pass across 375 / 768 / 1024 / 1440 / 1920: no horizontal overflow, tap targets ≥ 44px, headings don't collide with sticky nav, italic serif only where specified, mint ≤ 10% surface area, no `#000000` anywhere.

## Explicitly out of scope for this build

- Three.js / WebGL
- Real portfolio video playback (poster + play glyph only)
- Real client trademark logos (text placeholders per spec)
- Live email transport / WhatsApp deep link (stubbed until real contact info is provided)
- Filter logic on Selected Work beyond visual active state (deferred)
- CMS / Cloud backing store — everything is static + data files this pass

## Technical notes (safe to skip)

- Cloudflare Workers runtime: contact handler stays pure JS (`crypto` + `fetch` only) — no `nodemailer`, no `sharp`.
- All colors defined as tokens in `@theme inline`; no hardcoded hex in components except the H logo asset itself.
- Section anchors use plain `id="work"` etc. and `scroll-margin-top` equal to nav height so headings aren't hidden.
- `useHydrated()` guards any `localStorage`/`window` read (none planned in Stage 1–3).
- OG image: skipped on `/` so Lovable's serve-time screenshot is used; can be swapped for a rendered hero export later.
