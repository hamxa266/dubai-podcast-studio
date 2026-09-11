import Image, { type StaticImageData } from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";

import onAirHi from "@/assets/images/hi/on-air-hi.jpg";
import violetRodeHi from "@/assets/images/hi/violet-rode-hi.jpg";
import studioBlueRoom from "@/assets/images/studio-blue-room.jpg";
import studioSession from "@/assets/images/studio-session.jpg";
import setupBehindCamera from "@/assets/images/setups/setup-behind-camera.jpg";
import setupGreenRig from "@/assets/images/setups/setup-green-rig.jpg";
import setupSoftboxLounge from "@/assets/images/setups/setup-softbox-lounge.jpg";
import { ChapterIndex } from "@/components/scroll/ChapterIndex";
import { CollectionStage } from "@/components/scroll/CollectionStage";
import { Counter } from "@/components/scroll/Counter";
import { LoopClip } from "@/components/scroll/LoopClip";
import { SplitText } from "@/components/scroll/SplitText";
import { Button } from "@/components/ui/Button";
import {
  bookingTerms,
  effectiveHourlyRate,
  equipment,
  packages,
  serviceTiers,
} from "@/data/pricing";
import { setups } from "@/data/setups";
import { claims, cta, external, hours, routes, site } from "@/data/site";
import { studios } from "@/data/studios";
import "@/vendor/scrollcraft/scrollcraft.css";
import "@/styles/collection.css";

/**
 * Home.
 *
 * Eight sections, each with one job and one kind of movement, so the page
 * keeps changing as you scroll without any two neighbours doing the same
 * thing:
 *
 *   overview  layered hero, three planes at three depths          flow
 *   numbers   the address first, then four figures counting up    flow
 *   setups    the setups walked sideways                          pan, 3.0
 *   kit       the equipment, with the photograph drifting past    flow
 *   inside    one room fills the screen and the camera pushes in  pin, 2.0
 *   rates     three services as cards, then the prepaid blocks    flow
 *   rooms     the seven rooms, a photograph behind each on hover  flow
 *   book      the close                                           flow
 *
 * REDUCED MOTION is a first-class version of this page, not an afterthought:
 * Windows turns it on whenever "Animation effects" is off. Pinned sections
 * collapse to normal height so nothing asks for long scrolls over a still
 * frame, the sideways rail becomes a grid, parallax and zoom are dropped, and
 * fades, counters, hover states and the chapter index all still work.
 */

/* Portrait frames for the rail. None is captioned with a room name, for the
   reason in src/data/studios.ts. */
const RAIL_IDS = [
  "green-rig",
  "behind-camera",
  "softbox-lounge",
  "red-curtain",
  "brick-softbox",
  "camera-rig",
  "green-wall",
  "mixer-desk",
] as const;

/* One photograph per service, chosen for what the service is rather than
   which room it happens in: a microphone for audio, a lit camera rig for
   video, the operator's view for filming and editing. */
const TIER_MEDIA: Record<string, { image: StaticImageData; alt: string }> = {
  audio: {
    image: studioBlueRoom,
    alt: "A Shure SM7B microphone on a wooden table in front of a blue wall with LED strips",
  },
  "video-audio": {
    image: setupGreenRig,
    alt: "Two Godox softboxes over a wooden table with a camera on a tripod, in a green lit studio",
  },
  "full-pack": {
    image: setupBehindCamera,
    alt: "View from behind a camera, its flip screen showing two people being recorded at a table",
  },
};

