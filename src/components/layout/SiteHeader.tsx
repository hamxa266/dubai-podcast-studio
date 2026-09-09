import { Wordmark } from "@/components/layout/Wordmark";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNav } from "@/components/navigation/MobileNav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cta, external } from "@/data/site";

/**
 * Site header.
 *
 * One line at every breakpoint. 64px, rising to 76px at lg, both inside the
 * 80px cap. It reads --header-h so scroll-padding and the drawer stay in sync
 * with it.
 *
 * A Server Component. The two interactive pieces, DesktopNav and MobileNav,
 * are isolated client leaves.
 */
export function SiteHeader() {
  /* Solid, not translucent. A blurred white bar over a white page buys
     nothing visually and costs a backdrop-filter repaint on every scroll
     frame, which is the sort of fake-glass detail that only shows up as a
     dropped frame on a mid-range phone. */
  return (
    <header className="sticky top-0 z-[var(--z-header)] border-b border-line bg-paper">
      <Container>
        <div
          className="flex items-center justify-between gap-6"
          style={{ height: "var(--header-h)" }}
        >
          <Wordmark />

          {/* Nav sits right, beside the CTA, so the two read as one group. */}
          <div className="flex items-center gap-2 lg:gap-8">
            <DesktopNav />

            {/* The only filled accent control in the bar. */}
            <Button
              href={external.booking}
              size="sm"
              className="hidden sm:inline-flex"
            >
              {cta.book}
            </Button>

            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
