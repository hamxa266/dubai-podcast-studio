/**
 * FAQ content.
 *
 * Every answer below is the studio's own, rewritten for readability with the
 * facts left exactly as published. Keyword padding is removed; numbers,
 * policies and timings are not touched. Nothing here is invented, and where
 * the live site contradicts itself the entry says so rather than picking a
 * side silently.
 *
 * Source: dubaipodcaststudio.com FAQ (35 questions) and /book-now.
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  group: FaqGroupId;
  /** Whether the studio should re-confirm this before launch. */
  needsVerification?: string;
}

export type FaqGroupId = "booking" | "studio" | "gear" | "getting-here";

export const faqGroups: readonly { id: FaqGroupId; label: string }[] = [
  { id: "booking", label: "Booking and payment" },
  { id: "studio", label: "In the studio" },
  { id: "gear", label: "Equipment and files" },
  { id: "getting-here", label: "Getting here" },
];

export const faqItems: readonly FaqItem[] = [
  {
    id: "how-to-book",
    group: "booking",
    question: "How do I book?",
    answer:
      "Use the Book Now button. Pick your date and time, add the hour to the cart, and repeat for each additional hour in the same studio. Apple Pay is accepted. If you want more than five hours at once, message the studio and they will set it up for you.",
  },
  {
    id: "cancel",
    group: "booking",
    question: "Can I cancel or reschedule?",
    answer:
      "Rescheduling more than 24 hours ahead is free. Later than that costs 150 AED. Cancellations are refunded at 50 percent of the total.",
  },
  {
    id: "how-far-ahead",
    group: "booking",
    question: "How far ahead should I book?",
    answer:
      "As far ahead as you can, to be sure of the room you want. Last-minute bookings can often still be accommodated.",
  },
  {
    id: "guests",
    group: "studio",
    question: "How many people can be in the room?",
    answer:
      "Four people record comfortably. If you need more space or have something particular in mind, message the studio and they will try to accommodate it.",
    needsVerification:
      "FAQ 10 says four. The /book-now page says the largest studio holds up to five in the room with setups optimised for four recording positions. These are reconcilable but should be stated consistently.",
  },
  {
    id: "arrive",
    group: "studio",
    question: "When should I arrive?",
    answer:
      "At your booking time. Bookings run every hour, so there is no separate setup slot before yours. Anything you do in the room, including changing clothes or doing makeup, comes out of your booked time, so book an extra hour if you need to prepare. A sign on the door shows whether the room is free.",
  },
  {
    id: "change-setup",
    group: "studio",
    question: "Can I change the setup?",
    answer:
      "Yes, and it is included in your booked time rather than charged separately. Changing a setup takes about 15 to 20 minutes, which is why the studio recommends booking two hours as a minimum.",
  },
  {
    id: "own-equipment",
    group: "studio",
    question: "Can I bring my own equipment?",
    answer:
      "Yes. Let the studio know in advance so they can check it works with theirs.",
  },
  {
    id: "content-rules",
    group: "studio",
    question: "Are there rules about what I can record?",
    answer:
      "The studio has a strict no hate speech policy and does not allow illegal or unethical content to be recorded. It reserves the right to refuse service to anyone who breaks that.",
  },
  {
    id: "equipment",
    group: "gear",
    question: "What equipment is in the studios?",
    answer:
      "Four Shure SM7B microphones, Rodecaster Pro mixing, Sony A7S III cameras with three used on a shoot, and Godox softboxes with Elgato Key Lights and Philips Hue for ambience. There is also a teleprompter on an iPad Pro mount, a motorised slider, and encoding machines for live productions.",
  },
  {
    id: "what-to-bring",
    group: "gear",
    question: "What do I need to bring?",
    answer:
      "If you have booked editing, nothing. If you have not, bring four SD cards, one for each of the three cameras and one for the sound mixer, and you can take everything away the same day. You can buy them at the studio if it is easier. Without your own cards the files come by download link in two to three days.",
    needsVerification:
      "FAQ 14 also offers to download and email the files for 250 AED per session, while the newer FAQ 35 describes a download link in two to three days with no fee mentioned. Confirm which applies before launch.",
  },
  {
    id: "editing-included",
    group: "gear",
    question: "What does the editing include?",
    answer:
      "For each hour recorded you choose either one full-length episode or six to ten short-form reels. Editing covers syncing, cuts and colour correction where needed. Captions are available on short-form videos in English. It is basic editing only: no intros, outros, trailers or thumbnails, and any logos or graphics need to come from you.",
  },
  {
    id: "editing-timeline",
    group: "gear",
    question: "How long does editing take?",
    answer:
      "A first draft in four to six business days. Revisions take another four to six business days after you send your feedback, so allow up to two weeks in total. Sending precise timecodes for the changes you want speeds it up.",
    needsVerification:
      "FAQ 34 says four to six business days. The older FAQ 06 says three to four working days. Confirm which is current.",
  },
  {
    id: "no-editing-files",
    group: "gear",
    question: "What do the files look like without editing?",
    answer:
      "Exactly as recorded: a separate video file for each camera angle plus the audio, in a folder labelled with the recording date.",
  },
  {
    id: "where",
    group: "getting-here",
    question: "Where is the studio?",
    answer:
      "Tamani Arts Building in Business Bay, Dubai. Searching for Dubai Podcast Studio in Google Maps will take you to the door.",
  },
  {
    id: "parking",
    group: "getting-here",
    question: "Is there parking?",
    answer:
      "Yes, the building has guest parking near the lobby. Ask building security if you need help finding it.",
  },
];

/** The handful shown on the homepage. The rest live on the FAQ page. */
export const homepageFaqIds: readonly string[] = [
  "guests",
  "arrive",
  "cancel",
  "what-to-bring",
  "parking",
];
