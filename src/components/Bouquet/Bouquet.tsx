import { motion } from "framer-motion";
import { useMemo } from "react";
import FlowerPetals from "../Shared/FlowerPetals";
import SceneShell from "../Shared/SceneShell";

// A wrapped bouquet of purple tulips with eucalyptus and baby's breath,
// styled after a real florist wrap (ruffled paper cone + ribbon).

const APEX = { x: 200, y: 300 };
const WRAP_BOTTOM_Y = 450;

const PLEAT_SHADES = ["#7c4a9e", "#9b59b6", "#c9a0dc", "#b980d1", "#e9d5ff", "#a768c4", "#c9a0dc", "#9b59b6", "#7c4a9e"];
const PLEAT_ANGLES = [-58, -45, -32, -18, 0, 18, 32, 45, 58];

const TULIP_ANGLES = [-46, -32, -18, -6, 6, 18, 32, 46];
const TULIP_SHADES = ["#6c3483", "#8e44ad", "#9b59b6", "#c084c9", "#c084c9", "#9b59b6", "#8e44ad", "#6c3483"];
const TULIP_LENGTHS = [150, 175, 195, 210, 210, 195, 175, 150];

function polarPoint(angleDeg: number, radius: number, from: { x: number; y: number }) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: from.x + Math.sin(rad) * radius, y: from.y - Math.cos(rad) * radius };
}

function TulipHead({ shade }: { shade: string }) {
  return (
    <g>
      <path d="M0 0 C-20 0 -24 30 -16 48 C-10 58 0 62 0 62 C0 62 10 58 16 48 C24 30 20 0 0 0 Z" fill={shade} />
      <path d="M-13 6 C-24 18 -26 38 -16 48 C-12 40 -12 22 -13 6 Z" fill={shade} opacity="0.85" />
      <path d="M13 6 C24 18 26 38 16 48 C12 40 12 22 13 6 Z" fill={shade} opacity="0.85" />
      <path d="M0 0 C-6 12 -6 32 0 44 C6 32 6 12 0 0 Z" fill="#fff5f2" opacity="0.16" />
    </g>
  );
}

function EucalyptusSprig({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  const leaves = [0, 1, 2, 3, 4];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path d="M0 0 C-4 -30 4 -60 0 -95" stroke="#6f9c85" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {leaves.map((i) => {
        const t = i / (leaves.length - 1);
        const ly = -14 - t * 74;
        const side = i % 2 === 0 ? 1 : -1;
        return <circle key={i} cx={side * 8} cy={ly} r={6.5} fill="#8fae9c" opacity={0.9 - t * 0.15} />;
      })}
    </g>
  );
}

interface BouquetProps {
  onContinue: () => void;
}

export default function Bouquet({ onContinue }: BouquetProps) {
  const babyBreath = useMemo(
    () =>
      Array.from({ length: 18 }, () => {
        const angle = -50 + Math.random() * 100;
        const radius = 120 + Math.random() * 110;
        const pt = polarPoint(angle, radius, APEX);
        return { x: pt.x, y: pt.y - 20, r: 2 + Math.random() * 1.8 };
      }),
    []
  );

  return (
    <SceneShell eyebrow="Scene 1 — For You" onContinue={onContinue}>
      <FlowerPetals count={16} />

      <motion.svg
        viewBox="0 0 400 460"
        className="mx-auto h-72 w-64 sm:h-[26rem] sm:w-96"
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* wrap: fanned paper pleats */}
        <g>
          {PLEAT_ANGLES.slice(0, -1).map((angle, i) => {
            const a1 = angle;
            const a2 = PLEAT_ANGLES[i + 1];
            const spread = 300;
            const p1 = polarPoint(a1, spread, { x: APEX.x, y: WRAP_BOTTOM_Y - 130 });
            const p2 = polarPoint(a2, spread, { x: APEX.x, y: WRAP_BOTTOM_Y - 130 });
            return (
              <motion.polygon
                key={angle}
                points={`${APEX.x},${APEX.y} ${p1.x},${Math.min(p1.y, WRAP_BOTTOM_Y)} ${p2.x},${Math.min(p2.y, WRAP_BOTTOM_Y)}`}
                fill={PLEAT_SHADES[i]}
                opacity={0.92}
                initial={{ scaleY: 0.6, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.92 }}
                transition={{ delay: 0.3 + i * 0.04, duration: 0.5 }}
                style={{ transformOrigin: `${APEX.x}px ${APEX.y}px` }}
              />
            );
          })}
        </g>

        {/* stems */}
        {TULIP_ANGLES.map((angle, i) => {
          const head = polarPoint(angle, TULIP_LENGTHS[i], APEX);
          const mid = polarPoint(angle * 0.6, TULIP_LENGTHS[i] * 0.55, APEX);
          return (
            <path
              key={`stem-${angle}`}
              d={`M${APEX.x} ${APEX.y} Q${mid.x} ${mid.y} ${head.x} ${head.y + 6}`}
              stroke="#4d8a63"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
          );
        })}

        {/* eucalyptus, tucked behind the outer tulips */}
        <EucalyptusSprig x={polarPoint(-58, 150, APEX).x} y={polarPoint(-58, 150, APEX).y} rotate={-30} />
        <EucalyptusSprig x={polarPoint(58, 150, APEX).x} y={polarPoint(58, 150, APEX).y} rotate={30} />

        {/* baby's breath filler */}
        {babyBreath.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="#fdf6f0" opacity={0.85} />
        ))}

        {/* tulip heads */}
        {TULIP_ANGLES.map((angle, i) => {
          const head = polarPoint(angle, TULIP_LENGTHS[i], APEX);
          return (
            <motion.g
              key={`head-${angle}`}
              transform={`translate(${head.x} ${head.y}) rotate(${angle * 0.4})`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <TulipHead shade={TULIP_SHADES[i]} />
            </motion.g>
          );
        })}

        {/* ribbon band + bow */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ transformOrigin: "200px 330px" }}
        >
          <rect x="140" y="318" width="120" height="24" rx="4" fill="#fdf6f0" opacity="0.95" />
          <path d="M200 330 L160 308 C150 302 150 322 160 328 Z" fill="#f4c9e8" />
          <path d="M200 330 L240 308 C250 302 250 322 240 328 Z" fill="#f4c9e8" />
          <circle cx="200" cy="330" r="9" fill="#e0335f" />
        </motion.g>
      </motion.svg>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="font-display text-2xl italic text-cream/90 sm:text-3xl"
      >
        Before anything else...
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="mt-3 font-script text-3xl text-blush sm:text-4xl"
      >
        These flowers are for the prettiest girl I know.
      </motion.p>
    </SceneShell>
  );
}