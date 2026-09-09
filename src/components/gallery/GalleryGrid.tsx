"use client";

import { ArrowsOut } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";

import { Lightbox } from "@/components/gallery/Lightbox";
import { setups } from "@/data/setups";
import { cn } from "@/lib/cn";

/**
 * Full gallery grid.
 *
 * Deliberately a different layout from the homepage mosaic. That one is a
 * fixed composition of six chosen cells; this is a masonry of everything, in
 * CSS columns, so each photograph keeps its own proportions instead of being
 * cropped into a slot. Landscape and portrait sit together without either
 * being forced.
 *
 * Text is kept to a single caption per image, because the brief for this page
 * is the photography and nothing else.
 *
 * Shares the Lightbox with the homepage. Reusing a component is fine; it is
 * reusing a section arrangement that would make the pages feel copy-pasted.
 */
export function GalleryGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggersRef = useRef<(HTMLButtonElement | null)[]>([]);
  const lastTrigger = useRef<number>(0);

  const open = (index: number) => {
    lastTrigger.current = index;
    setOpenIndex(index);
  };

  const close = () => {
    setOpenIndex(null);
    triggersRef.current[lastTrigger.current]?.focus();
  };

  return (
    <>
      {/* CSS columns rather than grid: a masonry flow that does not impose a
          row height, so nothing is cropped to fit a neighbour. */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {setups.map((setup, index) => (
          <button
            key={setup.id}
            ref={(node) => {
              triggersRef.current[index] = node;
            }}
            type="button"
            onClick={() => open(index)}
            className="group block w-full break-inside-avoid text-left"
          >
            <span className="relative block overflow-hidden bg-ash">
              <Image
                src={setup.image}
                alt={setup.alt}
                placeholder="blur"
                loading={index < 3 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full transition-transform duration-[var(--dur-slow)] ease-out-expo group-hover:scale-[1.03]"
              />
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
            <span className="sr-only">, open larger image</span>
          </button>
        ))}
      </div>

      <Lightbox
        items={setups}
        index={openIndex}
        onClose={close}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
