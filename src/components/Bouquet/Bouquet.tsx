import { motion } from "framer-motion";
import { useMemo } from "react";
import FlowerPetals from "../Shared/FlowerPetals";
import SceneShell from "../Shared/SceneShell";

const JOIN = { x: 200, y: 260 };

const FAN_ANGLES = [-72, -54, -36, -18, 0, 18, 36, 54, 72];
const FAN_RADII = [150, 192, 222, 238, 242, 238, 222, 192, 150];
const FAN_SHADES = ["#4a2c63", "#6a3f8a", "#8352a8", "#9d68c2", "#c9a0e8", "#9d68c2", "#8352a8", "#6a3f8a", "#4a2c63"];

const TULIP_ANGLES = [-32, -18, -6, 6, 18, 32];
const TULIP_LENGTHS = [58, 78, 92, 92, 78, 58];
const TULIP_SHADES = ["#a8347f", "#b83d91", "#c2469e", "#c2469e", "#b83d91", "#a8347f"];

function pointUp(angleDeg: number, radius: number, from: { x: number; y: number }) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: from.x + Math.sin(rad) * radius, y: from.y - Math.cos(rad) * radius };
}

function TulipHead({ shade }: { shade: string }) {
  return (
    <g transform="scale(0.85)">
      <path d="M0 0 C-20 0 -24 30 -16 48 C-10 58 0 62 0 62 C0 62 10 58 16 48 C24 30 20 0 0 0 Z" fill={shade} />
      <path d="M-13 6 C-24 18 -26 38 -16 48 C-12 40 -12 22 -13 6 Z" fill={shade} opacity="0.85" />
      <path d="M13 6 C24 18 26 38 16 48 C12 40 12 22 13 6 Z" fill={shade} opacity="0.85" />
      <path d="M0 0 C-6 12 -6 32 0 44 C6 32 6 12 0 0 Z" fill="#fff5f2" opacity="0.16" />
    </g>
  );
}

