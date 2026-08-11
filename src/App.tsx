import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Bouquet from "./components/Bouquet/Bouquet";
import ContinueWatching from "./components/ContinueWatching/ContinueWatching";
import Ending from "./components/Ending/Ending";
import EpisodeSelector from "./components/EpisodeSelector/EpisodeSelector";
import IntroAnimation from "./components/IntroAnimation/IntroAnimation";
import LoveCards from "./components/LoveCards/LoveCards";
import LoveLetter from "./components/LoveLetter/LoveLetter";
import MemoryGallery from "./components/MemoryGallery/MemoryGallery";
import MoreInfoModal from "./components/MoreInfoModal/MoreInfoModal";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import MovieSelector from "./components/MovieSelector/MovieSelector";
import MovieTicket from "./components/MovieTicket/MovieTicket";
import Timeline from "./components/Timeline/Timeline";
import { letters } from "./data/letters";
import type { Movie } from "./data/movies";
import { ToastProvider } from "./hooks/useToast";

type Stage =
  | "intro"
  | "episodes"
  | "bouquet"
  | "letter"
  | "gallery"
  | "lovecards"
  | "timeline"
  | "movie-select"
  | "movie-info"
  | "movie-ticket"
  | "ending"
  | "continue-watching";

export default function App() {
  const [stage, setStage] = useState<Stage>("intro");
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string>("ep1");

  const goto = (next: Stage) => () => setStage(next);

  const handleSelectEpisode = (episodeId: string) => {
    setSelectedEpisodeId(episodeId);
    setStage("bouquet");
  };

  const letterText = letters[selectedEpisodeId] ?? letters.ep1;

  return (
    <ToastProvider>
      <main className="relative">
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <IntroAnimation key="intro" onPlay={goto("episodes")} onMoreInfo={() => setInfoOpen(true)} />
          )}
          {stage === "episodes" && <EpisodeSelector key="episodes" onSelectEpisode={handleSelectEpisode} />}
          {stage === "bouquet" && <Bouquet key="bouquet" onContinue={goto("letter")} />}
          {stage === "letter" && (
            <LoveLetter key="letter" letterText={letterText} onContinue={goto("gallery")} />
          )}
          {stage === "gallery" && (
            <MemoryGallery key="gallery" episodeId={selectedEpisodeId} onContinue={goto("lovecards")} />
          )}
          {stage === "lovecards" && (
            <LoveCards key="lovecards" episodeId={selectedEpisodeId} onContinue={goto("timeline")} />
          )}
          {stage === "timeline" && (
            <Timeline key="timeline" episodeId={selectedEpisodeId} onContinue={goto("movie-select")} />
          )}
          {stage === "movie-select" && (
            <MovieSelector
              key="movie-select"
              episodeId={selectedEpisodeId}
              onSelect={(movie: Movie) => { 
                setSelectedMovie(movie);
                setStage("movie-info");
              }}
            />
          )}
          {stage === "movie-info" && selectedMovie && (
            <MovieInfo
              key="movie-info"
              movie={selectedMovie}
              onGenerateTicket={goto("movie-ticket")}
              onBack={goto("movie-select")}
            />
          )}
          {stage === "movie-ticket" && selectedMovie && (
            <MovieTicket
              key="movie-ticket"
              movie={selectedMovie}
              onContinue={goto("ending")}
              onBack={goto("movie-info")}
            />
          )}
          {stage === "ending" && <Ending key="ending" onFinished={goto("continue-watching")} />}
          {stage === "continue-watching" && <ContinueWatching key="continue-watching" />}
        </AnimatePresence>

        <MoreInfoModal
          isOpen={infoOpen}
          onClose={() => setInfoOpen(false)}
          onPlay={() => {
            setInfoOpen(false);
            setStage("episodes");
          }}
        />
      </main>
    </ToastProvider>
  );
}