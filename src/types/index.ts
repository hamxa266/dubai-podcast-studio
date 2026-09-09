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

/*
  Service, Package and FaqItem used to be declared here as well. They were
  written in Phase 2 as shapes for content that did not exist yet, and by the
  time the data landed each had grown fields the real thing needed, so
  src/data/pricing.ts and src/data/faq.ts declare their own. Nothing imported
  the versions here.

  They are deleted rather than left dormant, because two of the dead fields
  were affordances this design deliberately refuses:

    Package.featured?: boolean  ->  a "Most Popular" badge
    Package.saving?:   string   ->  the "Save 100 AED/HR" label that does not
                                    add up on the 10-hour editing block

  See the note in src/data/pricing.ts. The UI shows the effective hourly rate
  instead, and there is now no type field inviting either back.

  The dead FaqItem had also drifted: its group union still said
  "equipment" | "location" where the real groups are "gear" | "getting-here".
*/
