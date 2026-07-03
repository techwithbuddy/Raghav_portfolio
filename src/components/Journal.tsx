import { motion } from "motion/react";
import { JOURNAL_ENTRIES, JournalEntry } from "../data";

interface JournalProps {
  onEntryClick: (entry: JournalEntry) => void;
  onViewAllThoughtsClick: () => void;
}

export default function Journal({ onEntryClick, onViewAllThoughtsClick }: JournalProps) {
  return (
    <section id="resume" className="bg-bg py-20 md:py-28 select-none border-b border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header Block matching Selected Works pattern */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-stroke" />
              <span className="text-[10px] text-muted uppercase tracking-[0.4em] block opacity-80">
                Journal
              </span>
            </div>
            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-text-primary mb-4 font-bold">
              Recent <span className="font-display italic font-normal text-white">thoughts</span>
            </h2>
            {/* Subtext */}
            <p className="text-sm text-muted leading-relaxed font-sans">
              Writing on spatial typography, virtual production, aesthetic engineering, and human interaction.
            </p>
          </div>

          {/* Desktop View All Button wrapped in accent-border */}
          <div className="hidden md:block accent-border hover:scale-105 transition-transform duration-300">
            <button
              onClick={onViewAllThoughtsClick}
              className="bg-white text-black px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase cursor-pointer focus:outline-none"
            >
              View All Articles
            </button>
          </div>
        </motion.div>

        {/* Horizontal Pills List */}
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {JOURNAL_ENTRIES.map((entry, idx) => {
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={() => onEntryClick(entry)}
                className="flex items-center gap-4 sm:gap-6 p-3 sm:p-4 glass rounded-[40px] sm:rounded-full transition-all duration-300 hover:scale-[1.01] hover:bg-surface/40 group cursor-pointer"
              >
                {/* Image Avatar Thumbnail */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-stroke bg-bg relative">
                  <img
                    src={entry.imageUrl}
                    alt={entry.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Subtle blend overlay */}
                  <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                </div>

                {/* Information Content */}
                <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4 pr-1 sm:pr-3">
                  <div className="min-w-0">
                    {/* Category */}
                    <span className="text-[10px] text-muted tracking-[0.2em] uppercase font-sans font-bold block mb-0.5">
                      {entry.category}
                    </span>
                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-sans font-bold text-text-primary tracking-tight truncate max-w-xs sm:max-w-md lg:max-w-xl">
                      {entry.title}
                    </h3>
                  </div>

                  {/* Metadata Indicators */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="text-[11px] text-muted font-mono bg-stroke/30 px-2 py-0.5 rounded-full">
                      {entry.readTime}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-stroke" />
                    <span className="text-[11px] text-muted font-sans font-medium">
                      {entry.date}
                    </span>
                  </div>
                </div>

                {/* Minimal Link Action Circle */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-stroke flex items-center justify-center shrink-0 group-hover:border-white/20 transition-all duration-300">
                  <span className="text-muted group-hover:text-text-primary text-xs sm:text-sm font-sans font-bold transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View all thoughts link */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={onViewAllThoughtsClick}
            className="flex items-center gap-2 text-xs font-sans font-bold tracking-wider uppercase text-text-primary border-b border-white/20 pb-1"
          >
            View all articles <span>→</span>
          </button>
        </div>

      </div>
    </section>
  );
}
