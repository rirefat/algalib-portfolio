import React from 'react';
import { SERVICES } from '../../data/portfolioData';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { Layers, Compass, Feather, Package, CheckCircle, ArrowRight, ArrowUpRight, Palette } from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { setCurrentView, setCursorMode } = usePortfolioStore();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'Feather': return <Feather className="w-6 h-6" />;
      case 'Package': return <Package className="w-6 h-6" />;
      case 'Palette': return <Palette className="w-6 h-6" />;
      default: return <Layers className="w-6 h-6" />;
    }
  };

  const processSteps = [
    {
      step: '01',
      title: 'Inquiry & Extraction',
      desc: 'We extract the core values and mechanical advantages of your brand or system through research.'
    },
    {
      step: '02',
      title: 'Structural Reduction',
      desc: 'We prototype layouts and structures, stripping any noise until only the irreducible blueprint remains.'
    },
    {
      step: '03',
      title: 'Tactile High-End Polish',
      desc: 'We sculpt custom shaders, layouts, visual typography curves, and micro-interactions.'
    },
    {
      step: '04',
      title: 'Orchestration & Scale',
      desc: 'We launch systems globally with flawless rendering speeds, solid layouts, and brand dominance.'
    }
  ];

  return (
    <div className="space-y-24 pb-24 px-6 max-w-7xl mx-auto pt-32 md:pt-40 lg:pt-44 select-none">
      
      {/* 1. Header block */}
      <section className="space-y-4 max-w-3xl">
        
        <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block">
          CAPABILITIES & SCOPE
        </span>
        <h1 className="text-fluid-h1 font-light font-serif italic text-white leading-[1.05]">
          Aesthetic Strategy, Seamless Execution.
        </h1>
        <p className="text-sm md:text-base text-neutral-400 dark:text-zinc-400 font-sans leading-relaxed font-light max-w-xl">
          I shape premium visual assets that communicate authority, excellence, and meticulous structural attention. Read my capability sheets below.
        </p>
      </section>

      {/* 2. Services details grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        {SERVICES.map((s) => (
          <div
            key={s.id}
            className="flex flex-col md:flex-row items-stretch rounded-sm bg-gradient-to-br from-[#080808] via-[#050505] to-[#140204]/40 border border-white/5 backdrop-blur-md overflow-hidden group hover:border-white/30 hover:from-[#0d0d0d] hover:to-[#220408]/60 transition-all duration-700 shadow-2xl relative"
          >
            {/* Top glowing crimson border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#7b2121]/30 via-transparent to-transparent group-hover:from-[#7b2121]/70 transition-all duration-1000" />

            {/* Left Content Column */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-6 relative z-10">
              <div className="space-y-6">
                {/* Icon & Category tag */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-sm bg-[#7b2121]/10 text-white flex items-center justify-center border border-[#7b2121]/20 animate-pulse">
                    {getIcon(s.icon)}
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                    {s.subtitle}
                  </span>
                </div>

                {/* Title and description */}
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold font-serif italic text-white tracking-tight">
                    {s.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-400 dark:text-zinc-400 font-sans font-light leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>

              {/* Sub skill list tags */}
              <div className="space-y-3 pt-4 border-t border-neutral-200/40 dark:border-white/5">
                <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 block">
                  DELIVERABLE HIGHLIGHTS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {s.skills.map((sk, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-0.5 text-[10px] font-mono text-neutral-400 dark:text-zinc-400 rounded-sm bg-white/5 dark:bg-neutral-950 border border-neutral-200/40 dark:border-white/5"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image Placeholder Panel with premium dark red & black gradient overlay */}
            <div className="w-full md:w-[30%] lg:w-[35%] h-[150px] md:h-auto shrink-0 relative overflow-hidden bg-[#030303] border-t md:border-t-0 md:border-l border-white/5">
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#0c0203]/85 to-[#4c0d15]/40 z-10 group-hover:from-[#030303]/30 group-hover:via-[#1c0406]/60 group-hover:to-[#7b2121]/40 transition-all duration-700 pointer-events-none" />
              <img
                src={s.image}
                alt={`${s.title} abstract 3D visual`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale contrast-125 opacity-30 group-hover:opacity-80 group-hover:grayscale-0 group-hover:contrast-110 transform scale-100 group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              {/* Overlay Grid lines */}
              <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-100">
                <div className="absolute top-1/3 left-0 w-full h-[1px] bg-white/5" />
                <div className="absolute top-2/3 left-0 w-full h-[1px] bg-white/5" />
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Design Process Blueprint */}
      <section className="space-y-12">
        <div className="border-b border-neutral-200/40 dark:border-white/5 pb-6 text-center md:text-left">
          
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block">
            PROCESS
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-serif italic text-white">
            The Architectural Workflow
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="space-y-4 relative group">
              {/* Step indicator */}
              <div className="text-4xl font-black font-mono text-neutral-200 dark:text-neutral-200/60 transition-colors duration-300 group-hover:text-white/20">
                {step.step}
              </div>
              <h4 className="text-lg font-bold font-serif italic text-white tracking-tight">
                {step.title}
              </h4>
              <p className="text-xs text-neutral-400 dark:text-zinc-400 font-sans font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Contact redirection block */}
      <section className="px-4 md:px-6 max-w-5xl mx-auto z-10 relative mb-12 lg:mb-16">
        <div className="relative w-full border border-white/10 bg-[#030303]/60 backdrop-blur-2xl p-8 md:p-14 lg:p-20 overflow-hidden group">
          
          {/* Viewfinder Corner Accents */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/30 transition-all duration-700 group-hover:scale-110 group-hover:border-white" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/30 transition-all duration-700 group-hover:scale-110 group-hover:border-white" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/30 transition-all duration-700 group-hover:scale-110 group-hover:border-white" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/30 transition-all duration-700 group-hover:scale-110 group-hover:border-white" />

          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7b2121]/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-[#7b2121]/10 to-transparent blur-[80px] pointer-events-none rounded-full group-hover:scale-110 transition-transform duration-1000" />
          
          {/* Technical Grid lines inside */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '3rem 3rem' }}></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
            
            <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <span className="h-[1px] w-8 bg-[#7b2121] transition-all duration-700 group-hover:w-12"></span>
                <span className="text-[10px] md:text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-400">
                  ENGAGEMENT
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-[1.1] tracking-tight">
                Ready to <span className="font-serif italic text-neutral-400">integrate</span> <br className="hidden md:block" />
                design authority?
              </h2>
              
              <p className="text-xs text-zinc-400 font-sans font-light max-w-md mx-auto md:mx-0 leading-relaxed">
                Let’s discuss your current interfaces, brand guidelines, and requirements. Book a video sync or drop a quick inquiry.
              </p>
            </div>

            <div className="relative shrink-0 flex items-center justify-center md:pr-4">
              {/* Creative Circular Magnetic-style Button */}
              <button
                onClick={() => {
                  setCurrentView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className="group/btn relative w-36 h-36 md:w-44 md:h-44 rounded-full border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-700 hover:border-white/50 bg-black/20 hover:shadow-[0_0_40px_rgba(123,33,33,0.2)]"
              >
                {/* Reveal Fill on Hover */}
                <div className="absolute inset-0 bg-[#7b2121] translate-y-[101%] rounded-full group-hover/btn:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                
                {/* Animated Inner Ring */}
                <div className="absolute inset-2 rounded-full border border-white/10 border-dashed opacity-0 scale-50 group-hover/btn:opacity-30 group-hover/btn:scale-100 transition-all duration-700 ease-out" />
                
                {/* Text & Icon */}
                <div className="relative z-10 flex flex-col items-center gap-3 text-white transition-colors duration-500">
                  <span className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] uppercase text-center leading-tight">
                    Connect<br/>Channels
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:rotate-45 group-hover/btn:scale-125 transition-all duration-500" />
                </div>
              </button>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
};
