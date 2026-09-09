import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cta, external } from "@/data/site";
import { equipment, serviceTiers } from "@/data/pricing";

/**
 * Services and hourly rates.
 *
 * LAYOUT. Full-width rows, not pricing cards.
 *
 * The brief asks for the difference between the three to be obvious in under
 * ten seconds. Rows do that better than cards: every price sits in the same
 * column, so the three numbers stack vertically and can be compared by moving
 * the eye straight down. Three side-by-side cards force a horizontal scan and
 * a mental re-anchor at each one, and on mobile they collapse into a stack
 * that has to be scrolled through anyway.
 *
 * No badges, no "Most Popular", no strike-through prices, no discount claims.
 * Every price is visible immediately; nothing is behind an interaction.
 *
 * One booking button for the section, not one per row. All three resolved to
 * the same external booking page, so three extra pills added repetition
 * without adding a destination, and they made an editorial comparison read
 * like a stack of cards.
 */
export function Services() {
  return (
    <Section id="pricing" tone="ash" divided>
      <SectionHeading
        title="Three ways to record, priced by the hour."
        body="Every session includes a studio operator. Rates are per hour, in AED."
        action={
          <Button href={external.booking} variant="ink">
            {cta.book}
          </Button>
        }
      />

      <div className="mt-14 border-t border-line md:mt-20">
        {serviceTiers.map((tier) => (
          <article
            key={tier.id}
            className="grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-8 md:py-12"
          >
            {/* Price first in the DOM and first in the column, because it is
                the thing being compared. */}
            <div className="md:col-span-3">
              <p className="flex items-baseline gap-1.5">
                <span className="font-mono text-4xl tracking-tight text-ink md:text-5xl">
                  {tier.rate.toLocaleString("en-AE")}
                </span>
                <span className="font-mono text-sm text-muted">AED</span>
              </p>
              <p className="mt-1 text-sm text-muted">{tier.unitLabel}</p>
              {tier.minimumHours ? (
                <p className="mt-3 text-sm text-muted">
                  {tier.minimumHours} hour minimum
                </p>
              ) : null}
            </div>

            <div className="md:col-span-5">
              <h3 className="text-subtitle text-ink">{tier.name}</h3>
              <p className="measure mt-2 text-muted">{tier.bestFor}</p>
            </div>

            <div className="md:col-span-4 md:flex md:flex-col md:items-start">
              <ul className="flex flex-col gap-2 text-sm text-muted">
                {tier.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {tier.caveat ? (
                <p className="measure mt-4 text-sm text-muted">{tier.caveat}</p>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {/* Equipment. It applies to every tier, so it sits once underneath rather
          than being repeated as a feature list inside all three rows. */}
      <div className="mt-16 md:mt-20">
        <h3 className="font-mono text-eyebrow uppercase text-muted">
          In every room
        </h3>
        <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item) => (
            <div key={item.label} className="border-t border-line pt-4">
              <dt className="text-sm text-muted">{item.label}</dt>
              <dd className="mt-1 text-ink">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
