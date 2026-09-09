# Dubai Podcast Studio - Redesign Audit and Strategy

Phase 1 deliverable. Discovery, audit, and redesign direction.
No implementation code is included by design.

Audit date: 2026-09-09
Source audited: https://www.dubaipodcaststudio.com/ (live, Wix)
Design authority: taste-skill v2, `design-taste-frontend` (installed via the `design-stack` plugin)
Scope boundary: frontend only. No backend, no API routes, no server actions, no CMS, no payment or messaging integrations.

---

## Revision 2 - direction change (2026-09-09)

The first visual direction, a dark navy theme built on the existing brand blue,
was rejected by the client. They supplied https://dhnn.com as the reference for
the output they want.

**What changed**

| | Revision 1 | Revision 2 |
|---|---|---|
| Ground | dark navy `#05141F` | white `#FFFFFF`, with dark ink sections as punctuation |
| Accent | brand blue `#078DDD` | electric yellow `#F2FF00`, client-selected |
| Display weight | 800 | 400 |
| Display case | sentence | lowercase |
| Shape | sharp 0 / 4px controls | sharp media / pill controls |
| MOTION_INTENSITY | 6 | 9, client-selected |
| Type | Cabinet Grotesk + Geist Sans | Switzer, one family |

**What this costs.** Taste-skill 11.C says to preserve existing brand tokens,
and the blue was preserved for that reason. Dropping it is the client's call
and their brand, but it does mean the new site will not be visually
recognisable to a returning customer. That is a real trade and it was made
knowingly.

**One concern, stated once and then set aside.** The reference is an agency
portfolio, where the site itself is the product demo, and it pins the hero and
hijacks scroll. This is a booking site whose job is to get a creator to a
booking form. MOTION_INTENSITY 9 was chosen deliberately after that trade-off
was put to the client. The mitigation is that the booking CTA stays reachable
at every scroll position, and the mobile sticky booking bar becomes more
important, not less.

Sections 3.1 to 3.6 below (the audit of the live Wix site) are unaffected.
Steps 4 and 9 have been updated in place. Everything else stands.

---

## Step 1 - Existing project inspection

### Verdict: there is no existing codebase

The working directory is not a repository. It contains no `package.json`, no framework, no routes, no components, no CSS, and no configuration. `git` is not initialised.

What the directory actually contains is a media scrape pulled from the studio's Google Maps listing:

| Path | Contents |
|---|---|
| `manifest.json` | Scrape metadata (tool version `V7.6.2-release-hybrid`, place `DUBAI PODCAST STUDIO`, created 2026-09-09) |
| `Photos/` | 3 files: 1 JPG (203 KB), 2 PNG (2.06 MB, 1.72 MB) |
| `Videos/` | 12 MP4 files, 212 KB to 2.06 MB each, about 9.2 MB total |

Implications:

1. **This is a greenfield build.** Nothing to preserve at the code level. No dependency inheritance, no stack constraint, no legacy CSS architecture.
2. **The live content and the 7 studio rooms are the real inheritance.** Content and information architecture carry forward, not code.
3. **The scraped media is not a usable asset library as-is.** Three stills and twelve short clips cannot carry a photography-led site. More importantly, provenance is unclear: Google Maps listings mix owner-uploaded and visitor-uploaded media, and the manifest does not distinguish them. See "Requires your review".

No dependencies were installed during this phase.

---

## Step 2 - Existing website inspection

### 2.1 Navigation structure

Ten top-level items, rendered on one line at wide desktop with an overflow "More" menu, and a hamburger on mobile.

| # | Label | Route |
|---|---|---|
| 1 | DUBAI PODCAST STUDIO | `/` |
| 2 | BOOK NOW | `/book-now` |
| 3 | PHOTO GALLERY | `/photos-podcast-studio-for-rent-dubai` |
| 4 | SAVING PACKAGES | `/podcast-studio-for-rent` |
| 5 | FAQ | `/podcast-studio-rental-dubai-faq` |
| 6 | FOR COACHES | `/podcast-studio-dubai-coaches` |
| 7 | FOR AGENTS & BROKERS | `/real-estate-podcast-studio-dubai` |
| 8 | STUDIO | `/studiopodcastdubai-rentapodcaststudio` |
| 9 | CLIENTS | `/dubaipodcaststudio-clients-podcast-studio-dubai` |
| 10 | TERMS OF SERVICE | `/terms-of-service-video-recording-studio-dubai` |

Plus Wix commerce chrome: a cart badge linking `/cart-page`, and a "Log In" member entry point. A member area exists ("My Subscription" tracks remaining package hours).

Two structural problems. First, the labels mix five different things: brand name, action, content type, audience segment, and legal. Second, item 1 duplicates the logo, so the brand appears twice in the same bar.

### 2.2 Page-by-page findings

**Home (`/`)** - 11,422px tall on desktop, 16,033px on mobile. 36 images. Section order: hero, photo strip, intro block, "only studio for rent in Business Bay" claim, founding story, three service tiers with prices, a long SEO block, a booking CTA, testimonials, footer.

**Book Now (`/book-now`)** - the strongest page on the site. Lists all 7 rooms with office numbers, a full equipment inventory, opening hours, transport and parking notes, a 2-step booking explanation, and 4 inline questions. This content is currently buried at nav position 2 and repeated nowhere else.

**Saving Packages (`/podcast-studio-for-rent`)** - three prepaid packages with real numbers, then roughly 1,200 words of SEO essay under them.

**Photo Gallery (`/photos-podcast-studio-for-rent-dubai`)** - 38,544px tall with 59 images. No filtering, no grouping by room, no lightbox hierarchy. Room names appear as plain headings between image blocks.

**FAQ (`/podcast-studio-rental-dubai-faq`)** - 21+ numbered questions. Genuinely useful and detailed (cancellation, SD cards, editing turnaround, parking, capacity). Currently a wall of accordion text with no grouping.

**Studio (`/studiopodcastdubai-rentapodcaststudio`)** - the "why us" essay page. Four themed blocks (audio quality, technology, guidance, environment). Reads as SEO prose rather than proof.

**For Coaches (`/podcast-studio-dubai-coaches`)** - a proper segment landing page. Clear promise, two CTAs ("Book Your Slot", "Save My Spot"), a benefits list. Short and focused. The best-written page on the site.

**For Agents & Brokers (`/real-estate-podcast-studio-dubai`)** - **this page is broken.** It is 7,662px tall and renders nav plus footer only. Total body text is 248 characters, all of it footer boilerplate. Of the 8 images on the page, 7 are the logo and social icons. It has a title tag and meta description, so it is indexable, but a visitor arriving from search sees an empty page. It sits at nav position 7.

**Clients (`/dubaipodcaststudio-clients-podcast-studio-dubai`)** and **Terms** - not audited in depth; Clients is a credibility page, Terms is legal boilerplate that must carry over verbatim.

### 2.3 Calls to action

