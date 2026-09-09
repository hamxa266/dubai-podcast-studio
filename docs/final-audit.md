# Phase 11: final taste-skill audit

Run against the working tree on branch `master`, after commit `ca5e7f5`.
Every number below was measured, not estimated. The method is stated per audit
so each result can be reproduced.

**Result: PASS, after three fixes made during the audit.** One item failed on
first run (Audit 3, hero headline line count) and was fixed and re-verified.
One hygiene defect was found and corrected. Nine items are recorded as open
questions for the studio; none is a build defect and all predate this phase.

---

## Changes made during this audit

Only these three files changed. No features were added.

| File | Change | Why |
|---|---|---|
| `src/styles/globals.css` | `--text-hero` ceiling `5.5rem` to `5rem` | Audit 3 FAIL. See below. |
| `src/components/sections/Hero.tsx` | h1 `lg:col-span-11` to `lg:col-span-12` | Audit 3 FAIL. See below. |
| `src/types/index.ts` | Deleted three dead interfaces | Audit 6. Removed a latent "Most Popular" badge field and a discount-label field. |

`npm run lint`, `npm run typecheck` and `npm run build` all pass after the
changes. The build reports every one of the 11 routes as `○ (Static)`.

---

## Audit 1: em dash and en dash

**PASS. Zero occurrences.**

Method: a Node scan of every text file in the repository, excluding
`node_modules`, `.git` and binary assets. The scan deliberately covers more
than the two required code points, because an en dash smuggled in as an HTML
entity would slip past a search for the literal character:

- U+2014 em dash, U+2013 en dash
- U+2010 to U+2015 (the rest of the dash block), U+2212 minus,
  U+FE58, U+FE63, U+FF0D
- The HTML entity spellings of both dashes, named and numeric (the `mdash` and
  `ndash` entities, and their `#8212` and `#8211` numeric forms). They are
  described here rather than written out, so that this document does not
  register as a hit when the scan is next run against the repository.

| Scope | Files scanned | Hits |
|---|---|---|
| Repository source (`src/`, `docs/`, root configs, `package-lock.json`) | 65 | **0** |
| Emitted build output (`.next/server/app`, `.next/static`) | 112 | **0** |

The only dash-family characters anywhere on disk sit inside `.next/cache` and
vendored `node_modules` bundles: Next.js and third-party library internals, in
gitignored generated output. Nothing this project authored, and nothing served
to a visitor, contains one.

