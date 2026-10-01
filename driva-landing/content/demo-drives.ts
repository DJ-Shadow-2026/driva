// Demo profiles. Placeholders: swap people, cars, and drives here only.
// Components read everything from this file, so a swap needs no component changes.

/** A route as points in a 0 to 100 box, drawn as an orange polyline. */
export type RoutePoints = ReadonlyArray<readonly [number, number]>;

export type DemoDrive = {
  id: string;
  name: string;
  handle: string;
  foundingMember: boolean;
  avatar: string;
  car: string;
  verified: boolean;
  title: string;
  photo: string;
  photoAlt: string;
  distance: string;
  duration: string;
  avgSpeed: string;
  caption: string;
  likes: number;
  comments: number;
  postedAt: string;
  /** Thumbnail route shown on the first slide of the post. */
  route: RoutePoints;
};

export const demoDrives: DemoDrive[] = [
  {
    id: "maya",
    name: "Maya Chen",
    handle: "@mayamoves",
    foundingMember: true,
    avatar: "/demo/maya-avatar.jpg",
    car: "2022 Mazda MX-5 Miata",
    verified: true,
    title: "Golden hour through the Gables",
    photo: "/demo/maya-car.jpg",
    photoAlt:
      "Red Mazda MX-5 Miata with the top down on a palm-lined street in Coral Gables at golden hour",
    distance: "31.8 mi",
    duration: "58m",
    avgSpeed: "33 mph",
    caption: "Top down beneath the palms, one cafecito stop, and every light turning gold.",
    likes: 286,
    comments: 22,
    postedAt: "2h ago",
    route: [
      [14, 82], [14, 58], [34, 58], [34, 36], [52, 30], [70, 18], [86, 26],
      [86, 50], [66, 62], [66, 80], [44, 88], [26, 88],
    ],
  },
  {
    id: "theo",
    name: "Theo Grant",
    handle: "@theog",
    foundingMember: false,
    avatar: "/demo/theo-avatar.jpg",
    car: "2024 BMW M3 CS",
    verified: true,
    title: "Causeway before the city wakes",
    photo: "/demo/theo-car.jpg",
    photoAlt:
      "White BMW M3 CS on a causeway with the Miami skyline and Biscayne Bay behind it",
    distance: "46.1 mi",
    duration: "1h 09m",
    avgSpeed: "40 mph",
    caption: "Cool morning air, Biscayne Bay on both sides, and a clean run back toward Brickell.",
    likes: 341,
    comments: 27,
    postedAt: "Yesterday",
    route: [
      [10, 86], [10, 66], [26, 66], [26, 46], [40, 46], [62, 40], [84, 38],
      [84, 18], [92, 18], [92, 64], [62, 68], [36, 72], [24, 72], [24, 86],
    ],
  },
  {
    id: "sofia",
    name: "Sofia Reyes",
    handle: "@sofiareyes",
    foundingMember: false,
    avatar: "/demo/sofia-avatar.jpg",
    car: "2023 Lamborghini Huracán STO",
    verified: true,
    title: "Collins after dark",
    photo: "/demo/sofia-car.jpg",
    photoAlt:
      "Orange Lamborghini Huracán STO on Collins Avenue at night with Art Deco hotels lit up behind it",
    distance: "27.4 mi",
    duration: "54m",
    avgSpeed: "30 mph",
    caption: "Art Deco lights, ocean air, and a V10 echoing softly down Collins Avenue.",
    likes: 512,
    comments: 0, // comment count was hidden in the source screenshot; set before launch
    postedAt: "2 days ago",
    route: [
      [30, 92], [34, 72], [32, 52], [38, 32], [36, 12], [56, 8], [64, 22],
      [62, 44], [70, 62], [66, 82], [50, 90],
    ],
  },
];

/** The garage card in the Verified garage section. Placeholder values. */
export const demoGarage = {
  driveId: "theo",
  year: "2024",
  model: "BMW M3 CS",
  color: "Alpine White",
  drivaMiles: "1,284",
  drives: 37,
} as const;

/** The drive animated in the Track every drive section. */
export const signatureDriveId = "theo";

/** The drive rendered as a share card in the Share section. */
export const shareDriveId = "sofia";

/** The drive shown inside the hero phone. */
export const heroDriveId = "maya";

export function getDrive(id: string): DemoDrive {
  const drive = demoDrives.find((d) => d.id === id);
  if (!drive) throw new Error(`Unknown demo drive: ${id}`);
  return drive;
}
