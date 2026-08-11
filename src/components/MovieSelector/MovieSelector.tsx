import { motion } from "framer-motion";
import { FiInfo } from "react-icons/fi";
import { movies } from "../../data/movies";
import type { Movie } from "../../data/movies";
import MediaImage from "../Shared/MediaImage";
import SceneShell from "../Shared/SceneShell";

interface MovieSelectorProps {
  episodeId: string;
  onSelect: (movie: Movie) => void;
}

export default function MovieSelector({ episodeId, onSelect }: MovieSelectorProps) {
  const visibleMovies = movies.filter((m) => m.episode === episodeId);

  return (
    <SceneShell eyebrow="Scene 6 — Movie Night" wide>
      <h2 className="heading-display mb-2 text-3xl sm:text-4xl">Pick Tonight's Movie</h2>
      <p className="mb-10 text-cream/60">Every choice ends the same way — with us. 🍿</p>

      {visibleMovies.length === 0 ? (
        <p className="text-cream/60">No movie picks added for this episode yet — add some in movies.ts!</p>
      ) : (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {visibleMovies.map((movie, i) => (
            <motion.button
              key={movie.id}
              onClick={() => onSelect(movie)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group glass-card overflow-hidden text-left"
            >
              <div className="relative">
                <MediaImage
                  src={movie.poster}
                  seed={movie.id}
                  label={movie.duration}
                  alt={movie.title}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex items-center gap-2 text-sm font-medium text-cream">
                    <FiInfo /> View details
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg text-cream">{movie.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-blush/80">{movie.genre}</p>
                <p className="mt-2 text-sm text-cream/70">{movie.tagline}</p>
                <p className="mt-2 text-xs text-cream/40">{movie.duration}</p>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </SceneShell>
  );
}