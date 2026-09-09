import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/cn";

type Ratio = "hero" | "wide" | "landscape" | "portrait" | "square" | "fill";

interface ImageFrameProps {
  /**
   * Prefer a static import over a string path. A static import gives Next the
   * intrinsic width and height at build time, which is what actually prevents
   * layout shift, and it generates the blur placeholder automatically.
   *
   * Omit entirely to render a labelled slot. See `placeholderLabel`.
   */
  src?: string | StaticImageData;
  /**
   * Required. Describe what is in the frame.
   *
   * Do not keyword-stuff. The live site ships alt text reading "...at Dubai
   * podcast studio setup podcast studio Dubai", which repeats the target
   * keyword twice and helps nobody. Decorative images pass alt="".
   */
  alt: string;
  ratio?: Ratio;
  /** True for the hero image only. Drives LCP. */
  priority?: boolean;
  /** Always set this on anything wider than a column. Defaults are wasteful. */
  sizes?: string;
  className?: string;
  /** What photograph belongs here. Shown in the slot when src is absent. */
  placeholderLabel?: string;
}

/* Mixed aspect ratios are a high-variance requirement. Uniform crops are half
   of why the current site reads as a template.

   To vary the ratio by breakpoint, pass it through className: the base value
   here is overridden by tailwind-merge and the responsive variant survives,
   e.g. className="aspect-[16/9] lg:aspect-[21/9]". */
const ratios: Record<Ratio, string> = {
  hero: "aspect-[21/9]",
  wide: "aspect-[16/9]",
  landscape: "aspect-[3/2]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  /* Fills a parent that already has a definite height. Used when the caller
     owns the aspect ratio, which a parallax wrapper has to: it needs the
     frame to be the fixed-size, clipping element and the image to be taller
     than it, so there is somewhere to move to. */
  fill: "h-full",
};

/**
 * The only way an image enters the page.
 *
 * Sharp corners, explicit ratio, required alt. Radius is never applied to
 * media: the shape system is pill controls and sharp everything else.
 */
export function ImageFrame({
  src,
  alt,
  ratio = "landscape",
  priority = false,
  sizes = "100vw",
  className,
  placeholderLabel,
}: ImageFrameProps) {
  const frame = cn(
    "relative isolate w-full overflow-hidden bg-ash",
    ratios[ratio],
    className,
  );

  /*
    No image yet. Rather than filling the gap with a hand-drawn SVG or a
    div-built fake screenshot, an unresolved slot says what it needs. These
    must all be gone before launch.
  */
  if (!src) {
    return (
      <div
        className={cn(frame, "grid place-items-center border border-line")}
        role="img"
        aria-label={alt}
      >
        <p className="px-4 text-center font-mono text-xs uppercase tracking-widest text-muted">
          {placeholderLabel ?? "Photography needed"}
        </p>
      </div>
    );
  }

  const isStatic = typeof src !== "string";

  return (
    <div className={frame}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        /* Anything not above the fold decodes off the critical path. */
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
        /* Blur is only available when Next knows the image at build time. */
        placeholder={isStatic ? "blur" : undefined}
        className="object-cover"
      />
    </div>
  );
}