Every CTA on the site resolves to `/book-now`, with one exception (`/copy-of-dps2?category=...`, a Wix store category link on the homepage services block, which is a different destination from the neighbouring CTAs doing the same job).

Labels currently in use for a single intent: "BOOK NOW", "Book Now", "BOOK", "Book Your Podcast Studio In Dubai in 1 Min", "CHECK OTHER STUDIOS AVAILABILITY - CLICK HERE", "BOOK YOUR PODCAST NOW!", "Book Your Slot", "Save My Spot". Eight labels, one intent.

A floating WhatsApp button (`https://api.whatsapp.com/send?phone=971503525271`) is fixed bottom-right on mobile. This works and should survive.

### 2.4 Services and pricing (as published)

| Service | Published rate |
|---|---|
| Audio recording (Shure SM7B) | 350 AED / hr, 2 hr minimum |
| Video + audio recording | 450 AED / hr |
| Full pack, filming + editing | 1,000 AED / hr |
| 10 hr video + audio package | 3,500 AED, valid 6 months |
| 10 hr recording + editing package | 8,500 AED, valid 6 months |
| 5 hr video + audio package | 1,980 AED, valid 6 months |
| Raw file delivery by email | 250 AED / session |
| Late reschedule fee | 150 AED |
| Cancellation | 50% refund |

### 2.5 Studios

Seven rooms, each with an office number in the Tamani Arts Building:

| Room | Office | Note |
|---|---|---|
| DPS 1 | 641 | Bookable online |
| DPS 2 | 727 | Special request only |
| DPS 3 | 925 | Special request only |
| YALLAPOD 1 | 831 | Bookable online |
| YALLAPOD 2 | 1041 | Bookable online |
| YALLAPOD 3 | 1103 | Bookable online |
| YALLAPOD 4 | 1102 | Special request only |

"More than 45 possible set-ups" comes from combining rooms with changeable backdrops.

The "YALLAPOD" name appears across room names, the gallery page, and a founding narrative, but is never explained in relation to "Dubai Podcast Studio". A first-time visitor cannot tell whether these are two businesses, a sub-brand, or a legacy name.

### 2.6 Equipment (from `/book-now`)

Audio: Shure SM7B microphones (4), Rodecaster Pro mixers.
Video: Sony A7S III 4K cameras (3 cameras used in a shoot, per FAQ 14).
Lighting: Godox full set, Elgato Key Lights, Philips Hue ambience, softboxes.
Accessories: teleprompter on an iPad Pro mount, motorised slider.
Streaming: encoding PCs for live production.
Capture: 4 SD cards per session, 1 sound mixer.

This is the single most persuasive block of content on the entire site and it is currently plain text on an inner page.

### 2.7 Trust signals

Present: 3,500+ podcasters, creators from 75 countries, 7 studios, 45+ set-ups, "same microphones as Joe Rogan", "Netflix approved" cameras, 20 years staff experience, "celebrity farm" positioning, Business Bay and Burj Khalifa proximity, six social profiles (Instagram, TikTok, YouTube, LinkedIn, Facebook, Medium), a Google Maps listing.

Absent or broken: **the testimonials are unedited Wix template placeholders.** The live homepage carries "Alexa Young, CA" with the text "Testimonials provide a sense of what it's like to work with you or use your products. Change the text and add your own.", plus "Morgan James, NY" and "Lisa Driver, MI", and the same three are repeated twice for six slots. This is the most damaging single item on the site: it tells a prospective customer that nobody maintains this business's web presence.

Also absent: no visible Google review rating, no named client, no embedded creator content, despite an active Instagram and a "celebrity farm" claim.

### 2.8 Location and contact

Address: Tamani Arts Building, Business Bay, Dubai. Office and studio.
Maps: `https://maps.app.goo.gl/nPEsaNUGYzP8gmw56`
Email: `info@dubaipodcaststudio.com`
Phone and WhatsApp: +971 50 352 5271
Hours: open daily until 11 PM (Sunday 9 PM). Booking hours weekdays 8 AM to 10 PM, Sundays 9 AM to 8 PM.
Parking: guest parking in the building, near the lobby, ask security.

### 2.9 Booking path

Click "BOOK NOW", then the Wix Bookings page, then choose date and time, then add to cart, then pay (Apple Pay supported). Packages are bought as products and drawn down via a member-area "My Subscription" counter. Sessions are booked in 1 hour blocks, repeated per additional hour.

For the redesign this stays external. The new site links out to the existing booking system. No booking logic is rebuilt.

---

## Step 3 - Taste Skill Section 11 redesign audit

### 3.1 Brand tokens currently in use

Measured from computed styles on the live homepage.

**Colour**

| Token | Value | Where |
|---|---|---|
| Brand navy | `rgb(2, 47, 74)` / `#022F4A` | Section grounds, footer, headings |
| Brand blue | `rgb(7, 141, 221)` / `#078DDD` | Primary buttons, accents |
| Pale blue | `rgb(165, 214, 244)` / `#A5D6F4` | Secondary fills |
| Navy 80% | `rgba(5, 94, 147, 0.8)` | Overlay panel |
| White | `#FFFFFF` | Dominant background |
| Pure black | `#000000` | Body text (56 elements) and the logo tile |
| Stray blues | `#116DFF`, `#0069FF` | Wix chrome, not brand |

The palette is coherent on paper: navy plus blue plus pale blue. It is not coherent in practice. The hero photograph is saturated magenta and violet neon, which belongs to no token in the system, so the first screen contradicts the brand palette. Body text is pure `#000000` on pure `#FFFFFF`, which flattens depth.

**Typography**

Seven families are live on the homepage: Arial (47 nodes), helvetica-w01-bold (42), helvetica-w01-light (10), avenir-lt-w01_85-heavy (4), Open Sans (4), helvetica-w01-roman (2), din-next-w01-light (1), Playfair Display (1). There is no type system. Headlines are uppercase Helvetica Bold at large sizes; the H1 runs to four lines on desktop and five on mobile.

**Hierarchy**

One `<h1>` on the homepage, which is correct. Below that the hierarchy collapses: `<h2>` is used for the hero subtitle, section titles, a promotional claim, a CTA link, and the footer's "Address", "Email" and "Social" labels. An `<h3>` sits under an `<h2>` that is not its parent topic. Section titles are indistinguishable in weight from CTAs.

**Border radius**

Six values in use with no rule: `200px`, `100px`, `60px`, `50%`, `24px`, `5px`. Pill CTAs sit next to 5px cards.

**Icons**

Raster social icons at 25x25 in the footer. No icon system anywhere else in the page body.

**Imagery**

Real studio photography, which is the site's biggest asset. Treatment is inconsistent: uniform aspect ratios, no crop discipline, no grading, mixed colour temperature between rooms. 36 images on the homepage, 59 on the gallery. Of the 36 homepage images, 9 have no `alt` attribute. The alt text that does exist is keyword-stuffed rather than descriptive, for example an image described as a "Male guest in white sweatshirt during podcast session at Dubai podcast studio setup podcast studio Dubai", which repeats the target keyword twice inside one alt string.

