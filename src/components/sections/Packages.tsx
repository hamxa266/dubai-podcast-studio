import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cta, external } from "@/data/site";
import { bookingTerms, effectiveHourlyRate, packages } from "@/data/pricing";

/**
 * Prepaid hour blocks.
 *
 * WHY THE EFFECTIVE HOURLY RATE IS THE HEADLINE FIGURE.
 *
 * The studio labels these with "Save 100AED/HR" and similar. Two of the three
 * check out; the 10-hour recording-and-editing block does not, because 8,500
 * against a stated 1,000 per hour is a 150 saving, not 100. Repeating a
 * discount claim that does not add up would be exactly the fake-discount
 * pattern the brief rules out.
 *
 * So each block shows what it actually costs per hour, which is the total
 * divided by the hours. It is the studio's own arithmetic, it needs no trust,
 * and it makes the comparison against the hourly rates above immediate.
 *
 * No "Most Popular" badge. Nothing has been supplied to justify one, and
 * inventing one would be putting a thumb on the scale.
 */
export function Packages() {
  return (
    <Section divided>
      <SectionHeading
        eyebrow="Prepaid hours"
        title="Buy hours up front and the rate comes down."
        body="Hours can be split across sessions and studios. Valid six months."
      />

      <ul className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
        {packages.map((pkg) => (
          <li key={pkg.id} className="flex flex-col bg-paper p-8 lg:p-10">
            <p className="text-sm text-muted">{pkg.covers}</p>
            <h3 className="mt-1 text-subtitle text-ink">{pkg.name}</h3>

            <p className="mt-8 flex items-baseline gap-1.5">
              <span className="font-mono text-4xl tracking-tight text-ink">
                {pkg.price.toLocaleString("en-AE")}
              </span>
              <span className="font-mono text-sm text-muted">AED</span>
            </p>

            {/* The comparison figure. Plain division, no claim attached. */}
            <p className="mt-3 text-sm text-muted">
              Works out at{" "}
              <span className="font-mono text-ink">
                {effectiveHourlyRate(pkg).toLocaleString("en-AE")} AED
              </span>{" "}
              per hour
            </p>

            <p className="mt-1 text-sm text-muted">
              Valid {pkg.validMonths} months
            </p>

            <Button
              href={external.booking}
              variant="outline"
              fullWidth
              className="mt-8"
            >
              {cta.book}
            </Button>
          </li>
        ))}
      </ul>

      {/* Terms up front. These are the questions that otherwise get asked after
          someone has already paid. */}
      <div className="mt-16 md:mt-20">
        <h3 className="font-mono text-eyebrow uppercase text-muted">
          Before you book
        </h3>
        <ul className="measure mt-8 flex flex-col gap-4">
          {bookingTerms.map((term) => (
            <li key={term} className="text-sm text-muted">
              {term}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
