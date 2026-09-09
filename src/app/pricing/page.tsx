import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/PageIntro";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  bookingTerms,
  effectiveHourlyRate,
  packages,
  serviceTiers,
} from "@/data/pricing";
import { cta, external, routes } from "@/data/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Hourly rates and prepaid hour packages for Dubai Podcast Studio, with the cancellation and rescheduling terms in plain sight.",
  /* Self-canonical. The live site has several near-duplicate pages
     competing for the same query, so this matters more than usual. */
  alternates: { canonical: "/pricing" },
};

/**
 * Pricing.
 *
 * ARRANGEMENT, and why it is not the homepage sections again.
 *
 * The homepage lays the three services out as rows, one per tier, because at
 * that point the visitor is still deciding whether to care. On a page someone
 * has navigated to on purpose, a real comparison matrix is the better tool:
 * attributes down the side, tiers across the top, so the differences can be
 * read across rather than remembered between blocks.
 *
 * The matrix collapses to one card per tier below md. A table that needs
 * horizontal scrolling on a phone is not a comparison, it is a puzzle.
 *
 * The services page from the original brief lives here. Phase 1 merged the two
 * because "what do you do" and "what does it cost" are the same question for
 * this business, and splitting them would have meant a page that answered
 * neither.
 */

interface Attribute {
  label: string;
  value: (tier: (typeof serviceTiers)[number]) => string;
  /** Renders the value large and in mono. Used for the rate row only. */
  emphasis?: boolean;
}

/** Rows of the comparison. Only attributes the studio actually states. */
const attributes: readonly Attribute[] = [
  {
    label: "Rate",
    value: (tier: (typeof serviceTiers)[number]) =>
      `${tier.rate.toLocaleString("en-AE")} AED ${tier.unitLabel}`,
    emphasis: true,
  },
  {
    label: "Minimum",
    value: (tier: (typeof serviceTiers)[number]) =>
      tier.minimumHours ? `${tier.minimumHours} hours` : "None stated",
  },
  {
    label: "Best for",
    value: (tier: (typeof serviceTiers)[number]) => tier.bestFor,
  },
  {
    label: "Included",
    value: (tier: (typeof serviceTiers)[number]) => tier.includes.join(". "),
  },
];

export default function PricingPage() {
  return (
    <>
      <PageIntro
        title="Rates"
        lead="Priced by the hour, in AED. Every session includes a studio operator."
      >
        <Button href={external.booking} size="lg">
          {cta.book}
        </Button>
      </PageIntro>

      {/* Comparison matrix, desktop. */}
      <Container className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Hourly rates and what each service includes
          </caption>
          <thead>
            <tr className="border-y border-line">
              <th scope="col" className="w-40 py-6 pr-6 align-bottom">
                <span className="font-mono text-eyebrow uppercase text-muted">
                  Service
                </span>
              </th>
              {serviceTiers.map((tier) => (
                <th
                  key={tier.id}
                  scope="col"
                  className="py-6 pr-8 align-bottom text-subtitle font-normal text-ink"
                >
                  {tier.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attributes.map((attr) => (
              <tr key={attr.label} className="border-b border-line align-top">
                <th
                  scope="row"
                  className="py-6 pr-6 text-sm font-normal text-muted"
                >
                  {attr.label}
                </th>
                {serviceTiers.map((tier) => (
                  <td key={tier.id} className="py-6 pr-8">
                    {attr.emphasis ? (
                      <span className="font-mono text-2xl text-ink">
                        {attr.value(tier)}
                      </span>
                    ) : (
                      <span className="text-muted">{attr.value(tier)}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td />
              {serviceTiers.map((tier) => (
                <td key={tier.id} className="py-8 pr-8">
                  <Button href={external.booking} variant="outline" size="sm">
                    {cta.book}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </Container>

      {/* Same information, one block per tier, below md. */}
      <Container className="md:hidden">
        <div className="border-t border-line">
          {serviceTiers.map((tier) => (
            <article key={tier.id} className="border-b border-line py-8">
              <h2 className="text-subtitle text-ink">{tier.name}</h2>
              <p className="mt-3 font-mono text-3xl text-ink">
                {tier.rate.toLocaleString("en-AE")}{" "}
                <span className="text-sm text-muted">
                  AED {tier.unitLabel}
                </span>
              </p>
              {tier.minimumHours ? (
                <p className="mt-2 text-sm text-muted">
                  {tier.minimumHours} hour minimum
                </p>
              ) : null}
              <p className="mt-4 text-muted">{tier.bestFor}</p>
              <ul className="mt-4 flex flex-col gap-1 text-sm text-muted">
                {tier.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Button
                href={external.booking}
                variant="outline"
                className="mt-6"
              >
                {cta.book}
              </Button>
            </article>
          ))}
        </div>
      </Container>

      {/* Packages on the dark ground, so the two pricing models read as two
          separate decisions rather than one long list. */}
      <Section tone="ink" className="mt-16 md:mt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="text-title text-paper lg:col-span-7">
            Or buy hours up front.
          </h2>
          <p className="measure text-muted-dark lg:col-span-5">
            Hours split across sessions and studios, valid six months. The
            figure that matters is what each one works out at per hour.
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden border border-line-dark-strong bg-line-dark-strong sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <li key={pkg.id} className="on-ink flex flex-col p-8 lg:p-10">
              <p className="text-sm text-muted-dark">{pkg.covers}</p>
              <h3 className="mt-1 text-subtitle text-paper">{pkg.name}</h3>
              <p className="mt-8 font-mono text-4xl text-paper">
                {pkg.price.toLocaleString("en-AE")}{" "}
                <span className="text-sm text-muted-dark">AED</span>
              </p>
              <p className="mt-3 text-sm text-muted-dark">
                Works out at{" "}
                <span className="font-mono text-accent">
                  {effectiveHourlyRate(pkg).toLocaleString("en-AE")} AED
                </span>{" "}
                per hour
              </p>
              <Button
                href={external.booking}
                variant="outline"
                fullWidth
                className="mt-8 border-line-dark-strong text-paper hover:border-paper hover:bg-paper/10"
              >
                {cta.book}
              </Button>
            </li>
          ))}
        </ul>
      </Section>

      <Container className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 className="text-title text-ink lg:col-span-5">
            Before you book.
          </h2>
          <ul className="flex flex-col gap-5 lg:col-span-7">
            {bookingTerms.map((term) => (
              <li key={term} className="border-t border-line pt-5 text-muted">
                {term}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-14 text-sm text-muted">
          More detail on editing, files and what to bring is on the{" "}
          <a
            href={routes.faq}
            className="text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-[var(--dur-base)] ease-out-expo hover:decoration-ink"
          >
            FAQ
          </a>
          .
        </p>
      </Container>
    </>
  );
}
