import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";

interface SceneShellProps {
  eyebrow: string;
  children: ReactNode;
  onContinue?: () => void;
  continueLabel?: string;
  wide?: boolean;
}

export default function SceneShell({ eyebrow, children, onContinue, continueLabel = "Continue", wide }: SceneShellProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-20"
    >
      <div className={`relative z-10 flex w-full ${wide ? "max-w-6xl" : "max-w-2xl"} flex-col items-center text-center`}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="eyebrow mb-6"
        >
          {eyebrow}
        </motion.p>
        {children}
        {onContinue && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={onContinue}
            className="btn-primary mt-12"
          >
            {continueLabel} <FiArrowRight />
          </motion.button>
        )}
      </div>
    </motion.section>
  );
}
