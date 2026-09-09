import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge, taught about this project's custom tokens.
 *
 * WHY THIS IS NOT THE ONE-LINE VERSION
 * ------------------------------------
 * The theme defines custom font sizes (--text-hero, --text-title, ...) and
 * custom colours (--color-ink, --color-paper, ...). Out of the box,
 * tailwind-merge has no idea `text-title` is a size and `text-ink` is a
 * colour, so it files both under the same conflict group and keeps only the
 * last one. `cn("text-title", "text-ink")` silently dropped the size, and
 * every section heading rendered at body size.
 *
 * The same trap caught --radius-* later: `cn("rounded-pill", "rounded-field")`
 * kept BOTH, because tailwind-merge did not know they conflict, and the
 * textarea silently stayed a 9999px lozenge.
 *
 * Registering the custom scales fixes it. Any new --text-*, --color-* or
 * --radius-* token must be added here as well, or it will be silently
 * swallowed the same way.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "hero",
            "title",
            "mega",
            "subtitle",
            "lead",
            "eyebrow",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "ink",
            "paper",
            "ash",
            "muted",
            "muted-dark",
            "accent",
            "accent-ink",
            "accent-hover",
          ],
        },
      ],
      rounded: [{ rounded: ["none", "pill", "field"] }],
    },
  },
});

/**
 * Merge class names, letting a caller's utility win over a component default
 * without specificity fights.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
