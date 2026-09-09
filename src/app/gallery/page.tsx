import type { Metadata } from "next";

import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cta, external, routes } from "@/data/site";
import { setups } from "@/data/setups";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Rooms, lighting and setups at Dubai Podcast Studio in Business Bay.",
  /* Self-canonical. The live site has several near-duplicate pages
     competing for the same query, so this matters more than usual. */
  alternates: { canonical: "/gallery" },
};

/**
 * Gallery.
 *
 * The page is the photographs. No section headings, no eyebrow, no supporting
 * essay: a one-line intro, the images, and a way to book. The live site's
 * gallery runs to 38,544px with 59 ungrouped images and a wall of SEO copy
 * between them, which is the thing this page exists not to be.
 *
 * Layout is a masonry flow, which is not used anywhere else on the site.
 */
export default function GalleryPage() {
  return (
    <>
      <Container as="header" className="pb-12 pt-16 md:pb-16 md:pt-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-title text-balance text-ink">
              Rooms, lighting, setups.
            </h1>
            <p className="measure mt-5 text-lead text-muted">
              {setups.length} photographs from the studios in Business Bay.
            </p>
          </div>
          <Button href={external.booking} size="lg" className="shrink-0">
            {cta.book}
          </Button>
        </div>
      </Container>

      <Container className="pb-20 md:pb-28">
        <GalleryGrid />
      </Container>

      <Container className="border-t border-line py-12">
        <p className="text-sm text-muted">
          Room numbers and booking states are on the{" "}
          <a
            href={routes.studios}
            className="text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-[var(--dur-base)] ease-out-expo hover:decoration-ink"
          >
            studios page
          </a>
          .
        </p>
      </Container>
    </>
  );
}
