import { Container } from "@/components/ui/Container";
import { claims, external, site } from "@/data/site";

/**
 * The opening credibility band, directly under the hero.
 *
 * WHY NOT A LOGO WALL. The taste-skill default for this slot is a row of real
 * client SVGs. That is wrong for this business: its social proof is individual
 * creators rather than corporate accounts, and inventing brand logos to fill
 * the row would be fabrication. Real figures plus a link to the real Google
 * listing is the honest version of the same section.
 *
 * A hairline band, not cards. Four figures, mono numerals, no count-up
 * animation, no decorative dots, no star graphics, no invented ratings.
 *
 * Every figure is taken verbatim from the live site. One of them contradicts
 * itself across pages and is flagged in the data rather than silently
 * corrected. See src/data/site.ts and docs/design-audit.md section 3.5.
 */
export function CredibilityStrip() {
  return (
    <section aria-label="Studio at a glance" className="border-y border-line">
      <Container>
        <dl className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {claims.map((claim, index) => (
            <div
              key={claim.label}
              className={[
                "flex flex-col gap-1 py-8 md:py-10",
                /* Hairlines between, not a box around each. The first column
                   of each row carries no left padding so the numbers stay
                   aligned to the container edge. */
                index % 2 === 0 ? "pr-6" : "border-l border-line pl-6",
                "md:border-l-0 md:pl-0 md:pr-6 md:[&:not(:first-child)]:pl-8",
                /* The 2-column mobile grid needs a rule between its rows. */
                index < 2 ? "border-b border-line md:border-b-0" : "",
              ].join(" ")}
            >
              <dt className="order-2 text-sm text-muted">{claim.label}</dt>
              <dd className="order-1 font-mono text-3xl tracking-tight text-ink md:text-4xl">
                {claim.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="border-t border-line py-6 text-sm text-muted">
          {site.address.building}, {site.address.district}, {site.address.city}.{" "}
          <a
            href={external.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-[var(--dur-base)] ease-out-expo hover:decoration-ink"
          >
            Read the reviews on Google
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </Container>
    </section>
  );
}
