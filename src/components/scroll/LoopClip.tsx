"use client";

import { useEffect, useRef } from "react";

/**
 * A short, silent, looping clip from the studio's own footage.
 *
 * Nothing is downloaded until the clip is on screen (`preload="none"`), and it
 * pauses again as soon as it leaves, so these cost nothing while the visitor
 * is elsewhere on the page.
 *
 * Under `prefers-reduced-motion: reduce` the clip never plays and the poster
 * frame stands in for it. An autoplaying loop is exactly the kind of motion
 * that setting asks a site to stop.
 *
 * `rec` adds a camera viewfinder readout. The timecode is the clip's own
 * playhead, frame by frame, not a clock: it is a recording being played back,
 * and the readout says exactly that much.
 *
 * Decorative, so hidden from assistive technology: every clip sits beside copy
 * that already says what it shows.
 */
const FPS = 30;

const pad = (n: number) => String(n).padStart(2, "0");

function timecode(seconds: number) {
  const whole = Math.floor(seconds);
  const frames = Math.floor((seconds - whole) * FPS);
  return `00:${pad(Math.floor(whole / 60))}:${pad(whole % 60)}:${pad(frames)}`;
}

export function LoopClip({
  src,
  poster,
  className,
  rec = false,
}: {
  src: string;
  poster: string;
  className?: string;
  rec?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const recRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const paint = () => {
      if (tcRef.current) tcRef.current.textContent = timecode(video.currentTime);
      frame = requestAnimationFrame(paint);
    };

    const onPlay = () => {
      recRef.current?.setAttribute("data-live", "true");
      cancelAnimationFrame(frame);
      if (rec) frame = requestAnimationFrame(paint);
    };
    const onPause = () => {
      recRef.current?.removeAttribute("data-live");
      cancelAnimationFrame(frame);
    };
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          /* play() rejects if the browser refuses autoplay. The poster is
             already showing, so there is nothing to recover. */
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(video);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [rec]);

  return (
    <>
      <video
        ref={ref}
        className={className}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
      {rec ? (
        <span ref={recRef} className="rec" aria-hidden="true">
          <span className="rec__dot" />
          REC
          <span ref={tcRef} className="rec__tc">
            00:00:00:00
          </span>
        </span>
      ) : null}
    </>
  );
}
