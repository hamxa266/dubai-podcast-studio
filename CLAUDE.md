# Working in this repo

Conventions and traps for this project specifically. Read this before changing
anything; several of the rules below exist because breaking them produced bugs
that were silent rather than loud.

---

## 1. Frontend only. This is a hard boundary.

The site is a static frontend. Booking, payment, file delivery, messaging and
maps all live on systems the studio already runs, and this project only links
out to them.

Do not add: API routes, server actions, a database, auth, a CMS, payment
handling, email sending, webhooks or analytics backends. There is no
`src/app/api`, no `"use server"`, and the build must stay fully prerendered.

`src/app/robots.ts` and `src/app/sitemap.ts` are the exception that proves it:
they are Next metadata conventions, evaluated at build and emitted as static
files. Nothing runs at request time.

The contact form is a deliberate shell. It validates in the browser and then
says plainly that it is not connected, rather than faking a success state. If
you wire it to something, remove that message at the same time.

---

## 2. Never invent a fact

Every price, room name, policy and FAQ answer comes from the live Wix site.
The live site contradicts itself in several places, and those conflicts are
recorded rather than quietly resolved.

- `verified: false` and `needsVerification` in `src/data/` mark claims the
  studio still has to confirm. There are 6 of them. Do not delete a flag
  without an answer from the studio.
- Do not add a number, an inclusion, a testimonial or a client logo that the
  studio has not published.
- Photographs are **not** attributed to individual rooms. Nothing in the
  available media can be matched to a specific studio, and captioning an image
  "YALLAPOD 2" would invent a fact a customer could book against. See the note
  in `src/data/studios.ts`.
- `testimonials` in `src/data/testimonials.ts` is an empty array on purpose.
  The placeholder entries are development-only, gated on `NODE_ENV`, and
  visibly labelled. Never let anything quote-shaped reach production unless a
  real customer said it.

`docs/design-audit.md` is the record of what was found and what is still open.

---

## 3. The design system

### Colour: one accent, and it is a fill

> Electric yellow on white measures **1.10:1**. It is invisible.

The accent is therefore a **fill only** on light grounds. It is never text,
never a border, never a focus ring, never an icon on white. Put ink on it and
it measures 15.81:1. On the dark ink ground the relationship inverts and yellow
as text is fine.

`Button` deliberately offers no variant that would let you break this. If you
find yourself wanting `text-accent` on a white background, the answer is no.

Every colour token in `src/styles/globals.css` carries its measured contrast
ratio in a comment. If you add one, measure it and record the number. Do not
estimate.

### Shape: two values

Controls are pills, media and containers are sharp. The only third value is
`--radius-field: 22px` for multi-line inputs, derived as half the 44px control
height so the curvature matches a pill exactly.

### Type

Switzer for display and body, at weight 400 for display. Scale carries the
impact, not weight. Geist Mono is for numerals only: prices, hours, capacities,
office numbers.

### Theme

One light theme. Dark `ink` sections are compositional punctuation, not a theme
flip: the chrome never inverts.

---

## 4. The tailwind-merge trap (this has bitten twice)

`cn()` uses `extendTailwindMerge`, and it **must know every custom token
scale**. Out of the box tailwind-merge has no idea `text-title` is a size and
`text-ink` is a colour, so it files them in the same conflict group and keeps
only the last.

This has already caused two silent bugs:

- `cn("text-title", "text-ink")` dropped the size, and every section heading
  rendered at body size.
- `cn("rounded-pill", "rounded-field")` kept both, and the textarea stayed a
  9999px lozenge.

**If you add a `--text-*`, `--color-*` or `--radius-*` token to `globals.css`,
add it to the matching class group in `src/lib/cn.ts` in the same commit.**
Nothing will error if you forget. It will just quietly render wrong.

Related: Tailwind only generates classes it can see as complete literal strings
in source. `` `lg:${ratio}` `` will never be emitted. Write the full class out.

---

## 5. Motion

