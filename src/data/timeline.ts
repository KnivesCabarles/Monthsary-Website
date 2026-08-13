export interface TimelineEvent {
  id: string;
  episode: string;
  title: string;
  date: string;
  description: string;
  image: string;
  chapterLabel?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "chapter-1",
    episode: "ep1",
    title: "We First Met",
    date: "Jan 2025",
    description: "The day our story quietly began, even if neither of us knew it yet.",
    image: "/images/timeline/ep1.png",
    chapterLabel: "Chapter 1",
  },
  {
    id: "chapter-2",
    episode: "ep1",
    title: "BFF Premium was Activated",
    date: "Mar 2025",
    description: "My feelings for you were already there, but this was the day I realized I wanted to be more than friends.",
    image: "/images/timeline/ep2.png",
    chapterLabel: "Chapter 2",
  },
  {
    id: "chapter-3",
    episode: "ep1",
    title: "Courting Stage",
    date: "June 2025",
    description: "Courting you was a dream come true, and I never thought I'd be lucky enough to be in this stage, you have feelings pala that time sakin ahhhhhh ikaw ah you love meeeeeeee",
    image: "/images/timeline/ep3.png",
    chapterLabel: "Chapter 3",
  },
  {
    id: "chapter-4",
    episode: "ep1",
    title: "Courting Stage was Over: First Day being a Couple",
    date: "September 16 2025",
    description: "Still dream coming true, and never thought that you will accept my love and be my girlfriend, and yah i will never forget that day.",
    image: "/images/timeline/ep4.png",
    chapterLabel: "Chapter 4",
  },
  {
    id: "chapter-5",
    episode: "ep1",
    title: "The End: Break UP",
    date: "Dec 5 2025",
    description: "never know that will happen tbh all came fast sakin habang nagawa ng thesis, and di na ako nakapalag kung alam ko lang na cool off lang pala yun",
    image: "/images/timeline/ep5.png",
    chapterLabel: "Chapter 5",
  },
  {
    id: "chapter-6",
    episode: "ep1",
    title: "The Reconnected: Courting you Once Again",
    date: "Feb 2026",
    description: "Miss mo ko kalaro ng ML if i remember since dun nag start then the story once again unvailed and yah may feelings kapa sakin pero not sure that time, pero i still take the chance.",
    image: "/images/timeline/ep6.png",
    chapterLabel: "Chapter 6",
  },
  {
    id: "chapter-7",
    episode: "ep1",
    title: "Being a Couple Again",
    date: "June 12 2026",
    description: "Never knew after that big misunderstanding your gonna accept my love once again and be my girlfriend again.",
    image: "/images/timeline/ep7.png",
    chapterLabel: "Chapter 7",
  },
  {
    id: "chapter-8",
    episode: "ep1",
    title: "Our First Monthsary",
    date: "Replace with today's date",
    description: "One month down, and I'd choose every single day of it again.",
    image: "/images/timeline/rep1.png",
    chapterLabel: "Chapter 8",
  },
  {
    id: "chapter-9",
    episode: "ep2",
    title: "Second Monthsary",
    date: "Replace with today's date",
    description: "Two months down, and I'm still choosing you every day.",
    image: "/images/timeline/rep2.png",
    chapterLabel: "Chapter 1",
  },
];