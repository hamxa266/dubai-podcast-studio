import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";
import { cta, external } from "@/data/site";

/**
 * How a booking works.
 *
 * ON THE HONESTY OF THIS SECTION. Booking, payment and file delivery all run
 * on the studio's existing systems. This site sends people there and does not
 * pretend otherwise: the copy says "the studio's existing booking page", and
 * every control is an outbound link. No booking engine was built here.
 *
 * LAYOUT. Four hairline-topped columns, on the dark ground. It is a sequence,
 * so it reads left to right on desktop and top to bottom on mobile, and the
 * dark band separates the two commercial sections above from the close below.
 *
 * The numerals are an index into a real sequence, which is not the same thing
 * as decorating a section with "01 / OVERVIEW". The headings are verbs, so the
 * action is the label rather than "Step 1".
 */
export function HowItWorks() {
  return (
    <Section tone="ink" divided>
      <SectionHeading
        onInk
        title="Booking takes about a minute."
        body="The studio runs its own booking and payment. This page just points you at it."
        action={
          <Button href={external.booking}>{cta.book}</Button>
        }
      />

      <ol className="mt-14 grid gap-x-8 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <li key={step.id} className="border-t border-line-dark-strong pt-6">
            <p className="font-mono text-eyebrow uppercase text-accent">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-5 text-subtitle text-paper">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-dark">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