**Logo**

A raster PNG served at 100x60, a black square with white bold condensed uppercase type stacked over three lines. Alt text is correct ("Dubai Podcast Studio logo"). It is recognisable and reads well at small sizes. It does not scale to a favicon or a light-on-dark context without a variant.

**Spacing**

No consistent rhythm. Section padding varies arbitrarily between blocks because Wix positions elements absolutely rather than in a flow with a scale.

**Inferred dial reading of the existing site**

- `DESIGN_VARIANCE: 3` - stacked, centred, symmetrical blocks throughout.
- `MOTION_INTENSITY: 2` - hover states and a Wix reveal, nothing else.
- `VISUAL_DENSITY: 7` - very high, driven by SEO copy volume rather than by information value.

### 3.2 Information architecture

**Current page tree**

```
/
├── /book-now                                        (booking + rooms + equipment + hours)
├── /photos-podcast-studio-for-rent-dubai            (gallery, 59 images)
├── /podcast-studio-for-rent                         (packages, labelled "Saving Packages")
├── /podcast-studio-rental-dubai-faq                 (21+ questions)
├── /podcast-studio-dubai-coaches                    (segment landing)
├── /real-estate-podcast-studio-dubai                (segment landing, EMPTY)
├── /studiopodcastdubai-rentapodcaststudio           (why us, labelled "STUDIO")
├── /dubaipodcaststudio-clients-podcast-studio-dubai (clients)
├── /terms-of-service-video-recording-studio-dubai   (legal)
├── /cart-page                                       (Wix commerce)
└── (member area / login)                            (Wix, package hour tracking)
```

**Slug problem.** Every slug is keyword-stuffed and none matches its nav label. "SAVING PACKAGES" lives at `/podcast-studio-for-rent`. "STUDIO" lives at `/studiopodcastdubai-rentapodcaststudio`. A user cannot predict a URL, and the slugs read as spam to a human.

**Conversion paths.** Exactly one: any CTA to `/book-now` to the Wix booking widget. There is no browse path (see a room, then book that room), no compare path (compare rates before booking), and no reassurance path (read the cancellation terms before committing). The FAQ answers all three but is a separate destination that most visitors will never reach.

**Footer architecture.** Three columns: Address, Email, Social, plus a repeated booking CTA. Minimal, and it works. No sitemap links, which means the deep pages are reachable only through the nav overflow.

### 3.3 Patterns worth preserving

1. **The logo.** Recognisable, bold, works small. Keep the wordmark, produce proper vector and light-on-dark variants.
2. **The brand blue and navy.** `#078DDD` and `#022F4A` are a genuine, ownable pair for a studio brand. Preserving them satisfies the skill's brand-fidelity rule and keeps the site recognisable to returning customers.
3. **Business Bay positioning.** "The only podcast studio for rent in Business Bay" and "5 minutes from Burj Khalifa" are concrete, local, and differentiating.
4. **Studio photography.** Real rooms, real people, real sessions. This is the entire basis for a photography-led redesign.
5. **Named rooms with office numbers.** DPS 1 to 3 and YALLAPOD 1 to 4 give the business seven distinct products instead of one generic room. Currently underused.
6. **The equipment inventory.** Specific, verifiable, and exactly what the target audience evaluates.
7. **The FAQ content.** Detailed and honest, including the parts most sites hide (cancellation fees, SD card requirements, editing turnaround, what is not included).
8. **The three-tier service model.** Audio, then video plus audio, then full pack, is a clean ladder that customers understand.
9. **The segment page concept.** "For Coaches" proves segment landing pages work for this business.
10. **WhatsApp as a live channel.** Correct behaviour for this market and audience.
11. **The external booking system.** Working, paid-integrated, with a package-hours member area. Do not touch it.

### 3.4 Patterns that should be retired

Each item below was observed directly during this audit.

1. **Wix placeholder testimonials.** "Alexa Young, CA", "Morgan James, NY", "Lisa Driver, MI" with template copy, shown twice. Remove immediately.
2. **Keyword-stuffed body copy.** The phrase "podcast studio Dubai" and its permutations are repeated inside almost every paragraph on every page, often mid-sentence where it breaks grammar ("Powered by our podcast studio Dubai team, we ensure your edit sounds clean and pro").
3. **An empty page in the main navigation.** `/real-estate-podcast-studio-dubai` renders no content.
4. **A 38,544px gallery.** 59 ungrouped images with no filtering and no hierarchy.
5. **The four-line hero headline.** "DUBAI PODCAST STUDIO - BEST PODCAST STUDIO DUBAI HAS TO OFFER" runs four lines on desktop and five on mobile. It is a search query, not a headline.
6. **Fixed 320px mobile rendering.** The mobile viewport meta is `width=320, user-scalable=yes`, so the page renders at a fixed 320 CSS pixel width and is scaled up by the device. On a modern phone this produces upscaled, soft type and a layout that cannot use available width.
7. **A 16,033px mobile homepage.** Roughly 20 phone screens of scroll before the footer.
8. **Eight CTA labels for one intent.** Listed in 2.3 above.
9. **Seven font families and six radius values.** No system in either dimension.
10. **Heading hierarchy used for styling.** `<h2>` applied to CTAs, subtitles, and footer labels.
11. **Missing and keyword-stuffed alt text.** 9 of 36 homepage images have no alt; the rest repeat the keyword.
12. **Pure black on pure white.** Flat, and contrary to the skill's off-black and off-white rule.
13. **Unexplained dual branding.** "YALLAPOD" versus "Dubai Podcast Studio".
14. **Invented brand lore.** The gallery page carries a passage claiming that studios worldwide were founded in imitation of Yallapod and adopted it as a benchmark. This is unverifiable and reads as filler.
15. **Superlatives instead of evidence.** "Best podcast studio in Dubai" appears more than twenty times across the site. The equipment list proves more than the superlative does.
16. **Emoji used as UI furniture.** Clock, microphone, tick and warning emoji appear as section markers and list bullets on `/book-now` and `/podcast-studio-for-rent`.
17. **Em dashes and en dashes throughout the source copy.** Present in FAQ answers and package copy. All must become plain hyphens in the rebuild.

### 3.5 Content contradictions requiring verification

These are conflicts between two or more live pages on the same site. **None of these should be resolved by guessing.** Every one needs a factual answer from the studio before the copy is written, and each must be marked in code as unverified until then.

