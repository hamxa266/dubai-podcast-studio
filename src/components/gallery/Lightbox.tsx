"use client";

import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

import { IconButton } from "@/components/ui/Button";
import type { Setup } from "@/data/setups";
import { cn } from "@/lib/cn";

interface LightboxProps {
  items: readonly Setup[];
  /** Index of the open item, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}

/**
 * Gallery lightbox. Hand-built, no dependency.
 *
 * KEYBOARD
 *   Escape      close
 *   ArrowLeft   previous
 *   ArrowRight  next
 *   Tab         cycles inside the dialog only
 *
 * Focus moves to the close button on open and returns to whichever tile was
 * clicked on close, which the parent handles. The page behind is scroll-locked,
 * and the dialog is aria-modal with an explicit Tab trap, so neither a pointer
 * nor the tab key reaches it. The dialog unmounts entirely when closed, so
 * there is nothing off-screen left in the tab order to mark inert.
 *
 * TOUCH
 *   A horizontal swipe of more than 50px moves between images. The arrow
 *   buttons do the same job and are the accessible path; the swipe is an
 *   addition, not a replacement.
 */
export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      /* Wraps in both directions, so arrowing never dead-ends. */
      onNavigate((index + delta + items.length) % items.length);
    },
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
        return;
      }
      /* Focus trap. The dialog holds three controls; Tab cycles them rather
         than escaping to the page underneath. */
      if (event.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled])",
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, go, onClose]);

  if (index === null) return null;
  const item = items[index];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.caption}. Image ${index + 1} of ${items.length}`}
      className={cn(
        "on-ink fixed inset-0 z-[var(--z-drawer)] flex flex-col",
        "animate-[enter-up_0.28s_var(--ease-out-expo)_both]",
      )}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        if (start === null) return;
        const delta = event.changedTouches[0].clientX - start;
        if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between border-b border-line-dark px-5 py-4 md:px-8">
        <p className="font-mono text-eyebrow uppercase text-muted-dark">
          {index + 1} of {items.length}
        </p>
        <IconButton
          ref={closeRef}
          label="Close gallery"
          variant="accent"
          onClick={onClose}
        >
          <X size={20} />
        </IconButton>
      </div>

      {/* The image is capped rather than stretched. Most of these frames are
          360x640 and blowing them up would only make the compression visible. */}
      <div className="flex min-h-0 flex-1 items-center justify-center px-5 py-6 md:px-8">
        <Image
          key={item.id}
          src={item.image}
          alt={item.alt}
          placeholder="blur"
          sizes="(max-width: 768px) 90vw, 60vw"
          className="max-h-full w-auto max-w-full object-contain"
        />
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-line-dark px-5 py-4 md:px-8">
        <p className="text-sm text-muted-dark">{item.caption}</p>
        <div className="flex shrink-0 gap-2">
          <IconButton label="Previous image" variant="outline-ink" onClick={() => go(-1)}>
            <ArrowLeft size={18} />
          </IconButton>
          <IconButton label="Next image" variant="outline-ink" onClick={() => go(1)}>
            <ArrowRight size={18} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
