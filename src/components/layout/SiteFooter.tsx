import Link from "next/link";

import { Wordmark } from "@/components/layout/Wordmark";
import { Container } from "@/components/ui/Container";
import { external, hours, navItems, site, socialLinks } from "@/data/site";

/**
 * Site footer, on the dark ink ground.
 *
 * The reference closes on a dark block, and it works: it ends the page rather
 * than letting it fade out. Four groups: brand, pages, visiting, contact. The
 * live footer has no sitemap links at all, which leaves the deeper pages
 * reachable only through the nav overflow.
 *
 * No version stamps, no build numbers, no atmospheric locale strip. The
 * address is here because it is useful, not as decoration.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink">
      <Container>
        <div className="grid gap-14 py-20 md:grid-cols-2 md:py-28 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <Wordmark onInk />
            <p className="measure text-sm text-muted-dark">
              Professional podcast recording in Business Bay, Dubai.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-eyebrow uppercase text-accent">Pages</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    /* py-1/-my-1 grows the touch target to ~26px without shifting the
                       layout by a pixel. */
                    className="-my-1 block py-1 text-sm text-paper transition-colors duration-[var(--dur-base)] ease-out-expo hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-eyebrow uppercase text-accent">Visiting</h2>
            <address className="mt-6 flex flex-col gap-3 text-sm not-italic text-muted-dark">
              <span className="text-paper">
                {site.address.building}
                <br />
                {site.address.district}, {site.address.city}
              </span>
              <a
                href={external.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-paper underline decoration-line-dark-strong underline-offset-4 transition-colors duration-[var(--dur-base)] ease-out-expo hover:text-accent hover:decoration-accent"
              >
                Open in Maps
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <span className="flex flex-col gap-1 font-mono text-xs">
                <span>Mon to Sat {hours.weekdays}</span>
                <span>Sun {hours.sunday}</span>
              </span>
            </address>
          </div>

          <div>
            <h2 className="font-mono text-eyebrow uppercase text-accent">Contact</h2>
            <ul className="mt-6 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={external.email}
                  className="text-paper transition-colors duration-[var(--dur-base)] ease-out-expo hover:text-accent"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={external.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper transition-colors duration-[var(--dur-base)] ease-out-expo hover:text-accent"
                >
                  WhatsApp {site.phone}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>

            <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-my-1 block py-1 text-sm text-muted-dark transition-colors duration-[var(--dur-base)] ease-out-expo hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line-dark py-7 text-xs text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            {year} {site.name}
          </p>
          <a
            href={external.terms}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit transition-colors duration-[var(--dur-base)] ease-out-expo hover:text-paper"
          >
            Terms of service
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