| # | Claim A | Claim B | Where |
|---|---|---|---|
| 1 | Up to 4 guests | Up to 5 guests in studio, 4 optimised for recording | Home and FAQ 10 vs `/book-now` |
| 2 | 7 studios | "our five studios" | Home vs gallery page |
| 3 | 3,500+ podcasters | 3,000 clients, "more than 1000 podcasters in 2023", "hundreds of happy podcasters", "Thousands" | Home, gallery, FAQ 20, `/podcast-studio-for-rent` |
| 4 | Editing 550 AED / hr | Audio + video + editing 1,000 AED / hr | FAQ 5 vs FAQ 6, FAQ 20, home |
| 5 | "Save 15% with our 10-hour package" | 10 hr at 3,500 AED against 10 x 450 AED is a 1,000 AED saving, about 22% | `/book-now` vs `/podcast-studio-for-rent` |
| 6 | "best equipment from 2024" | "2025 Podcast Equipment" | FAQ 17 and 19 vs `/podcast-studio-for-rent` |
| 7 | Open daily until 11 PM | Booking hours end 10 PM weekdays | Both on `/book-now` |
| 8 | Raw files in 2 to 3 days | "Starting 2026, shortened to 1 to 2 days" | `/book-now`, now past the stated date |

Additionally, "Netflix approved" cameras and "20 years experience" are marketing claims that carry legal and credibility weight. They will be carried over exactly as the studio states them, flagged in code, and not embellished.

### 3.6 SEO baseline (migration risk)

This is the highest-risk part of the project. The current site ranks on aggressively optimised slugs and title tags.

Current title tags observed:

- `/` - "DUBAI PODCAST STUDIO | Podcast Studio Rental | Podcast Studio Dubai"
- `/book-now` - "Rent A Podcast Studio In Dubai | Dubai Podcast Studio"
- `/photos-podcast-studio-for-rent-dubai` - "Dubai Podcast Studio Gallery | Podcast Studio Dubai for Rent"
- `/podcast-studio-for-rent` - "Podcast Studio Dubai Pricing Plans | Rent with Dubai Podcast Studio"
- `/podcast-studio-rental-dubai-faq` - "Rent A Podcast Studio Dubai | Dubai Podcast Studio | Business Bay"
- `/podcast-studio-dubai-coaches` - "Podcast Studio for Coaches in Dubai Record & Grow Your Personal Brand"
- `/real-estate-podcast-studio-dubai` - "Podcast Studio Dubai for Real Estate Agents & Brokers"
- `/studiopodcastdubai-rentapodcaststudio` - "Rent The Best Podcast Studio Dubai Has to Offer | Dubai Podcast Studio"

OG image is a Wix static asset. No structured data was found for `LocalBusiness`, `Service`, or `FAQPage`, which is a missed opportunity given the address, hours, price range and 21 questions already on the site.

**Consequence for this project:** taste-skill 11.F forbids changing route slugs without explicit approval. Slugs are therefore treated as a decision for you, not for me. See "Requires your review".

---

## Step 4 - Taste design dials

### Design read

**Reading this as: a redesign-overhaul of a premium creator-services landing site for image-conscious, mobile-first buyers in Dubai, with a white editorial agency language, leaning toward Next.js and Tailwind v4 with oversized typography, pill controls and heavy scroll choreography.**

### DESIGN_VARIANCE: 8

Taste-skill 1.A places "premium consumer / luxury / brand" at 7 to 8, and 1.B places a premium consumer landing at 7. The redesign-overhaul modifier adds 2 to the existing site's reading, and the existing site reads at 3, which also lands at 5 to 7.

I am setting 7 rather than 8 or 9 because this is a booking site with a transactional job. Seven is enough to require asymmetric composition, off-centre heroes, mixed aspect ratios and a broken grid, which is exactly what kills the current stacked-and-centred Wix feel. Going to 9 would push toward agency-portfolio experimentation that fights the primary goal, which is getting a creator to book a room in under two minutes.

At 7 the rules that bind are: no centred hero, fractional grid columns rather than equal thirds, deliberate overlap and negative space, and at least four distinct layout families across the homepage.

### MOTION_INTENSITY: 9

Revised upward from 6 at the client's direction, after the trade-off was put to them explicitly.

Taste-skill 1.A places "playful / experimental / agency" at 8 to 10, which is the band the reference site sits in. This business also genuinely sells motion as a product: a studio that records video cannot present itself on a static page.

Nine means: a pinned hero, scroll-hijacked horizontal panning for the seven rooms, kinetic repeating type, scrubbed timelines, counters, and smooth scroll. GSAP ScrollTrigger drives the pinned and scrubbed work; Lenis drives smooth scroll and is bridged to ScrollTrigger through a single ticker so pinned sections do not lag a frame behind the content.

Two hard obligations come with this number. First, "motion claimed, motion shown": at 9 the page must actually move, and a static page claiming 9 is broken work. Second, and more important, `prefers-reduced-motion` is not a nicety here. Under that preference the smooth-scroll layer does not initialise at all, native scrolling is left alone, and every choreographed component degrades to static. Hijacking scroll from someone who has asked their OS for less motion is one of the fastest ways to make a site unusable, and vestibular disorders are a real accessibility concern rather than a preference.

### VISUAL_DENSITY: 4

Taste-skill 1.B places premium consumer landing at 3 and mainstream landing at 4. The overhaul modifier says match the existing density, which reads at 7.

I am deliberately not matching 7. The existing density is inflated by SEO copy that we are retiring, not by information the customer needs. Once the keyword essays are cut, the genuine content load is: three services, seven rooms, six price points, an equipment list and around twenty questions. That is a real payload, more than an art-gallery site can carry, which rules out 2 to 3.

Four means `py-20` to `py-32` section rhythm, generous but not gallery-empty, mono numerals for prices, and room for the equipment specification to be shown properly rather than teased.

### Overall design read, one sentence

A white editorial creative-studio site where oversized low-weight type and full-bleed photography carry the argument, electric yellow appears only as a fill, and every screen moves the visitor closer to a booking.

---

## Step 5 - Recommended redesign mode

### Greenfield-with-content-preserved

This maps to taste-skill 11.A "Redesign - Overhaul", executed as a greenfield build.

**Why not Preserve.** Preserve modernises without breaking the existing structure. There is no structure to preserve. Fixed 320px mobile rendering, absolutely positioned Wix layout, seven font families and six radius values are not defects to be repaired, they are the absence of a design system. Taste-skill 11.E is explicit: when the visual debt is structural and mobile is broken, the answer is a full redesign with strict content preservation.

**Why not pure Greenfield.** Pure greenfield discards content and IA. That would be reckless here. The site has a working booking funnel, a genuinely strong FAQ, an equipment inventory that sells the business better than any copy on the page, seven named rooms, and search rankings on commercially valuable local queries. Throwing that away to start from a blank brief would destroy the most valuable thing the business owns online.

**What this means in practice.**

- Visual language: start from zero. New type system, new grid, new spacing scale, new composition.
- Brand tokens: preserve. `#078DDD` and `#022F4A` carry forward as the accent and the brand anchor, per taste-skill 11.C.
- Content: preserve and edit. Every factual claim, price, room name, equipment item and FAQ answer carries over. Keyword padding is cut. Nothing factual is invented.
- Information architecture: restructure, but only with your approval on slugs (11.F).
- Booking flow: untouched. The new frontend links out to the existing Wix booking system.