/*
  Photographs behind the room directory, one per row, shown on hover or focus.

  THEY ARE NOT MATCHED TO THE ROOMS, and the section says so on screen.
  src/data/studios.ts explains why: nothing in the available photography can
  be attributed to a specific room, and a visitor should not book office 1041
  expecting the picture beside it. The studio can join the two by editing this
  list once it confirms which photograph is which room.

  Only the four wide photographs, and one 768px portrait, are sharp at this
  size, so two entries are detail crops of the 3072px originals rather than
  five upscaled phone frames.
*/
const ROOM_MEDIA: { image: StaticImageData; zoom?: number; origin?: string }[] = [
  { image: onAirHi },
  { image: violetRodeHi },
  { image: studioSession },
  { image: studioBlueRoom },
  { image: onAirHi, zoom: 1.7, origin: "50% 18%" },
  { image: violetRodeHi, zoom: 1.6, origin: "82% 30%" },
  { image: setupGreenRig },
];

const WRAP = "wrap";

/* The model names from `equipment` in src/data/pricing.ts, as short marks for
   the ticker. The full, sentence-form list is still the text below it. */
const TICKER = [
  "Shure SM7B",
  "Rodecaster Pro",
  "Sony A7S III",
  "Godox",
  "Elgato Key Light",
  "Philips Hue",
] as const;

