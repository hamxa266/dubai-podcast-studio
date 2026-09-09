import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { StructuredData } from "@/components/seo/StructuredData";
import { site } from "@/data/site";
import { fontVariables } from "@/styles/fonts";
import "@/styles/globals.css";

/**
 * Metadata.
 *
 * Titles are written for people. The live tags read "DUBAI PODCAST STUDIO |
 * Podcast Studio Rental | Podcast Studio Dubai", which is the same phrase three
 * times. The search intent behind it is preserved here, because the terms that
 * matter (podcast studio, Business Bay, Dubai) each appear once in a sentence a
 * person would actually read.
 *
 * `alternates.canonical` is relative, so every page resolves against
 * metadataBase and self-canonicalises. That matters more than usual here: the
 * live site has several near-duplicate pages competing for the same query.
 *
 * The Open Graph and Twitter cards come from src/app/opengraph-image.jpg and
 * twitter-image.jpg by file convention, so Next emits the correct absolute URLs
 * and dimensions without them being hand-written.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Podcast recording in Business Bay`,
    template: `%s | ${site.name}`,
  },
  description:
    "Seven professional podcast studios in Business Bay, Dubai. Shure SM7B microphones, 4K multi-camera setups and an operator on every session.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: site.name,
    url: site.url,
    title: `${site.name} | Podcast recording in Business Bay`,
    description:
      "Seven professional podcast studios in Business Bay, Dubai. Book by the hour, with an operator on every session.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Podcast recording in Business Bay`,
    description:
      "Seven professional podcast studios in Business Bay, Dubai. Book by the hour, with an operator on every session.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * The current site ships `width=320, user-scalable=yes`, so it renders at a
 * fixed 320px and is scaled up by the phone. This is the correct declaration,
 * and zoom is not restricted.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-[100dvh] antialiased">
        <StructuredData />

        {/* First tab stop. Keyboard users should not have to walk the nav on
            every page to reach the content. */}
        <a
          href="#main"
          className="sr-only rounded-pill bg-accent px-5 py-2 font-medium text-accent-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[var(--z-drawer)]"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <div className="flex min-h-[100dvh] flex-col">
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
