import Link from "next/link";

import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

interface WordmarkProps {
  className?: string;
  onInk?: boolean;
}

/**
 * Brand lockup.
 *
 * PLACEHOLDER, deliberately. The existing logo is a raster PNG served at
 * 100x60, a black square with the name stacked over three lines. It is
 * recognisable and worth keeping, but there is no vector version, so it
 * cannot be set at arbitrary sizes yet.
 *
 * This is a wordmark set in the display face, which taste-skill permits as a
 * simple mark. Replace it with the real SVG once the studio supplies one.
 *
 * The trailing dot is the only ornament, and it is the one place the accent
 * appears in the header. On white it needs ink around it to be visible at all,
 * which is why it is a filled dot rather than coloured text.
 */
export function Wordmark({ className, onInk = false }: WordmarkProps) {
  return (
    <Link
      href={routes.home}
      aria-label="Dubai Podcast Studio, home"
      className={cn(
        "group inline-flex items-center gap-1.5 font-display text-[0.9375rem] font-medium",
        "uppercase leading-none tracking-[-0.01em] sm:text-base",
        onInk ? "text-paper" : "text-ink",
        className,
      )}
    >
      <span>Dubai Podcast Studio</span>
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-pill bg-accent",
          "transition-transform duration-[var(--dur-base)] ease-out-expo",
          "group-hover:scale-150",
        )}
      />
    </Link>
  );
}
