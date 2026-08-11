import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import FloatingHearts from "../Shared/FloatingHearts";

const LINES = [
  "Thank you for making every day the happiest chapter of my life.",
  "I love you more every single day.",
];

interface EndingProps {
  onFinished: () => void;
}

export default function Ending({ onFinished }: EndingProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= LINES.length + 1) {
      const t = setTimeout(onFinished, 1600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 900 : 2600);
    return () => clearTimeout(t);
  }, [step, onFinished]);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-black px-6">
      <FloatingHearts count={10} />
      <div className="relative z-10 max-w-xl text-center">
        <AnimatePresence mode="wait">
          {step > 0 && step <= LINES.length && (
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display text-2xl italic text-cream/90 sm:text-3xl"
            >
              {LINES[step - 1]}
            </motion.p>
          )}
          {step > LINES.length && (
            <motion.div
              key="tbc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="space-y-3"
            >
              <p className="eyebrow">To Be Continued...</p>
              <p className="font-display text-xl text-blush sm:text-2xl">Episode 2</p>
              <p className="font-script text-3xl text-cream sm:text-4xl">Second Monthsary</p>
              <p className="text-sm uppercase tracking-[0.3em] text-cream/40">Coming Soon ❤️</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
