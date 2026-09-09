import type { StaticImageData } from "next/image";

import studioBlueRoom from "@/assets/images/studio-blue-room.jpg";
import studioOnAir from "@/assets/images/studio-on-air.jpg";
import studioVioletRode from "@/assets/images/studio-violet-rode.jpg";
import studioSession from "@/assets/images/studio-session.jpg";
import setupBlueChair from "@/assets/images/setups/setup-blue-chair.jpg";
import setupBehindCamera from "@/assets/images/setups/setup-behind-camera.jpg";
import setupBrickSoftbox from "@/assets/images/setups/setup-brick-softbox.jpg";
import setupCameraRig from "@/assets/images/setups/setup-camera-rig.jpg";
import setupGreenRig from "@/assets/images/setups/setup-green-rig.jpg";
import setupGreenWall from "@/assets/images/setups/setup-green-wall.jpg";
import setupMixerDesk from "@/assets/images/setups/setup-mixer-desk.jpg";
import setupRedCurtain from "@/assets/images/setups/setup-red-curtain.jpg";
import setupSoftboxLounge from "@/assets/images/setups/setup-softbox-lounge.jpg";
import setupVioletLounge from "@/assets/images/setups/setup-violet-lounge.jpg";

export interface Setup {
  id: string;
  image: StaticImageData;
  /** Describes what is actually in the frame. Never keyword-stuffed. */
  alt: string;
  /** Short factual caption. Describes the setup, never names a room. */
  caption: string;
}

/**
 * Setups gallery.
 *
 * SOURCE AND QUALITY, stated plainly.
 *
 * Six of these are real photographs. Four of those are high resolution
 * (2400px and up) and carry the large cells; two are smaller portraits that
 * sit comfortably in a narrow column.
 *
 * The remaining eight are frames pulled from the studio's own vertical videos,
 * which are only 360x640. They are genuine and show genuinely different rooms,
 * but they will not survive being blown up, so the layout never gives them a
 * large cell and the lightbox caps their displayed size.
 *
 * Frames carrying burned-in captions or a logo overlay were rejected, as was
 * one video that turned out to contain unrelated personal footage.
 *
 * Captions describe the setup and deliberately do not name a room. See the
 * note in src/data/studios.ts.
 */
export const setups: readonly Setup[] = [
  {
    id: "session",
    image: studioSession,
    alt: "Two people recording an interview on bouclé armchairs with boom microphones between them, in a terracotta panelled room lit by brass floor lamps",
    caption: "Interview setup, two guests, warm panelled backdrop",
  },
  {
    id: "on-air",
    image: studioOnAir,
    alt: "Two RØDE microphones on boom arms either side of a pale table, facing a green lit brick wall under a neon ON AIR sign, with blue velvet armchairs",
    caption: "ON AIR room, two positions on brick",
  },
  {
    id: "violet-rode",
    image: studioVioletRode,
    alt: "A guest seated at a wooden table behind a RØDE microphone on a boom arm, in a violet lit room with a black drape and a shelving unit",
    caption: "Violet room, RØDE boom arms",
  },
  {
    id: "green-rig",
    image: setupGreenRig,
    alt: "Green lit studio with two Godox softboxes over a wooden table, a camera on a tripod and an audio mixer on a stand",
    caption: "Godox softboxes and mixer position",
  },
  {
    id: "behind-camera",
    image: setupBehindCamera,
    alt: "View from behind a camera, its flip screen showing two people being recorded at a table in a panelled room",
    caption: "From the operator position",
  },
  {
    id: "softbox-lounge",
    image: setupSoftboxLounge,
    alt: "Studio with two large octagonal softboxes overhead, a long white table, blue upholstered chairs and boom microphones, on parquet flooring",
    caption: "Twin softboxes over a four-seat table",
  },
  {
    id: "red-curtain",
    image: setupRedCurtain,
    alt: "Recording corner with a deep red curtain backdrop, a blue armchair, a boom microphone over a pale desk and a tall plant",
    caption: "Red curtain backdrop, single host",
  },
  {
    id: "blue-room",
    image: studioBlueRoom,
    alt: "A Shure SM7B microphone on a wooden table in front of a blue wall with horizontal LED strips, beside a grey sofa and a tripod floor lamp",
    caption: "Shure SM7B against the LED wall",
  },
  {
    id: "camera-rig",
    image: setupCameraRig,
    alt: "Camera on a tripod with an external monitor facing a wooden desk with boom microphones, against a green wall and exposed brick",
    caption: "Multi-camera setup with field monitor",
  },
  {
    id: "brick-softbox",
    image: setupBrickSoftbox,
    alt: "Two Godox softboxes angled over a pale desk in front of an exposed brick wall, with a monitor and a large plant",
    caption: "Godox lighting against brick",
  },
  {
    id: "green-wall",
    image: setupGreenWall,
    alt: "Green walled room with a softbox overhead, a camera and audio mixer in the foreground and a wooden desk behind",
    caption: "Green room, mixer and camera position",
  },
  {
    id: "mixer-desk",
    image: setupMixerDesk,
    alt: "Wide view of a studio with softboxes, boom microphones over a long white table, shelving units and an audio mixer on a side table",
    caption: "Full room, four microphone positions",
  },
  {
    id: "violet-lounge",
    image: setupVioletLounge,
    alt: "Lounge style studio washed in violet and blue light, with a long white desk, shelving and plants",
    caption: "Violet wash, lounge layout",
  },
  {
    id: "blue-chair",
    image: setupBlueChair,
    alt: "Studio corner with a softbox, a wooden desk, boom microphones and a blue chair beside a stone feature wall",
    caption: "Stone wall corner, two positions",
  },
];
