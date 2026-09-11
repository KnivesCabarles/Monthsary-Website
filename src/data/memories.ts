import rawData from "./memories.json";

export interface Memory {
  id: string;
  caption: string;
  date?: string;
  description: string;
  image: string;
  episode: string;
}

export interface MemoryCategory {
  id: string;
  title: string;
  emoji: string;
  items: Memory[];
}

export const memoryCategories: MemoryCategory[] = rawData as MemoryCategory[];