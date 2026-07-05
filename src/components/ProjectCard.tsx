import React, { useRef, useState } from 'react';
import { Project } from '../types';
import { usePortfolioStore } from '../hooks/usePortfolioStore';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { setCursorMode, setCustomCursorText, setQuickViewProject } = usePortfolioStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside the card
    const y = e.clientY - rect.top;  // y position inside the card

    // Compute relative offsets between -0.5 and 0.5
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;

    // Apply tilt calculations (max 12 degrees tilt)
    const tiltX = -dy * 12;
    const tiltY = dx * 12;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });

    // Compute dynamic spotlight glow position
    setGlowStyle({
      background: `radial-gradient(circle 180px at ${x}px ${y}px, rgba(209, 43, 43, 0.15), transparent 80%)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
    });
    setGlowStyle({
      background: 'transparent',
      transition: 'background 0.5s ease-out',
    });
    setCursorMode('default');
  };

  const handleMouseEnter = () => {
    setCursorMode('view');
    setCustomCursorText('EXPLORE');
  };

  const handleCardClick = () => {
    setQuickViewProject(project);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleCardClick}
      style={tiltStyle}
      className="group relative h-[380px] md:h-[450px] w-full cursor-pointer rounded-sm overflow-hidden bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-md transition-all shadow-xl hover:shadow-2xl dark:shadow-none"
    >
      {/* Dynamic Cursor Glow Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={glowStyle}
      />

      {/* Elegant Gradient Border Highlights */}
      <div className="absolute inset-[1px] rounded-sm bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 dark:to-transparent z-[2] pointer-events-none" />

      {/* Project Image Panel */}
      <div className="absolute inset-0 overflow-hidden w-full h-full">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25, 1, 0.5, 1)] filter brightness-[0.85] dark:brightness-[0.75] group-hover:brightness-[0.95]"
        />
        {/* Transparent glass shader tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-500" />
      </div>

      {/* Project Specs Tags */}
      <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
        <span className="px-3.5 py-1 text-[10px] font-mono font-medium uppercase tracking-wider rounded-full bg-[#0A0A0A]/80 text-[#F5F5F4] backdrop-blur-sm border border-white/5">
          {project.category}
        </span>
        <span className="px-3.5 py-1 text-[10px] font-mono font-medium uppercase tracking-wider rounded-full bg-[#0A0A0A]/80 text-[#F5F5F4] backdrop-blur-sm border border-white/5">
          {project.year}
        </span>
      </div>

      {/* Title & Reveal Information bottom block */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 text-[#F5F5F4]">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] tracking-[0.2em] font-mono uppercase text-zinc-400">
              CASE STUDY
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-serif italic group-hover:text-[#D12B2B] transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-xs text-zinc-300 max-w-sm line-clamp-2 font-sans opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              {project.subtitle}
            </p>
          </div>

          {/* Luxury Arrow Icon wrapper */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-zinc-900 group-hover:bg-[#D12B2B] group-hover:text-black group-hover:border-transparent group-hover:scale-110 transition-all duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
