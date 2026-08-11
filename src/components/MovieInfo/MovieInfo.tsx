import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowLeft, FiFilm } from "react-icons/fi";
import type { Movie } from "../../data/movies";
import MediaImage from "../Shared/MediaImage";
import SceneShell from "../Shared/SceneShell";

interface MovieInfoProps {
  movie: Movie;
  onGenerateTicket: () => void;
  onBack: () => void;
}

export default function MovieInfo({ movie, onGenerateTicket, onBack }: MovieInfoProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(onGenerateTicket, 1400);
  };

  return (
    <SceneShell eyebrow="Now Viewing">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 self-start text-sm text-cream/60 transition-colors hover:text-cream"
      >
        <FiArrowLeft /> Choose a different movie
      </button>

      <div className="glass-card w-full max-w-lg overflow-hidden text-left">
        <MediaImage
          src={movie.poster}
          seed={movie.id}
          label={movie.duration}
          alt={movie.title}
          className="h-56 w-full object-cover"
        />
        <div className="p-6 sm:p-8">
          <h2 className="font-display text-2xl text-cream sm:text-3xl">{movie.title}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {movie.genre.split(" / ").map((g) => (
              <span key={g} className="rounded-full bg-white/10 px-3 py-1 text-xs text-cream/80">
                {g}
              </span>
            ))}
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-cream/80">{movie.duration}</span>
          </div>
          <p className="mt-4 font-display italic text-blush/90">{movie.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/75">{movie.synopsis}</p>

          <motion.button
            onClick={handleClick}
            disabled={loading}
            whileHover={!loading ? { scale: 1.03 } : undefined}
            whileTap={!loading ? { scale: 0.97 } : undefined}
            className="btn-primary mt-8 w-full justify-center"
          >
            <FiFilm />
            {loading ? "Generating your movie ticket..." : "Get Our Ticket"}
          </motion.button>
        </div>
      </div>
    </SceneShell>
  );
}