The one place a dash would normally be required, a `2018-2026`-style range,
does not occur. Ranges in copy are written as words ("two to three days", "four
to six business days"), which sidesteps the question entirely.

---

## Audit 2: section layout repetition

**PASS. Ten sections, ten distinct layout families, against a minimum of four.**

Homepage order is set in `src/app/page.tsx`.

| # | Section | Layout family | Structure |
|---|---|---|---|
| 1 | `Hero` | Full-bleed media hero | Headline across 12 columns, then subtext and CTAs as a 6+6 row, then an edge-to-edge 21:9 photograph outside the container gutter |
| 2 | `CredibilityStrip` | Hairline metric band | 4-up `<dl>`, mono numerals, separated by rules. No cards, no box per figure |
| 3 | `StudioShowcase` | Asymmetric image mosaic | 12-column grid, two wide cells at 460px over four narrow cells at 420/370/440/395px, then a flat index list |
| 4 | `Services` | Full-width comparison rows | One `<article>` per tier on a 12-column split (3 price / 5 name / 4 inclusions), price in a fixed column so the three numbers stack vertically |
| 5 | `Packages` | Gapless tile grid | 3-up `gap-px` on a line-coloured ground, so cells are divided by hairlines rather than elevated as cards |
| 6 | `HowItWorks` | Numbered process columns, on ink | 4-up `<ol>`, hairline-topped, on the dark ground |
| 7 | `Proof` | Outbound proof block | Two-column quote grid when real quotes exist, otherwise a hairline rule and two outbound buttons |
| 8 | `Faq` | Disclosure list | Accordion, one open at a time |
| 9 | `LocationContact` | Split detail and form | 6+6, definition list beside the contact form |
| 10 | `FinalCta` | Typographic close, on ink | Oversized `text-mega` word stack at 7 columns, copy and CTAs at 5 |

**Zigzag alternation cap: PASS with room to spare.** The cap is two consecutive
image-plus-text splits. This page has **zero**. No homepage section uses the
left-image / right-text arrangement at all; the only image-driven section is
the mosaic, which is a composition rather than a split.

**Repetitive patterns identified.** Two pairs are close enough to name:

1. *Hairline row lists.* `Services` uses 12-column article rows with a large
   mono price; the "Every room" index inside `StudioShowcase` uses flat
   one-line rows. Both are hairline-separated lists. They are kept because they
   operate at different scales and do different jobs, and because the third
   candidate, the `Packages` terms list, deliberately carries no rules at all
   (`flex flex-col gap-4`, no borders) so the pattern never becomes the page's
   default. Not repetition requiring a fix.
2. *Hairline definition lists.* `CredibilityStrip` and the `LocationContact`
   detail list are both divided `<dl>`s. They read differently: one is a 4-up
   horizontal band of 36 to 48px mono numerals, the other a stacked
   label-and-value list at body size. Kept.

**No unjustified repetition was found, so nothing was changed for this audit.**

Cross-page repetition was checked too, since the skill's real concern is pages
that feel copy-pasted. Each inner page deliberately inverts its homepage
counterpart, and each says so in its own file comment: `/studios` leads with one
large image and makes the room list the main content, split by booking state;
`/pricing` replaces the homepage's stacked rows with a real comparison matrix
(with a per-tier card fallback below `md`, so there is no horizontal scrolling
on a phone); `/gallery` uses a CSS-columns masonry used nowhere else;
`/contact` leads with the three channels rather than the place. The `Lightbox`
is shared between the mosaic and the gallery, which is component reuse rather
than layout reuse.

---

## Audit 3: hero discipline

**FAIL on first run. Fixed and re-verified. Now PASS.**

Method: real measurement in the browser at each width. Headline line count is
derived from `Range.getClientRects()` grouped by distinct `top`, not estimated
from character counts. Per `CLAUDE.md` section 10, the page was reloaded after
every viewport change, because emulated resizes do not re-evaluate `vw` units
or media queries.

### The failure

| Viewport | Font | h1 measure | Widest line needs | Lines |
|---|---|---|---|---|
| 1024 | 83.7px | 876px | 1002px at 88px | **3** |
| 1152 | 88px | 980px | 1002px | **3** |
| 1240 | 88px | 1060px | 1002px | 2 |

The headline balances onto two lines whose widest measures 11.4 times the font
size. At the 88px ceiling that is 1002px, but the `lg:col-span-11` measure was
only 876px at 1024px wide. The result was a three-line hero headline across the
whole 1024 to roughly 1175 band, which the skill classes as a font-size error
rather than a copy-length one.

A forced sentence break was considered and rejected by measurement: the two
sentences measure 845px and 1055px at 88px, so breaking there needs *more*
width than the balanced split, not less. It would have failed at more widths,
not fewer.

### The fix

Two changes, both minimal, neither touching copy:

- `--text-hero` ceiling lowered from `5.5rem` to `5rem`. 80px needs 911px.
- The h1 spans all twelve columns at `lg` instead of eleven, which returns the
  103px column plus the 48px gap that the line needed. The text is balanced and
  shorter than the box at every larger width, so the twelfth column costs
  nothing visually and buys the two-line break where it is tight.

The clamp does not reach the old ceiling until about 971px wide, so **nothing
at or below tablet changed at all**. This was verified rather than assumed:
390px still computes to 39.3px and 768px to 65.76px, both identical to the
pre-fix measurements.

### Results after the fix

| Viewport | Headline lines | Font | Widest line / measure | Subtext | Primary CTA | Header height | Overflow |
|---|---|---|---|---|---|---|---|
| 1920 x 1080 | **2** | 80px | 911 / 1464 | 17 words, 2 lines | visible, bottom 421px | 77px | 0 |
| 1440 x 900 | **2** | 80px | 911 / 1464 | 17 words, 2 lines | visible | 77px | 0 |
| 1280 x 800 | **2** | 80px | 911 / 1169 | 17 words, 2 lines | visible, bottom 421px | 77px | 0 |
| 1180 x 800 | **2** | 80px | 911 / 1101 | 17 words | visible | 77px | 0 |
| 1152 x 800 | **2** | 80px | 911 / 1073 | 17 words | visible | 77px | 0 |
| 1100 x 800 | **2** | 80px | 911 / 1021 | 17 words | visible | 77px | 0 |
| 1024 x 768 | **2** | 80px | 911 / 945 | 17 words, 3 lines | visible, bottom 449px | 77px | 0 |
| 768 x 1024 | 3 (tablet) | 65.8px | n/a | 17 words, 2 lines | visible, bottom 532px | 65px | 0 |
| 390 x 844 | 3 (mobile) | 39.3px | n/a | 17 words, 3 lines | visible, bottom 455px | 65px | 0 |

**Reported metrics:**

- **Headline lines at major viewport widths: 2 at every desktop width from 1024
  to 1920.** Three lines remain at 768px and 390px, which is correct: the cap
  is "max 2 lines on desktop", and a three-line headline at 390px is exactly
  what the 38px floor was tuned to produce.
- **Supporting copy word count: 17.** The cap is 20. It occupies 2 lines at
  desktop and 3 at 390px, inside the 3 to 4 line cap.
- **Primary CTA visibility: visible without scrolling at every width tested**,
  the deepest being 532px against a 1024px viewport at tablet. Neither CTA
  label wraps: "Book Now" and "Explore studios" each render on one line at
  every width.
- **Desktop nav height: 77px**, inside the 80px cap, and 65px at mobile. All
  five nav items sit on a single row (measured: identical `top` of 18px for
  every item, `<ul>` height 40px). No dropdown, no overflow menu.

**Hero stack discipline: PASS.** Three text elements against a cap of four:
headline, subtext, CTA pair. No eyebrow, no tagline under the CTAs, no trust
micro-strip, no price teaser, no version label, no scroll cue.

**Hero top padding: PASS.** 80px computed, against a `pt-24` (96px) cap.

---

## Audit 4: theme consistency

**PASS. One locked light theme, no flips.**

| Check | Evidence |
|---|---|
| Single theme declared | `color-scheme: light` in `globals.css:180`; `colorScheme: "light"` and `themeColor: "#ffffff"` in the layout viewport export |
| No dual-mode machinery | **Zero** `dark:` variants anywhere in `src/`. **Zero** `prefers-color-scheme` blocks |
| One palette | `--color-*: initial` clears the default Tailwind palette, so `bg-red-500` does not exist and cannot be reached for. Nine tokens total |
| One accent | `#F2FF00`, used identically on every page |

**On the dark `ink` sections, which is what this audit is really asking
about.** There are five, across four pages: `HowItWorks` and `FinalCta` on the
homepage, plus one each on `/studios`, `/pricing` and `/contact`. The footer is
ink on every page.

These are **not** a theme flip, for three reasons that are checkable rather
than asserted:

1. **The chrome never inverts.** The header stays white and solid at every
   scroll position on every page. A genuine theme flip would take the header
   with it.
2. **They are the same palette, not a second one.** Ink sections use
   `--color-ink` as ground and `--color-paper` as type, both already in the
   single nine-token palette. Nothing switches to a warm or cool variant.
3. **The one thing that does change, changes for a measured accessibility
   reason.** The focus ring is ink on light and accent on ink, because electric
   yellow on white measures 1.10:1 and is invisible, while on ink it measures
   15.81:1. `.on-ink` carries that switch. The accent is a fill only on light
   grounds, and `Button` deliberately offers no variant that would let a
   contributor break the rule.

This is the skill's permitted case: a deliberate compositional device, applied
consistently, in one palette. The warning is against a light warm-paper section
sandwiched randomly between dark ones. Nothing here does that, and the
placement is argued in each component's own comment (dark bands separate the
two commercial sections from the close, and the room list from the closing ask).