**Explicitly, preservation here does not mean reproducing the Wix layout.** No section of the new site should be a tidier version of a current section. The current composition is being replaced entirely.

---

## Step 6 - Proposed information architecture

### Recommendation: 6 pages plus legal

| Page | Verdict | Reasoning |
|---|---|---|
| **Home** | Keep | The conversion page. Rebuilt from scratch. |
| **Studios** | **New page, high priority** | Seven named rooms are currently scattered across `/book-now` and the gallery. They are the product. They deserve a page where each room has photography, capacity, backdrop options, office number and its own booking link. |
| **Pricing** | Keep, merge | Merge the three service tiers (currently on Home) with the three prepaid packages (currently on `/podcast-studio-for-rent`). One page answering "what does this cost" completely. Absorbs the editing scope detail from FAQ 6. |
| **Gallery** | Keep, restructure | Cut from 59 ungrouped images to a filtered grid by room and by setup. Not a 38,000px scroll. |
| **FAQ** | Keep | Content is strong. Group the 21+ questions into 4 clusters: Booking and payment, In the studio, Equipment and files, Getting here. Add `FAQPage` structured data. |
| **Contact / Location** | Keep, upgrade | Currently only a footer block. Business Bay is a selling point and deserves a page: map, parking, building entry, hours, WhatsApp, email. |

### Content that becomes sections, not pages

| Current page | Becomes |
|---|---|
| `/book-now` | Split. Room list to Studios. Equipment to a Home section and a Studios block. Hours, parking and transport to Contact. The CTA itself links out to the external booking system. |
| `/studiopodcastdubai-rentapodcaststudio` ("STUDIO") | A short founding-story section on Home plus an About block on Studios. Four screens of "why us" essay does not warrant a page. |
| `/dubaipodcaststudio-clients-podcast-studio-dubai` ("CLIENTS") | A creator-proof section on Home. Only if real client material exists. See review items. |

### Segment pages: keep, but conditionally

`/podcast-studio-dubai-coaches` is well written and clearly serves a search intent. `/real-estate-podcast-studio-dubai` is empty but is targeting a real and lucrative Dubai audience.

Recommendation: keep both as a `/for/coaches` and `/for/real-estate` pattern, built from one reusable segment template, but **only after checking Search Console** for whether these URLs actually earn impressions. If they do not, they are two more pages to maintain for no return, and the audiences are better served by a single section on Home. This is a data question, not a design question.

### Proposed nav: 5 items plus one CTA

```
Logo    Studios   Pricing   Gallery   FAQ   Contact        [ Book Now ]
```

Ten items becomes five plus a visually distinct primary CTA. Terms moves to the footer where legal links belong. The brand name is removed from the nav because the logo already occupies that role. Segment pages, if retained, are linked contextually from Home and Pricing rather than from the top nav.

This meets the skill's hard rules: one line at desktop, 80px maximum height, and it fits comfortably at 1024px.

### What I am not proposing

No blog, no case studies, no team page, no careers page, no separate "About". Taste-skill and the brief agree: do not create pages to inflate a page count. Six pages is what this business needs to sell a room.

---

## Step 7 - Conversion hierarchy

### Primary CTA: "Book Now"

One label, one intent, everywhere. Taste-skill 4.5 forbids duplicate CTA intent, and the current site has eight labels doing this job.

"Book Now" wins over alternatives because it is the label already in the nav, already on every button, already familiar to returning customers, two words (inside the three-word cap for a primary CTA), and unambiguous. It also preserves whatever click tracking already exists on that label.

Destination: the existing external booking URL. On the Studios page, each room's button carries the same label but deep-links to that room's booking option where the external system supports it.

Placement:

- Persistent in the desktop navigation bar, right-aligned, as the only filled button in the nav.
- In the hero, above the fold, as the visually dominant element after the headline.
- At the end of the pricing section.
- In the final section, at full weight.

Four placements on Home. Not one per section.

### Secondary CTA: "See the studios"

One label, one intent. It serves the visitor who is not ready to pick a date but wants to see the rooms. This is the browse path the current site is missing entirely.

Treatment: outline or text-plus-arrow, never a second filled button. It sits beside the primary in the hero, and nowhere else at that weight.

### Tertiary channel: WhatsApp

Not a CTA in the conversion sense. It is a support channel for the "special request only" rooms, group bookings above four people, and pricing questions. Existing URL preserved.

Treatment: a floating action button on mobile only (as today), and an inline link in Contact and in the pricing section's fine print. Never competing with "Book Now" for visual weight.

### Visual priority, in order

1. `Book Now` - filled, brand blue, highest contrast element on the page.
2. `See the studios` - outline or arrow link, same size, lower contrast.
3. `WhatsApp` - icon FAB on mobile, plain link on desktop.
4. Everything else - text links.

Only one filled button style exists in the entire system. If a button is filled and blue, it books a session. That consistency is what makes the CTA legible at a glance.

### Mobile CTA behaviour

The audience is mobile-first, so this is the most important interaction on the site.

- **Hero:** primary CTA visible without scrolling, full width or near it, minimum 48px tall.
- **Sticky booking bar:** appears after the hero scrolls out of view. A slim bottom bar carrying the price anchor ("From 350 AED / hr") and a `Book Now` button. It is the single highest-leverage mobile pattern for this business, because the visitor is browsing photography and the price and the booking action follow them down the page.
- **WhatsApp FAB:** stays bottom-right as today, but must be offset so it never overlaps the sticky bar. The two need a shared layout rule, not independent `position: fixed` declarations.
- **Safe area:** both respect `env(safe-area-inset-bottom)` on iOS.
- **Tap targets:** 44px minimum, per WCAG.
- **No interstitials.** No popups, no exit-intent modals, no newsletter overlay.

---

## Step 8 - Homepage architecture

Nine sections, nine distinct layout families. Taste-skill requires at least four families across eight sections, so this comfortably clears the bar and satisfies the Section-Layout-Repetition ban.

**Eyebrow budget:** `ceil(9 / 3) = 3` maximum. Two are allocated (sections 4 and 7). The hero uses none.
**Zigzag check:** no three consecutive image-plus-text splits. Sections 5 and 6 are the only adjacent pair, and section 7 breaks the run.
**Marquee budget:** one maximum. Zero allocated.

---

### 1. Hero

- **Objective:** in under three seconds, establish that this is a premium video and audio studio in Business Bay, and put the booking action in reach.
- **Content:** headline, maximum 2 lines. Subtext, maximum 20 words. Primary CTA plus secondary CTA. No eyebrow, no trust strip, no price teaser, no scroll cue. Maximum 4 text elements total.
- **Draft direction (copy finalised in a later phase):** the headline names the studio and the city with confidence rather than reciting a search query. Subtext carries the one concrete differentiator, which is Business Bay plus seven rooms.
- **CTA:** `Book Now` (primary), `See the studios` (secondary).
- **Layout family A:** full-bleed media with left-anchored type in a fractional grid. Not centred, per the anti-centre rule at variance 7.
- **Density:** 2. One idea, one action, large negative space.
- **Images:** one hero asset, either a landscape still of a lit room mid-session at 2400x1350 minimum, or a muted, autoplaying, looping clip of the same with a still poster frame. Must carry a scrim so the headline and both CTAs clear WCAG AA over it. Top padding capped at `pt-24`.

