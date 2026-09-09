import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /** Set on dark-ground sections so the label stays legible. */
  onInk?: boolean;
}

/**
 * Small uppercase label above a section headline.
 *
 * RATIONED. Taste-skill allows at most ceil(sectionCount / 3) per page, and
 * putting one above every section is the single most common AI tell. The
 * homepage budget is 3 across 9 sections and 2 are allocated.
 *
 * Colour is ink or muted, never the accent: yellow text on white measures
 * 1.10:1 and would be invisible. On a dark section the accent is fine, which
 * is what onInk switches to.
 *
 * It names the topic in plain language. Never a section number, never a
 * version label, never a date range.
 */
export function Eyebrow({ children, className, onInk = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-mono text-eyebrow uppercase",
        onInk ? "text-accent" : "text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
