import { motion } from "framer-motion";
import { useState } from "react";
import { episodes } from "../../data/episodes";
import { timelineEvents } from "../../data/timeline";
import type { TimelineEvent } from "../../data/timeline";
import MediaImage from "../Shared/MediaImage";
import Modal from "../Shared/Modal";
import SceneShell from "../Shared/SceneShell";

interface TimelineProps {
  episodeId: string;
  onContinue: () => void;
}

const episodeNumberById = new Map(episodes.map((e) => [e.id, e.number]));

export default function Timeline({ episodeId, onContinue }: TimelineProps) {
  const [active, setActive] = useState<TimelineEvent | null>(null);
  const currentNumber = episodeNumberById.get(episodeId) ?? 0;
  const visibleEvents = timelineEvents.filter(
    (ev) => (episodeNumberById.get(ev.episode) ?? 0) <= currentNumber
  );

  return (
    <SceneShell eyebrow="Scene 5 — Our Love Story" onContinue={onContinue} wide>
      <h2 className="heading-display mb-14 text-3xl sm:text-4xl">The Timeline So Far</h2>

      {visibleEvents.length === 0 ? (
        <p className="text-cream/60">No timeline chapters added for this episode yet — add some in timeline.ts!</p>
      ) : (
        <div className="relative flex w-full max-w-2xl flex-col items-center">
          <div className="absolute top-0 h-full w-px bg-gradient-to-b from-rose/10 via-rose/60 to-rose/10" />

          {visibleEvents.map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="relative z-10 mb-14 flex w-full flex-col items-center last:mb-0"
            >
              <span className="mb-4 flex h-4 w-4 items-center justify-center rounded-full bg-rose shadow-glow ring-4 ring-void" />
              <button
                onClick={() => setActive(ev)}
                className="glass-card flex w-full max-w-sm flex-col items-center gap-3 p-5 text-center transition-transform hover:scale-[1.02]"
              >
                <MediaImage
                  src={ev.image}
                  seed={ev.id}
                  label={ev.date}
                  alt={ev.title}
                  className="h-28 w-full rounded-lg object-cover"
                />
                <p className="text-xs font-semibold uppercase tracking-widest text-blush">{ev.chapterLabel}</p>
                <h3 className="font-display text-xl text-cream">{ev.title}</h3>
                <p className="text-sm text-cream/60">{ev.date}</p>
                <p className="text-sm leading-relaxed text-cream/75">{ev.description}</p>
              </button>
              {i < visibleEvents.length - 1 && (
                <span className="mt-4 text-xl text-rose/70" aria-hidden="true">↓</span>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={!!active} onClose={() => setActive(null)} maxWidth="max-w-lg">
        {active && (
          <div className="text-left">
            <div className="mb-5 flex max-h-[50vh] w-full items-center justify-center overflow-hidden rounded-xl bg-black/30">
              <MediaImage
                src={active.image}
                seed={active.id}
                label={active.date}
                alt={active.title}
                controls
                className="max-h-[50vh] w-full object-contain"
              />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blush">{active.chapterLabel}</p>
            <h3 className="heading-display mb-1 mt-1 text-2xl">{active.title}</h3>
            <p className="mb-3 text-sm text-cream/60">{active.date}</p>
            <p className="leading-relaxed text-cream/80">{active.description}</p>
          </div>
        )}
      </Modal>
    </SceneShell>
  );
}