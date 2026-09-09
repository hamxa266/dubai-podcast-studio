import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems, homepageFaqIds } from "@/data/faq";
import { routes } from "@/data/site";

/**
 * FAQ on the homepage.
 *
 * Five questions, not fifteen. These are the ones that stop a booking:
 * capacity, arrival time, cancellation, what to bring, parking. The rest live
 * on the FAQ page, and the link at the end goes somewhere real.
 *
 * Placed after pricing on purpose. These are objections, and objections arrive
 * once someone has seen the price.
 */
export function Faq() {
  const items = homepageFaqIds
    .map((id) => faqItems.find((item) => item.id === id))
    .filter((item): item is (typeof faqItems)[number] => Boolean(item));

  return (
    <Section id="faq" tone="ash" divided>
      <SectionHeading
        title="Answers before you book."
        action={
          <Button
            href={routes.faq}
            variant="outline"
            iconRight={<ArrowRight size={16} />}
          >
            All questions
          </Button>
        }
      />
      <div className="mt-12 md:mt-16">
        <Accordion items={items} />
      </div>
    </Section>
  );
}
