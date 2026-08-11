import { motion } from "framer-motion";
import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { useTypewriter } from "../../hooks/useTypewriter";
import SceneShell from "../Shared/SceneShell";

interface LoveLetterProps {
  letterText: string;
  onContinue: () => void;
}

export default function LoveLetter({ letterText, onContinue }: LoveLetterProps) {
  const [opened, setOpened] = useState(false);
  const { output, done } = useTypewriter(letterText, 18, opened);

  return (
    <SceneShell eyebrow="Scene 2 — A Letter" onContinue={opened && done ? onContinue : undefined}>
      {!opened ? (
        <motion.button
          onClick={() => setOpened(true)}
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex flex-col items-center gap-6"
        >
          <div className="relative">
            <div className="glass-card flex h-40 w-56 items-center justify-center sm:h-48 sm:w-64">
              <FiMail size={40} className="text-blush transition-transform group-hover:scale-110" />
            </div>
            <div className="absolute -top-3 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[112px] border-t-[36px] border-x-transparent border-t-white/10 sm:border-x-[128px]" />
          </div>
          <span className="btn-secondary">Open Letter</span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card w-full max-w-lg p-8 text-left sm:p-10"
          style={{ background: "linear-gradient(160deg, rgba(255,245,242,0.08), rgba(255,245,242,0.02))" }}
        >
          <p className="whitespace-pre-line font-display text-base leading-relaxed text-cream/90 sm:text-lg">
            {output}
            {!done && <span className="animate-pulse">|</span>}
          </p>
        </motion.div>
      )}
    </SceneShell>
  );
}