---

## Audit 5: image authenticity

**PASS on all four required checks, with one quality limitation reported
honestly rather than hidden.**

| Requirement | Result |
|---|---|
| Real imagery is used | **PASS.** 18 real photographs, all local static imports |
| No div-created fake screenshots | **PASS.** Zero |
| No fake image placeholders remain | **PASS.** Zero rendered |
| No low-quality temporary assets where production media should exist | **PASS with a caveat.** See below |

**Real imagery.** Every image is a genuine photograph of the studios, imported
statically so Next knows the intrinsic dimensions at build time (which is what
actually prevents layout shift) and can generate the blur placeholder.
Measured dimensions:

| Asset group | Count | Dimensions |
|---|---|---|
| Primary studio photographs | 4 | 2440x1124, 2400x1602, 2400x1596, 1920x1072 |
| Setup photographs | 2 | 768x1024, 476x635 |
| Setup frames from the studio's own vertical video | 8 | 350x640 to 360x640 |
| Social cards | 2 | 1200x630 |

**No fake screenshots and no hand-rolled decoration.** A scan for `<svg`,
`<path` and `d="M` across every `.tsx` file returns **zero** results. There is
no div-built product UI, no fake dashboard, no drawn illustration. Every icon
comes from `@phosphor-icons/react`, one family, 13 import sites, no second
library mixed in. No emoji anywhere in `src/`.

**No placeholders reach a page.** `ImageFrame` supports a labelled empty slot
for photography that does not exist yet, and **it is used zero times**: a grep
for `placeholderLabel` returns only the component's own definition. Every
`ImageFrame` call site passes a real `src`. There are no `picsum.photos`,
Unsplash or `placehold.co` URLs anywhere; the only matches for "placeholder" in
the codebase are Next's blur-placeholder prop and the deliberately empty
testimonials array.

**The caveat, stated plainly.** Eight of the fourteen gallery setups are frames
pulled from the studio's own vertical videos at 350-360 x 640. They are genuine
media of genuinely different rooms, not filler, and nothing better exists in
what was supplied. The layout is built around that constraint rather than
ignoring it: the two 2400px photographs take the wide 460px cells, the small
frames are never given a large cell, and the lightbox caps displayed size with
`object-contain` rather than blowing them up. At the measured desktop cell
width of about 351px they are served at roughly 1:1 on a standard-density
display; on a 2x display they are upscaled. **This is a media-supply
limitation, not a build defect, and it is item 2 in the outstanding list
below.** The recommendation is unchanged from Phase 1: the studio should supply
its own high-resolution library.

**Alt text: PASS.** Every image on all six pages has a non-empty, descriptive
`alt` (measured: 0 missing, 0 empty across all pages). None is keyword-stuffed,
which is the specific failure this rebuild exists to correct: the live site
ships alt text repeating "podcast studio Dubai" twice in one string.

**No labels on images.** Captions sit below the frame, never overlaid. No
`Plate 03` pills, no invented photo credits, no `01 / 4` pagination on tiles.

