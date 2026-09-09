"use client";

import { Plus } from "@phosphor-icons/react";
import { useId, useRef, useState } from "react";

import { cn } from "@/lib/cn";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: readonly AccordionItem[];
  /** Heading level for each question, so page outlines stay correct. */
  headingLevel?: "h3" | "h4";
}

/**
 * Accessible accordion, built to the ARIA authoring practices pattern.
 *
 * MARKUP: each question is a real <button> inside a heading, carrying
 * aria-expanded and aria-controls. Each answer is a region labelled by its
 * button. That is what lets a screen reader announce the state and jump
 * between questions.
 *
 * KEYBOARD: Enter and Space come free with a real button. Arrow Down and Arrow
 * Up move between questions, Home and End jump to the first and last, which is
 * the behaviour the APG pattern specifies.
 *
 * COLLAPSED CONTENT: the panel stays in the DOM so it can animate, and is
 * marked `inert` while closed. That matters. A panel collapsed to zero height
 * with overflow hidden is still reachable by a screen reader and still in the
 * tab order, which is a genuine accessibility bug and a common one. `inert`
 * removes it from both.
 *
 * MOTION: the height transition uses a grid template going from 0fr to 1fr,
 * which animates on the compositor without needing a measured pixel height.
 * The global reduced-motion rule collapses it to an instant open.
 */
export function Accordion({ items, headingLevel = "h3" }: AccordionProps) {
  /* One open at a time. These answers are self-contained, and on a phone it
     keeps the list scannable rather than turning it into a wall. */
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const Heading = headingLevel;

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = items.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next !== null) {
      event.preventDefault();
      buttonsRef.current[next]?.focus();
    }
  };

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const open = openId === item.id;
        const buttonId = `${baseId}-q-${item.id}`;
        const panelId = `${baseId}-a-${item.id}`;

        return (
          <div key={item.id} className="border-b border-line">
            <Heading>
              <button
                ref={(node) => {
                  buttonsRef.current[index] = node;
                }}
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "flex w-full items-start justify-between gap-6 py-6 text-left",
                  "transition-colors duration-[var(--dur-base)] ease-out-expo",
                  "hover:text-muted",
                )}
              >
                <span className="text-subtitle text-balance">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 grid size-8 shrink-0 place-items-center rounded-pill border border-line-strong",
                    "transition-transform duration-[var(--dur-base)] ease-out-expo",
                    open && "rotate-45",
                  )}
                >
                  <Plus size={16} />
                </span>
              </button>
            </Heading>

            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-[var(--dur-base)] ease-out-expo",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={!open}
                className="overflow-hidden"
              >
                <p className="measure pb-7 text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
