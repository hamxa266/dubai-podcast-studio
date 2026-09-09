import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: ReactNode;
  body?: ReactNode;
  eyebrow?: string;
  as?: "h2" | "h3";
  className?: string;
  /** Trailing slot for a section-level link or control. */
  action?: ReactNode;
  onInk?: boolean;
}

/**
 * Section header.
 *
 * Title and body STACK. Taste-skill bans the "big headline left, small
 * explainer floated right" split-header as a default, so this component does
 * not offer it. The `action` slot is for a link or control, which is a real
 * compositional reason to use the right-hand side.
 */
export function SectionHeading({
  title,
  body,
  eyebrow,
  as: Tag = "h2",
  className,
  action,
  onInk = false,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="flex flex-col gap-5">
        {eyebrow ? <Eyebrow onInk={onInk}>{eyebrow}</Eyebrow> : null}
        <Tag className={cn("text-title text-balance", onInk ? "text-paper" : "text-ink")}>
          {title}
        </Tag>
        {body ? (
          <p className={cn("measure text-lead", onInk ? "text-muted-dark" : "text-muted")}>
            {body}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