function EucalyptusSprig({ x, y, rotate, scale = 1 }: { x: number; y: number; rotate: number; scale?: number }) {
  const leaves = [0, 1, 2, 3];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path
        d={`M0 0 C-3 ${-22 * scale} 3 ${-45 * scale} 0 ${-70 * scale}`}
        stroke="#5c8a6e"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      {leaves.map((i) => {
        const t = i / (leaves.length - 1);
        const ly = -10 - t * 55 * scale;
        const side = i % 2 === 0 ? 1 : -1;
        return <circle key={i} cx={side * 6} cy={ly} r={5.5 * scale} fill="#7fa08c" opacity={0.9 - t * 0.15} />;
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
      Array.from({ length: 20 }, () => {
        const angle = -38 + Math.random() * 76;
        const radius = 30 + Math.random() * 85;
        const pt = pointUp(angle, radius, JOIN);
        return { x: pt.x, y: pt.y, r: 2 + Math.random() * 1.6 };
      }),
    []
  );

  const coneTopL = { x: JOIN.x - 42, y: JOIN.y };
  const coneTopR = { x: JOIN.x + 42, y: JOIN.y };
  const coneBottomY = 450;
  const coneBotL = { x: JOIN.x - 95, y: coneBottomY };
  const coneBotR = { x: JOIN.x + 95, y: coneBottomY };

  return (
    <SceneShell eyebrow="Scene 1 — For You" onContinue={onContinue}>
      <FlowerPetals count={16} />

      <motion.svg
        viewBox="0 0 400 480"
        className="mx-auto h-72 w-64 sm:h-[27rem] sm:w-96"
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* wrapped stem cone, flaring down and slightly out below the ribbon */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <polygon
            points={`${coneTopL.x},${coneTopL.y} ${coneTopR.x},${coneTopR.y} ${coneBotR.x},${coneBotR.y} ${coneBotL.x},${coneBotL.y}`}
            fill="#8352a8"
            opacity="0.95"
          />
          {[-0.5, -0.15, 0.15, 0.5].map((t) => (
            <line
              key={t}
              x1={JOIN.x + t * 42}
              y1={JOIN.y}
              x2={200 + t * 95}
              y2={coneBottomY}
              stroke="#3f2354"
              strokeWidth="1.5"
              opacity="0.4"
            />
          ))}
        </motion.g>

        {/* fan of paper pleats, standing behind the flower cluster */}
        <g>
          {FAN_ANGLES.slice(0, -1).map((angle, i) => {
            const p1 = pointUp(angle, FAN_RADII[i], JOIN);
            const p2 = pointUp(FAN_ANGLES[i + 1], FAN_RADII[i + 1], JOIN);
            return (
              <motion.polygon
                key={angle}
                points={`${JOIN.x},${JOIN.y} ${p1.x},${p1.y} ${p2.x},${p2.y}`}
                fill={FAN_SHADES[i]}
                opacity={0.92}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.92 }}
                transition={{ delay: 0.35 + i * 0.04, duration: 0.5 }}
                style={{ transformOrigin: `${JOIN.x}px ${JOIN.y}px` }}
              />
            );
          })}
        </g>

        {/* greenery peeking from the sides of the cluster */}
        <EucalyptusSprig x={pointUp(-40, 60, JOIN).x} y={pointUp(-40, 60, JOIN).y} rotate={-35} />
        <EucalyptusSprig x={pointUp(40, 60, JOIN).x} y={pointUp(40, 60, JOIN).y} rotate={35} />
        <EucalyptusSprig x={pointUp(-20, 100, JOIN).x} y={pointUp(-20, 100, JOIN).y} rotate={-15} scale={1.15} />
        <EucalyptusSprig x={pointUp(20, 100, JOIN).x} y={pointUp(20, 100, JOIN).y} rotate={15} scale={1.15} />

        {/* baby's breath scattered through the cluster */}
        {babyBreath.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="#fdf6f0" opacity={0.9} />
        ))}

        {/* tulip stems (short — a tight cluster, not spread wide) */}
        {TULIP_ANGLES.map((angle, i) => {
          const head = pointUp(angle, TULIP_LENGTHS[i], JOIN);
          return (
            <line
              key={`stem-${angle}`}
              x1={JOIN.x}
              y1={JOIN.y}
              x2={head.x}
              y2={head.y + 4}
              stroke="#4d8a63"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}

        {/* tulip heads, drawn last so they sit on top */}
        {TULIP_ANGLES.map((angle, i) => {
          const head = pointUp(angle, TULIP_LENGTHS[i], JOIN);
          return (
            <motion.g
              key={`head-${angle}`}
              transform={`translate(${head.x} ${head.y - 30}) rotate(${angle * 0.35})`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <TulipHead shade={TULIP_SHADES[i]} />
            </motion.g>
          );
        })}

        {/* hanging ribbon tag over the cone */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
        >
          <rect x={JOIN.x - 9} y={JOIN.y + 6} width="18" height="160" fill="#fdf6f0" opacity="0.9" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={JOIN.x - 5} y={JOIN.y + 30 + i * 35} width="10" height="4" fill="#8352a8" opacity="0.6" />
          ))}
        </motion.g>

        {/* ribbon band + bow, tied right at the join point */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ transformOrigin: `${JOIN.x}px ${JOIN.y}px` }}
        >
          <rect x={JOIN.x - 55} y={JOIN.y - 11} width="110" height="22" rx="4" fill="#fdf6f0" />
          <path
            d={`M${JOIN.x} ${JOIN.y} L${JOIN.x - 36} ${JOIN.y - 20} C${JOIN.x - 46} ${JOIN.y - 26} ${JOIN.x - 46} ${JOIN.y - 6} ${JOIN.x - 36} ${JOIN.y} Z`}
            fill="#e8b6da"
          />
          <path
            d={`M${JOIN.x} ${JOIN.y} L${JOIN.x + 36} ${JOIN.y - 20} C${JOIN.x + 46} ${JOIN.y - 26} ${JOIN.x + 46} ${JOIN.y - 6} ${JOIN.x + 36} ${JOIN.y} Z`}
            fill="#e8b6da"
          />
          <circle cx={JOIN.x} cy={JOIN.y} r="8" fill="#c2469e" />
        </motion.g>
      </motion.svg>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="font-display text-2xl italic text-cream/90 sm:text-3xl"
      >
        Before anything else...
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="mt-3 font-script text-3xl text-blush sm:text-4xl"
      >
        These flowers are for the prettiest girl I know.
      </motion.p>
    </SceneShell>
  );
}