/**
 * Content shapes for the static local data layer.
 *
 * All site content is static TypeScript under src/data. There is no CMS, no
 * database and no fetch. Phase 3 populates these; the shapes are declared now
 * so the shell and the primitives can be typed against them.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

/**
 * A fact carried over from the live site.
 *
 * `verified: false` marks one of the eight cross-page contradictions logged in
 * docs/design-audit.md, section 3.5. Nothing with `verified: false` may be
 * rendered as a headline claim until the studio confirms the number.
 */
export interface Claim {
  value: string;
  label: string;
  verified: boolean;
  /** Where the conflict is, when verified is false. */
  note?: string;
}

/** One of the seven rooms in the Tamani Arts Building. */
export interface Studio {
  id: string;
  name: string;
  office: string;
  /** Online booking, or WhatsApp only. Shown honestly, never hidden. */
  booking: "online" | "on-request";
  image?: string;
  alt?: string;
}

/** An hourly service tier. */
export interface Service {
  id: string;
  name: string;
  /** AED per hour. */
  rate: number;
  minimumHours?: number;
  summary: string;
}

/** A prepaid block of hours. */
export interface Package {
  id: string;
  name: string;
  /** Total AED. */
  price: number;
  hours: number;
  validMonths: number;
  saving?: string;
  featured?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  group: "booking" | "studio" | "equipment" | "location";
}
