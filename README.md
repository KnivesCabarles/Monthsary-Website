# Our 1st Year — A Netflix Original 💕

A Netflix-inspired interactive love story website, built as a surprise Monthsary gift.

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL it shows (usually http://localhost:5173).

To build for deployment (e.g. Vercel, Netlify, GitHub Pages):

```bash
npm run build
```

This outputs a `dist/` folder you can upload anywhere static sites are hosted.

## Editing memories (now plain JSON — no code syntax to break)

Open `src/data/memories.json` directly. It's a plain array — no functions, no
TypeScript, just data you can edit safely:

```json
{
  "id": "fm-2",
  "caption": "Movie night",
  "date": "Day 2",
  "description": "Replace this with the real story...",
  "image": "/images/memories/Movies/movienight1.png"
}
```

To add a new memory, copy an existing `{ ... }` block inside the right
category's `"items"` array, give it a unique `"id"`, and point `"image"` at
wherever you'll drop the photo under `public/images/`. To change a caption,
date, description, or image path, just edit that field's value — the quotes
and commas are the only things to keep intact.

`src/data/movies.ts` and `src/data/timeline.ts` are still regular TypeScript
files for now; happy to convert those to JSON too if you'd like the same
treatment.

## How to drop in your real photos (no code editing needed)

Every image in the site points at a specific file path under `public/images/`.
If the file isn't there yet, it automatically falls back to a cute placeholder
doodle — so nothing ever looks broken while you're still collecting photos.
Just add a PNG with the **exact filename** shown below and it'll appear
automatically the next time you reload:

```
public/images/
  episodes/
    episode-1.png        → Episode 1 card background (Episode Selector screen)
    episode-2.png        → "Continue Watching" teaser card
  memories/
    first-moments/       → fm-1.png ... fm-12.png
    cute-pictures/       → cp-1.png ... cp-14.png
    funny-memories/      → fn-1.png ... fn-11.png
    future-adventures/   → fa-1.png ... fa-10.png
    special-days/        → sd-1.png ... sd-10.png
  movies/
    m1-poster.png, m2-poster.png, m3-poster.png
  timeline/
    ep1.png, ep2.png, ep3.png, ep4.png
```

Exact filenames per memory card are listed in `src/data/memories.ts` (the
`image` field on each item) — same for `src/data/movies.ts` and
`src/data/timeline.ts`. Want to use a video instead of a photo for a memory?
Easiest path: export a still frame/thumbnail as the PNG for the gallery card,
and if you'd like the modal to actually play the video on click, let me know
and I can wire that in too — it's a small addition on top of what's here.

## What else to personalize

1. **Text** — edit the copy directly inside each component
   (`src/components/.../*.tsx`) and inside `src/data/*.ts`
   (memories, timeline, love reasons, movies, episodes).
2. **Names & dates** — search for "My Girlfriend", "Monthsary Date", and
   "Replace with..." across `src/` and fill in the real details.
3. **Movie synopsis** — `src/data/movies.ts` now has a `synopsis` field shown
   on the new "Now Viewing" info screen before the ticket is generated.
4. **Movie ticket** — `src/components/MovieTicket/MovieTicket.tsx` generates
   a downloadable PNG/PDF ticket using html2canvas + jsPDF (no QR code, per
   your latest revision).

## Flow (updated)

Intro → **Episode Selector** (Episode 1 card, more "coming soon" and locked)
→ Bouquet (purple tulips 💜) → Love Letter → Memories → Little Things I Love
→ Timeline → Movie Night → **Movie Info** (genre, synopsis, details) →
Movie Ticket (download) → Ending → Continue Watching

## A quick note on the placeholder images

Snoopy/Peanuts is copyrighted, so `src/utils/placeholder.ts` generates
original, cute round-eared doodle placeholders as the fallback — same
purpose (a friendly stand-in until you add real photos), no IP issues.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS 3 · Framer Motion · React Icons ·
html2canvas · jsPDF

## Project structure

```
src/
  components/   → one folder per scene (Hero, EpisodeSelector, Bouquet, etc.)
  data/         → editable content (memories, timeline, movies, episodes, love reasons)
  hooks/        → useTypewriter, useToast
  utils/        → placeholder image generator
  App.tsx       → scene state machine that ties everything together
public/images/  → drop your real photos here, matching the filenames above
```

Happy Monthsary! ❤️
