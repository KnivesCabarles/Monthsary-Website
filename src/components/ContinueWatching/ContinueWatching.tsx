import { motion } from "framer-motion";
import { useState } from "react";
import MediaImage from "../Shared/MediaImage";

export default function ContinueWatching() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-black px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass-card w-full max-w-md p-8 text-center"
      >
        {!confirmed ? (
          <>
            <p className="eyebrow mb-6">Continue Watching?</p>
            <MediaImage
              src="/images/episodes/episode-2.png"
              seed="continue-watching"
              label="Episode 2"
              alt="Our Love Story"
              className="mb-6 h-40 w-full rounded-xl object-cover"
            />
            <h2 className="font-display text-2xl text-cream">❤️ Our Love Story</h2>
            <p className="mt-1 text-sm text-cream/60">Season 1 · Episode 2</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-blush/70">Coming Next Month</p>
            <button onClick={() => setConfirmed(true)} className="btn-primary mt-8 w-full justify-center">
              Yes ❤️
            </button>
          </>
        ) : (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-display text-xl italic text-cream sm:text-2xl"
          >
            Thank you for saying yes to another episode with me.
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
