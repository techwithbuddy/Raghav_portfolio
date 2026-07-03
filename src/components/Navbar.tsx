import { useState, useEffect } from "react";
import { CREDENTIALS } from "../data";

interface NavbarProps {
  activeSection: string;
  onLinkClick: (sectionId: string) => void;
  onSayHiClick: () => void;
}

export default function Navbar({ activeSection, onLinkClick, onSayHiClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Work", id: "work" },
    { label: "Resume", id: "resume" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-8 px-4 pointer-events-none select-none">
      <div
        className={`inline-flex items-center rounded-full glass px-3 py-2 gap-2 transition-all duration-300 pointer-events-auto ${
          isScrolled ? "shadow-lg shadow-black/20 scale-95 md:scale-100" : ""
        }`}
      >
        {/* 1. Logo wrapped in .accent-border wrapper */}
        <button
          onClick={() => onLinkClick("home")}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="accent-border w-9 h-9 flex items-center justify-center overflow-hidden hover:scale-110 transition-transform duration-300 focus:outline-none cursor-pointer"
        >
          <div className="w-full h-full rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary tracking-tight">
              RS
            </span>
          </div>
        </button>

        {/* 2. Divider */}
        <div className="w-px h-5 bg-stroke mx-1" />

        {/* 3. Nav links with premium text styling */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onLinkClick(link.id)}
                className={`text-[11px] font-medium tracking-widest uppercase rounded-full px-4 py-2 transition-all duration-300 focus:outline-none cursor-pointer ${
                  isActive
                    ? "text-white bg-stroke"
                    : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1" />

        {/* 5. "Say hi" button with hover gradient border using accent-border */}
        <div className="accent-border">
          <button
            onClick={onSayHiClick}
            className="rounded-full bg-surface px-4 py-2 text-[11px] font-medium tracking-widest uppercase flex items-center gap-2 text-text-primary hover:bg-bg transition-all duration-300 focus:outline-none cursor-pointer"
          >
            Say Hi <span className="opacity-60">↗</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
