# Dubai Podcast Studio

A frontend rebuild of [dubaipodcaststudio.com](https://www.dubaipodcaststudio.com),
a podcast recording studio with seven rooms in the Tamani Arts Building,
Business Bay, Dubai.

The existing site is a Wix build carrying keyword-stuffed copy, a 38,000px
gallery, unedited template testimonials and a mobile layout locked to a fixed
320px width. This replaces it with a static, photography-led site that keeps the
content and the booking funnel intact.

---

## Status

Built and running locally. Not deployed.

| | |
|---|---|
| Lighthouse | Performance 90, Accessibility 100, Best Practices 100, SEO 100 |
| Core Web Vitals | CLS 0, TBT 30ms, LCP 3.5s (simulated Slow 4G) |
| Routes | 6, all prerendered static |
| Contrast | 535 text nodes checked across 6 pages, zero failures |

There are items the studio still needs to resolve before this can go live. See
[Before launch](#before-launch).

---

## Getting started

Requires Node 20 or newer (developed on 24).

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

---

## Stack

- **Next.js 16** (App Router, Server Components by default)
- **React 19**, **TypeScript 5**
- **Tailwind CSS v4**, theme defined in `src/styles/globals.css`
- **GSAP + ScrollTrigger** and **Lenis** for motion, both dynamically imported
- **Phosphor** icons
- **Switzer** and **Geist Mono**, self-hosted

No backend. Booking, payment, messaging and maps all stay on the studio's
existing systems and are reached by outbound link. There are no API routes and
no server actions.

---

## Structure

```
src/
  app/               routes, metadata, robots.ts, sitemap.ts, OG images
  assets/images/     processed photography (build inputs, not public/)
  components/
    gallery/         mosaic, masonry grid, lightbox
    layout/          header, footer, wordmark, page intro
    motion/          smooth scroll provider
    navigation/      desktop nav, mobile drawer
    sections/        homepage sections
    seo/             JSON-LD structured data
    ui/              Button, Container, Section, Accordion, ImageFrame, form
  data/              all site content, typed and flagged
  lib/               routes.ts (all paths), cn.ts (class merge)
  styles/            globals.css tokens, fonts.ts, font files
docs/
  design-audit.md    the audit of the live site and the design direction
```

**Routes:** `/`, `/studios`, `/pricing`, `/gallery`, `/faq`, `/contact`.

`/services` and `/about` do not exist by design. Services were merged into
Pricing, because "what do you do" and "what does it cost" are one question for
this business. The founding story is a homepage section rather than a page
created to raise a page count.

---

## Content

All content lives in `src/data/` as typed TypeScript. There is no CMS, and no
content is fetched at runtime.

| File | Holds |
|---|---|
| `site.ts` | Studio facts, navigation, CTA labels, socials, hero copy |
| `pricing.ts` | Hourly rates, prepaid packages, equipment, booking terms |
| `studios.ts` | The seven rooms, office numbers, booking states |
| `setups.ts` | Gallery images with alt text and captions |
| `faq.ts` | 15 questions in four groups |
| `process.ts` | The four booking steps |
| `testimonials.ts` | Empty until real quotes exist |

Every figure came from the live site. Where the live site contradicts itself,
the conflict is flagged in code with `verified: false` or `needsVerification`
rather than being silently resolved.

---

## Design system

**One accent, used as a fill.** Electric yellow measures 1.10:1 on white, so it
is never text, a border or a focus ring on a light ground. With ink on top it
measures 15.81:1. Every colour token records its measured contrast ratio.

**Two radius values.** Controls are pills, media and containers are sharp.

**Type.** Switzer at weight 400 for display, so scale carries the impact rather
than weight. Geist Mono for numerals only.

**One light theme.** Dark sections are compositional punctuation; the chrome
never inverts.

**Motion at intensity 9,** with reduced motion fully honoured: under
`prefers-reduced-motion` the motion libraries are never downloaded at all.

Full reasoning is in `docs/design-audit.md`.

---

## Fonts and licensing

- **Switzer** (Indian Type Foundry, via Fontshare), ITF Free Font License.
  Commercial use and self-hosting are explicitly permitted. Ships unmodified,
  because the FFL treats subsetting and format conversion as a derivative work.
- **Geist Mono** (Vercel), SIL Open Font License.

Two Switzer weights are shipped (400, 500). Bold was removed after a search
found it unused.

---

## Photography

Images live in `src/assets/images/` as build inputs so that Next can read their
dimensions at build time, which is what actually prevents layout shift.

Six are real photographs. Four of those are high resolution and carry the large
cells; the rest are frames pulled from the studio's own vertical videos at
360x640, so the layout never gives them a cell wide enough to expose that.

**Images are not attributed to individual rooms.** Nothing in the available
media can be matched to a specific studio, and labelling a photograph
"YALLAPOD 2" would state something a customer could book against. The rooms are
presented as a verified index and the photographs as a gallery of setups.

The raw Google Maps scrape is gitignored. See the note in `.gitignore`.

---

## Before launch

Open items, in rough order of risk.

1. **The editing rate contradicts itself.** FAQ 06 says 1,000 AED/hour, FAQ 05
   says 550 AED/H. The homepage agrees with 1,000, so that is what is shown.
   This is the most commercially dangerous item on the site.
2. **The contact form is not wired.** It validates and then says so. Connect it
   to a real endpoint or remove it.
3. **Testimonials are empty.** Add real quotes with real attribution and
   permission to `src/data/testimonials.ts`, or the section keeps degrading to
   the Google and Instagram links.
4. **Slugs are undecided.** Clean slugs are in use, but the live site ranks on
   keyword slugs. Changing them needs a 301 map, which is a hosting concern.
   All paths are centralised in `src/lib/routes.ts` so switching is one file.
5. **Other flagged contradictions**: editing turnaround (3-4 vs 4-6 days), the
   250 AED file-delivery fee, guest capacity (4 vs 5), and the client count,
   which appears on the live site as 3,500, 3,000, 2,500, "more than 1000" and
   "hundreds".
6. **The logo is a placeholder.** The existing logo is a black raster square
   with no vector version, which no longer suits a white ground. The current
   wordmark is set in the display face.
7. **Photography.** The studio's own high-resolution library would replace the
   360x640 video frames currently filling the smaller gallery cells.
8. **`site.url`** in `src/data/site.ts` points at the current domain. Update it
   if the rebuild is deployed elsewhere, since canonicals, OG tags and the
   sitemap all derive from it.

---

## Notes for contributors

`CLAUDE.md` documents the conventions and the traps, including two silent
`tailwind-merge` bugs that will recur if custom tokens are added without
registering them in `src/lib/cn.ts`. Worth reading before the first change.
