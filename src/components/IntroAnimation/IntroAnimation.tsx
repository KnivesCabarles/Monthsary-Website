import { motion } from "framer-motion";
import { useState } from "react";
import { FiInfo, FiPlay, FiVolume2, FiVolumeX } from "react-icons/fi";
import FloatingHearts from "../Shared/FloatingHearts";

interface IntroAnimationProps {
  onPlay: () => void;
  onMoreInfo: () => void;
}

export default function IntroAnimation({ onPlay, onMoreInfo }: IntroAnimationProps) {
  const [muted, setMuted] = useState(true);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/20 blur-[120px] animate-glow" />
        <div className="absolute bottom-0 right-0 h-[40vh] w-[40vh] rounded-full bg-gold/10 blur-[100px] animate-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <FloatingHearts count={16} />

      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute background music" : "Mute background music"}
        className="glass absolute right-6 top-6 z-10 rounded-full p-3 text-cream/80 transition-colors hover:text-cream"
      >
        {muted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
      </button>

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="eyebrow mb-5"
        >
          A Netflix Original — Kind Of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
          transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="heading-display shimmer-text text-5xl leading-tight sm:text-7xl md:text-8xl"
        >
          OUR 1ST YEAR
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-6 space-y-1"
        >
          <p className="font-display text-lg italic text-blush sm:text-xl">Episode 1</p>
          <p className="font-script text-3xl text-cream sm:text-4xl">Our First Monthsary ❤️</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <button onClick={onPlay} className="btn-primary text-lg">
            <FiPlay /> Play Episode
          </button>
          <button onClick={onMoreInfo} className="btn-secondary text-lg">
            <FiInfo /> More Info
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-cream/40"
      >
        Scroll or press play to begin
      </motion.div>
    </section>
  );
}
