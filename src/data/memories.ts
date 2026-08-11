import rawData from "./memories.json";

export interface Memory {
  id: string;
  caption: string;
  date?: string;
  description: string;
  /** Drop your photo/video-thumbnail at public + this path, matching filename. */
  image: string;
  /** Which episode this memory belongs to, e.g. "ep1", "ep2". Matches an id in episodes.ts. */
  episode: string;
}

export interface MemoryCategory {
  id: string;
  title: string;
  emoji: string;
  items: Memory[];
}

export const memoryCategories: MemoryCategory[] = rawData as MemoryCategory[];