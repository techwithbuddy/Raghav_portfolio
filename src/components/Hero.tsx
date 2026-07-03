import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Hls from "hls.js";
import { CREDENTIALS } from "../data";

interface HeroProps {
  onSeeWorksClick: () => void;
  onReachOutClick: () => void;
}

export default function Hero({ onSeeWorksClick, onReachOutClick }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Creative", "Fullstack", "Founder", "Scholar"];

  // Roles cycling every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // HLS Video Setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hlsUrl = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.log("HLS video play failed:", err));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native Apple HLS support (Safari)
      video.src = hlsUrl;
      video.addEventListener("canplay", () => {
        video.play().catch((err) => console.log("Native video play failed:", err));
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Entrance animations
  useEffect(() => {
    // We register gsap animations inside standard React useEffect
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Set initial states to guarantee visual synchronization
    gsap.set(".name-reveal", { opacity: 0, y: 50 });
    gsap.set(".blur-in", { opacity: 0, y: 20, filter: "blur(10px)" });

    tl.to(".name-reveal", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 0.2,
    })
    .to(".blur-in", {
      opacity: 1,
      y: 0,
      duration: 1.0,
      stagger: 0.15,
      onStart: () => {
        gsap.to(".blur-in", {
          filter: "blur(0px)",
          duration: 1.0,
          stagger: 0.15,
        });
      }
    }, "-=0.8");
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-bg overflow-hidden select-none px-4"
    >
      {/* Background Cinematic Video */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="absolute left-1/2 top-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] z-10" />
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-bg to-transparent z-20" />
      </div>

      {/* Hero Content Panel */}
      <div className="relative z-30 text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow Label */}
        <span className="blur-in text-[10px] text-muted uppercase tracking-[0.4em] mb-6 block opacity-80">
          COLLECTION '26
        </span>

        {/* Name Reveal Display */}
        <h1 className="name-reveal text-8xl lg:text-[120px] font-display italic leading-[0.85] tracking-tighter text-white mb-6">
          {CREDENTIALS.name}
        </h1>

        {/* Dynamic Role Line */}
        <div className="blur-in flex items-center justify-center gap-2 text-xl md:text-2xl font-light text-muted">
          <span>A</span>
          <span
            key={roleIndex}
            className="text-white font-display italic px-2 animate-role-fade-in inline-block"
          >
            {roles[roleIndex]}
          </span>
          <span>lives in New Delhi.</span>
        </div>

        {/* Core Profile Description */}
        <p className="blur-in text-sm text-muted max-w-sm mx-auto mt-8 leading-relaxed">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        {/* Interactive CTA Controls */}
        <div className="blur-in flex items-center justify-center gap-4 mt-10">
          {/* Solid "See Works" Button wrapped in .accent-border */}
          <div className="accent-border hover:scale-105 transition-transform duration-300">
            <button
              onClick={onSeeWorksClick}
              className="bg-white text-black px-8 py-3.5 rounded-full text-[11px] font-bold tracking-widest uppercase cursor-pointer focus:outline-none"
            >
              See Works
            </button>
          </div>

          {/* Outlined "Reach out" Button */}
          <button
            onClick={onReachOutClick}
            className="border border-stroke bg-transparent text-white px-8 py-3.5 rounded-full text-[11px] font-bold tracking-widest uppercase hover:bg-white/5 hover:scale-105 transition-all duration-300 focus:outline-none cursor-pointer"
          >
            Reach Out
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none select-none">
        <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-sans font-semibold">
          SCROLL
        </span>
        <div className="w-[1px] h-10 bg-stroke relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-4 bg-text-primary/75 animate-scroll-down rounded-full" />
        </div>
      </div>
    </section>
  );
}
