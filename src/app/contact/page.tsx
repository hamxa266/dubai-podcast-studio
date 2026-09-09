import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/ui/ContactForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { external, hours, site, socialLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Dubai Podcast Studio, Tamani Arts Building, Business Bay. WhatsApp, email, opening hours, parking and directions.",
  /* Self-canonical. The live site has several near-duplicate pages
     competing for the same query, so this matters more than usual. */
  alternates: { canonical: "/contact" },
};

/**
 * Contact.
 *
 * ARRANGEMENT, and why it is not the homepage block again.
 *
 * On the homepage, location and contact are one condensed section arriving
 * after nine others, so it leads with the place. Someone who navigates here
 * has already decided to get in touch, so this page leads with the channels
 * instead: three large targets first, then the practical detail of finding the
 * building, then the form last as the slowest option rather than the default.
 *
 * WhatsApp is first on purpose. It is the channel this studio actually answers
 * quickly, and the only one of the three that is not a shell.
 */
export default function ContactPage() {
  const channels = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      value: site.phone,
      note: "Fastest way to reach the studio.",
      href: external.whatsapp,
    },
    {
      id: "email",
      label: "Email",
      value: site.email,
      note: "For quotes, invoices and longer questions.",
      href: external.email,
    },
    {
      id: "visit",
      label: "Visit",
      value: `${site.address.building}, ${site.address.district}`,
      note: "Open in Google Maps for directions.",
      href: external.maps,
    },
  ];

  return (
    <>
      <Container as="header" className="pb-12 pt-16 md:pb-16 md:pt-24">
        <h1 className="text-title text-balance text-ink">Talk to the studio.</h1>
        <p className="measure mt-5 text-lead text-muted">
          Questions about a room, a package, or a session that does not fit the
          calendar.
        </p>
      </Container>

      {/* Channels first, as three large targets. */}
      <Container>
        <ul className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {channels.map((channel) => (
            <li key={channel.id} className="bg-paper">
              <a
                href={channel.href}
                {...(channel.id !== "email"
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex h-full flex-col gap-4 p-8 transition-colors duration-[var(--dur-base)] ease-out-expo hover:bg-ash lg:p-10"
              >
                <span className="flex items-center justify-end text-ink">
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="text-muted transition-transform duration-[var(--dur-base)] ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                </span>
                <span className="block text-sm text-muted">
                  {channel.label}
                </span>
                <span className="block text-subtitle text-ink">
                  {channel.value}
                </span>
                <span className="block text-sm text-muted">{channel.note}</span>
                {channel.id !== "email" ? (
                  <span className="sr-only">(opens in a new tab)</span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </Container>

      {/* Then the practical detail of actually getting there. */}
      <Section tone="ink" className="mt-20 md:mt-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-title text-paper">Finding the building.</h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={external.maps} iconRight={<ArrowUpRight size={16} />}>
                Get directions
              </Button>
            </div>
          </div>

          <dl className="lg:col-span-7">
            <div className="grid gap-1 border-t border-line-dark-strong py-5 sm:grid-cols-3 sm:gap-6">
              <dt className="text-sm text-muted-dark">Address</dt>
              <dd className="text-paper sm:col-span-2">
                {site.address.building}
                <br />
                {site.address.district}, {site.address.city}
              </dd>
            </div>
            <div className="grid gap-1 border-t border-line-dark-strong py-5 sm:grid-cols-3 sm:gap-6">
              <dt className="text-sm text-muted-dark">Parking</dt>
              <dd className="text-paper sm:col-span-2">
                Guest parking in the building, near the lobby. Ask building
                security if you need help finding it.
              </dd>
            </div>
            <div className="grid gap-1 border-t border-line-dark-strong py-5 sm:grid-cols-3 sm:gap-6">
              <dt className="text-sm text-muted-dark">Booking hours</dt>
              <dd className="text-paper sm:col-span-2">
                Monday to Saturday {hours.weekdays}
                <br />
                Sunday {hours.sunday}
              </dd>
            </div>
            <div className="grid gap-1 border-t border-line-dark-strong py-5 sm:grid-cols-3 sm:gap-6">
              <dt className="text-sm text-muted-dark">Follow</dt>
              <dd className="sm:col-span-2">
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {socialLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-paper underline decoration-line-dark-strong underline-offset-4 transition-colors duration-[var(--dur-base)] ease-out-expo hover:decoration-accent"
                      >
                        {link.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      {/* Form last. It is the slowest route, so it does not lead. */}
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-title text-ink">Or write instead.</h2>
            <p className="measure mt-5 text-muted">
              For anything that needs more than a message, use the form. For
              anything urgent, WhatsApp is quicker.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}
