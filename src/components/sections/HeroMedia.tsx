"use client";

import { useEffect, useRef } from "react";

import studioSession from "@/assets/images/studio-session.jpg";
import { ImageFrame } from "@/components/ui/ImageFrame";

/**
 * Hero photograph, with a restrained scroll parallax.
 *
 * The image is the real thing: an actual session in one of the rooms, boom
 * mics up, two people mid-conversation. It carries four of the five things the
 * first viewport has to communicate on its own, which no amount of copy would.
 *
 * MOTION
 * ------
 * Two effects, both deliberately small.
 *
 * 1. A 1.06 to 1 scale on load, from CSS, not from here. It settles the image
 *    without touching opacity, because this is the LCP element and fading it
 *    would push Largest Contentful Paint back by the length of the animation.
 *
 * 2. A parallax of 6% of the frame height as the hero scrolls away. The image
 *    is rendered slightly taller than its frame so there is somewhere to move
 *    to and no edge is ever exposed.
 *
 * No zoom-on-scroll, no pinning. The brief asks for restraint here and a hero
 * that fights the user's scroll is a hero that delays the booking action.
 */
export function HeroMedia() {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;

    /* Honour the OS preference. At MOTION_INTENSITY 9 this is the difference
       between a usable page and an unusable one, and returning here also means
       GSAP is never downloaded for this visitor at all. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    /* Dynamic import: this is the LCP section, so the animation library is
       fetched after hydration rather than competing with the hero image. */
    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          inner,
          { yPercent: -2.5 },
          {
            yPercent: 2.5,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }, frame);

      teardown = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  return (
    /*
      The FRAME owns the aspect ratio and does the clipping. That matters: a
      percentage height only resolves against a parent with a definite height,
      so the inner element can only be made taller than the frame if the frame
      itself is the sized one.

      16:9 on small screens keeps both people comfortably inside the crop.
      21:9 is the photograph's native ratio and is used once there is width
      for it, so on desktop nothing is cropped at all.
    */
    <div
      ref={frameRef}
      className="enter-media relative aspect-[16/9] overflow-hidden lg:aspect-[21/9]"
    >
      {/* 12% taller than the frame, offset by half of that, so there is 6% of
          headroom on each side. The parallax travels 2.5% of the inner height,
          which is about 2.8% of the frame, so an edge is never exposed. */}
      <div ref={innerRef} className="absolute inset-x-0 -top-[6%] h-[112%]">
        <ImageFrame
          src={studioSession}
          /* Describes what is actually in the frame. No keyword stuffing. */
          alt="Two people recording an interview on bouclé armchairs, boom microphones between them, in a warm terracotta panelled studio"
          ratio="fill"
          priority
          sizes="100vw"
        />
      </div>
    </div>
  );
}
