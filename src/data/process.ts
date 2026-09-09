/**
 * How a booking actually works.
 *
 * Every step below is taken from the studio's own description of its existing
 * flow. Nothing here describes software this project built: booking, payment
 * and file delivery all happen on the systems the studio already runs, and the
 * only thing this site does is send people to them.
 *
 * Sources:
 *   Homepage    "Simply click the link below - Choose your podcast date & time
 *               - Pay using Apple Pay"
 *   /book-now   "Choose your time slot, only 1hr, add it to cart, then repeat
 *               for each additional hour for the same studio." and "Need to
 *               book all or more than 5 hours at once? Contact us."
 *   FAQ 08      "You can come to the studio just at the time of the booking...
 *               There is no set-up time as the bookings are every hour."
 *   FAQ 24      "One studio operator will assist you during your podcast
 *               recording session."
 *   FAQ 34/35   Raw files by download link in two to three days, or same day
 *               with your own SD cards. Edited first draft in four to six
 *               business days.
 */

export interface ProcessStep {
  id: string;
  /** A verb, not "Step 1". The action is the label. */
  title: string;
  body: string;
}

export const processSteps: readonly ProcessStep[] = [
  {
    id: "pick",
    title: "Pick a room and a service",
    body: "Seven studios, and audio, video or video with editing. If you want a room that is on request rather than on the calendar, message the studio first.",
  },
  {
    id: "book",
    title: "Book the hours and pay",
    body: "Time slots are booked an hour at a time on the studio's existing booking page, and Apple Pay is accepted. For more than five hours at once, the studio arranges it for you.",
  },
  {
    id: "record",
    title: "Turn up and record",
    body: "Arrive at your booking time; there is no separate setup slot, so allow for it inside your hours. An operator runs the session with you.",
  },
  {
    id: "collect",
    title: "Take the files, or the edit",
    body: "Without editing you get the raw files, same day if you bring SD cards, otherwise by download link in two to three days. With editing, a first draft follows in four to six business days.",
  },
];
