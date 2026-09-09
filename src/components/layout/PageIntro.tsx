import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";

interface PageIntroProps {
  title: string;
  lead?: string;
  children?: ReactNode;
}

/**
 * Header for an inner page.
 *
 * Title and lead stack. No eyebrow: the page title already names the page, so
 * a label above it would repeat itself and burn the page's eyebrow budget for
 * nothing.
 */
export function PageIntro({ title, lead, children }: PageIntroProps) {
  return (
    <Container as="header" className="pb-14 pt-16 md:pb-20 md:pt-24">
      <h1 className="text-title text-balance text-ink">{title}</h1>
      {lead ? <p className="measure mt-6 text-lead text-muted">{lead}</p> : null}
      {children ? <div className="mt-9">{children}</div> : null}
    </Container>
  );
}
