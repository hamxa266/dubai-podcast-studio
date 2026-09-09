"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Desktop navigation.
 *
 * Five items, one line, no dropdowns, no overflow "More" menu. The live site
 * carries ten top-level items and hides half of them behind an overflow.
 *
 * The booking CTA is deliberately NOT in this list. The header renders it as
 * the only filled control in the bar.
 */
export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex h-10 items-center rounded-pill px-4 text-sm",
                  "transition-colors duration-[var(--dur-base)] ease-out-expo",
                  active ? "text-ink" : "text-muted hover:text-ink",
                  /* The accent underline only works because it sits on ink-
                     coloured text, not as the text itself. Yellow type on
                     white measures 1.10:1. */
                  "after:absolute after:inset-x-4 after:bottom-1.5 after:h-[3px]",
                  "after:origin-left after:scale-x-0 after:bg-accent",
                  "after:transition-transform after:duration-[var(--dur-base)]",
                  "after:ease-out-expo hover:after:scale-x-100",
                  active && "after:scale-x-100",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