---

## Audit 6: UI slop check

Every listed pattern was searched for mechanically. Results:

| Pattern | Count | Verdict |
|---|---|---|
| Random gradients | **0** | No `gradient` anywhere in `src/` |
| Unnecessary shadows | **0** | No `shadow-` utility anywhere in `src/` |
| Glassmorphism | **0** | No `backdrop-blur`. The header is solid white by explicit decision |
| Random blobs | **0** | No decorative SVG, no mesh, no aurora |
| Huge rounded cards | **0** | Media and containers are sharp. Radius is never applied to an image |
| Repetitive icon cards | **0** | No icon-plus-heading card grid exists on any page |
| Scroll cues | **0** | No "Scroll", no arrow, no wheel graphic |
| Fake badges | **0** | No "Most Popular", no "Best Value", no discount label, no urgency copy |
| Generic startup elements | **0** | No "Acme"-style invented brands, no fake avatars, no stat count-ups |

### Questionable elements, explained rather than left silent

Six things could reasonably be argued about. Each is named, and each is either
justified or was removed.

**1. Pills. Counted: 10 `rounded-pill` declarations, and every one is an
interactive control.** Buttons, icon buttons, nav links, the accordion toggle,
the form input, the wordmark dot. This is the documented shape system, not
decoration: controls are pills, everything else is sharp, and the only third
value is `--radius-field: 22px` for the textarea, derived as exactly half the
44px control height so its curvature matches a pill. Nothing decorative is a
pill. A grep for any other radius utility returns only a mention of
`rounded-full` inside a CSS comment. **Justified, keep.**

**2. Status dots. Counted: one, and it is not a status dot.** The wordmark
carries a 6px accent dot as its only ornament, `aria-hidden`, appearing once in
the header and once in the footer. It is punctuation in a brand lockup, not a
state indicator, and it is not repeated per nav item, per list row or per
badge. The place where a status dot would have been the obvious choice, room
booking state, deliberately uses words instead: `StudioShowcase` renders "Book
online" or "On request" as text, with the comment "A coloured dot would carry
the same meaning to fewer people". **Justified, keep.**

**3. Section numbers. Counted: four, in `HowItWorks` only.** The `01` to `04`
markers. This is the closest call in the audit. The skill bans section-number
eyebrows of the `00 / INDEX` and `06 · how it works` form, and bans generic
step labels of the `Stage 1 / Stage 2` form. These are neither: they sit in a
real `<ol>`, so the ordinal is semantically true rather than decorative; they
carry no topic word appended to the number; and the heading beside each one is
a verb ("Pick a room and a service", "Book the hours and pay"), so the action
is the label and the numeral is only an index. `src/data/process.ts` encodes
the rule in the type itself: "A verb, not 'Step 1'. The action is the label."
**Justified, keep.** Nowhere else on the site numbers a section.

**4. The lightbox counter, `1 of 14`.** The skill bans `01 / 4` pagination on
images and bento tiles. This is not on a tile; it is inside an open modal
carousel where the visitor genuinely cannot see how many images remain, and the
same information is carried in the dialog's `aria-label`. **Justified, keep.**

**5. Eyebrows. Counted: 3 on the homepage against a budget of 4.** The budget
is `ceil(10 sections / 3)`. Used: "The rooms", "Prepaid hours", "Business Bay".
Four further small uppercase labels exist ("Every room", "In every room",
"Before you book", "Or send a message") but each heads a sub-block *within* a
section rather than sitting above a section headline, which is not what the
rule counts. Even counted at their harshest, no section headline carries an
eyebrow it should not. **Within budget.**

**6. Dead type fields that would have reintroduced two banned patterns.
REMOVED.** `src/types/index.ts` still declared three interfaces that nothing
imported: `Service`, `Package` and `FaqItem`. Two of the dead `Package` fields
were exactly the affordances this design refuses:

- `featured?: boolean`, which is a "Most Popular" badge waiting to be rendered
- `saving?: string`, which is the "Save 100 AED/HR" label that does not add up
  on the 10-hour editing block (8,500 against 10 x 1,000 is a 150 saving, not
  100)

The dead `FaqItem` had also drifted out of date: its group union still read
`"equipment" | "location"` where the real groups are `"gear"` and
`"getting-here"`. Nothing would have errored; it would just have sat there
inviting a future contributor to wire up a badge. **Deleted, with the reasoning
recorded in the file.** `typecheck`, `lint` and `build` pass after removal.

---

## Audit 7: Section 14 pre-flight check

Every item, marked exactly PASS or FAIL, with one line of reasoning. Items that
cannot apply to this project are marked **N/A** with the reason, rather than
being silently ticked.