`MOTION_INTENSITY` is 9, which comes with two obligations.

**Reduced motion is not optional.** Under `prefers-reduced-motion: reduce`,
Lenis never initialises, GSAP is never even downloaded, and every choreographed
component degrades to static. Hijacking scroll from someone who asked their OS
for less motion makes a site unusable, and vestibular disorders are a real
accessibility concern.

**GSAP and Lenis are dynamically imported.** They live in `SmoothScroll` and
`HeroMedia` behind `await import(...)`, which keeps 116 KB out of the initial
bundle. Do not convert these to static imports.

**Do not fade the LCP element.** An element at `opacity: 0` is not painted, so
fading the hero headline held Largest Contentful Paint at 3.9s with 88% render
delay. Use `.enter-lcp`, which is transform only. The hero image uses
`.enter-media`, which scales rather than fades, for the same reason.

Banned: `window.addEventListener("scroll", ...)`. Use ScrollTrigger,
`IntersectionObserver` or CSS scroll-driven animation.

---

## 6. Accessibility rules that are easy to undo

- **Collapsed panels must be `inert`.** A panel at zero height with
  `overflow: hidden` is still in the tab order and still read by screen
  readers. The accordion, the lightbox and the mobile drawer all rely on this.
- Do not use ARIA to patch bad HTML. Use the right element. There are currently
  no redundant roles on native elements and it should stay that way.
- Focus rings are ink on light and accent on ink. Never yellow on white.
- Every image needs a descriptive `alt`. Do not keyword-stuff it: the live site
  ships alt text repeating "podcast studio Dubai" twice in one string, which is
  what this rebuild exists to stop.
- One `h1` per page, no heading-level skips.

The baseline is Lighthouse accessibility 100 and zero contrast failures across
535 text nodes on six pages. If a change drops that, it is a regression.

---

## 7. Copy rules

- **Zero em dashes and zero en dashes.** Use a normal hyphen. This is checked
  and is currently zero across `src/`.
- One label per CTA intent. Booking is always "Book Now", never "Get started"
  or "Reserve". Labels live in `cta` in `src/data/site.ts`; import them rather
  than typing a string.
- No keyword stuffing. The terms that matter appear once, in a sentence a
  person would read.
- No fake urgency, invented discounts or "Most Popular" badges. The studio's
  own "Save 100 AED/HR" label does not add up on one package, which is why the
  UI shows the effective hourly rate instead.

---

## 8. Routes and slugs

**All internal paths live in `src/lib/routes.ts`.** Nothing hardcodes a path.

This is deliberate: the slug decision is still open. The live site ranks on
keyword slugs such as `/podcast-studio-for-rent` for what is really the pricing
page, and changing route slugs carries real search risk. Switching back is an
edit to that one file plus the folder names, and no component changes.

`sitemap.ts` generates from the same object, so it cannot drift.

---

## 9. Commands

```bash
npm run dev        # dev server on :3000
npm run build      # production build, must stay all-static
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run start      # serve the production build
```

Run `lint`, `typecheck` and `build` before declaring anything finished. The
build output should show every route marked `○ (Static)`.

---

## 10. Verifying UI changes

Measure, do not eyeball. Useful checks that have caught real bugs here:

- Horizontal overflow: compare `documentElement.scrollWidth` against
  `clientWidth`, **not** `innerWidth`. Using `innerWidth` produced a false
  negative that hid a real mobile overflow bug for several phases.
- After changing a viewport size in a preview pane, **reload before
  measuring**. Emulated resizes do not re-evaluate media queries or `vw` units,
  which will make correct code look broken.
- If a preview pane runs with `prefers-reduced-motion: reduce`, motion will
  correctly appear switched off. Verify both paths before concluding anything.

---

## 11. Reference

`docs/design-audit.md` holds the original audit of the live Wix site, the
design direction, the dial settings, the content contradictions and the list of
items still outstanding for the studio. It is the reasoning behind most of the
decisions above.
