import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Anchor target. scroll-padding-top in globals.css clears the header. */
  id?: string;
  /**
   * paper is the page default. ash is the quiet alternate. ink is the dark
   * full-bleed punctuation the reference uses between white sections.
   *
   * This is not theme flipping. The site is one light system; ink sections are
   * a deliberate compositional device, the same way a full-bleed photograph
   * is, and the chrome around them does not change.
   */
  tone?: "paper" | "ash" | "ink";
  /** Hairline above the section. The primary grouping device, used sparingly. */
  divided?: boolean;
  bleed?: boolean;
  spacing?: "default" | "tight" | "none";
}

const spacingMap = {
  default: "py-24 md:py-32 lg:py-40",
  tight: "py-10 md:py-14",
  none: "",
} as const;

const toneMap = {
  paper: "",
  ash: "bg-ash",
  /* `on-ink` also switches nested focus rings to the accent, which measures
     15.81:1 there against 1.10:1 on white. */
  ink: "on-ink",
} as const;

/**
 * Vertical rhythm for the whole site.
 *
 * Sections never set their own py-*. If one needs different spacing, add a
 * variant here rather than overriding at the call site.
 */
export function Section({
  children,
  className,
  id,
  tone = "paper",
  divided = false,
  bleed = false,
  spacing = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        spacingMap[spacing],
        toneMap[tone],
        divided && (tone === "ink" ? "border-t border-line-dark" : "border-t border-line"),
        className,
      )}
    >
      <Container bleed={bleed}>{children}</Container>
    </section>
  );
}
