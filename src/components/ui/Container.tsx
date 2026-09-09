import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /**
   * Full-bleed sections still need their text inset. `bleed` keeps the
   * horizontal gutter but drops the max width, so a hero or a studio rail can
   * run edge to edge while its copy stays aligned to the shell.
   */
  bleed?: boolean;
}

/**
 * The single horizontal rhythm for the site.
 *
 * Gutters step 20px / 32px / 48px. Nothing else sets page-level padding.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
  bleed = false,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 md:px-8 xl:px-12",
        !bleed && "max-w-shell",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
