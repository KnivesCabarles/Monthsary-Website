// Generates a cute, original doodle-style placeholder image (data URI SVG).
// NOTE: We use an original round-headed doodle character instead of Snoopy,
// since Snoopy/Peanuts is copyrighted IP. Swap these for real photos later!

const PALETTES = [
  ["#ffd1dc", "#e0335f"],
  ["#fff0d9", "#f5c04a"],
  ["#e6d9ff", "#a06bff"],
  ["#d9f2ff", "#4aa8f5"],
  ["#d9ffe6", "#3ecb7a"],
];

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export function placeholderImage(seed: string, label?: string): string {
  const [bg, fg] = PALETTES[hash(seed) % PALETTES.length];
  const earWiggle = hash(seed + "e") % 10;
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="${bg}"/>
    <g opacity="0.15">
      <circle cx="40" cy="40" r="14" fill="${fg}"/>
      <circle cx="360" cy="260" r="20" fill="${fg}"/>
      <circle cx="370" cy="40" r="8" fill="${fg}"/>
    </g>
    <ellipse cx="200" cy="190" rx="88" ry="72" fill="#ffffff" stroke="${fg}" stroke-width="4"/>
    <ellipse cx="${130 - earWiggle}" cy="110" rx="30" ry="42" fill="#ffffff" stroke="${fg}" stroke-width="4"/>
    <ellipse cx="${270 + earWiggle}" cy="110" rx="30" ry="42" fill="#ffffff" stroke="${fg}" stroke-width="4"/>
    <circle cx="172" cy="180" r="7" fill="${fg}"/>
    <circle cx="228" cy="180" r="7" fill="${fg}"/>
    <path d="M186 205 Q200 216 214 205" stroke="${fg}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="200" cy="196" rx="10" ry="7" fill="${fg}"/>
    <path d="M150 260 Q200 280 250 260" stroke="${fg}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
    ${label ? `<text x="200" y="270" font-family="Inter, sans-serif" font-size="13" fill="${fg}" text-anchor="middle" opacity="0.65">${label}</text>` : ""}
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
