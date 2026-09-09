"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { Button, IconButton } from "@/components/ui/Button";
import { cta, external, navItems } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Mobile navigation drawer.
 *
 * The panel is the dark ink ground, which gives the menu a hard edge against
 * the white page and matches the reference's full-bleed dark overlays.
 *
 * Keyboard and screen-reader behaviour, which the current Wix menu does not
 * provide: Escape closes, focus moves into the panel on open and returns to
 * the trigger on close, background scroll is locked, and the trigger reports
 * its state through aria-expanded.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Route change closes the drawer. Without this, tapping a link navigates
     behind an open panel, and so does a browser back gesture.

     Adjusted during render rather than in an effect. Closing in an effect
     would paint the new route with the drawer still open, then close it on a
     second pass. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    /* Captured now, so the cleanup does not read a ref that may have been
       detached by the time it runs. */
    const trigger = triggerRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <IconButton
        ref={triggerRef}
        label="Open menu"
        variant="outline"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <List size={20} />
      </IconButton>

      {/* Scrim. Sits below the panel, above everything else. */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[var(--z-drawer)] bg-ink/50",
          "transition-opacity duration-[var(--dur-base)] ease-out-expo",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        /* Hidden from the accessibility tree and from tab order while closed,
           so a keyboard user never tabs into an off-screen panel. */
        inert={!open}
        className={cn(
          "on-ink fixed inset-y-0 right-0 z-[var(--z-drawer)] flex w-full max-w-sm flex-col",
          "transition-transform duration-[var(--dur-slow)] ease-in-out-quint",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div
          className="flex items-center justify-end border-b border-line-dark px-5"
          style={{ minHeight: "var(--header-h)" }}
        >
          <IconButton
            ref={closeRef}
            label="Close menu"
            variant="accent"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </IconButton>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-5 py-8">
          <ul className="flex flex-col">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href} className="border-b border-line-dark">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-16 items-center font-display text-3xl tracking-[-0.03em]",
                      "transition-colors duration-[var(--dur-base)] ease-out-expo",
                      active ? "text-accent" : "text-paper hover:text-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className="border-t border-line-dark px-5 py-5"
          style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
        >
          <Button href={external.booking} size="lg" fullWidth>
            {cta.book}
          </Button>
        </div>
      </div>
    </div>
  );
}
