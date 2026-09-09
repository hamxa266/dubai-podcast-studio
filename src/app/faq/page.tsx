import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/PageIntro";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { faqGroups, faqItems } from "@/data/faq";
import { cta, external } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Booking and payment, what happens in the studio, equipment and files, and how to find us in Business Bay.",
  /* Self-canonical. The live site has several near-duplicate pages
     competing for the same query, so this matters more than usual. */
  alternates: { canonical: "/faq" },
};

/**
 * Full FAQ, grouped.
 *
 * The live site presents 35 questions as one undifferentiated list, several of
 * them near-duplicates written for search rather than for a reader. This is the
 * same information grouped into four sections a person can navigate.
 */
export default function FaqPage() {
  return (
    <>
      <PageIntro
        title="Questions"
        lead="Booking and payment, what happens on the day, equipment and files, and finding the building."
      >
        <Button href={external.booking}>{cta.book}</Button>
      </PageIntro>

      {faqGroups.map((group, index) => {
        const items = faqItems.filter((item) => item.group === group.id);
        if (items.length === 0) return null;

        return (
          <Section key={group.id} divided={index > 0} spacing="tight">
            <div className="py-8 md:py-12">
              <h2 className="font-mono text-eyebrow uppercase text-muted">
                {group.label}
              </h2>
              <div className="mt-8">
                <Accordion items={items} />
              </div>
            </div>
          </Section>
        );
      })}

      <Container className="pb-24 pt-4">
        <p className="text-sm text-muted">
          Something not covered here? Message the studio on WhatsApp and they
          will answer directly.
        </p>
      </Container>
    </>
  );
}
