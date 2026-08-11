import { useState } from "react";
import { placeholderImage } from "../../utils/placeholder";

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".m4v"];

function isVideoPath(src: string) {
  const lower = src.toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

interface MediaImageProps {
  /** Real file path, e.g. "/images/memories/first-moments/fm-1.png" or "...clip.mp4" —
   *  just drop your file at public + this path and it'll show up automatically. */
  src: string;
  seed: string;
  label?: string;
  alt: string;
  className?: string;
  /** Show playback controls (use this in modals/detail views). Cards default to a silent, looping preview. */
  controls?: boolean;
}

export default function MediaImage({ src, seed, label, alt, className = "", controls = false }: MediaImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return <img src={placeholderImage(seed, label)} alt={alt} className={className} loading="lazy" />;
  }

  if (isVideoPath(src)) {
    return (
      <video
        src={src}
        className={className}
        onError={() => setErrored(true)}
        autoPlay={!controls}
        muted={!controls}
        loop={!controls}
        controls={controls}
        playsInline
        aria-label={alt}
      />
    );
  }

  return <img src={src} onError={() => setErrored(true)} alt={alt} className={className} loading="lazy" />;
}