| # | Item | Result | Reasoning |
|---|---|---|---|
| 1 | Brief inference declared | PASS | Recorded in `docs/design-audit.md`: redesign with content preserved, local-service landing for a Dubai creator audience |
| 2 | Dial values explicit and reasoned | PASS | Variance 8 / Motion 9 / Density 4, each argued in `globals.css` and `CLAUDE.md`, not silently inherited from baseline |
| 3 | Design system chosen or aesthetic labelled honestly | PASS | Tailwind v4 utilities plus a hand-built token layer, labelled as a light editorial system. No system's tokens imported then overridden |
| 4 | Redesign mode detected and audit performed | PASS | `docs/design-audit.md` is the Section 11.B audit of the live Wix site |
| 5 | Zero em dashes anywhere | PASS | 0 across 65 source files and 112 emitted files. See Audit 1 |
| 6 | Page theme lock | PASS | One light theme, `color-scheme: light`, zero `dark:` variants. Ink sections are one palette and the chrome never inverts. See Audit 4 |
| 7 | Colour consistency lock | PASS | One accent `#F2FF00` on every page; default palette cleared so no stray colour is reachable |
| 8 | Shape consistency lock | PASS | Pill controls, sharp media and containers, one documented third value for the textarea |
| 9 | Button contrast check | PASS | Measured: primary 15.81:1, ink 17.40:1, outline 17.40:1 with a 3.45:1 border, quiet 5.10:1. All clear AA |
| 10 | CTA button wrap | PASS | Every CTA renders on one line at every width tested, 390 to 1920 |
| 11 | Form contrast check | PASS | Input border `#8A8A8A` at 3.45:1 clears the 3:1 non-text minimum; labels and errors measured in the sweep with zero failures. Labels above inputs, errors below, no placeholder-as-label |
| 12 | Serif discipline | PASS | No serif. Switzer, a neo-grotesque, for display and body. Neither Fraunces nor Instrument Serif appears |
| 13 | Premium-consumer palette check | PASS | Not the banned beige/brass/oxblood/espresso family. White ground, warm near-black ink, one electric yellow |
| 14 | Italic descender clearance | N/A | No italic display type anywhere on the site |
| 15 | Hero fits the viewport | PASS | **Was FAIL.** Fixed in this audit. 2 lines at every desktop width, 17-word subtext, CTA visible at every width. See Audit 3 |
| 16 | Hero top padding max `pt-24` | PASS | 80px computed |
| 17 | Hero stack discipline, max 4 text elements | PASS | Three: headline, subtext, CTA pair |
| 18 | Eyebrow count, mechanical | PASS | 3 used against a budget of 4 (`ceil(10/3)`) |
| 19 | Split-header ban | PASS | `SectionHeading` stacks title over body by construction and offers no split variant. Its `action` slot holds a control, which is the permitted compositional reason |
| 20 | Zigzag alternation cap | PASS | Zero consecutive image-plus-text splits; the pattern is not used at all |
| 21 | No duplicate CTA intent | PASS | One label per intent, enforced by importing from `cta` in `src/data/site.ts`. Booking is always "Book Now", replacing the eight labels the live site uses |
| 22 | Logo wall is logos only | N/A | There is no logo wall. Deliberate: this business's social proof is individual creators, and inventing client logos would be fabrication. Replaced by real figures plus a link to the real Google listing |
| 23 | Bento background diversity | N/A | No bento grid on any page |
| 24 | Trusted-by wall under the hero, real SVG logos | N/A | Same as 22. The band under the hero carries measured figures, not logos |
| 25 | Copy self-audit | PASS | Every visible string re-read. No broken grammar, no unclear referents, no mock-poetic filler. Copy states only what the studio published |
| 26 | Motion motivated | PASS | Three effects total, each with a one-sentence justification in its own file: hero entrance, hero parallax, tile hover scale. No animation exists without a stated reason |
| 27 | Marquee max one per page | PASS | Zero marquees |
| 28 | Navigation on one line, height 80px or less | PASS | Measured: all 5 items at identical `top`, `<ul>` 40px, header 77px desktop and 65px mobile |
| 29 | Section layout repetition, 4+ families over 8 sections | PASS | 10 families across 10 sections. See Audit 2 |
| 30 | Bento rhythm and exact cell count | N/A | No bento. The nearest analogue, the setup mosaic, has exactly 6 cells for 6 images and no empty cell |
| 31 | Long lists use the right component | PASS | The 14-image gallery is a masonry, the 7 rooms are split into two labelled groups by booking state, the FAQ is grouped into 4 accordions. No 20-row hairline table anywhere |
| 32 | Real images, no fake screenshots, no hand-rolled SVG, not pure-text | PASS | 18 real photographs; zero `<svg>` or `<path>` in any `.tsx`. See Audit 5 |
| 33 | No pills or labels overlaid on images | PASS | Captions sit below the frame. The only overlay is a hover and focus expand affordance, which is a control, not a label |
| 34 | No photo-credit captions as decoration | PASS | Captions are functional one-liners describing the setup; no invented photographer credits |
| 35 | No version footers | PASS | No `v1.4.2`, no build number. The footer carries year, name and a terms link |
| 36 | No micro-meta-sentences under eyebrows | PASS | None |
| 37 | No decoration text strip at hero bottom | PASS | None |
| 38 | No floating top-right sub-text in section headings | PASS | Prevented by construction in `SectionHeading` |
| 39 | No scoring or progress bars with filled tracks | PASS | None |
| 40 | No locale, time or weather strips | PASS | The address appears where it is useful (credibility band, contact, footer) and never as atmosphere |
| 41 | No scroll cues | PASS | Zero |
| 42 | No version labels in hero | PASS | Zero |
| 43 | No section-numbering eyebrows | PASS | The only numerals are the four ordinals of a real `<ol>` process, next to verb headings. Explained in Audit 6 |
| 44 | No decorative dots | PASS | One brand ornament in the wordmark, `aria-hidden`. Booking state is words, not colour. Explained in Audit 6 |
| 45 | No `border-t` plus `border-b` on every row | PASS | Lists use a single `border-t` on the container plus `border-b` per row, which is one rule between rows, not two |
| 46 | Content density sane | PASS | No table over 4 rows; sub-paragraphs at or under 25 words; the 35-question live FAQ is cut to 5 on the homepage with the rest grouped on `/faq` |
| 47 | Quotes 3 lines or fewer, clean attribution | N/A | `testimonials` is an empty array on purpose. Nothing quote-shaped renders in production |
| 48 | Motion claimed equals motion shown | PASS | Motion intensity 9 with three real effects present in code and firing when the OS does not ask for reduced motion |
| 49 | GSAP sticky-stack or horizontal-pan per canonical skeleton | N/A | Neither pattern is used. The only ScrollTrigger is a scrubbed parallax, correctly configured with `start: "top bottom"`, `end: "bottom top"`, `scrub: true` |
| 50 | No `window.addEventListener("scroll")` | PASS | Zero. The only listeners are two `keydown` handlers, for the lightbox and the drawer |
| 51 | Reduced motion honoured | PASS | Lenis never initialises and GSAP is never downloaded under `prefers-reduced-motion: reduce`; a global CSS floor also collapses every animation. **Verified in the browser**, which runs with reduced motion on: no GSAP or Lenis request was recorded |
| 52 | Dark mode tokens defined and tested in both modes | N/A | Single locked light theme, an explicit and documented override. `colorScheme: "light"` is declared, so the browser is told rather than left to guess |
| 53 | Mobile collapse explicit | PASS | Every multi-column layout declares its stacked fallback in the same component. Measured: zero horizontal overflow on all 6 pages at 390px |
| 54 | Viewport stability, `min-h-[100dvh]` not `h-screen` | PASS | `min-h-[100dvh]` in the layout; no `h-screen` anywhere |
| 55 | `useEffect` animations have cleanup | PASS | All four effects return a cleanup. The two dynamic-import effects also guard a `cancelled` flag, so a chunk landing after unmount cannot act |
| 56 | Empty, loading and error states provided | PASS | The form validates with inline errors below each field; `Proof` has a real empty state that degrades to verifiable outbound proof; images carry blur placeholders |
| 57 | Cards omitted in favour of spacing where possible | PASS | Hairlines and negative space throughout. The only enclosed cells are the package tiles, divided by `gap-px` rather than elevated |
| 58 | Icons from an allowed library only | PASS | Phosphor only, 13 import sites, no Lucide, no hand-rolled paths |
| 59 | Motion isolated in `'use client'` leaves | PASS | `SmoothScroll`, `HeroMedia`, `SetupMosaic`, `GalleryGrid`, `Lightbox`, `Accordion`, `DesktopNav`, `MobileNav`, `ContactForm`. Every section component is a Server Component |
| 60 | No AI tells from Section 9 | PASS | No Inter, no AI purple, no three equal feature cards, no "Jane Doe", no "Acme", no "Quietly in use at" |
| 61 | Core Web Vitals plausibly hit | PASS | The LCP element is a `priority` static import that moves rather than fades (fading it previously held LCP at 3.9s with 88% render delay); CLS guarded by static imports and explicit ratios; 116KB of motion library kept out of the initial bundle by dynamic import |
| 62 | One design system per project | PASS | Tailwind v4 plus one token layer. No component library mixed in |