---

### 2. Credibility strip

- **Objective:** convert the hero's claim into evidence immediately, in one glance.
- **Content:** the studio's real figures only. 3,500+ podcasters, 75 countries, 7 studios, 45+ setups. Plus a link to the Google Maps listing for reviews. Figures 1 and 3 are subject to the contradictions in 3.5 and must be confirmed before they ship.
- **CTA:** none. This section does not compete with the hero.
- **Layout family B:** a single horizontal band, hairline-separated, sitting directly under the hero. Not cards.
- **Density:** 3.
- **Images:** none. Numerals set in mono, per the density rule.
- **Note:** taste-skill's default for this slot is a logo wall of real client SVGs. That is wrong for this business. Its social proof is individual creators, not corporate logos, and inventing brand logos would be fabrication. Real numbers plus a real review link is the honest version of the same section.

---

### 3. What you can record

- **Objective:** present the three service tiers as a ladder the visitor can place themselves on.
- **Content:** Audio recording (350 AED/hr, 2 hr minimum). Video plus audio (450 AED/hr). Full pack with filming and editing (1,000 AED/hr). One line of scope per tier, no essay.
- **CTA:** each tier links to Pricing. Section-level `Book Now` is not repeated here.
- **Layout family C:** asymmetric bento, exactly 3 cells. One large featured cell (video plus audio, the volume seller) plus two smaller cells. Explicitly not three equal columns, which taste-skill 9.C bans.
- **Density:** 4.
- **Images:** at least 2 of the 3 cells carry real photography, per the bento background diversity rule. Featured cell needs a 3:2 room shot mid-session; the audio cell needs a close crop of the SM7B on its boom.

---

### 4. The seven studios

- **Objective:** turn one generic "studio rental" into seven distinct products, and give the visitor a reason to look rather than bounce. This is the section that most differentiates the new site from the old one.
- **Content:** one panel per room. DPS 1 to 3 and YALLAPOD 1 to 4. Each carries the room name, office number, capacity, backdrop or setup count, and its booking state (bookable online, or special request only). The "special request only" state must be honest and visible, not hidden.
- **CTA:** per-room `Book Now`, plus a section-level link to the Studios page.
- **Layout family D:** horizontal scroll rail with snap on mobile and a scroll-pinned horizontal pan on desktop. This is the one place where the motion budget is spent on a pinned sequence, and it is motivated: the motion communicates that there are seven of these and lets the visitor traverse them without a 7,000px vertical scroll.
- **Density:** 3 per panel, high overall.
- **Images:** **7 required, one per room, wide crop, minimum 1800px wide, colour-graded to one look.** This is the largest asset dependency in the project. Rooms shot at different colour temperatures will visibly break this section.
- **Eyebrow:** allocated (1 of 3).

---

### 5. The kit

- **Objective:** answer "is the gear actually good" with specifics, because this audience evaluates on specifics.
- **Content:** the equipment inventory, grouped into four clusters rather than listed as rows. Audio (Shure SM7B x4, Rodecaster Pro). Video (Sony A7S III 4K, 3-camera setup). Light (Godox, Elgato Key Light, Philips Hue, softboxes). Extras (teleprompter, motorised slider, encoding PCs for live).
- **CTA:** none. This section builds confidence, it does not ask.
- **Layout family E:** editorial split. One large equipment photograph held to one side, four grouped clusters set against it. Explicitly not a hairline specification table, which taste-skill 4.9 bans by name.
- **Density:** 5. The densest section on the page, and appropriately so.
- **Images:** 1 large detail shot, 4:5 or 3:4 portrait, of the mic and mixer or the camera array. Shallow depth of field, dark ground.

---

### 6. How a session works

- **Objective:** remove the friction of not knowing what happens on the day. Directly addresses the FAQ questions about arrival time, setup time and what to bring.
- **Content:** three beats, labelled with verbs rather than stage numbers (taste-skill bans "Step 1 / Stage 1" labelling). Pick a room and a time. Turn up and record with an operator. Take the files, or take the edit. Each carries one line drawn from the real FAQ answers, including the honest detail that setup time counts against the booking.
- **CTA:** `Book Now` at the end of the sequence.
- **Layout family F:** sticky media on one side, the three beats scrolling past it on the other. Different from family E because the media is pinned and the text moves, and different from family C because it is sequential rather than a grid.
- **Density:** 3.
- **Images:** 3 supporting stills, or one clip that changes with the active beat. Arrival, recording, and handover.

---

### 7. Rates and packages

- **Objective:** give the price without making anyone hunt for it, and make the 10 hour package the obvious choice for a committed creator.
- **Content:** the three hourly rates and the three prepaid packages (10 hr video plus audio at 3,500 AED, 10 hr with editing at 8,500 AED, 5 hr video plus audio at 1,980 AED, all valid 6 months). Plus the honest fine print: 2 hour minimum on audio, 50% cancellation refund, 150 AED late reschedule.
- **CTA:** `Book Now` per package. `See full pricing` to the Pricing page.
- **Layout family G:** asymmetric pricing panel. One featured package at large scale beside two stacked smaller ones, three cells for three packages, with the hourly rates set as a compact rate line above. Not a matrix, not three equal cards.
- **Density:** 5. Numerals in mono.
- **Images:** none. This section is typographic on a single ground, which deliberately gives the eye a rest between the photography-heavy sections either side.
- **Eyebrow:** allocated (2 of 3).

---

### 8. Answers before you book

- **Objective:** resolve the four objections that stop a booking, at the moment of decision.
- **Content:** four questions only, selected from the existing FAQ. How many guests fit. What happens if I cancel or reschedule. Do I get the raw files. Where do I park. All four answers already exist and are honest.
- **CTA:** `Read all questions` to the FAQ page.
- **Layout family H:** accordion on a quiet ground. Closed by default, one open at a time.
- **Density:** 4.
- **Images:** none.
- **Note:** placed after pricing on purpose. These are objections, and objections arrive after the price does.

---

### 9. Business Bay, and the booking

- **Objective:** close on the location advantage and take the booking.
- **Content:** address (Tamani Arts Building, Business Bay), the Burj Khalifa proximity, opening hours, parking note, map link, WhatsApp, email. Final CTA at full weight.
- **CTA:** `Book Now`, primary, largest instance on the page.
- **Layout family I:** full-bleed location or building photography with a contact block set into it. Runs into the footer rather than sitting as a boxed card.
- **Density:** 3.
- **Images:** 1 wide exterior or district shot, ideally at dusk. A static map image is acceptable as a secondary element; an embedded interactive map is not, because it costs third-party JavaScript and hurts the LCP target for no conversion benefit. The address links out to the existing Google Maps URL.

