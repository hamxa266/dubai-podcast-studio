/**
 * Services, rates and packages.
 *
 * EVERY NUMBER HERE WAS READ OFF THE LIVE SITE, and each carries the place it
 * came from. Nothing is inferred except the effective hourly rates, which are
 * plain division of the studio's own figures.
 *
 * ON UNITS, which the brief asked to verify before display.
 *
 * The homepage services block states the unit for one tier only:
 *   "350AED/Hr"   <- unit stated
 *   "450AED"      <- bare number, no unit
 *   "1000AED"     <- bare number, no unit
 *
 * FAQ 01 and FAQ 06 supply the missing units: audio is "350 AED/hour, with a
 * 2-hour minimum per session", video plus audio is "450 AED/hour", and editing
 * is "AED 1,000/hour". So all three are per hour, and that is what is shown.
 *
 * Because the homepage phrasing is ambiguous, `unitLabel` is a field rather
 * than hard-coded in the component. If the studio confirms a different unit
 * for any tier, it is a one-line change here and nothing in the UI moves.
 */

export interface ServiceTier {
  id: string;
  name: string;
  /** AED. */
  rate: number;
  /** Rendered next to the figure. A field, not a hard-coded string. */
  unitLabel: string;
  /** Only audio-only carries a stated minimum. */
  minimumHours?: number;
  /** One line. Who should pick this. */
  bestFor: string;
  /** Only inclusions the studio actually states. Nothing invented. */
  includes: readonly string[];
  /** Shown as fine print under the row when present. */
  caveat?: string;
  /** False when the live site contradicts itself about this figure. */
  verified: boolean;
  /** Where the number and unit came from. */
  source: string;
}

export const serviceTiers: readonly ServiceTier[] = [
  {
    id: "audio",
    name: "Audio recording",
    rate: 350,
    unitLabel: "per hour",
    minimumHours: 2,
    bestFor: "Audio-only shows, and interviews that only need to be heard.",
    includes: [
      "Shure SM7B microphones",
      "A studio operator for the whole session",
      "Your choice of room and setup",
    ],
    verified: true,
    source:
      "Homepage services block states 350AED/Hr. FAQ 01 confirms the unit and the 2-hour minimum.",
  },
  {
    id: "video-audio",
    name: "Video and audio",
    rate: 450,
    unitLabel: "per hour",
    bestFor: "Podcasts that get watched as much as they get listened to.",
    includes: [
      "Multi-camera recording",
      "Professional lighting",
      "One raw video file per camera angle, plus audio",
    ],
    verified: true,
    source:
      "Homepage shows a bare '450AED'. FAQ 01 supplies the unit: 450 AED/hour.",
  },
  {
    id: "full-pack",
    name: "Filming and editing",
    rate: 1000,
    unitLabel: "per hour",
    bestFor: "Creators who want a finished episode, not a folder of footage.",
    includes: [
      "Everything in video and audio",
      "Syncing, cuts and colour correction",
      "One full episode, or 6 to 10 reels, per recorded hour",
    ],
    caveat:
      "Basic editing only. Intros, outros, trailers and thumbnails are not included, and any logos or graphics have to be supplied by you.",
    /*
      FLAGGED. The live site gives two different prices for editing:
        FAQ 06  "Audio + Video + Editing - AED 1,000/hour"
        FAQ 05  "The Editing Package : Cost is 550AED/H"
      The homepage services block agrees with 1,000, so that is shown, but this
      needs a definitive answer from the studio before launch.
    */
    verified: false,
    source:
      "Homepage shows a bare '1000AED'; FAQ 06 gives AED 1,000/hour. CONFLICT: FAQ 05 states 550AED/H for editing.",
  },
];

export interface PrepaidPackage {
  id: string;
  name: string;
  hours: number;
  /** Total AED. */
  price: number;
  validMonths: number;
  /** Which hourly tier the hours are drawn against. */
  covers: string;
}

/**
 * Prepaid hour blocks, exactly as listed on the Saving Packages page.
 *
 * The studio's own "Save 100AED/HR" labels are deliberately NOT repeated. Two
 * of the three check out against the hourly rates; the third does not:
 *
 *   5H video + audio    1,980 against 5 x 450  = 270 saved, 54/hr   agrees
 *   10H video + audio   3,500 against 10 x 450 = 1,000 saved, 100/hr agrees
 *   10H rec + editing   8,500 against 10 x 1,000 = 1,500 saved, 150/hr
 *                       but the page says "Save 100AED/HR", which would imply
 *                       a 950/hr base rather than the stated 1,000.
 *
 * Rather than restate a claim that does not add up, the UI shows the effective
 * hourly rate, which is just the total divided by the hours. That is the
 * studio's own arithmetic and it makes the comparison obvious without anyone
 * having to trust a discount label.
 */
export const packages: readonly PrepaidPackage[] = [
  {
    id: "5h-video",
    name: "5 hours",
    hours: 5,
    price: 1980,
    validMonths: 6,
    covers: "Video and audio",
  },
  {
    id: "10h-video",
    name: "10 hours",
    hours: 10,
    price: 3500,
    validMonths: 6,
    covers: "Video and audio",
  },
  {
    id: "10h-edit",
    name: "10 hours",
    hours: 10,
    price: 8500,
    validMonths: 6,
    covers: "Recording and editing",
  },
];

/** Total divided by hours. Arithmetic on the studio's figures, not a claim. */
export function effectiveHourlyRate(pkg: PrepaidPackage) {
  return Math.round(pkg.price / pkg.hours);
}

/**
 * Equipment, from FAQ 04 and the /book-now page.
 *
 * Specific models only. The site also says the cameras are "Netflix approved"
 * and that the microphones are "the same as Joe Rogan"; neither is stated
 * here, because naming the actual model is both verifiable and more
 * convincing than an unverifiable endorsement.
 */
export const equipment: readonly { label: string; detail: string }[] = [
  { label: "Microphones", detail: "Shure SM7B, four of them" },
  { label: "Mixing", detail: "Rodecaster Pro" },
  { label: "Cameras", detail: "Sony A7S III, three per shoot" },
  { label: "Lighting", detail: "Godox softboxes, Elgato Key Lights, Philips Hue" },
  { label: "Extras", detail: "Teleprompter on an iPad Pro mount, motorised slider" },
  { label: "Live", detail: "Encoding PCs for streamed productions" },
];

/**
 * Booking terms. All verified, and all the sort of thing a customer would
 * rather find before booking than after.
 */
export const bookingTerms: readonly string[] = [
  "Audio-only sessions have a two-hour minimum. The studio recommends two hours for any session, because changing a setup takes 15 to 20 minutes and that time comes out of your booking.",
  "Rescheduling is free more than 24 hours ahead. Later than that it is 150 AED.",
  "Cancellations are refunded at 50 percent.",
  "Without editing you get the raw files: one video file per camera angle plus the audio, by download link in two to three days. Bring your own SD cards and you can take everything with you the same day.",
  "Package hours can be split across several sessions and different studios, and are valid for six months.",
];
