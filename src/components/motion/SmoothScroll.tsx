"use client";

import { useEffect } from "react";

/**
 * Smooth scroll, and the bridge between Lenis and GSAP ScrollTrigger.
 *
 * The hero parallax is a scrubbed ScrollTrigger, and a scrubbed timeline has
 * to be driven by the same clock as the smooth-scroll loop. Without the bridge
 * below, the scrubbed element lags a frame behind the scroll and jitters.
 *
 * WHY THE IMPORTS ARE DYNAMIC
 * ---------------------------
 * This component sits in the root layout, so a static import would put GSAP
 * and Lenis in the shared bundle for every route, including Contact and FAQ,
 * which have no choreography at all. Importing them inside the effect moves
 * them into a lazy chunk fetched after hydration, so they never block first
 * paint or interactivity.
 *
 * It also means that under prefers-reduced-motion they are never downloaded.
 * The guard returns before the import, so a visitor who has asked their OS for
 * less motion pays nothing for a motion library, which is the correct outcome
 * and not just a polite one.
 *
 * ACCESSIBILITY: hijacking scroll from someone with a vestibular disorder is
 * one of the fastest ways to make a site unusable. Under reduced motion Lenis
 * never starts and native scrolling is left completely alone.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);

      /* The component may have unmounted while the chunk was in flight. */
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        /* Touch keeps native scrolling. Smooth-scrolling a phone fights the
           platform's own momentum and feels broken. */
        smoothWheel: true,
        syncTouch: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      teardown = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    })();

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  return <>{children}</>;
}
