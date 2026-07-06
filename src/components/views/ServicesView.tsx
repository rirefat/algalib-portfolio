import React from 'react';
import { SERVICES } from '../../data/portfolioData';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { Layers, Compass, Feather, Package, CheckCircle, ArrowRight } from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { setCurrentView, setCursorMode } = usePortfolioStore();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'Feather': return <Feather className="w-6 h-6" />;
      case 'Package': return <Package className="w-6 h-6" />;
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
            className="p-8 md:p-12 rounded-sm bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-md flex flex-col justify-between gap-8 group hover:border-[#7b2121]/40 transition-all shadow-md"
          >
            <div className="space-y-6">
              {/* Icon & Category tag */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-sm bg-[#7b2121]/10 text-white flex items-center justify-center border border-[#7b2121]/20 animate-pulse">
                  {getIcon(s.icon)}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-400">
                  {s.subtitle}
                </span>
              </div>

              {/* Title and description */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-serif italic text-white tracking-tight">
                  {s.title}
                </h3>
                <p className="text-sm text-neutral-400 dark:text-zinc-400 font-sans font-light leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>

            {/* Sub skill list tags */}
            <div className="space-y-4 pt-4 border-t border-neutral-200/40 dark:border-white/5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-400 block">
                DELIVERABLE HIGHLIGHTS
              </span>
              <div className="flex flex-wrap gap-2">
                {s.skills.map((sk, index) => (
                  <span
                    key={index}
                    className="px-3.5 py-1 text-[11px] font-mono text-neutral-400 dark:text-zinc-400 rounded-sm bg-white/5 dark:bg-neutral-950 border border-neutral-200/40 dark:border-white/5"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Design Process Blueprint */}
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
              <div className="text-4xl font-black font-mono text-neutral-200 dark:text-neutral-200/60 transition-colors duration-300 group-hover:text-[#7b2121]/20">
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
      <section className="bg-[#0A0A0A] text-white rounded-sm p-8 md:p-16 border border-white/5 relative overflow-hidden text-center max-w-5xl mx-auto shadow-xl">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#7b2121]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-xl mx-auto space-y-6 relative z-10">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block">
            ENGAGEMENT
          </span>
          <h3 className="text-2xl md:text-3xl font-bold font-serif italic text-white leading-tight">
            Ready to integrate design authority into your team?
          </h3>
          <p className="text-xs md:text-sm text-zinc-400 font-sans font-light">
            Let’s discuss your current interfaces, brand guidelines, and requirements. Book a video sync or drop a quick inquiry.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setCurrentView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onMouseEnter={() => setCursorMode('hover')}
              onMouseLeave={() => setCursorMode('default')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#7b2121] hover:bg-[#b02222] text-white font-mono text-xs uppercase tracking-wider rounded-sm shadow-lg shadow-[#7b2121]/10 transition-all"
            >
              <span>CONNECT CHANNELS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
