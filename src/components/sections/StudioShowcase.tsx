import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { SetupMosaic } from "@/components/gallery/SetupMosaic";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cta, routes } from "@/data/site";
import { studios } from "@/data/studios";

/**
 * Studio showcase.
 *
 * Two halves that do different jobs. The mosaic answers "do these rooms look
 * good", which only photography can. The index answers "which rooms are there
 * and can I book them", which only facts can.
 *
 * Keeping them separate is deliberate. The available photography cannot be
 * attributed to a specific room, so pairing an image with "YALLAPOD 2" would
 * be inventing a fact a customer could act on. See src/data/studios.ts.
 *
 * Counts here are the studio's own: 7 rooms, 45+ setups. Nothing invented.
 */
export function StudioShowcase() {
  return (
    <Section id="studios" divided>
      <SectionHeading
        eyebrow="The rooms"
        title="Seven studios, and more than forty-five ways to set them up."
        body="Different backdrops, lighting and seating, so a second season does not have to look like the first."
        /* Browse, not book. This section's job is to make someone want to
           look, and the page already carries eight booking prompts. It also
           restores the browse path Phase 1 found missing from the live site:
           see a room, then decide. */
        action={
          <Button
            href={routes.studios}
            variant="ink"
            iconRight={<ArrowRight size={16} />}
          >
            {cta.studios}
          </Button>
        }
      />

      <div className="mt-14 md:mt-20">
        <SetupMosaic />
      </div>

      {/* The verified index. Hairline rows, not cards: this is a reference
          table a visitor scans, and boxing each row would slow that down. */}
      <div className="mt-20 md:mt-28">
        <h3 className="font-mono text-eyebrow uppercase text-muted">
          Every room
        </h3>

        <ul className="mt-8 border-t border-line">
          {studios.map((studio) => (
            <li
              key={studio.id}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-line py-5"
            >
              <span className="text-subtitle text-ink">{studio.name}</span>
              <span className="font-mono text-sm text-muted">
                Office {studio.office}
              </span>
              {/* Booking state as words. A coloured dot would carry the same
                  meaning to fewer people. */}
              <span className="ml-auto text-sm text-muted">
                {studio.booking === "online"
                  ? "Book online"
                  : "On request"}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-muted">
          Rooms marked on request are arranged over WhatsApp rather than the
          online calendar.
        </p>
      </div>
    </Section>
  );
}
