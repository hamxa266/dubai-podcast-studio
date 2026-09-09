import type { Studio } from "@/types";

/**
 * The seven rooms, exactly as listed on the live /book-now page.
 *
 * Names, office numbers and booking state are all verified: that page
 * enumerates all seven with their office numbers and marks which are
 * "Special Request Only". This is the evidence that "7 studios" is true,
 * against the gallery page's stray "our five studios".
 *
 * NO IMAGES ARE ATTACHED TO THESE ROOMS ON PURPOSE.
 *
 * The photography available to this project cannot be attributed to a
 * specific room. Pairing an arbitrary studio still with "YALLAPOD 2" would be
 * inventing a fact, and a visitor who booked office 1041 expecting the room in
 * the picture would have been misled. The rooms are therefore presented as a
 * verified index, and the environments are shown separately as a gallery of
 * setups, which is what they honestly are.
 *
 * Once the studio confirms which photograph belongs to which room, the two can
 * be joined and this note removed.
 */
export const studios: readonly Studio[] = [
  { id: "dps-1", name: "DPS 1", office: "641", booking: "online" },
  { id: "yallapod-1", name: "YALLAPOD 1", office: "831", booking: "online" },
  { id: "yallapod-2", name: "YALLAPOD 2", office: "1041", booking: "online" },
  { id: "yallapod-3", name: "YALLAPOD 3", office: "1103", booking: "online" },
  { id: "dps-2", name: "DPS 2", office: "727", booking: "on-request" },
  { id: "dps-3", name: "DPS 3", office: "925", booking: "on-request" },
  { id: "yallapod-4", name: "YALLAPOD 4", office: "1102", booking: "on-request" },
];
