export interface Episode {
  id: string;
  number: number;
  title: string;
  duration: string;
  description: string;
  /** Drop your photo at public + this path to use it as this episode's card background. */
  background: string;
  available: boolean;
}

export const episodes: Episode[] = [
  {
    id: "ep1",
    number: 1,
    title: "Our First Monthsary",
    duration: "~10 min watch",
    description:
      "Flowers, a letter, our memories so far, and the little things I love about you — all in one episode.",
    background: "/images/episodes/chap1.png",
    available: true,
  },
  {
    id: "ep2",
    number: 2,
    title: "Second Monthsary",
    duration: "~10 min watch",
    description:
      "More memories, more moments, and more reasons to fall for you all over again this month.",
    background: "/images/episodes/chap2.png",
    available: true,
  },
];