import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPLORATIONS, ExplorationItem } from "../data";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  const [activeLightboxItem, setActiveLightboxItem] = useState<ExplorationItem | null>(null);

  // Split calculations (odds in col1, evens in col2)
  const col1Items = EXPLORATIONS.filter((_, idx) => idx % 2 === 0);
  const col2Items = EXPLORATIONS.filter((_, idx) => idx % 2 !== 0);

  useEffect(() => {
    const container = containerRef.current;
    const centerContent = centerContentRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;

    if (!container || !centerContent || !col1 || !col2) return;

    // 1. Pinned center element
    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: centerContent,
      pinSpacing: false,
    });

    // 2. Parallax movement on Column 1 (slightly slower y-translate)
    const col1Tween = gsap.fromTo(
      col1,
      { y: "15%" },
      {
        y: "-15%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );

    // 3. Parallax movement on Column 2 (slightly faster y-translate)
    const col2Tween = gsap.fromTo(
      col2,
      { y: "30%" },
      {
        y: "-30%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      }
    );

    return () => {
      pinTrigger.kill();
      col1Tween.scrollTrigger?.kill();
      col1Tween.kill();
      col2Tween.scrollTrigger?.kill();
      col2Tween.kill();
    };
  }, []);

  const handleOpenLightbox = (item: ExplorationItem) => {
    setActiveLightboxItem(item);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxItem(null);
  };

  return (
    <section
      ref={containerRef}
      id="explorations"
      className="relative w-full min-h-[300vh] bg-bg select-none border-b border-stroke overflow-hidden"
    >
      {/* Layer 1: Pinned Center Display (z-10) */}
      <div
        ref={centerContentRef}
        className="absolute inset-0 h-screen w-full flex flex-col items-center justify-center z-10 pointer-events-none select-none px-6"
      >
        <div className="text-center max-w-xl py-8 rounded-3xl">
          {/* Eyebrow */}
          <span className="text-[10px] text-muted uppercase tracking-[0.4em] mb-4 block opacity-80">
            EXPLORATIONS
          </span>
          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-sans tracking-tight text-text-primary mb-4 font-bold">
            Visual <span className="font-display italic font-normal text-white">playground</span>
          </h2>
          {/* Subtext */}
          <p className="text-sm text-muted leading-relaxed mb-6 max-w-sm mx-auto font-sans">
            A sandbox for tactile layouts, layout algorithms, motion paradigms, and generative visual mechanics.
          </p>
          {/* Action Dribbble link */}
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-text-primary pointer-events-auto hover:text-muted transition-colors duration-200"
          >
            Inspect Dribbble <span>↗</span>
          </a>
        </div>
      </div>

      {/* Layer 2: Parallax Columns (z-20) */}
      <div className="absolute inset-x-0 top-0 bottom-0 max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 gap-12 md:gap-48 pointer-events-none z-20">
        
        {/* Column 1: Left */}
        <div
          ref={col1Ref}
          className="flex flex-col gap-24 md:gap-44 pt-36 pointer-events-auto"
        >
          {col1Items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item)}
              className={`aspect-square w-full max-w-[320px] self-start md:self-end glass p-3 rounded-3xl shadow-2xl cursor-pointer group hover:scale-105 hover:border-white/15 transition-all duration-500 hover:shadow-black/60 relative ${item.rotation}`}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                />
                {/* Micro hover details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[10px] text-muted tracking-[0.2em] uppercase font-sans font-bold">
                    {item.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-sans font-bold text-text-primary tracking-tight">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Column 2: Right */}
        <div
          ref={col2Ref}
          className="flex flex-col gap-24 md:gap-44 pt-72 md:pt-96 pointer-events-auto"
        >
          {col2Items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item)}
              className={`aspect-square w-full max-w-[320px] self-start glass p-3 rounded-3xl shadow-2xl cursor-pointer group hover:scale-105 hover:border-white/15 transition-all duration-500 hover:shadow-black/60 relative ${item.rotation}`}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
                />
                {/* Micro hover details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[10px] text-muted tracking-[0.2em] uppercase font-sans font-bold">
                    {item.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-sans font-bold text-text-primary tracking-tight">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal rendering (fades in when item is active) */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          {/* Close trigger area */}
          <div
            className="absolute inset-0 cursor-zoom-out"
            onClick={handleCloseLightbox}
          />
          {/* Modal Card */}
          <div className="relative glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8 shadow-2xl animate-role-fade-in flex flex-col gap-6 select-none">
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-4 right-4 text-muted hover:text-text-primary text-xl font-sans font-light focus:outline-none cursor-pointer w-8 h-8 rounded-full border border-stroke flex items-center justify-center hover:bg-stroke/40"
            >
              ×
            </button>
            {/* Image display */}
            <div className="rounded-2xl overflow-hidden aspect-[4/3] w-full border border-stroke bg-bg">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Description details */}
            <div>
              <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-sans font-bold block mb-1">
                {activeLightboxItem.category}
              </span>
              <h3 className="text-2xl font-sans font-bold text-text-primary mb-2">
                {activeLightboxItem.title}
              </h3>
              <p className="text-sm text-muted/90 font-sans leading-relaxed">
                {activeLightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
