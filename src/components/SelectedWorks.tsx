import { motion } from "motion/react";
import { PROJECTS, Project } from "../data";

interface SelectedWorksProps {
  onProjectClick: (project: Project) => void;
  onViewAllClick: () => void;
}

export default function SelectedWorks({ onProjectClick, onViewAllClick }: SelectedWorksProps) {
  return (
    <section id="work" className="bg-bg py-20 md:py-28 select-none border-b border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header Block with Framer Motion scroll entrance */}
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
                Selected Work
              </span>
            </div>
            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-text-primary mb-4 font-bold">
              Featured <span className="font-display italic font-normal text-white">projects</span>
            </h2>
            {/* Subtext */}
            <p className="text-sm text-muted leading-relaxed font-sans">
              A selection of projects I've worked on, from concept to launch. Click any project to inspect details.
            </p>
          </div>

          {/* Desktop "View all work" button wrapped in accent-border */}
          <div className="hidden md:block accent-border hover:scale-105 transition-transform duration-300">
            <button
              onClick={onViewAllClick}
              className="bg-white text-black px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase cursor-pointer focus:outline-none"
            >
              View All Work
            </button>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {PROJECTS.map((project, idx) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={() => onProjectClick(project)}
                className={`group cursor-pointer relative ${project.colSpanClass} overflow-hidden rounded-3xl glass transition-all duration-500 hover:border-white/10`}
              >
                {/* Image Container with Dynamic Aspect Ratios */}
                <div className={`relative w-full ${project.aspectRatioClass} overflow-hidden`}>
                  
                  {/* Background Image with hover zoom */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[0.25,1,0.5,1] group-hover:scale-105"
                  />

                  {/* Halftone Pattern Overlay */}
                  <div className="absolute inset-0 halftone pointer-events-none opacity-40 mix-blend-overlay" />

                  {/* Dark subtle shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                  {/* Hover Backdrop Overlay & Cinematic View Button */}
                  <div className="absolute inset-0 bg-bg/75 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-10">
                    <div className="accent-border">
                      <div className="bg-white text-black text-[11px] font-bold tracking-widest uppercase rounded-full px-5 py-2.5 shadow-xl flex items-center gap-2">
                        View Case Study
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card footer details */}
                <div className="p-6 md:p-8 flex items-center justify-between border-t border-stroke bg-surface/40 backdrop-blur-sm">
                  <div>
                    <span className="text-[10px] text-muted font-sans font-bold tracking-[0.2em] uppercase block mb-1">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-sans font-bold text-text-primary tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                  {/* Minimal visual circle accent */}
                  <div className="w-8 h-8 rounded-full border border-stroke flex items-center justify-center text-muted group-hover:text-text-primary group-hover:border-white/20 transition-colors duration-300">
                    <span className="text-sm font-sans font-medium">→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View all work link */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={onViewAllClick}
            className="flex items-center gap-2 text-xs font-sans font-bold tracking-wider uppercase text-text-primary border-b border-white/20 pb-1"
          >
            View all projects <span>→</span>
          </button>
        </div>

      </div>
    </section>
  );
}