---

### Section-by-section summary

| # | Section | Layout family | Density | Images | CTA |
|---|---|---|---|---|---|
| 1 | Hero | A: full-bleed media, left type | 2 | 1 hero asset | Book Now + See the studios |
| 2 | Credibility strip | B: horizontal band | 3 | 0 | none |
| 3 | What you can record | C: asymmetric 3-cell bento | 4 | 2 | to Pricing |
| 4 | The seven studios | D: pinned horizontal rail | 3 | 7 | Book Now per room |
| 5 | The kit | E: editorial split | 5 | 1 | none |
| 6 | How a session works | F: sticky media, scrolling beats | 3 | 3 | Book Now |
| 7 | Rates and packages | G: asymmetric pricing panel | 5 | 0 | Book Now |
| 8 | Answers before you book | H: accordion | 4 | 0 | to FAQ |
| 9 | Business Bay and booking | I: full-bleed close | 3 | 1 | Book Now |

**Total image requirement for the homepage: 15 assets minimum.** This is the critical path for the build.

---

## Step 9 - Visual design direction

Revised. This section supersedes the dark-navy direction; see Revision 2 at the top.

### Colour philosophy

**One light system, locked.** White ground throughout, with the dark ink ground used as full-bleed punctuation between white sections. That is a compositional device, not theme flipping: the chrome does not change, the nav does not invert, and the visitor never feels they walked into a different website.

**One accent, and it is a fill.** This is the rule that governs everything else, and it comes from a measurement rather than a preference:

> Electric yellow on white measures **1.10:1**. It is invisible.

So the accent is never text, never a border, never a focus ring and never an icon on a light ground. It is a filled shape with ink on top, which measures 15.81:1. On the dark ink ground the relationship inverts and yellow as text measures 15.81:1, so there it is used freely. The `Button` component deliberately offers no variant that would let anyone break this, and `Eyebrow` switches to muted on light and accent only on ink.

| Token | Value | Measured |
|---|---|---|
| `paper` | `#FFFFFF` | page ground |
| `ash` | `#F4F4F4` | quiet alternate, ink 15.82:1 |
| `ink` | `#1A1A1A` | 17.40:1 on white; also the dark section ground |
| `muted` | `#6E6E6E` | 5.10:1 on white, 4.64:1 on ash |
| `muted-dark` | `#A3A3A3` | 6.90:1 on ink |
| `line` | `#E5E5E5` | decorative hairline on light |
| `line-strong` | `#8A8A8A` | 3.45:1, interactive borders on light |
| `line-dark` / `line-dark-strong` | `#3A3A3A` / `#666666` | the same two roles on ink |
| `accent` | `#F2FF00` | fill only on light. 1.10:1 as text on white |
| `accent-hover` | `#DCE800` | ink stays at 12.92:1 |
| `accent-ink` | `#1A1A1A` | 15.81:1 on the accent |

Note that `#7B7B7B`, the secondary grey the reference site uses, measures 4.23:1 and fails AA. Ours is two steps darker on purpose.

Focus rings are ink on light and accent on ink, for the same contrast reason.

### Typography

**One family across display and body.** Switzer, a neo-grotesque, self-hosted, ITF Free Font License, commercial use and self-hosting explicitly permitted. The reference does the same thing with its own custom face, and it is a large part of why that page feels coherent.

Three static weights, about 57 KB total: 400 for display, 500 for nav and controls, 700 for rare hard emphasis. Fontshare does not ship a variable woff2 for Switzer. Geist Mono handles numerals only, with tabular figures so prices and hours line up.

**Display weight is 400, not 800.** This is the single biggest change from the first pass. Scale carries the impact; weight would make it shout. Headlines are lowercase and set very tight: hero at `clamp(2.75rem, 0.9rem + 7vw, 5.5rem)` with 0.95 line-height and -0.032em tracking. A `mega` size exists for oversized single words broken across lines, up to 11rem at 0.82 line-height.

No serif anywhere. Nothing in this brand is editorial, heritage or publication, and "creative brief equals serif" is the most-tested AI tell there is.

### Shape

Two values, one rule: **controls are pills, everything else is sharp.** Media, containers and sections get radius 0; buttons, inputs and the drawer controls get `9999px`. The reference uses `rounded-full` on 71 elements, and that pill language is most of what makes it read the way it does. Circular icon buttons at 36 / 44 / 52px are part of the same system.

### Image treatment

Unchanged from the first pass, and still the critical path. One grading pass across every image, deliberate mixed crops (21:9 hero, 3:2 services, 4:5 equipment detail), sharp corners, full-bleed by default, `next/image` with `priority` on the hero. No labels or pills overlaid on photographs, no decorative photo credits. Real photography only: no CSS fake screenshots, no hand-drawn SVG standing in for a photo. Until the real assets arrive, `ImageFrame` renders a labelled slot naming the shot and dimensions it needs.

### Layout and spacing

Container `max-w-[1560px]`, gutters stepping 20 / 32 / 48px, with full-bleed sections deliberately breaking out. Section rhythm `py-24 / py-32 / py-40`, looser than the first pass to suit the larger type. 8px base scale, no arbitrary values. Body copy held to a 62-character measure. Every multi-column layout declares its sub-768px collapse in the same component.

### Cards versus non-card layouts

Cards appear in exactly two places, where elevation carries real meaning: the three cells of the services bento and the three panels of the pricing block. Everywhere else, grouping is hairlines, negative space and photography. The credibility strip, the equipment clusters, the session sequence, the FAQ and the closing section are all non-card.

### Buttons

Four levels, one accent fill. `primary` is the yellow pill and is used for booking and nothing else. `ink` is the black pill for secondary solid actions. `outline` is a hairline pill. `quiet` is an underlined text link. Labels never wrap at desktop, minimum 40 / 44 / 52px heights, and press feedback is a 0.97 scale.

### Icons

`@phosphor-icons/react`, one family, one size scale. Used functionally: equipment markers, the WhatsApp glyph, accordion chevrons, carousel arrows. Never decoratively beside every heading.

### Background and texture

Flat colour and photography, nothing else. No mesh gradients, no aurora blobs, no glassmorphism, no glowing borders. Depth comes from three sources only: the paper-to-ash step, hairlines, and the photography. Optional low-opacity grain on a `fixed inset-0 pointer-events-none` layer, dropped entirely if it cannot be done that way, because grain on a scrolling container destroys mobile frame rate.

### Animation philosophy

At MOTION_INTENSITY 9 the page must genuinely move, and every animation still has to answer "what does this communicate".

