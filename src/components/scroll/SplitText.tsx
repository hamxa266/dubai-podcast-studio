import { Fragment, type CSSProperties, type ElementType } from "react";

/**
 * A heading whose words rise into place one after another.
 *
 * mode="scroll"  words rise out of a mask when the heading enters view. The
 *                engine's `data-sc-in` observer adds `.sc-in`; the stagger is
 *                a per-word CSS delay.
 * mode="load"    for the h1. Transform only, never opacity and never masked,
 *                because the h1 is the LCP element and an element that is
 *                invisible is not painted (CLAUDE.md section 5).
 *
 * Screen readers get the sentence once, as plain text. The split copy is
 * aria-hidden, so nobody hears it word by word.
 *
 * Under reduced motion the words fade in on the same stagger instead of
 * moving. See the reduced block in collection.css.
 *
 * A Server Component: the split happens at build time and ships as HTML.
 */
export function SplitText({
  as: Tag = "h2",
  text,
  className,
  mode = "scroll",
  style,
}: {
  as?: ElementType;
  text: string;
  className?: string;
  mode?: "scroll" | "load";
  style?: CSSProperties;
}) {
  const words = text.split(" ");

  return (
    <Tag
      className={`split split--${mode}${className ? ` ${className}` : ""}`}
      style={style}
      {...(mode === "scroll" ? { "data-sc-in": "" } : {})}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {/* The space sits outside the inline-block word, where it can wrap.
            Inside it, trailing whitespace is dropped and the words run
            together. */}
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="split__w">
              <span className="split__i" style={{ "--i": i } as CSSProperties}>
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
