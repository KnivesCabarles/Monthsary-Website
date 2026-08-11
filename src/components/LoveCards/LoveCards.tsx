import { motion } from "framer-motion";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { loveReasons } from "../../data/loveReasons";
import SceneShell from "../Shared/SceneShell";

interface LoveCardsProps {
  episodeId: string;
  onContinue: () => void;
}

export default function LoveCards({ episodeId, onContinue }: LoveCardsProps) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const visibleReasons = loveReasons.filter((r) => r.episode === episodeId);

  const toggle = (id: string) => setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <SceneShell eyebrow="Scene 4 — Little Things I Love" onContinue={onContinue} wide>
      <h2 className="heading-display mb-2 text-3xl sm:text-4xl">Little Things I Love About You</h2>
      <p className="mb-10 text-cream/60">Tap a card to reveal the message 💌</p>

      {visibleReasons.length === 0 ? (
        <p className="text-cream/60">No cards added for this episode yet — add some in loveReasons.ts!</p>
      ) : (
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {visibleReasons.map((reason, i) => {
            const isFlipped = !!flipped[reason.id];
            return (
              <motion.button
                key={reason.id}
                onClick={() => toggle(reason.id)}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 8) * 0.05 }}
                className="relative h-36 [perspective:1000px] sm:h-40"
              >
                <motion.div
                  className="relative h-full w-full [transform-style:preserve-3d]"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="glass-card absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 [backface-visibility:hidden]">
                    <FiHeart className="text-blush" size={22} />
                    <span className="text-center text-sm font-semibold text-cream/90">{reason.title}</span>
                  </div>
                  <div
                    className="glass-card absolute inset-0 flex items-center justify-center bg-rose/10 p-3 text-center [backface-visibility:hidden]"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <p className="text-xs leading-snug text-cream/90 sm:text-sm">{reason.message}</p>
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      )}
    </SceneShell>
  );
}