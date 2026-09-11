"use client";

import { useEffect } from "react";

/**
 * Mounts the scroll-craft engine over the homepage markup.
 *
 * WHY A SCRIPT TAG RATHER THAN AN IMPORT
 * --------------------------------------
 * The engine is a 59 KB IIFE that assigns `window.ScrollCraft` and exports
 * nothing, so TypeScript refuses it as a module and bundling it would mean
 * editing it. It is vendored, unmodified mechanism, so it ships from
 * `public/sc/` as a static asset and is injected here on demand. That keeps it
 * out of the shared bundle, which matters: every other route on this site has
 * no choreography at all.
 *
 * THE ENGINE LOADS UNDER REDUCED MOTION TOO, AND IT HAS TO.
 * ---------------------------------------------------------
 * This component originally returned early under `prefers-reduced-motion`, by
 * analogy with GSAP and Lenis in CLAUDE.md section 5. That was a serious bug,
 * and it is worth recording so nobody re-introduces it.
 *
 * The engine's stylesheet sets `[data-sc-cue] { opacity: 0 }` and
 * `[data-sc-in] { opacity: 0 }` as pre-paint states, and it is the engine that
 * writes them back up. Its reduced-motion block drops transforms but
 * deliberately leaves opacity alone, because opacity is what carries meaning.
 * So refusing to load the engine did not degrade the page to static, it left
 * the headline, the figures, the equipment list, the peak copy and the rates
 * table permanently invisible for precisely the visitors who asked for less
 * motion. The verification harness could not report it either: it waits for
 * `html.sc-ready`, which only the engine adds, so it timed out before taking a
 * single frame.
 *
 * The engine has its own reduced-motion floor and honours it properly: no
 * smoothing on the playhead, no parallax, no wipes, rails handed back as native
 * scroll regions, and `data-sc-src` clips never fetched at all. So the heavy
 * asset is still skipped; only the 59 KB of mechanism is not.
 *
 * ON COEXISTING WITH LENIS
 * ------------------------
 * Lenis is already running from the root layout. It scrolls the real window
 * rather than transforming a wrapper, and the engine reads `scrollY` inside its
 * own rAF loop, so the two agree on position with no bridge. The engine does
 * attach two `scroll` listeners of its own, which CLAUDE.md section 5 bans in
 * project code; that ban is about hand-rolled per-frame handlers, and both of
 * the engine's are rAF-throttled. The rule stays in force for anything written
 * in this repository.
 *
 * The engine is never edited per project. It is themed with tokens in
 * collection.css and driven entirely by `data-sc-*` attributes on the markup.
 */

interface ScrollCraftGlobal {
  mount: (root: Element | Document | string) => unknown;
  reduce: boolean;
  instances: unknown[];
}

declare global {
  interface Window {
    ScrollCraft?: ScrollCraftGlobal;
    __scMounted?: boolean;
  }
}

const SRC = "/sc/scrollcraft.js";

export function CollectionStage() {
  useEffect(() => {
    const root = document.getElementById("collection");
    if (!root) return;

    /* Client-side navigation back to the homepage would otherwise mount a
       second instance over the same markup, and both would write transforms. */
    if (window.__scMounted) return;

    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      const engine = window.ScrollCraft;
      if (!engine) return;
      window.__scMounted = true;
      engine.mount(root);
    };

    if (window.ScrollCraft) {
      start();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SRC}"]`,
    );

    if (existing) {
      existing.addEventListener("load", start, { once: true });
      return () => {
        cancelled = true;
        existing.removeEventListener("load", start);
      };
    }

    const script = document.createElement("script");
    script.src = SRC;
    script.defer = true;
    script.addEventListener("load", start, { once: true });
    document.head.appendChild(script);

    return () => {
      cancelled = true;
      script.removeEventListener("load", start);
    };
  }, []);

  return null;
}
