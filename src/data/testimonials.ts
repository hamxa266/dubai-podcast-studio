export interface Testimonial {
  id: string;
  /** Max three lines when rendered. Trim the source quote, do not shrink type. */
  quote: string;
  /** Name plus role. Never a first name alone. */
  name: string;
  role: string;
}

/**
 * REAL testimonials. Empty until the studio supplies them.
 *
 * WHY THIS ARRAY IS EMPTY AND MUST STAY EMPTY UNTIL THEN
 *
 * The live Wix site is still serving the untouched template placeholders:
 * "Alexa Young, CA" with the body "Testimonials provide a sense of what it's
 * like to work with you or use your products. Change the text and add your
 * own.", repeated twice for six slots. That is the single most damaging thing
 * on the current site, because it tells a prospective customer that nobody
 * maintains this business's web presence.
 *
 * Carrying those across, or inventing replacements that read as real customer
 * quotes, would be worse than showing nothing. So the section degrades to
 * genuine, checkable proof instead: the studio's public Google reviews and its
 * Instagram, both of which exist and neither of which this project authored.
 *
 * TO GO LIVE: paste real quotes here with real attribution and permission.
 * The section switches over on its own, no component changes needed.
 */
export const testimonials: readonly Testimonial[] = [];

/**
 * Development-only shapes, so the component can be seen with content in it.
 *
 * These are OBVIOUSLY not real and are labelled as such on screen. They are
 * never rendered in a production build; see the guard in Proof.tsx. They exist
 * to check line lengths and layout, nothing else.
 */
export const devPlaceholderTestimonials: readonly Testimonial[] = [
  {
    id: "placeholder-1",
    quote:
      "PLACEHOLDER. Replace with a real quote, trimmed to three lines at most, from a client who has agreed to be named.",
    name: "Placeholder name",
    role: "Placeholder role, company",
  },
  {
    id: "placeholder-2",
    quote:
      "PLACEHOLDER. This block exists to check the layout with content in it. It is never rendered in a production build.",
    name: "Placeholder name",
    role: "Placeholder role, company",
  },
];
