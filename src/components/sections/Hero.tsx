import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { HeroMedia } from "@/components/sections/HeroMedia";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cta, external, hero, routes } from "@/data/site";

/**
 * Homepage hero.
 *
 * STRUCTURE: headline, then subtext and CTAs, then a full-bleed photograph.
 * Three text elements in total, inside the four-element hero cap. No eyebrow,
 * no trust micro-strip, no price teaser, no scroll cue, no badges.
 *
 * The composition is deliberately not a split. The photograph is 2.17:1, and
 * cropping it into a right-hand column would have cut one of the two people
 * out of the frame. Running it full width preserves the shot and gives the
 * hero its scale.
 *
 * A Server Component. Only the parallax is a client leaf.
 */
export function Hero() {
  return (
    <section className="pb-16 pt-14 md:pb-20 md:pt-20">
      <Container>
        <div className="grid gap-x-12 gap-y-9 lg:grid-cols-12">
          {/* enter-lcp, not enter: this is the LCP element, so it moves without
              fading. See the note on .enter-lcp in globals.css.

              Spans all twelve columns. It used to stop at eleven, which read
              as a deliberate ragged right but was really just 103px of column
              plus a 48px gap that the headline needed at narrow desktop
              widths: at 1024px it left an 876px measure for a line that wants
              911px, and the headline broke onto three lines. The text is
              balanced and shorter than the box at every width above that, so
              the twelfth column costs nothing visually and buys the two-line
              break where it is tight. */}
          <h1 className="enter-lcp text-hero text-balance text-ink lg:col-span-12">
            {hero.headline}
          </h1>

          {/* Subtext and CTAs sit side by side once there is room, so the
              booking action lands beside the sentence that justifies it
              rather than below the fold. */}
          <p className="enter enter-delay-1 measure text-lead text-muted lg:col-span-6 lg:self-end">
            {hero.subtext}
          </p>

          <div className="enter enter-delay-2 flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end lg:self-end">
            <Button href={external.booking} size="lg">
              {cta.book}
            </Button>
            <Button
              href={routes.studios}
              variant="outline"
              size="lg"
              iconRight={<ArrowRight size={18} />}
            >
              {cta.studios}
            </Button>
          </div>
        </div>
      </Container>

      {/* Full bleed. The container gutter stops here on purpose. */}
      <div className="enter enter-delay-3 mt-12 md:mt-16">
        <HeroMedia />
      </div>
    </section>
  );
}