**Applicable items: 54. PASS: 54. FAIL: 0. N/A: 8.**

No FAIL remains. The one item that failed on the first run, number 15, was
fixed and re-measured at nine viewport widths before being marked PASS.

### Verification method note

The preview pane runs with `prefers-reduced-motion: reduce`, which `CLAUDE.md`
section 10 warns will make motion correctly appear switched off. Both paths
were therefore checked separately: the reduced path was confirmed in the
browser (no motion library requested at all, which is the correct outcome), and
the full-motion path was verified by reading the guard logic in `SmoothScroll`
and `HeroMedia`.

Separately, the pane's screenshot capture returns a blank frame at any scroll
position above zero. This was investigated rather than assumed: hit-testing at
`scrollY` 1000 returns correctly positioned content, all ten sections measure
non-zero height with `opacity: 1` and `visibility: visible`, and the blankness
persists with `overflow-x` neutralised, which rules out the root `clip` rule.
It is a capture limitation of the pane, not a paint defect. All layout
conclusions above therefore come from computed styles and geometry, which is
what `CLAUDE.md` section 10 asks for in any case.

### Accessibility measurement across all six pages

Run against live computed styles, walking every text node, resolving each
node's real background through its ancestors, and applying the correct WCAG
threshold for its size and weight.

| Page | Text nodes @1440 | Contrast failures | `h1` count | Heading skips | Images missing alt | Horizontal overflow @1440 / @390 |
|---|---|---|---|---|---|---|
| `/` | 243 | **0** | 1 | none | 0 | 0 / 0 |
| `/studios` | 90 | **0** | 1 | none | 0 | 0 / 0 |
| `/pricing` | 101 | **0** | 1 | none | 0 | 0 / 0 |
| `/gallery` | 58 | **0** | 1 | none | 0 | 0 / 0 |
| `/faq` | 60 | **0** | 1 | none | 0 | 0 / 0 |
| `/contact` | 74 | **0** | 1 | none | 0 | 0 / 0 |
| **Total** | **626** | **0** | | | | |