| Element | Motion | Justification |
|---|---|---|
| Hero | Pinned, with staggered type entry | Hierarchy. Holds the value prop while the first scroll reveals the work behind it. |
| Studios rail | Scroll-hijacked horizontal pan, pinned | Storytelling. Seven rooms traversed without a 7,000px vertical scroll. |
| Kinetic type | Repeating lines driven by scroll velocity | Storytelling. The signature device on the reference site. Capped at one marquee per page. |
| Section reveals | Fade and rise, once only, 60ms stagger | Hierarchy. Directs attention to the entering section. |
| Buttons | Lift on hover, 0.97 scale on press | Feedback. Tactile acknowledgement. |
| Accordion | Height and opacity | State transition. |
| Sticky booking bar | Slides up when the hero leaves | State transition, and the mitigation for a heavily choreographed page. |

**What does not animate:** the credibility numbers, the pricing panel, the equipment clusters, the footer.

**Implementation constraints.** GSAP with ScrollTrigger for pinned and scrubbed work. Lenis for smooth scroll, bridged to ScrollTrigger through a single `gsap.ticker` so pinned sections do not lag a frame behind the content. `window.addEventListener` on scroll is banned; only `useScroll`, ScrollTrigger, IntersectionObserver or CSS scroll-driven animations. Only `transform` and `opacity` are animated. Every animated component is a client leaf with a strict cleanup, and every GSAP context is reverted. Touch keeps native scrolling: smooth-scrolling a phone fights the platform momentum and feels broken.

**Reduced motion.** Under `prefers-reduced-motion: reduce` the smooth-scroll layer does not initialise at all, native scrolling is untouched, and every choreographed component degrades to static. At intensity 9 this is the difference between a usable site and an unusable one.

---

## Proposed technical direction

Confirming the brief's default stack, since there is no existing codebase to constrain it:

| Concern | Choice |
|---|---|
| Framework | Next.js, App Router, Server Components by default |
| Language | TypeScript |
| Styling | Tailwind CSS v4, via `@tailwindcss/postcss` |
| Motion | GSAP + ScrollTrigger for pinned and scrubbed work, Lenis for smooth scroll |
| Icons | `@phosphor-icons/react` (see conflict note) |
| Fonts | `next/font` with self-hosted Switzer (display + body) and Geist Mono (numerals) |
| Images | `next/image` |
| Content | Static local TypeScript data modules under `src/content/` |
| Backend | None. Zero API routes, zero server actions, zero database. |

Booking, WhatsApp and maps are outbound links to existing external services. The contact form, if built, is a visual and client-validated shell only, with no submission target, as the brief requires.

---

## Requires your review before Phase 2

Nine items. The first four are blocking.

1. **URL slugs.** Taste-skill 11.F forbids changing route slugs without explicit approval, and the current slugs carry the site's search rankings. Do we keep the existing keyword slugs (`/podcast-studio-for-rent` for Pricing, and so on) and accept unreadable URLs, or move to clean slugs (`/pricing`, `/studios`) and accept the ranking risk? If we move, a 301 redirect map is mandatory, and that is a hosting-level concern outside the frontend scope.

2. **Photography.** This is the critical path. The redesign needs a minimum of 15 homepage assets, including one wide shot of each of the seven rooms, graded to a single look. The 3 photos and 12 clips in this folder came from a Google Maps scrape with unclear provenance, and Maps mixes owner-uploaded and visitor-uploaded media. Please confirm whether the studio has its own photo library, and confirm usage rights on anything we take from the scrape. Without this the build stalls at section 4.

3. **The eight content contradictions in 3.5.** Guest capacity, studio count, client numbers, editing rate, package discount percentage, equipment year, opening hours, and the file delivery date that has now passed. Each needs a factual answer. Nothing gets guessed, and anything still unresolved ships marked as unverified in the code.

4. **Testimonials.** The live site's testimonials are Wix template placeholders. The new site needs real quotes with real attribution (name plus role, per taste-skill 4.10), or the section is cut. It cannot ship with invented ones. Do you have real reviews we can use, and permission to use them?

5. **Single dark theme.** I am recommending one locked dark theme rather than the dual light and dark default. This is a deliberate override that needs your sign-off.

6. **Icon library.** Your brief names Lucide; taste-skill discourages it and lists Phosphor first. Your own instruction makes taste-skill authoritative, so I am proposing Phosphor. Confirm.

7. **The two segment pages.** Keeping `/for/coaches` and `/for/real-estate` is only worth it if those URLs earn search impressions. Can you pull Search Console data? Note that `/real-estate-podcast-studio-dubai` is currently live, in the main nav, and completely empty, which is worth fixing on the current site regardless of this project's timeline.

8. **The YALLAPOD relationship.** Four of the seven rooms are named YALLAPOD, and the gallery page tells a founding story around that name. Is it a sub-brand, a legacy name, or a partner? The new Studios page has to explain this in one line, and I will not invent that line.

9. **Fonts.** Cabinet Grotesk and Geist are both free for commercial use and self-hostable. If you have licensed brand fonts already, they take precedence.

---

## Pre-flight status for Phase 1

Design-stage checks that apply to a strategy document. The full Section 14 check runs against implementation code in a later phase.

| Check | Status |
|---|---|
| Design read declared | Pass. Step 4. |
| Dials explicit and reasoned from the brief | Pass. 7 / 6 / 4, each argued, none silently inherited. |
| Redesign mode detected and audit performed | Pass. Greenfield-with-content-preserved. Section 11.B audit complete. |
| Zero em dashes and en dashes in this document | Pass. |
| Page theme lock planned | Pass. One dark theme, no mid-page inversion. |
| Colour consistency lock planned | Pass. One accent, `#078DDD`. |
| Shape consistency lock planned | Pass. Sharp containers, 4px interactive. Documented rule. |
| Serif discipline | Pass. No serif. Sans display specified. |
| Hero discipline planned | Pass. 2-line headline cap, 20-word subtext cap, CTA above fold, `pt-24` cap. |
| Hero stack discipline | Pass. 4 text elements maximum, no trust strip, no tagline. |
| Eyebrow budget | Pass. 2 allocated against a budget of 3 across 9 sections. |
| Layout family diversity | Pass. 9 families across 9 sections against a minimum of 4. |
| Zigzag alternation cap | Pass. No 3 consecutive image-plus-text splits. |
| Marquee cap | Pass. Zero allocated. |
| No duplicate CTA intent | Pass. One label per intent, replacing the current eight. |
| Bento cell count | Pass. 3 items to 3 cells, twice. No empty cells. |
| Bento background diversity | Pass. 2 of 3 service cells carry real photography. |
| Real images specified | Pass. 15 homepage assets enumerated, with a rights flag. |
| Banned decoration | Pass. No scroll cues, no status dots, no section numbering, no version labels, no locale strips, no fake screenshots, no hand-rolled decorative SVG. |
| Motion motivated | Pass. Every animation carries a one-sentence justification. |
| Navigation constraints | Pass. 5 items plus CTA, one line, 80px cap. |
| Reduced motion planned | Pass. Mandatory at intensity 6, specified per component. |
| Button contrast | **Open.** Flagged as a measurement to perform before any button ships. |
| Dark mode dual-theme default | **Override, pending sign-off.** Item 5 above. |

Two open items, both flagged rather than assumed.
