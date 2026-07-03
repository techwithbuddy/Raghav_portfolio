import { useEffect, useRef } from "react";
import gsap from "gsap";
import Hls from "hls.js";
import { CREDENTIALS } from "../data";

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Setup vertical-flipped HLS video
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

  // GSAP Marquee setup (loops -50% translation infinitely)
  useEffect(() => {
    const element = marqueeRef.current;
    if (!element) return;

    const tween = gsap.to(element, {
      xPercent: -50,
      ease: "none",
      duration: 25,
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const socials = [
    { label: "LinkedIn", url: CREDENTIALS.linkedin },
    { label: "GitHub", url: CREDENTIALS.github },
    { label: "YouTube", url: CREDENTIALS.youtube },
    { label: "Instagram", url: CREDENTIALS.instagram },
  ];

  return (
    <footer className="relative w-full pt-20 pb-10 overflow-hidden bg-bg select-none border-t border-stroke">
      {/* Background flipped video */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="absolute left-1/2 top-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] pointer-events-none"
        />
        {/* Heavier overlay for extreme high contrast */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] z-10" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg to-transparent z-20" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-30 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center">
        
        {/* Contact CTA Title */}
        <span className="text-[10px] text-muted uppercase tracking-[0.4em] mb-4 block opacity-80">
          GET IN TOUCH
        </span>
        <h2 className="text-4xl md:text-6xl font-sans tracking-tighter font-bold text-text-primary mb-10 max-w-2xl leading-[1.1]">
          Let’s build something <span className="font-display italic font-normal text-white">extraordinary</span> together.
        </h2>

        {/* Dynamic Glowing Mail Button wrapped in accent-border */}
        <div className="accent-border hover:scale-105 transition-transform duration-300">
          <a
            href={`mailto:${CREDENTIALS.email}`}
            className="bg-white text-black px-8 py-3.5 rounded-full text-[11px] font-bold tracking-widest uppercase inline-block cursor-pointer focus:outline-none"
          >
            {CREDENTIALS.email}
          </a>
        </div>

        {/* GSAP Marquee Banner */}
        <div className="w-screen overflow-hidden border-y border-stroke/50 py-6 md:py-8 my-16 relative">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap text-5xl md:text-7xl lg:text-8xl font-display italic tracking-wider font-bold select-none uppercase"
          >
            {/* Doubled sequence to support seamless loop alignment */}
            <div className="flex gap-4 shrink-0">
              {Array.from({ length: 15 }).map((_, i) => (
                <span
                  key={i}
                  className="text-transparent transition-colors duration-500 hover:text-text-primary/10 cursor-default"
                  style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.12)" }}
                >
                  BUILDING THE FUTURE •&nbsp;
                </span>
              ))}
              {Array.from({ length: 15 }).map((_, i) => (
                <span
                  key={`dup-${i}`}
                  className="text-transparent transition-colors duration-500 hover:text-text-primary/10 cursor-default"
                  style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.12)" }}
                >
                  BUILDING THE FUTURE •&nbsp;
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation & Credentials Bar */}
        <div className="w-full border-t border-stroke/50 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Pulse Status indicator */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-muted font-sans font-bold tracking-widest uppercase">
              Available for projects
            </span>
          </div>

          {/* Copyright credit lines */}
          <p className="text-[10px] text-muted/60 font-sans tracking-widest uppercase order-last md:order-none">
            © {new Date().getFullYear()} Raghav Sharma. Built with precision.
          </p>

          {/* Social connections links */}
          <div className="flex items-center gap-5 sm:gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-muted hover:text-white transition-colors duration-200 font-sans font-bold tracking-widest uppercase"
              >
                {social.label}
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}
