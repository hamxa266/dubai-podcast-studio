import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { cta, external, site } from "@/data/site";

/**
 * Closing call to action.
 *
 * Typographic, not photographic, and that is deliberate on two counts. The
 * hero already opens on a full-bleed photograph, so closing on another one
 * would rhyme too neatly with it; and every high-resolution image is already
 * placed elsewhere on the page, so reusing one here would read as running out
 * of material.
 *
 * It does not repeat the hero. The hero states what the place is. This asks
 * for the booking and removes the last excuse, which is the price of finding
 * out.
 */
export function FinalCta() {
  return (
    <Section tone="ink" divided>
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="text-mega text-paper">
            book
            <br />
            the room.
          </p>
        </div>

        <div className="lg:col-span-5 lg:pb-4">
          <p className="measure text-lead text-muted-dark">
            An hour is {site.fromRateAed} AED and takes about a minute to book.
            If you are not sure which room suits you, ask first.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={external.booking} size="lg">
              {cta.book}
            </Button>
            <Button
              href={external.whatsapp}
              variant="outline"
              size="lg"
              className="border-line-dark-strong text-paper hover:border-paper hover:bg-paper/10"
              iconRight={<WhatsappLogo size={18} />}
            >
              {cta.whatsapp}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
