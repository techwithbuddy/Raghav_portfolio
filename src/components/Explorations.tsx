import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CREDENTIALS, PROJECTS } from "../data";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

interface ShowcaseProject {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  repoUrl: string;
  liveUrl?: string;
  language: string;
  stars: number;
  updatedAt: string;
  source: "GitHub" | "Fallback";
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}

const GITHUB_REPOS_URL = "https://api.github.com/users/techwithbuddy/repos?per_page=100&sort=updated";
const EXCLUDED_REPO_NAMES = new Set([
  "h-practice",
  "hackathon-practice",
]);

function formatRepoTitle(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
}

function mapFallbackProject(project: (typeof PROJECTS)[number], index: number): ShowcaseProject {
  return {
    id: project.id,
    title: project.title,
    category: project.category,
    description: project.description,
    imageUrl: project.imageUrl,
    repoUrl: CREDENTIALS.github,
    liveUrl: undefined,
    language: "Portfolio",
    stars: 0,
    updatedAt: new Date().toISOString(),
    source: "Fallback",
  };
}

function mapRepoToProject(repo: GitHubRepo): ShowcaseProject {
  return {
    id: repo.name,
    title: formatRepoTitle(repo.name),
    category: repo.language ?? "GitHub Project",
    description:
      repo.description?.trim() ||
      "A live repository pulled directly from your GitHub profile and shown in the visual playground.",
    imageUrl: `https://opengraph.githubassets.com/1/techwithbuddy/${repo.name}`,
    repoUrl: repo.html_url,
    liveUrl: repo.homepage?.trim() || undefined,
    language: repo.language ?? "Unknown",
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
    source: "GitHub",
  };
}

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<ShowcaseProject[]>(PROJECTS.map(mapFallbackProject));
  const [activeLightboxItem, setActiveLightboxItem] = useState<ShowcaseProject | null>(null);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectLoadError, setProjectLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadProjects = async () => {
      try {
        setIsLoadingProjects(true);
        setProjectLoadError(null);

        const response = await fetch(GITHUB_REPOS_URL);
        if (!response.ok) {
          throw new Error(`GitHub request failed with status ${response.status}`);
        }

        const repos = (await response.json()) as GitHubRepo[];
        const liveProjects = repos
          .filter((repo) => !repo.fork)
          .filter((repo) => !EXCLUDED_REPO_NAMES.has(repo.name.toLowerCase()))
          .sort((left, right) => right.stargazers_count - left.stargazers_count || new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime())
          .map(mapRepoToProject)
          .slice(0, 8);

        if (isActive && liveProjects.length > 0) {
          setProjects(liveProjects);
        } else if (isActive) {
          setProjectLoadError("No public GitHub projects were found, so the local portfolio fallback is being shown.");
        }
      } catch (error) {
        if (isActive) {
          setProjectLoadError("GitHub could not be reached, so the local portfolio fallback is being shown.");
        }
      } finally {
        if (isActive) {
          setIsLoadingProjects(false);
        }
      }
    };

    void loadProjects();

    return () => {
      isActive = false;
    };
  }, []);

  // Split calculations (odds in col1, evens in col2)
  const col1Items = projects.filter((_, idx) => idx % 2 === 0);
  const col2Items = projects.filter((_, idx) => idx % 2 !== 0);
  const cardRotations = ["rotate-[-3deg]", "rotate-[4deg]", "rotate-[-2deg]", "rotate-[3deg]"];

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

  const handleOpenLightbox = (item: ShowcaseProject) => {
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
            LIVE GITHUB PLAYGROUND
          </span>
          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-sans tracking-tight text-text-primary mb-4 font-bold">
            Visual <span className="font-display italic font-normal text-white">projects</span>
          </h2>
          {/* Subtext */}
          <p className="text-sm text-muted leading-relaxed mb-6 max-w-sm mx-auto font-sans">
            A tactile remix of your GitHub repositories, arranged as an interactive gallery that updates from the live profile feed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
            <a
              href={CREDENTIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-widest text-text-primary hover:text-muted transition-colors duration-200"
            >
              Open GitHub <span>↗</span>
            </a>
            <span className="hidden sm:inline-flex h-4 w-px bg-stroke" />
            <span className="text-[10px] text-muted uppercase tracking-[0.3em] font-sans">
              {isLoadingProjects ? "syncing projects" : `${projects.length} projects synced`}
            </span>
          </div>
          {projectLoadError && (
            <p className="mt-4 text-[11px] text-muted/70 tracking-[0.2em] uppercase">
              {projectLoadError}
            </p>
          )}
        </div>
      </div>

      {/* Layer 2: Parallax Columns (z-20) */}
      <div className="absolute inset-x-0 top-0 bottom-0 max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 gap-12 md:gap-48 pointer-events-none z-20">
        
        {/* Column 1: Left */}
        <div
          ref={col1Ref}
          className="flex flex-col gap-24 md:gap-44 pt-36 pointer-events-auto"
        >
          {col1Items.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item)}
              className={`aspect-square w-full max-w-[320px] self-start md:self-end glass p-3 rounded-3xl shadow-2xl cursor-pointer group hover:scale-105 hover:border-white/15 transition-all duration-500 hover:shadow-black/60 relative ${cardRotations[idx % cardRotations.length]}`}
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
                  <p className="mt-1 text-xs text-muted/80 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-[10px] text-muted/75 uppercase tracking-[0.2em]">
                    <span>{item.language}</span>
                    <span>•</span>
                    <span>{item.stars} stars</span>
                  </div>
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
          {col2Items.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item)}
              className={`aspect-square w-full max-w-[320px] self-start glass p-3 rounded-3xl shadow-2xl cursor-pointer group hover:scale-105 hover:border-white/15 transition-all duration-500 hover:shadow-black/60 relative ${cardRotations[idx % cardRotations.length]}`}
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
                  <p className="mt-1 text-xs text-muted/80 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-[10px] text-muted/75 uppercase tracking-[0.2em]">
                    <span>{item.language}</span>
                    <span>•</span>
                    <span>{item.stars} stars</span>
                  </div>
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
              <div className="mt-4 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.22em] text-muted/70 font-sans">
                <span>{activeLightboxItem.language}</span>
                <span>•</span>
                <span>{activeLightboxItem.stars} stars</span>
                <span>•</span>
                <span>Updated {formatDate(activeLightboxItem.updatedAt)}</span>
                <span>•</span>
                <span>{activeLightboxItem.source}</span>
              </div>
            </div>
            <div className="border-t border-stroke/50 pt-5 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-muted">Project spotlight</span>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={activeLightboxItem.liveUrl ?? activeLightboxItem.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-sans font-semibold uppercase tracking-wider text-text-primary border-b border-white/20 pb-0.5 hover:text-muted"
                >
                  Open live project ↗
                </a>
                <a
                  href={activeLightboxItem.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-sans font-semibold uppercase tracking-wider text-text-primary border-b border-white/20 pb-0.5 hover:text-muted"
                >
                  View repo ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
