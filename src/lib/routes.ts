/**
 * Every internal route is defined here, once.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * The slug decision is still open (docs/design-audit.md, review item 1). The
 * live Wix site ranks on keyword-stuffed slugs such as
 * `/podcast-studio-for-rent` for what is really the Pricing page. Taste-skill
 * 11.F forbids changing route slugs without explicit approval, and changing
 * them carries real search risk.
 *
 * So: clean slugs are used for now, and nothing in the app hardcodes a path.
 * Switching to the legacy slugs is an edit to this object and nothing else.
 * The folder names under src/app would change too, but no component, link or
 * test would.
 *
 * LEGACY SLUGS, for whoever makes that call:
 *   studios  <- (new page, no legacy equivalent)
 *   pricing  <- /podcast-studio-for-rent
 *   gallery  <- /photos-podcast-studio-for-rent-dubai
 *   faq      <- /podcast-studio-rental-dubai-faq
 *   contact  <- (new page, no legacy equivalent)
 *   terms    <- /terms-of-service-video-recording-studio-dubai
 */
export const routes = {
  home: "/",
  studios: "/studios",
  pricing: "/pricing",
  gallery: "/gallery",
  faq: "/faq",
  contact: "/contact",
} as const;

export type RouteKey = keyof typeof routes;

/**
 * Outbound links to systems we do not own and do not rebuild.
 *
 * Booking, payment and messaging stay entirely external. This project is
 * frontend only: no booking logic, no payment handling, no message sending.
 */
export const external = {
  /** Existing Wix Bookings entry point. */
  booking: "https://www.dubaipodcaststudio.com/book-now",
  whatsapp: "https://api.whatsapp.com/send?phone=971503525271",
  maps: "https://maps.app.goo.gl/nPEsaNUGYzP8gmw56",
  email: "mailto:info@dubaipodcaststudio.com",
  /** Legal copy must carry over verbatim; it still lives on the Wix site. */
  terms:
    "https://www.dubaipodcaststudio.com/terms-of-service-video-recording-studio-dubai",
} as const;

/** True for any link that leaves the app and needs rel/target handling. */
export function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}
