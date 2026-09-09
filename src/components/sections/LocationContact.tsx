import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/ui/ContactForm";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cta, external, hours, site } from "@/data/site";

/**
 * Location and contact.
 *
 * Two columns: the practical detail of getting to the building on one side,
 * the ways to reach the studio on the other.
 *
 * No embedded map. An interactive map iframe costs a third-party script and a
 * chunk of main-thread time on a page that already carries GSAP, and it buys
 * nothing a Directions link does not. The address links out to the studio's
 * existing Google Maps listing instead.
 *
 * The form is a frontend shell and says so when submitted. See ContactForm.
 */
export function LocationContact() {
  const details = [
    { label: "Address", value: `${site.address.building}, ${site.address.district}, ${site.address.city}` },
    { label: "Parking", value: "Guest parking in the building, near the lobby. Ask security if you need help finding it." },
    { label: "Booking hours", value: `Monday to Saturday ${hours.weekdays}. Sunday ${hours.sunday}.` },
  ];

  return (
    <Section id="contact" divided>
      <SectionHeading
        eyebrow="Business Bay"
        title="Five minutes from the Burj Khalifa."
        body="The studios are in the Tamani Arts Building. Room numbers are on the studios list."
      />

      <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <dl className="border-t border-line">
            {details.map((item) => (
              <div
                key={item.label}
                className="grid gap-1 border-b border-line py-5 sm:grid-cols-3 sm:gap-6"
              >
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="text-ink sm:col-span-2">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href={external.maps}
              variant="ink"
              iconRight={<ArrowUpRight size={16} />}
            >
              Get directions
            </Button>
            <Button
              href={external.whatsapp}
              variant="outline"
              iconRight={<WhatsappLogo size={18} />}
            >
              {cta.whatsapp}
            </Button>
          </div>

          <div className="mt-10 flex flex-col gap-2 text-sm">
            <a
              href={external.email}
              className="w-fit text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-[var(--dur-base)] ease-out-expo hover:decoration-ink"
            >
              {site.email}
            </a>
            <a
              href={external.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-[var(--dur-base)] ease-out-expo hover:decoration-ink"
            >
              {site.phone}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-6">
          <h3 className="font-mono text-eyebrow uppercase text-muted">
            Or send a message
          </h3>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
