import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import studioOnAir from "@/assets/images/studio-on-air.jpg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Section } from "@/components/ui/Section";
import { equipment } from "@/data/pricing";
import { cta, external, routes } from "@/data/site";
import { studios } from "@/data/studios";

export const metadata: Metadata = {
  title: "Studios",
  description:
    "Seven podcast studios in the Tamani Arts Building, Business Bay, with room numbers, booking states and the equipment in each.",
  /* Self-canonical. The live site has several near-duplicate pages
     competing for the same query, so this matters more than usual. */
  alternates: { canonical: "/studios" },
};

/**
 * Studios.
 *
 * ARRANGEMENT, and why it is not the homepage showcase again.
 *
 * The homepage answers "do these rooms look good" with a mosaic and then lists
 * the rooms underneath. This page inverts that: one large image opens it, and
 * the rooms become the main content, split into the four you can book from the
 * calendar and the three arranged directly with the studio. That split is the
 * question a visitor actually has, and the homepage does not make it.
 *
 * Setup discovery is deliberately handed to the gallery rather than duplicated
 * here, so the two pages do not compete.
 *
 * Images are still not attached to individual rooms, for the reason set out in
 * src/data/studios.ts: nothing in the available photography can be attributed
 * to a specific room, and captioning a picture "YALLAPOD 2" would invent a
 * fact someone could book against.
 */
export default function StudiosPage() {
  const online = studios.filter((s) => s.booking === "online");
  const onRequest = studios.filter((s) => s.booking === "on-request");

  return (
    <>
      {/* Large media first. This page is about the rooms, so it opens on one. */}
      <Container as="header" className="pb-10 pt-16 md:pb-14 md:pt-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="text-title text-balance text-ink lg:col-span-7">
            Seven rooms, one building.
          </h1>
          <p className="measure text-lead text-muted lg:col-span-5">
            All seven studios are in the Tamani Arts Building in Business Bay.
            Four are bookable straight from the calendar.
          </p>
        </div>
      </Container>

      <div className="mb-20 md:mb-28">
        <ImageFrame
          src={studioOnAir}
          alt="Two RØDE microphones on boom arms either side of a pale table, facing a green lit brick wall under a neon ON AIR sign"
          ratio="hero"
          className="aspect-[16/9] lg:aspect-[21/9]"
          priority
          sizes="100vw"
        />
      </div>

      {/* The rooms, as the main content rather than a footnote. Two groups,
          because "can I book this now" is the question that actually matters. */}
      <Container>
        <section aria-labelledby="bookable">
          <h2
            id="bookable"
            className="font-mono text-eyebrow uppercase text-muted"
          >
            Bookable online
          </h2>
          <ul className="mt-8 border-t border-line">
            {online.map((studio) => (
              <li
                key={studio.id}
                className="flex flex-wrap items-baseline gap-x-6 gap-y-3 border-b border-line py-6"
              >
                <span className="text-subtitle text-ink">{studio.name}</span>
                <span className="font-mono text-sm text-muted">
                  Office {studio.office}
                </span>
                <span className="text-sm text-muted">Up to 4 recording</span>
                <Button
                  href={external.booking}
                  variant="outline"
                  size="sm"
                  className="ml-auto"
                >
                  {cta.book}
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="on-request" className="mt-16">
          <h2
            id="on-request"
            className="font-mono text-eyebrow uppercase text-muted"
          >
            On request
          </h2>
          <p className="measure mt-5 text-muted">
            These three are arranged directly with the studio rather than
            through the online calendar. Message them and they will set it up.
          </p>
          <ul className="mt-8 border-t border-line">
            {onRequest.map((studio) => (
              <li
                key={studio.id}
                className="flex flex-wrap items-baseline gap-x-6 gap-y-3 border-b border-line py-6"
              >
                <span className="text-subtitle text-ink">{studio.name}</span>
                <span className="font-mono text-sm text-muted">
                  Office {studio.office}
                </span>
                <Button
                  href={external.whatsapp}
                  variant="outline"
                  size="sm"
                  className="ml-auto"
                  iconRight={<ArrowUpRight size={14} />}
                >
                  {cta.whatsapp}
                </Button>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      {/* Equipment on the dark ground, which breaks the run of white sections
          and separates the room list from the closing ask. */}
      <Section tone="ink" className="mt-20 md:mt-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-title text-paper">The same kit in every room.</h2>
          </div>
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            {equipment.map((item) => (
              <div
                key={item.label}
                className="border-t border-line-dark-strong pt-4"
              >
                <dt className="text-sm text-muted-dark">{item.label}</dt>
                <dd className="mt-1 text-paper">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Container className="py-20 md:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="measure text-lead text-muted">
            More than 45 setups across the seven rooms. The gallery shows what
            the lighting and backdrops actually look like.
          </p>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href={external.booking}>{cta.book}</Button>
            <Button
              href={routes.gallery}
              variant="outline"
              iconRight={<ArrowRight size={16} />}
            >
              See the gallery
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
