import { motion } from "framer-motion";
import { useState } from "react";
import { memoryCategories } from "../../data/memories";
import type { Memory } from "../../data/memories";
import MediaImage from "../Shared/MediaImage";
import Modal from "../Shared/Modal";
import SceneShell from "../Shared/SceneShell";

interface MemoryGalleryProps {
  episodeId: string;
  onContinue: () => void;
}

export default function MemoryGallery({ episodeId, onContinue }: MemoryGalleryProps) {
  const [active, setActive] = useState<Memory | null>(null);

  const visibleCategories = memoryCategories
    .map((cat) => ({ ...cat, items: cat.items.filter((item) => item.episode === episodeId) }))
    .filter((cat) => cat.items.length > 0);

  return (
    <SceneShell eyebrow="Scene 3 — Our Memories" onContinue={onContinue} wide>
      <h2 className="heading-display mb-10 text-3xl sm:text-4xl">Every Little Moment</h2>

      {visibleCategories.length === 0 ? (
        <p className="text-cream/60">No memories added for this episode yet — add some in memories.json!</p>
      ) : (
        <div className="flex w-full flex-col gap-10 text-left">
          {visibleCategories.map((cat, catIdx) => (
            <div key={cat.id}>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-cream/90">
                <span>{cat.emoji}</span> {cat.title}
              </h3>
              <div className="no-scrollbar flex gap-4 overflow-x-auto pb-3">
                {cat.items.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActive(item)}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: Math.min(i, 8) * 0.04 + catIdx * 0.03 }}
                    whileHover={{ scale: 1.06, y: -6 }}
                    className="group relative w-40 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 text-left shadow-card transition-shadow sm:w-48"
                  >
                    <MediaImage
                      src={item.image}
                      seed={item.id}
                      label={item.date}
                      alt={item.caption}
                      className="h-28 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-32"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="glass p-2.5">
                      <p className="truncate text-xs font-medium text-cream/90">{item.caption}</p>
                      {item.date && <p className="text-[10px] text-cream/50">{item.date}</p>}
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-blush/60 transition-all group-hover:ring-2" />
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={!!active} onClose={() => setActive(null)} maxWidth="max-w-md">
        {active && (
          <div className="text-left">
            <MediaImage
              src={active.image}
              seed={active.id}
              label={active.date}
              alt={active.caption}
              controls
              className="mb-5 h-56 w-full rounded-xl object-cover"
            />
            {active.date && <p className="eyebrow mb-1">{active.date}</p>}
            <h3 className="heading-display mb-3 text-2xl">{active.caption}</h3>
            <p className="leading-relaxed text-cream/80">{active.description}</p>
          </div>
        )}
      </Modal>
    </SceneShell>
  );
}