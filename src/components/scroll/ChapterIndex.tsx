"use client";

import { useEffect, useRef, useState } from "react";

import { hours } from "@/data/site";

/**
 * The left margin: an "on this page" index that tracks where you are, plus
 * whether the studio is open right now.
 *
 * It replaced a column of the building's seven office numbers. That column was
 * decorative, stamped itself in on scroll, and told a visitor nothing they
 * could use: under reduced motion it rendered complete and never changed at
 * all. This one answers two questions a visitor actually has, "where am I on
 * this page" and "can I call or walk in now", and every item in it is a link.
 *
 * Desktop only (1024px and up), where there is a margin to put it in. On a
 * phone the same sections are simply the page.
 *
 * MECHANISM. One rAF loop reading section rects, no scroll listener, per
 * CLAUDE.md section 5. It also samples the ground under itself so it can
 * invert over the dark sections instead of vanishing on them.
 */

export const chapters = [
  { id: "overview", label: "Overview" },
  { id: "numbers", label: "Numbers" },
  { id: "setups", label: "Setups" },
  { id: "kit", label: "Kit" },
  { id: "inside", label: "Inside" },
  { id: "rates", label: "Rates" },
  { id: "rooms", label: "Rooms" },
  { id: "book", label: "Book" },
] as const;

type Status = { open: boolean; line: string; detail: string };

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/* Published hours, read in Dubai time whatever the visitor's own clock says.
   "8:00 to 22:00" is the exact string in src/data/site.ts. */
function statusNow(now: Date): Status {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const day = get("weekday");
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  const [openAt, closeAt] = (day === "Sun" ? hours.sunday : hours.weekdays).split(" to ");

  if (minutes >= toMinutes(openAt) && minutes < toMinutes(closeAt)) {
    return { open: true, line: "Open now", detail: `until ${closeAt}` };
  }
  if (minutes < toMinutes(openAt)) {
    return { open: false, line: "Closed", detail: `opens ${openAt}` };
  }
  const tomorrow = day === "Sat" ? hours.sunday : hours.weekdays;
  return { open: false, line: "Closed", detail: `opens ${tomorrow.split(" to ")[0]}` };
}

export function ChapterIndex() {
  const ref = useRef<HTMLElement>(null);
  /* Null on the server and on the first client render, so the markup matches
     and nothing claims a status before the visitor's clock has been read. */
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(statusNow(new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-chapter]"));
    const sections = chapters.map((c) => document.getElementById(c.id));
    const fill = root.querySelector<HTMLElement>(".toc__fill");

    let frame = 0;
    let active = -1;
    let over = "";
    let lastFill = "";

    const tick = () => {
      const line = window.innerHeight * 0.42;
      let next = 0;
      sections.forEach((section, i) => {
        if (section && section.getBoundingClientRect().top <= line) next = i;
      });

      if (next !== active) {
        links.forEach((link, i) => {
          if (i === next) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
        active = next;
      }

      /* The rail fills to the active item, not to raw scroll, so the line and
         the highlighted label always agree. */
      const target = links[next];
      if (fill && target) {
        const value = `${target.offsetTop + target.offsetHeight / 2}px`;
        if (value !== lastFill) {
          fill.style.height = value;
          lastFill = value;
        }
      }

      /* elementsFromPoint, not elementFromPoint: the index is clickable, so
         the topmost element at its own position is the index itself, and the
         ground check always answered "paper". */
      const rect = root.getBoundingClientRect();
      const under = document
        .elementsFromPoint(rect.left + 8, rect.top + 12)
        .find((el) => !root.contains(el));
      const ground = under?.closest(".g-ink, .rooms") ? "ink" : "";
      if (ground !== over) {
        over = ground;
        if (ground) root.setAttribute("data-over", ground);
        else root.removeAttribute("data-over");
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <nav ref={ref} className="toc" aria-label="On this page">
      <div className="toc__rail">
        <span className="toc__fill" aria-hidden="true" />
        <ol className="toc__list">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a href={`#${chapter.id}`} className="toc__link" data-chapter>
                <span className="toc__tick" aria-hidden="true" />
                {chapter.label}
              </a>
            </li>
          ))}
        </ol>
      </div>

      <p className="toc__status" data-open={status?.open ? "true" : undefined}>
        <span className="toc__dot" aria-hidden="true" />
        <span>
          {status ? status.line : "Hours"}
          <br />
          <span className="toc__detail">
            {status ? status.detail : hours.weekdays}
          </span>
        </span>
      </p>
    </nav>
  );
}
