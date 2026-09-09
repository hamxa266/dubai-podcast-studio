import localFont from "next/font/local";

/**
 * Switzer (Indian Type Foundry, via Fontshare).
 *
 * Licence: ITF Free Font License. Commercial use and self-hosting are both
 * explicitly permitted. Files ship unmodified as distributed, because the FFL
 * classes subsetting and format conversion as a Derivative Work.
 *
 * TWO weights, not three. Bold was dropped after a grep found no `font-bold`
 * or `font-semibold` anywhere in the codebase: display type here is weight 400
 * and gets its impact from scale, so the 700 face was 20 KB of pure waste.
 *
 * These are preloaded: 400 sets the hero headline and 500 sets the navigation,
 * so both are needed for the first meaningful paint.
 */
const switzer = localFont({
  src: [
    { path: "./fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

/**
 * Geist Mono, for numerals only: prices, hours, capacities, office numbers.
 *
 * NOT PRELOADED, deliberately. Self-hosted here rather than taken from the
 * `geist` package because that package ships a fixed next/font instance with
 * preload on, and its variable file was the single largest asset on the page
 * at 70 KB. Nothing it sets is the largest contentful paint, so making the
 * browser fetch it before first paint was 70 KB spent on labels and figures.
 *
 * The single static Regular is 50 KB against the variable file's 70 KB, but
 * the real win is that it is no longer on the critical path at all.
 * `display: swap` means the figures render immediately in the fallback and
 * swap when it arrives.
 */
const mono = localFont({
  src: [{ path: "./fonts/GeistMono-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

/** Applied once, on <html>, in the root layout. */
export const fontVariables = [switzer.variable, mono.variable].join(" ");
