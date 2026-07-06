import React from 'react';
import { EXPERIENCES, AWARDS } from '../../data/portfolioData';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { Calendar, Briefcase, Award, ArrowUpRight } from 'lucide-react';

export const ExperienceView: React.FC = () => {
  const { setCursorMode } = usePortfolioStore();

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Thank you for requesting Abdullah Al Galib\'s CV. The print-ready portfolio resume file generation pipeline is connected!');
  };

  return (
    <div className="space-y-24 pb-24 px-6 max-w-7xl mx-auto pt-32 md:pt-40 lg:pt-44 select-none">
      
      {/* 1. Header and Quick Resume Link */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/40 dark:border-white/5 pb-8">
        <div className="space-y-4 max-w-2xl">
          
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block">
            CAREER TRAJECTORY
          </span>
          <h1 className="text-fluid-h1 font-light font-serif italic text-white leading-[1.05]">
            Professional Milestones.
          </h1>
          <p className="text-sm md:text-base text-neutral-400 dark:text-zinc-400 font-sans leading-relaxed font-light">
            Review my corporate tenure, creative leadership, design consulting engagements, and elite visual awards.
          </p>
        </div>

        <div>
          <a
            href="https://drive.google.com/file/d/15y7NWa7Rf2t0ntyevZ-eIlYHxc6YoSv6/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorMode('hover')}
            onMouseLeave={() => setCursorMode('default')}
            className="inline-flex items-center gap-2 px-6 py-3.5 border border-white text-white hover:bg-white hover:text-black hover:border-white transition-all font-mono text-xs uppercase tracking-[0.2em] rounded-sm shadow-sm"
          >
            <span>DOWNLOAD PORTFOLIO RESUME</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 2. Interactive timeline cards */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left side: design values summary */}
        <div className="lg:col-span-4">
          <div className="space-y-10 lg:sticky lg:top-32 bg-[#030303]/40 backdrop-blur-md border border-white/5 p-8 md:p-10 relative overflow-hidden group">
            {/* Subtle glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#7b2121]/10 rounded-full blur-[60px] pointer-events-none transition-transform duration-1000 group-hover:translate-x-5 group-hover:translate-y-5" />
            
            <div className="space-y-2 relative z-10 border-b border-white/5 pb-6">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 group-hover:text-white transition-colors duration-500">
                Principles
              </span>
              <h3 className="text-2xl font-light font-serif italic text-white tracking-tight">
                The Foundation
              </h3>
            </div>

            <div className="space-y-8 relative z-10">
              <div className="group/item">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[10px] font-mono text-neutral-500 group-hover/item:text-[#7b2121] transition-colors duration-300">01.</span>
                  <h4 className="text-sm font-medium text-neutral-200 tracking-wide">Visual Architecture</h4>
                </div>
                <p className="text-xs text-zinc-500 font-sans font-light leading-relaxed pl-7 border-l border-white/5 group-hover/item:border-[#7b2121]/30 transition-colors duration-500 ml-1.5">
                  Precision-crafted layouts anchored by mathematical ratios, kinetic typography, and uncompromising spatial awareness.
                </p>
              </div>

              <div className="group/item">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[10px] font-mono text-neutral-500 group-hover/item:text-[#7b2121] transition-colors duration-300">02.</span>
                  <h4 className="text-sm font-medium text-neutral-200 tracking-wide">Frictionless Translation</h4>
                </div>
                <p className="text-xs text-zinc-500 font-sans font-light leading-relaxed pl-7 border-l border-white/5 group-hover/item:border-[#7b2121]/30 transition-colors duration-500 ml-1.5">
                  Bridging the gap between conceptual design and robust engineering through modular tokens, motion choreography, and crystalline spec sheets.
                </p>
              </div>

              <div className="group/item">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[10px] font-mono text-neutral-500 group-hover/item:text-[#7b2121] transition-colors duration-300">03.</span>
                  <h4 className="text-sm font-medium text-neutral-200 tracking-wide">Sovereign Execution</h4>
                </div>
                <p className="text-xs text-zinc-500 font-sans font-light leading-relaxed pl-7 border-l border-white/5 group-hover/item:border-[#7b2121]/30 transition-colors duration-500 ml-1.5">
                  Directing the creative trajectory from initial spark to final deployment, eliminating friction, and commanding the narrative with absolute authority.
                </p>
              </div>
            </div>
            
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20 transition-all duration-500 group-hover:border-white" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20 transition-all duration-500 group-hover:border-white" />
          </div>
        </div>

        {/* Right side: Core interactive list timeline */}
        <div className="lg:col-span-8 space-y-10">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="p-8 rounded-sm bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 space-y-6 hover:border-white/40 transition-all relative group shadow-md"
            >
              {/* Timeline dot highlighter */}
              <div className="absolute top-8 -left-3 w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200/40 dark:border-white/5 flex items-center justify-center hidden lg:flex group-hover:border-white transition-all">
                <div className="w-2.5 h-2.5 rounded-full bg-[#7b2121]" />
              </div>

              {/* Company role header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200/40 dark:border-white/5 pb-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-serif italic text-white tracking-tight group-hover:text-white transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="uppercase">{exp.company}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3.5 py-1 text-[10px] font-mono font-bold text-white rounded-sm bg-[#7b2121]/10 self-start sm:self-center border border-[#7b2121]/20">
                  <Calendar className="w-3 h-3" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Job narrative */}
              <p className="text-sm text-neutral-400 dark:text-zinc-300 font-sans font-light leading-relaxed">
                {exp.description}
              </p>

              {/* Target tags */}
              <div className="space-y-2.5">
                <span className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-400 uppercase block">EXPERTISE APPLIED</span>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-[11px] font-mono text-neutral-400 dark:text-neutral-400 rounded-sm bg-neutral-100 dark:bg-neutral-950 border border-neutral-200/40 dark:border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Global Awards Board Recap */}
      <section className="space-y-12">
        <div className="border-b border-neutral-200/40 dark:border-white/5 pb-6">
          
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block">
            TROPHY CABINET
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-serif italic text-white">
            Honors & Global Awards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AWARDS.map((aw, i) => (
            <div
              key={i}
              className="p-6 rounded-sm bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-sm flex gap-4 shadow-md"
            >
              <div className="w-12 h-12 rounded-sm bg-[#7b2121]/10 text-white flex items-center justify-center flex-shrink-0 border border-[#7b2121]/20 animate-pulse">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-white">
                    {aw.year}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-neutral-400 dark:text-neutral-400">
                    {aw.category}
                  </span>
                </div>
                <h4 className="font-serif italic font-bold text-base text-white tracking-tight">
                  {aw.title}
                </h4>
                <p className="text-xs text-neutral-400 dark:text-zinc-400 font-sans font-light">
                  Target: {aw.project}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
