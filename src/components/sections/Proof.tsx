import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { external, socialLinks } from "@/data/site";
import { devPlaceholderTestimonials, testimonials } from "@/data/testimonials";

/**
 * Social proof.
 *
 * THE RULE THIS COMPONENT ENFORCES: nothing that reads as a customer quote
 * appears on a production page unless a real customer said it.
 *
 * The live Wix site still serves the untouched template placeholders,
 * "Alexa Young, CA" and friends, six slots of them. Those are not carried
 * over, and they are not replaced with invented ones either.
 *
 * So the section has two states, and both are honest:
 *
 *   Real quotes supplied  ->  render them, with full attribution.
 *   None supplied         ->  point at proof the studio did not author. The
 *                             Google listing and the Instagram account are
 *                             both public and both checkable, which is worth
 *                             more than a quote a visitor cannot verify.
 *
 * The placeholder shapes render in development only, behind a NODE_ENV guard,
 * and carry a visible marker so they can never be mistaken for real content.
 */
export function Proof() {
  const isProduction = process.env.NODE_ENV === "production";
  const hasReal = testimonials.length > 0;
  const showPlaceholders = !hasReal && !isProduction;
  const items = hasReal ? testimonials : showPlaceholders ? devPlaceholderTestimonials : [];

  const instagram = socialLinks.find((link) => link.label === "Instagram");

  return (
    <Section divided>
      <SectionHeading
        title="Ask the people who have recorded here."
        body="The studio's reviews sit on its public Google listing, and the work its clients publish sits on their own channels."
      />

      {items.length > 0 ? (
        <>
          {showPlaceholders ? (
            /* Development only. Impossible to miss, impossible to ship. */
            <p className="mt-12 border border-line-strong px-4 py-3 font-mono text-xs uppercase tracking-widest text-ink">
              Development placeholder content. Not rendered in production.
            </p>
          ) : null}

          <ul className="mt-10 grid gap-10 border-t border-line pt-10 md:grid-cols-2 md:gap-16">
            {items.map((item) => (
              <li key={item.id}>
                <blockquote className="measure text-subtitle text-ink">
                  {item.quote}
                </blockquote>
                <p className="mt-5 text-sm text-muted">
                  <span className="text-ink">{item.name}</span>
                  {", "}
                  {item.role}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {/* Always present. This is the proof that is actually verifiable. */}
      <div className="mt-14 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row">
        <Button
          href={external.maps}
          variant="ink"
          iconRight={<ArrowUpRight size={16} />}
        >
          Reviews on Google
        </Button>
        {instagram ? (
          <Button
            href={instagram.href}
            variant="outline"
            iconRight={<ArrowUpRight size={16} />}
          >
            Sessions on Instagram
          </Button>
        ) : null}
      </div>
    </Section>
  );
}
