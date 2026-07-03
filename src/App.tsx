import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SelectedWorks from "./components/SelectedWorks";
import Journal from "./components/Journal";
import Explorations from "./components/Explorations";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import { Project, JournalEntry, CREDENTIALS } from "./data";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  
  // Modals / Details viewers state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedJournal, setSelectedJournal] = useState<JournalEntry | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Intersection Observer to update Navbar active section dynamically on scroll
  useEffect(() => {
    if (isLoading) return;

    const sections = ["home", "work", "resume", "explorations"];
    const observers = sections.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-45% 0px -45% 0px", // Trigger when the element crosses the middle of the screen
        }
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, [isLoading]);

  // Smooth scroll handler
  const handleLinkClick = (sectionId: string) => {
    if (sectionId === "resume") {
      // Open beautiful resume credentials drawer + scroll to the Journal/Stats region
      setIsResumeModalOpen(true);
      const element = document.getElementById("resume");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleSayHiClick = () => {
    const footerElement = document.querySelector("footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-white/20">
      
      {/* Ambient theme pattern layers */}
      <div className="absolute inset-0 halftone pointer-events-none opacity-40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none z-10" />

      {/* 1. Immersive Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Main Content (fades in smoothly when loaded) */}
      <div className={`transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        
        {/* Floating Responsive Navbar */}
        <Navbar
          activeSection={activeSection}
          onLinkClick={handleLinkClick}
          onSayHiClick={handleSayHiClick}
        />

        {/* Section 2: Cinematic Hero with HLS Player */}
        <Hero
          onSeeWorksClick={() => handleLinkClick("work")}
          onReachOutClick={handleSayHiClick}
        />

        {/* Section 3: Selected Works Bento Grid */}
        <SelectedWorks
          onProjectClick={(project) => setSelectedProject(project)}
          onViewAllClick={() => handleLinkClick("explorations")}
        />

        {/* Section 4: Journal horizontal log entries */}
        <Journal
          onEntryClick={(entry) => setSelectedJournal(entry)}
          onViewAllThoughtsClick={() => handleLinkClick("explorations")}
        />

        {/* Section 5: GSAP-driven Scroll Parallax visual playground */}
        <Explorations />

        {/* Section 6: Precision Statistics */}
        <Stats />

        {/* Section 7: Footers, GSAP Marquee, and Flipped Background video */}
        <Footer />

      </div>

      {/* ----------------- MODALS & INTERACTIVE DETAILED VIEWERS ----------------- */}

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedProject(null)} />
          <div className="relative glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8 shadow-2xl animate-role-fade-in flex flex-col gap-6">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-muted hover:text-text-primary text-xl font-sans font-light focus:outline-none cursor-pointer w-8 h-8 rounded-full border border-stroke flex items-center justify-center hover:bg-stroke/40"
            >
              ×
            </button>
            <div className="rounded-2xl overflow-hidden aspect-[16/10] w-full border border-stroke bg-bg relative">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 halftone opacity-25 mix-blend-overlay pointer-events-none" />
            </div>
            <div>
              <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-sans font-bold block mb-1">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl font-sans font-bold text-text-primary mb-3">
                {selectedProject.title}
              </h3>
              <p className="text-sm text-muted/90 font-sans leading-relaxed mb-6">
                {selectedProject.description}
              </p>
              <div className="border-t border-stroke/50 pt-5 flex items-center justify-between">
                <span className="text-xs text-muted">Role: Lead Interactive Developer</span>
                <button
                  onClick={handleSayHiClick}
                  className="text-xs font-sans font-semibold uppercase tracking-wider text-text-primary border-b border-white/20 pb-0.5 hover:text-muted"
                >
                  Discuss project ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Journal Article Details Modal */}
      {selectedJournal && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedJournal(null)} />
          <div className="relative glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8 shadow-2xl animate-role-fade-in flex flex-col gap-6">
            <button
              onClick={() => setSelectedJournal(null)}
              className="absolute top-4 right-4 text-muted hover:text-text-primary text-xl font-sans font-light focus:outline-none cursor-pointer w-8 h-8 rounded-full border border-stroke flex items-center justify-center hover:bg-stroke/40"
            >
              ×
            </button>
            <div className="rounded-2xl overflow-hidden aspect-[16/9] w-full border border-stroke bg-bg relative">
              <img
                src={selectedJournal.imageUrl}
                alt={selectedJournal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-sans font-bold">
                  {selectedJournal.category}
                </span>
                <div className="w-1 h-1 rounded-full bg-stroke" />
                <span className="text-xs text-muted font-mono">{selectedJournal.readTime}</span>
              </div>
              <h3 className="text-2xl font-sans font-bold text-text-primary mb-4 leading-snug">
                {selectedJournal.title}
              </h3>
              <div className="text-sm text-muted/95 font-sans leading-relaxed space-y-4">
                <p>
                  Aesthetics are not a superficial layer applied on top of code; they are the physical manifestation of deep system design. When interactions stutter, or layouts jump abruptly on state transitions, the illusion of virtual continuity is broken.
                </p>
                <p>
                  In this piece, we explore the integration of high-performance animation systems (like GSAP) with standard React state lifecycles, and how leveraging sub-pixel calculations can preserve visual weight even during rapid viewport transformations.
                </p>
                <p>
                  Truly crafted interfaces respect the tempo of human perception. Subtleties like custom easing, micro-haptics, and responsive timing thresholds determine whether a product feels artificial or naturally responsive.
                </p>
              </div>
              <div className="border-t border-stroke/50 pt-5 mt-6 flex items-center justify-between">
                <span className="text-xs text-muted">Published: {selectedJournal.date}</span>
                <a
                  href={CREDENTIALS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-sans font-semibold uppercase tracking-wider text-text-primary border-b border-white/20 pb-0.5 hover:text-muted"
                >
                  Watch tutorials ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Resume Modal (Experience Timeline) */}
      {isResumeModalOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="absolute inset-0 cursor-zoom-out" onClick={() => setIsResumeModalOpen(false)} />
          <div className="relative glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8 shadow-2xl animate-role-fade-in flex flex-col gap-6">
            <button
              onClick={() => setIsResumeModalOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-text-primary text-xl font-sans font-light focus:outline-none cursor-pointer w-8 h-8 rounded-full border border-stroke flex items-center justify-center hover:bg-stroke/40"
            >
              ×
            </button>
            
            <div className="border-b border-stroke/50 pb-4">
              <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-sans font-bold block mb-1">
                PROFESSIONAL CREDENTIALS
              </span>
              <h3 className="text-2xl font-sans font-bold text-text-primary">
                Experience & Education
              </h3>
            </div>

            {/* Resume Timeline */}
            <div className="space-y-6">
              
              {/* Timeline Item 1 */}
              <div className="relative pl-6 border-l border-stroke/75">
                <div className="absolute -left-[5.5px] top-1.5 w-2.5 h-2.5 rounded-full accent-gradient" />
                <span className="text-xs text-muted font-mono uppercase block mb-1">2024 - Present</span>
                <h4 className="text-base font-sans font-bold text-text-primary">Lead Creative Engineer</h4>
                <p className="text-xs text-muted/60 mb-2">Aesthetic Interaction Studio, Chicago</p>
                <p className="text-xs sm:text-sm text-muted/90 font-sans leading-relaxed">
                  Led frontend design architecture, optimizing web apps for spatial rendering systems, WebGL rendering pipelines, and smooth GSAP choreography.
                </p>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative pl-6 border-l border-stroke/75">
                <div className="absolute -left-[5.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-stroke" />
                <span className="text-xs text-muted font-mono uppercase block mb-1">2022 - 2024</span>
                <h4 className="text-base font-sans font-bold text-text-primary">Interactive Fullstack Developer</h4>
                <p className="text-xs text-muted/60 mb-2">Syntactic Mechanics Co.</p>
                <p className="text-xs sm:text-sm text-muted/90 font-sans leading-relaxed">
                  Developed client-side custom dashboards and high-speed telemetry log interfaces, integrating D3.js and responsive Canvas animations.
                </p>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative pl-6 border-l border-stroke/75">
                <div className="absolute -left-[5.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-stroke" />
                <span className="text-xs text-muted font-mono uppercase block mb-1">2018 - 2022</span>
                <h4 className="text-base font-sans font-bold text-text-primary">B.Sc. in Spatial Computing & Interaction</h4>
                <p className="text-xs text-muted/60 mb-2">Institute of Aesthetic Design</p>
                <p className="text-xs sm:text-sm text-muted/90 font-sans leading-relaxed">
                  Specialized in human-computer interaction, grid layouts, typographic proportions, and web performance optimization.
                </p>
              </div>

            </div>

            <div className="border-t border-stroke/50 pt-5 mt-4 flex items-center justify-between">
              <a
                href={`mailto:${CREDENTIALS.email}`}
                className="text-xs font-sans font-semibold uppercase tracking-wider text-text-primary border-b border-white/20 pb-0.5 hover:text-muted"
              >
                Inquire details ↗
              </a>
              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="text-[11px] font-sans font-bold uppercase tracking-widest bg-white text-black rounded-full px-5 py-2.5 hover:bg-white/90 cursor-pointer focus:outline-none transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
