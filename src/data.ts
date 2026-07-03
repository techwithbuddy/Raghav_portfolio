export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  colSpanClass: string; // Alternate column spans: 7/5/5/7 pattern
  aspectRatioClass: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  imageUrl: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  category: string;
  rotation: string; // CSS rotation class for visual playground effect
  parallaxSpeed: number; // Speed factor for parallax effect
}

export const PROJECTS: Project[] = [
  {
    id: "automotive-motion",
    title: "Automotive Motion",
    category: "CGI & Interaction",
    description: "Designing real-time dashboards and interactive configurators for electric hypercars.",
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop",
    colSpanClass: "md:col-span-7",
    aspectRatioClass: "aspect-[4/3] md:aspect-[16/10]",
  },
  {
    id: "urban-architecture",
    title: "Urban Architecture",
    category: "Visual Narrative",
    description: "Capturing the stark contrast between concrete monoliths and organic street movement.",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    colSpanClass: "md:col-span-5",
    aspectRatioClass: "aspect-[4/3] md:aspect-square",
  },
  {
    id: "human-perspective",
    title: "Human Perspective",
    category: "Editorial Portraiture",
    description: "A deep studio dive into micro-expressions, harsh key lighting, and cinematic shadows.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    colSpanClass: "md:col-span-5",
    aspectRatioClass: "aspect-[4/3] md:aspect-square",
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    category: "Art Direction",
    description: "Establishing visual guidelines and liquid motion graphics for emerging spatial computing products.",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
    colSpanClass: "md:col-span-7",
    aspectRatioClass: "aspect-[4/3] md:aspect-[16/10]",
  },
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "slow-design",
    title: "The Art of Slow Design",
    category: "Philosophy",
    readTime: "4 min read",
    date: "June 24, 2026",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "cinematic-spaces",
    title: "Crafting Cinematic Virtual Spaces",
    category: "Interactive",
    readTime: "6 min read",
    date: "May 12, 2026",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "spatial-computing",
    title: "Designing for Spatial Interface Paradigms",
    category: "Tech",
    readTime: "8 min read",
    date: "April 05, 2026",
    imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "typography-emotion",
    title: "The Subtle Relationship of Typography & Emotion",
    category: "Design",
    readTime: "5 min read",
    date: "March 18, 2026",
    imageUrl: "https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=600&auto=format&fit=crop",
  },
];

export const EXPLORATIONS: ExplorationItem[] = [
  {
    id: "exp-1",
    title: "Synthesizer Dial",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    description: "Tactile response layout for an analogue dual-oscillator synthesizer model.",
    category: "Hardware UI",
    rotation: "rotate-[-3deg]",
    parallaxSpeed: -15,
  },
  {
    id: "exp-2",
    title: "Liquid Refraction",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    description: "Interactive shader modeling light bending through high-viscosity fluid spheres.",
    category: "Creative Coding",
    rotation: "rotate-[4deg]",
    parallaxSpeed: 20,
  },
  {
    id: "exp-3",
    title: "Neo-Classical",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
    description: "Reinterpreting fine art proportions with high-contrast structural typography grids.",
    category: "Art Direction",
    rotation: "rotate-[-2deg]",
    parallaxSpeed: -25,
  },
  {
    id: "exp-4",
    title: "Chrome Topologies",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    description: "Dynamic silver liquid topology rendered at 60fps using three.js.",
    category: "3D Motion",
    rotation: "rotate-[3deg]",
    parallaxSpeed: 15,
  },
  {
    id: "exp-5",
    title: "High-Key Contrast",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    description: "Experimental photography exploring maximum contrast on facial structures.",
    category: "Editorial",
    rotation: "rotate-[-4deg]",
    parallaxSpeed: -10,
  },
  {
    id: "exp-6",
    title: "Concrete Facade",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    description: "Brutalist architectural patterns under the golden light of sunset.",
    category: "Architecture",
    rotation: "rotate-[2deg]",
    parallaxSpeed: 25,
  },
];

export const CREDENTIALS = {
  name: "Raghav Sharma",
  location: "New Delhi, India",
  instagram: "https://www.instagram.com/raghavsharma1504/",
  youtube: "https://www.youtube.com/@RaghavSharma-r2r",
  linkedin: "https://www.linkedin.com/in/raghavsharma1402/",
  github: "https://github.com/techwithbuddy",
  email: "raghavsharmahhps07@gmail.com"
};
