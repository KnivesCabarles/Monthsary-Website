import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import { episodes } from "../../data/episodes";
import MediaImage from "../Shared/MediaImage";
import SceneShell from "../Shared/SceneShell";

interface EpisodeSelectorProps {
  onSelectEpisode: (episodeId: string) => void;
}

export default function EpisodeSelector({ onSelectEpisode }: EpisodeSelectorProps) {
  return (
    <SceneShell eyebrow="Season 1" wide>
      <h2 className="heading-display mb-2 text-3xl sm:text-4xl">Our 1st Year</h2>
      <p className="mb-10 text-cream/60">New episodes drop every month. ❤️</p>

      <div className="flex w-full flex-col gap-5">
        {episodes.map((ep, i) => (
          <motion.button
            key={ep.id}
            onClick={() => onSelectEpisode(ep.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.015 }}
            className="group relative flex cursor-pointer items-stretch overflow-hidden rounded-2xl border border-white/10 text-left shadow-card"
          >
            <div className="relative w-40 flex-shrink-0 sm:w-56">
              <MediaImage
                src={ep.background}
                seed={ep.id}
                label={`Episode ${ep.number}`}
                alt={ep.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
            </div>
            <div className="glass flex flex-1 flex-col justify-center gap-1.5 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-blush/80">
                Episode {ep.number}
              </p>
              <h3 className="font-display text-xl text-cream sm:text-2xl">{ep.title}</h3>
              <p className="text-sm text-cream/60">{ep.duration}</p>
              <p className="mt-1 text-sm text-cream/75">{ep.description}</p>
            </div>
            <div className="flex items-center justify-center px-5 sm:px-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose text-cream shadow-glow transition-transform group-hover:scale-110">
                <FiPlay />
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </SceneShell>
  );
}