import { FiPlay } from "react-icons/fi";
import Modal from "../Shared/Modal";

interface MoreInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlay: () => void;
}

const GENRES = ["Romance ❤️", "Comedy 😂", "Adventure 🌍"];

export default function MoreInfoModal({ isOpen, onClose, onPlay }: MoreInfoModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl">
      <p className="eyebrow mb-2">About This Title</p>
      <h2 className="heading-display mb-6 text-3xl">Our 1st Year</h2>

      <div className="mb-6 flex flex-wrap gap-2">
        {GENRES.map((g) => (
          <span key={g} className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-cream/90">
            {g}
          </span>
        ))}
      </div>

      <dl className="mb-6 grid grid-cols-2 gap-y-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-cream/50">Cast</dt>
          <dd className="mt-1 font-medium">Me &amp; My Girlfriend</dd>
        </div>
        <div>
          <dt className="text-cream/50">Release Date</dt>
          <dd className="mt-1 font-medium">Monthsary Date</dd>
        </div>
        <div>
          <dt className="text-cream/50">Rating</dt>
          <dd className="mt-1 font-medium text-gold">★★★★★</dd>
        </div>
        <div className="col-span-2 sm:col-span-3">
          <dt className="text-cream/50">Status</dt>
          <dd className="mt-1 font-medium">Renewed for Lifetime ♾️</dd>
        </div>
      </dl>

      <p className="mb-8 leading-relaxed text-cream/80">
        A beautiful love story about two people creating unforgettable memories together, discovering
        happiness in every little moment, and choosing each other every single day.
      </p>

      <button onClick={onPlay} className="btn-primary w-full justify-center text-lg">
        <FiPlay /> Play Episode
      </button>
    </Modal>
  );
}