Overflow was measured as `documentElement.scrollWidth` against `clientWidth`,
not against `innerWidth`, per `CLAUDE.md` section 10.

Collapsed panels are `inert` in all three places that need it: the accordion
panel, the mobile drawer, and the lightbox (which unmounts entirely when
closed). Client-side navigation was exercised and produced zero console errors.

One small inaccuracy worth correcting in a future pass, noted rather than
fixed here because it is a comment rather than behaviour: the `Lightbox` file
comment says the page behind is "marked inert". It is not; it is scroll-locked
and guarded by an explicit focus trap plus `aria-modal`, which achieves the
same result. The comment overstates the mechanism.

---

## Audit 8: frontend-only boundary

**PASS. No violations. Nothing was found that needed removing.**

Searched for, and absent:

| Forbidden | Result |
|---|---|
| API routes | **None.** No `src/app/api`, and a repository-wide search for `route.ts` / `route.tsx` returns nothing |
| Server actions for business features | **None.** Zero `"use server"` directives |
| Database clients | **None.** No Prisma, Mongoose, Drizzle, Supabase, Firebase |
| Authentication | **None.** No NextAuth, Clerk, or session handling |
| Payment backend | **None.** No Stripe or any payment SDK |
| Booking backend | **None.** Booking is an outbound link to the studio's existing Wix Bookings page |
| Email backend | **None.** No Nodemailer, Resend, SendGrid, Mailgun |
| CMS backend | **None.** No Contentful, Sanity, Strapi. Content is static TypeScript in `src/data/` |
| Serverless functions | **None.** No middleware, no edge functions |
| Webhook handlers | **None.** |

The entire runtime dependency list is eight packages: `next`, `react`,
`react-dom`, `@phosphor-icons/react`, `clsx`, `tailwind-merge`, `gsap`,
`lenis`. Nothing that talks to a server.

**Build evidence.** The production build marks **all 11 routes `○ (Static)`**,
prerendered at build time. Nothing runs at request time. `robots.ts` and
`sitemap.ts` are Next metadata conventions evaluated at build and emitted as
static files, which is the documented exception.

**The contact form is a shell and says so.** `ContactForm` validates in the
browser and nothing else. A valid submission does not fake a success state; it
renders "This form is not connected yet", confirms nothing was sent, leaves the
typed message in the box so it can be copied, and hands over WhatsApp and
email, which do work. That is a deliberate honesty decision, and the component
carries a header comment saying it must either be wired to a real endpoint or
removed before launch.

---

## Audit 9: preservation report

Taste-skill 11.F forbids changing route slugs, primary nav labels, form field
names, brand marks and legal copy without explicit approval. Here is every
intentional change, and everything deliberately left alone.

### Changed

**1. Route slugs. Changed, flagged as an open decision, and reversible in one
file.**

| New | Live equivalent |
|---|---|
| `/pricing` | `/podcast-studio-for-rent` |
| `/gallery` | `/photos-podcast-studio-for-rent-dubai` |
| `/faq` | `/podcast-studio-rental-dubai-faq` |
| `/studios` | new page, no legacy equivalent |
| `/contact` | new page, no legacy equivalent |

Why: the live slugs are keyword strings rather than paths, and
`/podcast-studio-for-rent` is really the pricing page. **This carries real
search risk and it is not settled.** It is mitigated structurally: every
internal path lives in `src/lib/routes.ts`, nothing hardcodes a path, and
`sitemap.ts` generates from the same object so it cannot drift. Reverting is an
edit to that one file plus the folder names, with no component changes. The
legacy slugs are recorded in that file for whoever makes the call. **A 301
redirect map is mandatory if this ships, and that is a hosting concern outside
this project's frontend scope.**

**2. Navigation labels. Reduced from ten items to five.**

Now: Studios, Pricing, Gallery, FAQ, Contact, plus a separate booking CTA. The
live site carries ten top-level items and hides half behind an overflow menu.
The labels themselves are the plain nouns a visitor expects; none was renamed
into something cleverer.

**3. CTA labels. Consolidated to one per intent.**

Booking is "Book Now" everywhere. The live site uses eight different labels for
this single action. Enforced by importing from `cta` in `src/data/site.ts`
rather than typing strings at call sites.

