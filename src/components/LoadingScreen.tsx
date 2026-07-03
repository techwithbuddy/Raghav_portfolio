import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Design", "Create", "Inspire"];

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2700; // Total loading time: 2700ms

    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percentage = Math.min((progress / duration) * 100, 100);
      setCount(Math.floor(percentage));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  // Word cycles every 900ms (matching the 2700ms duration perfectly across 3 words)
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Top-Left: Portfolio Label */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-8 left-8 text-xs text-muted uppercase tracking-[0.3em] font-sans font-medium"
      >
        Portfolio
      </motion.div>

      {/* Center: Rotating Words */}
      <div className="h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={words[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/90"
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom-Right: Counter Display */}
      <div className="absolute bottom-8 right-8 text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tighter opacity-90 select-none">
        {String(count).padStart(3, "0")}
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-stroke/50 overflow-hidden">
        <div
          className="accent-gradient h-full origin-left transition-transform duration-75 ease-out"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: "0 0 12px rgba(137, 170, 204, 0.45)",
          }}
        />
      </div>
    </div>
  );
}
