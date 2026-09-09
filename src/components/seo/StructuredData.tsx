import { faqItems } from "@/data/faq";
import { serviceTiers } from "@/data/pricing";
import { external, site } from "@/data/site";

/**
 * JSON-LD structured data.
 *
 * The live site has none, despite publishing an address, opening hours, three
 * prices and 35 questions. That is the single largest SEO gap the Phase 1
 * audit found, and it is the sort that costs real visibility: without it the
 * business is ineligible for the local and FAQ rich results it already has the
 * content to earn.
 *
 * Everything below is generated from the same data the page renders, so the
 * markup cannot drift from what a visitor actually sees. That is not just tidy:
 * structured data that disagrees with the visible page is a manual-action risk.
 *
 * No invented fields. There is deliberately no aggregateRating, because the
 * studio's reviews live on its Google listing and this project has no verified
 * rating to state. Marking up a rating the site does not display is exactly the
 * kind of thing that earns a penalty.
 */
export function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#studio`,
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}/opengraph-image.jpg`,
    description:
      "Professional podcast recording studios in Business Bay, Dubai. Audio and video recording with Shure SM7B microphones and an operator on every session.",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.building,
      addressLocality: site.address.district,
      addressRegion: site.address.city,
      addressCountry: "AE",
    },
    /* From the studio's published booking window, not the looser
       "open until 11pm" line that contradicts it elsewhere on the site. */
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "20:00",
      },
    ],
    priceRange: "AED 350 to AED 1000 per hour",
    hasMap: external.maps,
    sameAs: [
      "https://www.instagram.com/dubaipodcaststudio/",
      "https://www.tiktok.com/@dubaipodcaststudio",
      "https://www.youtube.com/@DubaiPodcastStudio/about",
      "https://www.linkedin.com/in/dubai-podcast-studio",
    ],
    makesOffer: serviceTiers.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      priceCurrency: "AED",
      price: tier.rate,
      /* UNIT_HOUR. The unit is stated because the live site omits it on two of
         the three tiers; see the note in src/data/pricing.ts. */
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: tier.rate,
        priceCurrency: "AED",
        unitCode: "HUR",
      },
      url: external.booking,
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${site.url}/faq#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
