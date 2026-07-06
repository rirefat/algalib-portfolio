import React from 'react';
import { Project } from '../types';
import { usePortfolioStore } from '../hooks/usePortfolioStore';
import { ArrowUpRight, Zap } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  isLast?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isLast = false }) => {
  const { setCursorMode, setCustomCursorText, setQuickViewProject } = usePortfolioStore();

  const handleMouseEnter = () => {
    setCursorMode('view');
    setCustomCursorText('EXPLORE');
  };

  const handleMouseLeave = () => {
    setCursorMode('default');
  };

  const handleCardClick = () => {
    setQuickViewProject(project);
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col md:flex-row items-stretch w-full relative pb-2 md:pb-3"
    >
      {/* Timeline Sidebar (Desktop) */}
      <div className="hidden md:flex w-24 lg:w-32 shrink-0 items-start gap-4 relative">
        <div className="relative flex flex-col items-center h-full w-4 pt-4 z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-white group-hover:text-black group-hover:scale-[1.8] transition-all duration-700 z-10 relative" />
          {!isLast && (
            <div className="absolute top-[24px] bottom-[-30px] w-[1px] bg-gradient-to-b from-neutral-800 via-neutral-900 to-transparent group-hover:from-[#7b2121]/50 transition-colors duration-700" />
          )}
        </div>
        <div className="font-mono text-[9px] text-neutral-500 group-hover:text-white transition-colors duration-500 pt-3 tracking-[0.2em] uppercase">
          {project.year}
        </div>
      </div>

      {/* Main Card Container */}
      <div className="flex-grow flex flex-col-reverse md:flex-row gap-0 relative group-hover:-translate-y-1 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
        
        {/* Left: Content Block */}
        <div className="flex-1 flex flex-col justify-between z-10 p-3 md:p-4 bg-[#050505] relative border border-white/5 border-t-0 md:border-t md:border-r-0 rounded-b-xl md:rounded-b-none md:rounded-l-xl overflow-hidden shadow-2xl">
          
          {/* Subtle Glow & Noise */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7b2121]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 text-[7px] font-mono font-semibold bg-white/5 text-white/90 rounded-sm border border-white/10 uppercase tracking-widest group-hover:bg-white/10 transition-colors duration-500">
                  {project.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                <span className="text-[7px] font-mono text-neutral-400 tracking-[0.2em] uppercase">
                  {project.client || "Self-Initiated"}
                </span>
              </div>
              <div className="hidden sm:flex text-[7px] font-mono text-neutral-700 tracking-widest uppercase items-center gap-1.5 group-hover:text-white transition-colors duration-500">
                <Zap className="w-2 h-2" />
                IDX.{project.id.substring(0, 4)}
              </div>
            </div>
            
            {/* Title & Subtitle */}
            <div className="mb-1">
              <h3 className="text-base md:text-lg lg:text-xl font-serif italic font-light text-neutral-300 mb-1 group-hover:text-white transition-colors duration-500 tracking-tight leading-tight truncate">
                {project.title}
              </h3>
              <p className="text-neutral-400 text-[9px] font-light font-sans max-w-xl leading-relaxed line-clamp-1">
                {project.subtitle}
              </p>
            </div>
          </div>
          
          {/* Action Footer */}
          <div className="mt-2 md:mt-2 pt-2 text-[7px] font-mono text-neutral-500 flex items-center justify-between group-hover:text-white transition-colors uppercase tracking-widest relative z-10 border-t border-white/5">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1 w-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7b2121] opacity-40 group-hover:opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1 w-1 bg-neutral-700 group-hover:bg-white group-hover:text-black transition-colors duration-500"></span>
              </span>
              VIEW
            </span>
            <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:scale-110">
               <ArrowUpRight className="w-2.5 h-2.5 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
        </div>
        
        {/* Right: Image Panel */}
        <div className="w-full md:w-[25%] lg:w-[25%] h-[60px] md:h-auto shrink-0 relative overflow-hidden bg-[#030303] border border-white/5 rounded-t-xl md:rounded-t-none md:rounded-r-xl">
          <div className="absolute inset-0 bg-neutral-950/40 z-10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050505] z-10 opacity-80 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none hidden md:block" />
          
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover filter grayscale-[0.8] contrast-125 opacity-70 group-hover:opacity-100 group-hover:grayscale-[0.1] group-hover:contrast-100 transform scale-100 group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]" 
          />
          
          {/* Overlay Grid lines (Creative touch) */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-100">
            <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white/5" />
            <div className="absolute top-3/4 left-0 w-full h-[1px] bg-white/5" />
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5" />
            <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/5" />
          </div>

          {/* Data overlay */}
          <div className="absolute top-2 right-2 z-20 pointer-events-none mix-blend-overlay">
            <div className="text-[30px] font-bold font-sans leading-none text-white opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 tracking-tighter">
              {project.year.slice(-2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
