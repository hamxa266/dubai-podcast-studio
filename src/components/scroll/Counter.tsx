"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a published figure up from zero when it comes into view.
 *
 * Takes the figure exactly as the studio writes it ("7", "45+", "3,500+") and
 * keeps its prefix, suffix and thousands separator, so what it lands on is
 * character for character what src/data/site.ts holds.
 *
 * WHY IT ALSO RUNS UNDER REDUCED MOTION. A number changing in place moves
 * nothing across the screen, so it is not the kind of motion that setting
 * exists to stop, and the engine's own counter skipping straight to the final
 * value is what made these read as broken. Parallax, zoom and slides are still
 * switched off for those visitors elsewhere on the page.
 *
 * Server-rendered with the final value, so without JavaScript, and for screen
 * readers throughout, the figure is simply correct.
 */
export function Counter({ value, ms = 1600 }: { value: string; ms?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)([\d,]+)(.*)$/);
    if (!el || !match) return;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    const grouped = digits.includes(",");
    const format = (n: number) =>
      prefix + (grouped ? n.toLocaleString("en-US") : String(n)) + suffix;

    let frame = 0;
    el.textContent = format(0);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / ms);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = format(Math.round(target * eased));
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value, ms]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
