import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FiArrowLeft, FiDownload, FiFileText } from "react-icons/fi";
import type { Movie } from "../../data/movies";
import { useToast } from "../../hooks/useToast";
import SceneShell from "../Shared/SceneShell";

interface MovieTicketProps {
  movie: Movie;
  onContinue: () => void;
  onBack: () => void;
}

export default function MovieTicket({ movie, onContinue, onBack }: MovieTicketProps) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [downloaded, setDownloaded] = useState(false);
  const { showToast } = useToast();
  const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  const capture = async () => {
    if (!ticketRef.current) return null;
    return html2canvas(ticketRef.current, { backgroundColor: null, scale: 2 });
  };

  const downloadPng = async () => {
    const canvas = await capture();
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "our-movie-ticket.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setDownloaded(true);
    showToast("Ticket saved as PNG!");
  };

  const downloadPdf = async () => {
    const canvas = await capture();
    if (!canvas) return;
    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height] });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("our-movie-ticket.pdf");
    setDownloaded(true);
    showToast("Ticket saved as PDF!");
  };

  return (
    <SceneShell
      eyebrow="Scene 7 — Your Ticket"
      onContinue={downloaded ? onContinue : undefined}
      continueLabel="Continue to the ending"
    >
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 self-start text-sm text-cream/60 transition-colors hover:text-cream"
      >
        <FiArrowLeft /> Back to movie details
      </button>

      <h2 className="heading-display mb-8 text-3xl sm:text-4xl">Here's Your Ticket</h2>

      <motion.div
        ref={ticketRef}
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl"
        style={{ background: "linear-gradient(135deg, #1c0b12, #2b0d1a)" }}
      >
        <div className="flex flex-col gap-4 p-6 text-left sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-blush/70">Admit Two — Forever Screening</p>
          <h3 className="font-display text-2xl text-cream sm:text-3xl">{movie.title}</h3>
          <div className="grid grid-cols-2 gap-3 text-xs text-cream/80 sm:text-sm">
            <div>
              <p className="text-cream/40">Him</p>
              <p className="font-medium">Me</p>
            </div>
            <div>
              <p className="text-cream/40">Her</p>
              <p className="font-medium">My Girlfriend</p>
            </div>
            <div>
              <p className="text-cream/40">Date</p>
              <p className="font-medium">{today}</p>
            </div>
            <div>
              <p className="text-cream/40">Seat</p>
              <p className="font-medium">Forever Together ♾️</p>
            </div>
          </div>
          <p className="text-xs text-gold sm:text-sm">Admission: One Kiss Required 💋</p>
        </div>

        <div className="flex items-center justify-between border-t border-dashed border-cream/20 px-6 py-3 sm:px-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40">Our Love Story</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40">Season 1 · Ep 1</p>
        </div>

        <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-void" />
        <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-void" />
      </motion.div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button onClick={downloadPng} className="btn-primary">
          <FiDownload /> Download as PNG
        </button>
        <button onClick={downloadPdf} className="btn-secondary">
          <FiFileText /> Download as PDF
        </button>
      </div>
    </SceneShell>
  );
}
