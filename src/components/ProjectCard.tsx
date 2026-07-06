import React, { useRef, useState } from 'react';
import { Project } from '../types';
import { usePortfolioStore } from '../hooks/usePortfolioStore';
import { ArrowUpRight, Zap, Scan } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  isLast?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isLast = false }) => {
  const { setCursorMode, setCustomCursorText, setQuickViewProject } = usePortfolioStore();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const imagePanelRef = useRef<HTMLDivElement>(null);

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

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imagePanelRef.current) return;
    const rect = imagePanelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleImageMouseEnter = () => setIsHoveringImage(true);
  const handleImageMouseLeave = () => setIsHoveringImage(false);

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
        <div className="font-mono text-[10px] lg:text-xs text-neutral-500 group-hover:text-white transition-colors duration-500 pt-3 tracking-[0.2em] uppercase">
          {project.year}
        </div>
      </div>

      {/* Main Card Container */}
      <div className="flex-grow flex flex-col-reverse md:flex-row gap-0 relative group-hover:-translate-y-1 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
        
        {/* Left: Content Block */}
        <div className="flex-1 flex flex-col justify-between z-10 p-5 md:p-6 lg:p-8 bg-[#050505] relative border border-white/5 border-t-0 md:border-t md:border-r-0 rounded-b-xl md:rounded-b-none md:rounded-l-xl overflow-hidden shadow-2xl">
          
          {/* Subtle Glow & Noise */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7b2121]/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-[10px] md:text-xs font-mono font-medium bg-neutral-900 text-neutral-300 rounded-full border border-neutral-800 uppercase tracking-widest group-hover:bg-[#7b2121]/10 group-hover:text-[#7b2121] group-hover:border-[#7b2121]/30 transition-colors duration-500">
                  {project.category}
                </span>
                {project.client && (
                  <span className="px-3 py-1 text-[10px] md:text-xs font-mono font-medium bg-neutral-900 text-neutral-400 rounded-full border border-neutral-800 uppercase tracking-widest group-hover:bg-white/5 group-hover:text-white transition-colors duration-500">
                    {project.client}
                  </span>
                )}
                {project.role && (
                  <span className="hidden sm:inline-block px-3 py-1 text-[10px] md:text-xs font-mono font-medium bg-transparent text-neutral-500 rounded-full border border-neutral-800 uppercase tracking-widest group-hover:border-white/10 group-hover:text-neutral-400 transition-colors duration-500">
                    {project.role}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex text-[10px] md:text-xs font-mono text-neutral-600 tracking-widest uppercase items-center gap-1.5 group-hover:text-white/60 transition-colors duration-500">
                <Zap className="w-3 h-3" />
                IDX.{project.id.substring(0, 4)}
              </div>
            </div>
            
            {/* Title & Subtitle */}
            <div className="mb-2">
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-serif italic font-light text-neutral-300 mb-2 lg:mb-4 group-hover:text-white transition-colors duration-500 tracking-tight leading-tight">
                {project.title}
              </h3>
              <p className="text-neutral-400 text-xs md:text-sm lg:text-base font-light font-sans max-w-2xl leading-relaxed line-clamp-2 md:line-clamp-3">
                {project.subtitle}
              </p>
            </div>
          </div>
          
          {/* Action Footer */}
          <div className="mt-6 md:mt-8 pt-4 text-[10px] font-mono text-neutral-500 flex items-center justify-between group-hover:text-white transition-colors uppercase tracking-widest relative z-10 border-t border-white/10 group-hover:border-white/20">
            <span className="flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7b2121] opacity-60 group-hover:opacity-100"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neutral-600 group-hover:bg-white group-hover:text-black transition-colors duration-500"></span>
              </span>
              EXPLORE PROJECT
            </span>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:scale-110"> 
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
        </div>
        
        {/* Right: Image Panel */}
        <div 
          ref={imagePanelRef}
          onMouseMove={handleImageMouseMove}
          onMouseEnter={handleImageMouseEnter}
          onMouseLeave={handleImageMouseLeave}
          className="w-full md:w-[35%] lg:w-[40%] h-[120px] md:h-auto shrink-0 relative overflow-hidden bg-[#030303] border border-white/5 rounded-t-xl md:rounded-t-none md:rounded-r-xl group/image"
        >
          <div className="absolute inset-0 bg-neutral-950/40 z-10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050505] z-10 opacity-80 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none hidden md:block" />
          
          {/* Base Image */}
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover filter grayscale-[0.8] contrast-125 opacity-70 group-hover:opacity-100 group-hover:grayscale-[0.1] group-hover:contrast-100 transform scale-100 group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          />

          {/* X-Ray Process Reveal Layer */}
          <div 
            className="absolute inset-0 z-15 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: isHoveringImage ? 1 : 0,
              clipPath: `circle(80px at ${mousePos.x}px ${mousePos.y}px)`
            }}
          >
            {/* We use the beforeImage as the "process/wireframe" image. If not available, we apply a heavy blueprint filter to the original image */}
            <img 
              src={project.beforeImage || project.image} 
              alt={`${project.title} Process`} 
              className={`w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${!project.beforeImage ? 'filter invert sepia-[1] saturate-[5] hue-rotate-[180deg] opacity-80' : ''}`}
            />
            {/* X-Ray Ring Ring */}
            <div 
              className="absolute pointer-events-none border-[1.5px] border-white/50 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)_inset,0_0_15px_rgba(255,255,255,0.3)] transition-transform duration-75"
              style={{
                left: mousePos.x - 80,
                top: mousePos.y - 80,
                width: 160,
                height: 160,
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center opacity-30">
                <Scan className="w-6 h-6 text-white" />
                <span className="text-[6px] font-mono tracking-widest text-white mt-1 uppercase">X-RAY</span>
              </div>
            </div>
          </div>
          
          {/* Overlay Grid lines (Creative touch) */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-100">
            <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white/5" />
            <div className="absolute top-3/4 left-0 w-full h-[1px] bg-white/5" />
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5" />
            <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/5" />
          </div>

          {/* Status Badge */}
          {project.status && (
            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-30 pointer-events-none drop-shadow-lg">
              <span className="flex items-center gap-2 px-3 py-1.5 text-[9px] md:text-[10px] font-mono font-medium uppercase tracking-widest rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/10 text-neutral-200">
                {project.status === 'Live' && <span className="relative flex w-1.5 h-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500"></span></span>}
                {project.status === 'Concept' && <span className="w-1.5 h-1.5 rounded-full bg-[#7b2121]" />}
                {project.status === 'Case Study' && <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />}
                {project.status}
              </span>
            </div>
          )}

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