export default function HomePage() {
  const rail = RAIL_IDS.map((id) => setups.find((s) => s.id === id)).filter(
    (s): s is (typeof setups)[number] => Boolean(s),
  );

  const rooms = [
    ...studios.filter((s) => s.booking === "online"),
    ...studios.filter((s) => s.booking === "on-request"),
  ];

  return (
    <div id="collection" className="collection">
      <CollectionStage />
      <ChapterIndex />

      {/* ============================================================
          OVERVIEW. Three real planes at three depths: the room at the
          back, a still in the middle, the session clip in front.
          ============================================================ */}
      <section id="overview" data-sc-act="flow" className="g-paper hero">
        <div className="hero__grid">
          <div className="hero__text">
            <p className="label__id ink-soft enter">
              {site.address.building}, {site.address.district}
            </p>
            <SplitText
              as="h1"
              mode="load"
              className="hero__title"
              text="Seven recording studios in Business Bay."
            />
            <p className="hero__lede ink-soft enter enter-delay-1">
              Podcast and video rooms by the hour from {site.fromRateAed} AED,
              each with an operator, Shure SM7B microphones and Sony A7S III
              cameras.
            </p>
            <div className="hero__cta enter enter-delay-2">
              {/* Leans toward the pointer. Engine device, fine pointers only,
                  off under reduced motion. */}
              <span className="magnet" data-sc-magnet="0.22">
                <Button href={external.booking} size="lg">
                  {cta.book}
                </Button>
              </span>
              <Button
                href={routes.studios}
                variant="outline"
                size="lg"
                iconRight={<ArrowRight size={18} />}
              >
                {cta.studios}
              </Button>
            </div>
            <dl className="hero__facts enter enter-delay-3">
              <div>
                <dt>From</dt>
                <dd>{site.fromRateAed} AED an hour</dd>
              </div>
              <div>
                <dt>Mon to Sat</dt>
                <dd>{hours.weekdays}</dd>
              </div>
              <div>
                <dt>Sunday</dt>
                <dd>{hours.sunday}</dd>
              </div>
            </dl>
          </div>

          <div className="hero__media" data-sc-tilt="3">
            <div className="hero__aperture">
              <div className="hero__plate" data-sc-parallax="-1.1">
                <Image
                  src={onAirHi}
                  alt="Two RODE microphones on boom arms either side of a pale table, facing a green lit brick wall under a neon ON AIR sign, with blue velvet armchairs"
                  priority
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  placeholder="blur"
                  className="enter-media"
                />
              </div>
            </div>

            <div className="hero__still" data-sc-parallax="0.7">
              <div className="hero__still-inner enter-clip enter-clip--late">
                <Image
                  src={setupSoftboxLounge}
                  alt="Two large octagonal softboxes over a long white table with blue chairs and boom microphones"
                  fill
                  sizes="10rem"
                  placeholder="blur"
                />
              </div>
            </div>

            <div className="hero__clip" data-sc-parallax="1.8">
              <div className="hero__clip-inner enter-clip">
                <LoopClip
                  src="/media/clip-host.mp4"
                  poster="/media/clip-host.webp"
                  className="fill-media"
                  rec
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          NUMBERS. The address leads and the figures support it.
          ============================================================ */}
      <section id="numbers" className="g-ash numbers">
        <div className={WRAP} data-sc-in data-sc-stagger="80">
          <p className="label__id ink-soft">One address</p>
          <SplitText
            className="h2 numbers__lead"
            text={`Every room is in the ${site.address.building} in ${site.address.district}, five minutes from the Burj Khalifa.`}
          />
          <dl className="numbers__grid">
            {claims.map((claim) => (
              <div key={claim.label} className="numbers__cell">
                <dt className="ink-soft">{claim.label}</dt>
                <dd>
                  <Counter value={claim.value} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="ink-soft numbers__note">
            Four rooms are bookable straight from the calendar and three are
            arranged over WhatsApp.
          </p>
        </div>
      </section>

      {/* ============================================================
          SETUPS. Sideways, because this section is a range.
          ============================================================ */}
      <section id="setups" data-sc-act="pan" data-sc-span="3" className="g-paper">
        <div data-sc-stage>
          <div className="rail" data-sc-pan="0.06">
            <div className="rail__intro">
              <p className="label__id ink-soft">Setups</p>
              <SplitText
                className="h2"
                style={{ marginTop: "1rem" }}
                text="More than forty-five ways to set a room up."
              />
              <p className="ink-soft body-sm" style={{ marginTop: "1rem" }}>
                Backdrops, lighting and seating change. A second season does not
                have to look like the first.
              </p>
            </div>

            {rail.map((setup, index) => (
              <article key={setup.id} className="rail__item">
                <div className="rail__frame">
                  <Image
                    src={setup.image}
                    alt={setup.alt}
                    fill
                    sizes="(max-width: 640px) 60vw, 16rem"
                    placeholder="blur"
                  />
                  <span className="rail__num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="label__spec rail__caption">{setup.caption}</p>
              </article>
            ))}

            <div className="rail__note">
              <p className="ink-soft body-sm">
                Frames from the rooms themselves. None is captioned with a studio
                name, because the photography cannot be matched to one.
              </p>
              <Button
                href={routes.gallery}
                variant="outline"
                className="mt-6"
                iconRight={<ArrowRight size={16} />}
              >
                See the gallery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          KIT. The list holds still and the photograph drifts past it.
          ============================================================ */}
      <section id="kit" data-sc-act="flow" className="g-ash kit">
        {/* The model names sliding across as you scroll. Decorative: the
            same names are in the list below, as text. */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker__track">
            {[...TICKER, ...TICKER].map((name, i) => (
              <span key={i} className={i % 2 ? "ticker__outline" : undefined}>
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className={`${WRAP} kit__grid`}>
          <div data-sc-in data-sc-stagger="60">
            <p className="label__id ink-soft">The kit</p>
            <SplitText
              className="h2"
              style={{ marginTop: "1rem" }}
              text="The same kit in every room."
            />
            <p className="ink-soft body-sm" style={{ marginTop: "1rem" }}>
              Model names, not adjectives. An operator runs every session.
            </p>
            <dl className="kit__list">
              {equipment.map((item) => (
                <div key={item.label} className="kit__row">
                  <dt className="label__id ink-soft">{item.label}</dt>
                  <dd>{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="kit__media">
            <div className="kit__photo" data-sc-reveal="up" data-sc-reveal-at="0 0.4">
              <div className="kit__photo-plate" data-sc-parallax="-1.2">
                <Image
                  src={violetRodeHi}
                  alt="A guest seated at a wooden table behind a RODE microphone on a boom arm, in a violet lit room with a black drape and a shelving unit"
                  fill
                  sizes="(min-width: 900px) 42vw, 100vw"
                  placeholder="blur"
                />
              </div>
            </div>
            <div className="kit__clip" data-sc-parallax="1.6">
              <LoopClip
                src="/media/clip-set.mp4"
                poster="/media/clip-set.webp"
                className="fill-media"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          INSIDE. The room fills the frame and the camera pushes in.
          A sharp photograph scaled by scroll, not a video: the earlier
          ffmpeg push-in was upscaled and soft, and the browser scaling
          the full-resolution image stays crisp at every step.
          ============================================================ */}
      <section id="inside" data-sc-act="pin" data-sc-span="2" className="g-ink">
        <div data-sc-stage className="inside-stage">
          <div className="inside">
            <div className="inside__bg">
              <Image
                src={studioSession}
                alt="Two people recording an interview on boucle armchairs with boom microphones between them, in a terracotta panelled room lit by brass floor lamps"
                fill
                sizes="100vw"
                placeholder="blur"
              />
            </div>
            <div className="inside__scrim" aria-hidden="true" />

            <div className="inside__clip">
              <LoopClip
                src="/media/clip-room.mp4"
                poster="/media/clip-room.webp"
                className="fill-media"
              />
            </div>

            <div className="inside__copy" data-sc-cue="0.08 1">
              <p className="label__id" style={{ color: "#d4d4d4" }}>
                Inside
              </p>
              <h2 className="inside__title">
                An hour in here is <Counter value={String(site.fromRateAed)} ms={1200} />{" "}
                AED.
              </h2>
              <p className="inside__body">
                Shure SM7B microphones, three Sony A7S III bodies, and someone who
                knows the room running the session with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          RATES. Three services as cards, then the prepaid blocks.
          ============================================================ */}
      <section id="rates" data-sc-act="flow" className="g-paper rates">
        <div className={WRAP}>
          <div className="rates__head" data-sc-in data-sc-stagger="60">
            <p className="label__id ink-soft">Rates, per hour, in AED</p>
            <SplitText
              className="h2"
              style={{ marginTop: "1rem" }}
              text="Pay for the hours you record."
            />
          </div>

          <div className="tiers" data-sc-in data-sc-stagger="90">
            {serviceTiers.map((tier) => {
              const media = TIER_MEDIA[tier.id];
              return (
                <article key={tier.id} className="tier" data-sc-tilt="4">
                  {media ? (
                    <div
                      className="tier__media"
                      data-sc-reveal="up"
                      data-sc-reveal-at="0.06 0.28"
                    >
                      <Image
                        src={media.image}
                        alt={media.alt}
                        fill
                        sizes="(min-width: 1024px) 26rem, 100vw"
                        placeholder="blur"
                      />
                    </div>
                  ) : null}
                  <div className="tier__body">
                    <h3 className="tier__name">{tier.name}</h3>
                    <p className="tier__rate">
                      <span className="tier__figure">
                        <Counter value={tier.rate.toLocaleString("en-US")} ms={1300} />
                      </span>
                      <span className="ink-soft">AED {tier.unitLabel}</span>
                    </p>
                    <p className="ink-soft body-sm">{tier.bestFor}</p>
                    <ul className="tier__list">
                      {tier.includes.map((item) => (
                        <li key={item}>
                          <Check size={16} weight="bold" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {tier.minimumHours ? (
                      <p className="tier__fine">{tier.minimumHours} hour minimum</p>
                    ) : null}
                    {tier.caveat ? <p className="tier__fine">{tier.caveat}</p> : null}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="blocks" data-sc-in data-sc-stagger="70">
            <div className="blocks__intro">
              <p className="label__id ink-soft">Prepaid hours</p>
              <p className="body-sm ink-soft" style={{ marginTop: "0.75rem" }}>
                Split across sessions and rooms, valid for six months. The hourly
                figure is simply the total divided by the hours.
              </p>
            </div>
            {packages.map((pkg) => (
              <div key={pkg.id} className="block">
                <p className="label__id ink-soft">
                  {pkg.name}, {pkg.covers.toLowerCase()}
                </p>
                <p className="block__price">
                  <Counter value={pkg.price.toLocaleString("en-US")} ms={1300} />
                  <span className="ink-soft"> AED</span>
                </p>
                <p className="body-sm ink-soft">
                  {effectiveHourlyRate(pkg)} AED an hour, valid {pkg.validMonths}{" "}
                  months
                </p>
              </div>
            ))}
          </div>

          <div className="rates__foot">
            <ul className="rates__terms">
              {bookingTerms.slice(0, 3).map((term) => (
                <li key={term} className="ink-soft body-sm">
                  {term}
                </li>
              ))}
            </ul>
            <Button
              href={routes.pricing}
              variant="outline"
              iconRight={<ArrowRight size={16} />}
            >
              All rates and packages
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================
          ROOMS. The directory, with a photograph behind it that
          changes to follow the row under the pointer.
          ============================================================ */}
      <section id="rooms" className="rooms">
        <div className="rooms__media" aria-hidden="true">
          {ROOM_MEDIA.map((media, i) => (
            <div key={i} className="rooms__bg" data-i={i}>
              <div
                className="rooms__bg-inner"
                style={
                  media.zoom
                    ? { transform: `scale(${media.zoom})`, transformOrigin: media.origin }
                    : undefined
                }
              >
                <Image
                  src={media.image}
                  alt=""
                  fill
                  sizes={media.zoom ? "100vw" : "(min-width: 1024px) 62vw, 100vw"}
                  placeholder="blur"
                />
              </div>
            </div>
          ))}
          <div className="rooms__shade" />
        </div>

        <div className={`${WRAP} rooms__inner`}>
          <div className="rooms__head" data-sc-in data-sc-stagger="60">
            <p className="label__id" style={{ color: "#a3a3a3" }}>
              Every room
            </p>
            <SplitText
              className="h2"
              style={{ marginTop: "1rem", color: "#ffffff" }}
              text="Seven rooms, one building."
            />
          </div>

          <ul className="rooms__list" data-sc-in data-sc-stagger="50">
            {rooms.map((studio) => {
              const i = studios.indexOf(studio);
              const online = studio.booking === "online";
              return (
                <li key={studio.id}>
                  <a
                    className="room"
                    data-i={i}
                    href={online ? external.booking : external.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="room__office">Office {studio.office}</span>
                    <span className="room__name">{studio.name}</span>
                    <span className="room__state" data-online={online || undefined}>
                      {online ? cta.book : cta.whatsapp}
                    </span>
                    <ArrowUpRight size={20} className="room__arrow" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="rooms__note">
            Studio photographs, not matched to the room named.
          </p>
        </div>
      </section>

      {/* ============================================================
          BOOK. The close.
          ============================================================ */}
      <section id="book" className="g-ink plate-section">
        <div className="plate">
          <div className="plate__inner" data-sc-in data-sc-stagger="80">
            <p className="label__id" style={{ color: "#a3a3a3" }}>
              {site.address.building}, {site.address.district}
            </p>

            <SplitText
              as="p"
              className="plate__claim"
              style={{ marginTop: "1.5rem" }}
              text="Record Something Worth Watching"
            />

            <div className="plate__rule" />

            <p style={{ color: "#a3a3a3", maxWidth: "48ch", lineHeight: 1.55 }}>
              An hour is {site.fromRateAed} AED and takes about a minute to book.
              Monday to Saturday {hours.weekdays}, Sunday {hours.sunday}. If you
              are not sure which room suits you, ask first.
            </p>

            <div className="plate__cta">
              <span className="magnet" data-sc-magnet="0.22">
                <Button href={external.booking} size="lg">
                  {cta.book}
                </Button>
              </span>
              <Button
                href={external.whatsapp}
                variant="outline"
                size="lg"
                className="border-line-dark-strong text-paper hover:border-paper hover:bg-paper/10"
                iconRight={<ArrowUpRight size={18} />}
              >
                {cta.whatsapp}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
