"use client";

import { ArrowsOut } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";

import { Lightbox } from "@/components/gallery/Lightbox";
import { setups } from "@/data/setups";
import { cn } from "@/lib/cn";

/**
 * Editorial mosaic of the studio setups.
 *
 * LAYOUT. Deliberately not a card grid. Two wide landscape cells over four
 * narrow portrait cells of differing heights, so the composition has a top and
 * a rhythm rather than reading as a table. Every cell holds a real photograph:
 * the layout was built around the images that exist, so there are no empty
 * cells.
 *
 * Cell size is driven by source resolution, not by taste alone. The two 2400px
 * photographs take the wide row; the narrow row mixes two smaller photographs
 * with two 360x640 video frames, at a column width where none of them is
 * upscaled into looking cheap.
 *
 * MOBILE. One column, full width, generous gaps. Photography is the argument
 * this section is making, so it is not reduced to thumbnails on a phone.
 */

/* Class strings are written out in full, and they have to be. Tailwind scans
   source text for complete class names, so a value built at runtime such as
   `lg:${ratio}` would never be generated and the ratio would silently fall
   back to the mobile one. */
/*
  The first setup is the hero photograph, so the mosaic starts at the second.
  Showing the same picture full-bleed in the hero and again as the largest
  tile a screen later reads as running out of material.

  It stays in the lightbox, which holds all ten.
*/
const OFFSET = 1;

const cells = [
  /* Row one: the two strongest photographs, both 2400px landscapes, in the
     only cells wide enough to deserve them. Widths differ, heights match, so
     the row reads as composed rather than ragged. */
  {
    span: "lg:col-span-7",
    ratio: "aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-[460px]",
  },
  {
    span: "lg:col-span-5",
    ratio: "aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-[460px]",
  },
  /* Row two: four portrait cells at 3 columns each. Two are real photographs,
     two are 360x640 video frames, and at roughly 317px wide none of them is
     upscaled. Heights vary so four equal columns do not read as a row of
     identical cards. */
  {
    span: "lg:col-span-3",
    ratio: "aspect-[4/3] sm:aspect-[4/5] lg:aspect-auto lg:h-[420px]",
  },
  {
    span: "lg:col-span-3",
    ratio: "aspect-[4/3] sm:aspect-[4/5] lg:aspect-auto lg:h-[370px]",
  },
  {
    span: "lg:col-span-3",
    ratio: "aspect-[4/3] sm:aspect-[4/5] lg:aspect-auto lg:h-[440px]",
  },
  {
    span: "lg:col-span-3",
    ratio: "aspect-[4/3] sm:aspect-[4/5] lg:aspect-auto lg:h-[395px]",
  },
] as const;

export function SetupMosaic() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggersRef = useRef<(HTMLButtonElement | null)[]>([]);
  /* Remembers which tile opened the lightbox so focus can be returned there
     rather than dumped at the top of the document. */
  const lastTrigger = useRef<number>(0);

  const featured = setups.slice(OFFSET, OFFSET + cells.length);

  const open = (index: number) => {
    lastTrigger.current = index;
    setOpenIndex(index + OFFSET);
  };

  /* Arrowing in the lightbox can land on an image that has no tile behind it,
     so on close focus returns to the tile that opened it rather than guessing. */
  const close = () => {
    setOpenIndex(null);
    triggersRef.current[lastTrigger.current]?.focus();
  };

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {featured.map((setup, index) => (
          <li
            key={setup.id}
            className={cn("min-w-0", cells[index].span)}
          >
            <button
              ref={(node) => {
                triggersRef.current[index] = node;
              }}
              type="button"
              onClick={() => open(index)}
              className="group block w-full cursor-pointer text-left"
            >
              <span
                className={cn(
                  "relative block w-full overflow-hidden bg-ash",
                  /* Mobile keeps one generous ratio; the varied heights only
                     apply once there are columns to vary. */
                  cells[index].ratio,
                )}
              >
                <Image
                  src={setup.image}
                  alt={setup.alt}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  sizes={index < 2
                    ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 55vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
                  className="object-cover transition-transform duration-[var(--dur-slow)] ease-out-expo group-hover:scale-[1.03]"
                />
                {/* Affordance that the tile opens. Appears on hover and on
                    keyboard focus, so it is not pointer-only. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute bottom-3 right-3 grid size-10 place-items-center rounded-pill",
                    "bg-accent text-accent-ink opacity-0 transition-opacity",
                    "duration-[var(--dur-base)] ease-out-expo",
                    "group-hover:opacity-100 group-focus-visible:opacity-100",
                  )}
                >
                  <ArrowsOut size={18} />
                </span>
              </span>
              <span className="mt-3 block text-sm text-muted">
                {setup.caption}
              </span>
              {/* The visible caption is not enough on its own: the control's
                  purpose is to open a larger view. */}
              <span className="sr-only">, open larger image</span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        items={setups}
        index={openIndex}
        onClose={close}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