**4. Brand mark. Changed to a wordmark, explicitly as a placeholder.**

The existing logo is a 100x60 raster PNG, a black square with the name stacked
over three lines. There is no vector version, so it cannot be set at arbitrary
sizes. `Wordmark.tsx` sets the name in the display face with a single accent
dot, and its header comment states it is a placeholder to be replaced when the
studio supplies a real SVG. **The brand name itself is unchanged.**

**5. Colour direction. Changed from the existing brand blue to a light
editorial system with an electric yellow accent.**

This was a design decision taken earlier in the project and is recorded in
`globals.css`. It needs the studio's sign-off if it has not already been given.

### Not changed

**Booking destination links: unchanged, and pointed at the live systems.**
Every one of these is the studio's real, existing endpoint:

| Link | Destination |
|---|---|
| Booking | `https://www.dubaipodcaststudio.com/book-now` |
| WhatsApp | `https://api.whatsapp.com/send?phone=971503525271` |
| Maps | `https://maps.app.goo.gl/nPEsaNUGYzP8gmw56` |
| Email | `mailto:info@dubaipodcaststudio.com` |
| Terms of service | `https://www.dubaipodcaststudio.com/terms-of-service-video-recording-studio-dubai` |

**No business URL was invented, redirected or silently altered.** All five live
in `src/lib/routes.ts` under `external`, in one place, so a change to any of
them is a visible one-line diff rather than something buried in a component.

**Business contact information: unchanged.** Phone `+971 50 352 5271`, email
`info@dubaipodcaststudio.com`, address Tamani Arts Building, Business Bay,
Dubai. All carried over verbatim.

**Legal copy: not touched, not rewritten, not copied.** Terms of service
remains an outbound link to the live Wix page, deliberately, so the legal text
has exactly one canonical home. `src/lib/routes.ts` records why: "Legal copy
must carry over verbatim; it still lives on the Wix site."

**Facts, prices and policies: not invented.** Every figure came off the live
site with its source recorded next to it in `src/data/`. Where the live site
contradicts itself, the conflict is preserved and flagged rather than quietly
resolved.

---

## Outstanding, for the studio

None of these is a build defect. All predate this phase and none blocks the
audit.

1. **Five unresolved content flags in code**, each blocking a claim until
   answered: the "3,500+ podcasters" figure (the live site also says 3,000,
   "more than 1000 in 2023", and "hundreds"); the editing rate (FAQ 06 says
   1,000 AED/hour, FAQ 05 says 550); guest capacity (four versus five); the
   file-delivery fee (250 AED per session in FAQ 14, no fee in FAQ 35); and the
   editing turnaround (four to six business days versus three to four).
   *Note: `CLAUDE.md` states there are six such flags; the working tree
   contains five. Worth reconciling the doc.*
2. **Photography.** Eight gallery images are 360x640 video frames. Real
   high-resolution room photography would let the mosaic and lightbox breathe,
   and would finally allow images to be attributed to specific rooms.
3. **Testimonials.** `testimonials` is empty on purpose, and the section
   degrades to real Google and Instagram links. It switches over on its own the
   moment real quotes with attribution and permission are pasted in.
4. **Room-to-photograph attribution.** Nothing in the available media can be
   matched to a specific room, so no image is captioned with a room name.
5. **The contact form** must be wired to a real endpoint or removed before
   launch. If it is wired, the "not connected" message must be removed in the
   same change.
6. **The slug decision** in Audit 9, plus a 301 map if the new slugs ship.
7. **The YALLAPOD relationship.** Four of the seven rooms carry that name and
   the site does not explain why. One line is needed, and it will not be
   invented.
8. **Logo.** A vector version would replace the placeholder wordmark.
9. **Documentation drift.** `docs/design-audit.md` records the Phase 1
   direction, which was a dark navy theme on the existing brand blue with nine
   homepage sections. That was superseded by the light editorial system with
   ten sections that actually shipped. The document remains valuable as the
   record of the live-site analysis and the open questions, but its pre-flight
   table and colour decisions no longer describe the build.

---

## Summary

| Audit | Result |
|---|---|
| 1. Em dash and en dash | **PASS** (0 across 65 source and 112 emitted files) |
| 2. Section layout repetition | **PASS** (10 families across 10 sections, minimum 4) |
| 3. Hero discipline | **PASS after fix** (was FAIL: 3-line headline from 1024 to 1175) |
| 4. Theme consistency | **PASS** (one locked light theme, no flips) |
| 5. Image authenticity | **PASS** (18 real photographs, 0 fakes, 0 placeholders) |
| 6. UI slop check | **PASS** (6 questionable elements: 5 justified, 1 removed) |
| 7. Section 14 pre-flight | **PASS** (54 of 54 applicable, 8 N/A, 0 FAIL) |
| 8. Frontend-only boundary | **PASS** (0 violations, 11 of 11 routes static) |
| 9. Preservation report | **PASS** (5 intentional changes, all documented; 0 business URLs altered) |

`npm run lint`, `npm run typecheck` and `npm run build` all pass. Every route
builds as `○ (Static)`.
