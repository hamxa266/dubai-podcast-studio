import { external, routes } from "@/lib/routes";
import type { Claim, NavItem, SocialLink } from "@/types";

/**
 * Studio facts, taken from the live site. Nothing here is invented.
 *
 * Figures that conflict across the live pages are NOT in this file. They live
 * behind `Claim.verified` and stay out of the shell until the studio confirms
 * them. See docs/design-audit.md section 3.5.
 */
export const site = {
  name: "Dubai Podcast Studio",
  shortName: "DPS",
  /** Used for metadata only. Update when the rebuild gets its own domain. */
  url: "https://www.dubaipodcaststudio.com",

  address: {
    building: "Tamani Arts Building",
    district: "Business Bay",
    city: "Dubai",
    country: "United Arab Emirates",
  },

  email: "info@dubaipodcaststudio.com",
  phone: "+971 50 352 5271",

  /** Entry rate, used as the mobile booking bar's price anchor. */
  fromRateAed: 350,
} as const;

/**
 * Primary navigation. Five items plus the booking CTA, down from ten.
 *
 * The CTA is deliberately not in this array. It is rendered separately so it
 * can never be styled as just another nav link.
 */
export const navItems: readonly NavItem[] = [
  { label: "Studios", href: routes.studios },
  { label: "Pricing", href: routes.pricing },
  { label: "Gallery", href: routes.gallery },
  { label: "FAQ", href: routes.faq },
  { label: "Contact", href: routes.contact },
];

/**
 * One label per intent, site-wide.
 *
 * "Book Now" is the only booking label. The live site uses eight different
 * ones for this single action. Import these rather than typing a label.
 */
export const cta = {
  book: "Book Now",
  studios: "Explore studios",
  whatsapp: "WhatsApp",
} as const;

/**
 * Hero copy.
 *
 * Held to the taste-skill hero discipline: headline at most 2 lines, subtext
 * at most 20 words (this one is 17), and no keyword stuffing. Compare the live
 * H1, "DUBAI PODCAST STUDIO - BEST PODCAST STUDIO DUBAI HAS TO OFFER", which
 * runs to four lines on desktop and is a search query rather than a sentence.
 *
 * Between them the two lines carry all five things the first viewport has to
 * say: what the business is, where it is, that it does audio and video, that
 * the gear is serious, and that a person runs the session.
 */
export const hero = {
  headline: "seven podcast studios. one address in business bay.",
  subtext:
    "Professional audio and video recording with Shure SM7B microphones, 4K cameras and an operator on every session.",
} as const;

/**
 * Opening credibility figures, exactly as the live site states them.
 *
 * `verified: false` marks a figure that contradicts itself across the live
 * pages. Per the brief, these are preserved as supplied and flagged here
 * rather than quietly corrected or quietly dropped. Full list of conflicts in
 * docs/design-audit.md section 3.5.
 */
export const claims: readonly Claim[] = [
  {
    value: "7",
    label: "studios",
    verified: true,
    note: "Independently confirmed: /book-now enumerates all seven rooms by office number. The gallery page's 'our five studios' is the outlier.",
  },
  {
    value: "45+",
    label: "setups",
    verified: true,
    note: "Stated consistently across home, gallery and book-now.",
  },
  {
    value: "75",
    label: "countries",
    verified: true,
    note: "Stated once, no contradicting figure anywhere on the site.",
  },
  {
    value: "3,500+",
    label: "podcasters recorded",
    verified: false,
    note: "CONFLICT: the live site also says 3,000 clients, 'more than 1000 podcasters in 2023', and 'hundreds'. Shown as published on the homepage. Confirm before launch.",
  },
];

export const socialLinks: readonly SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/dubaipodcaststudio/" },
  { label: "TikTok", href: "https://www.tiktok.com/@dubaipodcaststudio" },
  { label: "YouTube", href: "https://www.youtube.com/@DubaiPodcastStudio/about" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dubai-podcast-studio" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Dubai-Podcast-Studio/61551633782322/",
  },
];

/**
 * Opening hours, exactly as published on /book-now.
 *
 * NOTE: the live site also says "open daily until 11 PM", which contradicts the
 * 10 PM weekday booking cutoff below. Logged as contradiction 7. Only the
 * booking window is stated here, because that is the one a visitor acts on.
 */
export const hours = {
  weekdays: "8:00 to 22:00",
  sunday: "9:00 to 20:00",
} as const;

export { external, routes };
