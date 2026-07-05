import React, { useState, useRef, useEffect } from 'react';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { PROJECTS } from '../../data/portfolioData';
import { ArrowLeft, ArrowRight, CheckCircle, HelpCircle, Layers, BookOpen, Compass, Shield, ArrowUpRight, Clock } from 'lucide-react';
import { calculateReadingTime } from '../../utils/readingTime';

export const ProjectDetailView: React.FC = () => {
  const { activeProject, setActiveProject, setCurrentView, setCursorMode, setCustomCursorText } = usePortfolioStore();
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [scrollProgress, setScrollProgress] = useState(0);
  const isDragging = useRef(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject) {
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeProject]);

  if (!activeProject) {
    return (
      <div className="py-32 text-center space-y-4">
        <p className="text-neutral-500 font-sans">No project selected.</p>
        <button
          onClick={() => setCurrentView('works')}
          className="px-6 py-2.5 rounded-full bg-[#D12B2B] text-white font-mono text-xs uppercase"
        >
          Explore Works
        </button>
      </div>
    );
  }

  // Before/After mouse slider mechanics
  const handleSliderMove = (clientX: number) => {
    const container = sliderContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleSliderMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleSliderMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.userSelect = 'auto';
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();
    const handleGlobalTouchMove = (e: TouchEvent) => handleTouchMove(e);

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
    document.body.style.userSelect = 'none';
  };

  // Navigate to Next Case Study
  const handleNextProject = () => {
    const currentIndex = PROJECTS.findIndex((p) => p.id === activeProject.id);
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    setActiveProject(PROJECTS[nextIndex]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 pb-24 select-none">
      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-neutral-200 dark:bg-neutral-800 z-[120] pointer-events-none">
        <div 
          className="h-full bg-[#D12B2B] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* 1. Large Hero Header Cover */}
      <section className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden flex items-end">
        {/* Backdrop Image cover */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeProject.image}
            alt={activeProject.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.75] dark:brightness-[0.6]"
          />
          {/* Transparent glass shader fade bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-90" />
        </div>

        {/* Back and details content coordinates */}
        <div className="max-w-7xl mx-auto w-full px-6 py-12 md:py-20 z-10 text-white relative space-y-6">
          <button
            onClick={() => {
              setCurrentView('works');
              setActiveProject(null);
            }}
            onMouseEnter={() => setCursorMode('hover')}
            onMouseLeave={() => setCursorMode('default')}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-[#D12B2B] transition-colors bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to curations list</span>
          </button>

          <div className="space-y-4 max-w-4xl pt-6">
            <span className="px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full bg-[#D12B2B] text-white">
              {activeProject.category}
            </span>
            <h1 className="text-fluid-h1 font-light font-serif italic leading-[1.05]">
              {activeProject.title}
            </h1>
            <p className="text-base md:text-lg text-neutral-300 font-sans font-light max-w-2xl leading-relaxed">
              {activeProject.subtitle}
            </p>
          </div>

          {/* Core Case Spec Indices details bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-8 border-t border-white/10 max-w-4xl text-left">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">CLIENT ASSOCIATED</span>
              <span className="text-sm font-sans font-bold text-neutral-200">{activeProject.client}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">MY INVOLVEMENT</span>
              <span className="text-sm font-sans font-bold text-neutral-200">{activeProject.role}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">CHRONO YEAR</span>
              <span className="text-sm font-sans font-bold text-neutral-200">{activeProject.year}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">EST. READ TIME</span>
              <span className="text-sm font-sans font-bold text-[#D12B2B] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {calculateReadingTime([
                    activeProject.title,
                    activeProject.subtitle,
                    activeProject.overview,
                    activeProject.challenge,
                    activeProject.solution,
                    activeProject.wireframesDescription,
                    ...(activeProject.research || []),
                    ...(activeProject.results || []),
                    ...(activeProject.lessonsLearned || [])
                  ]).text}
                </span>
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">VENTURE BUDGET</span>
              <span className="text-sm font-sans font-bold text-neutral-200">CONFIDENTIAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview, Problem & Solution Case briefs */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 z-10 relative">
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B] block">
            THE BRIEF INDEX
          </span>
          <h2 className="text-fluid-h2 font-light font-serif italic text-neutral-900 dark:text-white">
            Context & Foundations
          </h2>
          <p className="text-sm text-neutral-500 dark:text-zinc-400 font-sans leading-relaxed font-light">
            Every elite product is anchored in solving heavy commercial or spatial challenges. Read the strategic breakdown.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-10">
          <div className="p-8 rounded-sm bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-sm space-y-4 shadow-md">
            <h4 className="text-lg font-bold text-neutral-900 dark:text-[#F5F5F4] font-serif italic flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-[#D12B2B]" />
              <span>Project Overview</span>
            </h4>
            <p className="text-sm text-neutral-600 dark:text-zinc-400 font-sans leading-relaxed font-light">
              {activeProject.overview}
            </p>
          </div>

          <div className="p-8 rounded-sm bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-sm space-y-4 shadow-md">
            <h4 className="text-lg font-bold text-neutral-900 dark:text-[#F5F5F4] font-serif italic flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-[#D12B2B]" />
              <span>The Commercial Challenge</span>
            </h4>
            <p className="text-sm text-neutral-600 dark:text-zinc-400 font-sans leading-relaxed font-light">
              {activeProject.challenge}
            </p>
          </div>

          <div className="p-8 rounded-sm bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-sm space-y-4 shadow-md">
            <h4 className="text-lg font-bold text-neutral-900 dark:text-[#F5F5F4] font-serif italic flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-[#D12B2B]" />
              <span>Subtractive Final Solution</span>
            </h4>
            <p className="text-sm text-neutral-600 dark:text-zinc-400 font-sans leading-relaxed font-light">
              {activeProject.solution}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Deep Research Milestones & Wireframe layouts */}
      <section className="bg-neutral-950 text-white py-16 md:py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D12B2B]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B] block">
                ANALYSIS MAP — STEP 01
              </span>
              <h3 className="text-fluid-h2 font-light font-serif italic">
                Meticulous Research & User Interviews
              </h3>
              <p className="text-xs md:text-sm text-neutral-400 font-sans font-light leading-relaxed">
                We study historical guidelines, map physical usage friction, and execute semantic focus reviews to identify core opportunities.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4 pt-4 lg:pt-0">
              {activeProject.research.map((r, idx) => (
                <div key={idx} className="flex gap-4 items-start p-6 rounded-sm bg-white/5 border border-white/10">
                  <span className="font-mono text-sm font-bold text-[#D12B2B]">
                    0{idx + 1}
                  </span>
                  <p className="text-xs md:text-sm text-neutral-300 font-sans font-light leading-relaxed">
                    {r}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/10 pt-16">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B] block">
                STRUCTURAL SCHEMATICS — STEP 02
              </span>
              <h3 className="text-fluid-h2 font-light font-serif italic">
                Architectural Wireframes
              </h3>
              <p className="text-xs md:text-sm text-neutral-400 font-sans font-light leading-relaxed">
                We draw weightless layouts that optimize human ocular scan pathways and coordinate travels.
              </p>
            </div>
            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-sm p-8 flex items-center justify-center text-center">
              <div className="space-y-4 max-w-md">
                <Compass className="w-10 h-10 text-[#D12B2B] mx-auto animate-spin-slow" />
                <h5 className="font-serif italic font-bold text-base text-neutral-100">Functional Coordinate Blueprints</h5>
                <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
                  {activeProject.wireframesDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Beautiful Design Guidelines (Typography weights and Colors boxes) */}
      <section className="max-w-7xl mx-auto px-6 space-y-16 z-10 relative">
        <div className="border-b border-neutral-200/40 dark:border-white/5 pb-6">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B] block">
            VISUAL STANDARDS — STEP 03
          </span>
          <h2 className="text-fluid-h2 font-light font-serif italic text-neutral-900 dark:text-white">
            Graphic Standards System
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Typography card */}
          <div className="p-8 md:p-12 rounded-sm bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-md space-y-8">
            <h4 className="text-lg font-bold text-neutral-900 dark:text-[#F5F5F4] font-serif italic uppercase tracking-wider border-b border-neutral-200/40 dark:border-white/5 pb-3">
              Typography Sheets
            </h4>
            <div className="space-y-6">
              {activeProject.typography.map((font, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-neutral-200/40 dark:border-white/5 pb-3 last:border-0 last:pb-0">
                  <span className="text-xs font-mono text-neutral-400">INDEX: 0{idx + 1}</span>
                  <span className="text-base font-bold font-sans text-neutral-900 dark:text-white">{font}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Custom color boxes card */}
          <div className="p-8 md:p-12 rounded-sm bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-md space-y-8">
            <h4 className="text-lg font-bold text-neutral-900 dark:text-[#F5F5F4] font-serif italic uppercase tracking-wider border-b border-neutral-200/40 dark:border-white/5 pb-3">
              Curated Color Palette
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {activeProject.colors.map((colorStr, idx) => {
                const hexValue = colorStr.split(' ')[0];
                return (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 dark:bg-[#0A0A0A]/40 rounded-sm border border-neutral-200/40 dark:border-white/5">
                    <div
                      className="w-10 h-10 rounded-sm border border-neutral-300 dark:border-neutral-800 shadow-sm"
                      style={{ backgroundColor: hexValue }}
                    />
                    <div className="text-left leading-tight">
                      <span className="text-[10px] font-mono text-neutral-400 block">HEX KEY</span>
                      <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">{colorStr}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEFORE/AFTER INTERACTIVE HORIZONTAL DRAG COMPARISON SLIDER */}
      <section className="max-w-7xl mx-auto px-6 space-y-8 z-10 relative">
        <div className="border-b border-neutral-200/40 dark:border-white/5 pb-6 text-center md:text-left">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B] block">
            RECONCILIATION SLIDER
          </span>
          <h2 className="text-fluid-h2 font-light font-serif italic text-neutral-900 dark:text-white">
            Design Evolution: Before & After
          </h2>
          <p className="text-xs md:text-sm text-neutral-500 dark:text-zinc-400 font-sans mt-2 font-light">
            Drag the divider handle horizontally to compare the raw legacy prototype with our polished premium redesign.
          </p>
        </div>

        {/* Custom Drag container */}
        <div
          ref={sliderContainerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          className="relative h-[340px] md:h-[500px] w-full rounded-sm overflow-hidden shadow-2xl border border-neutral-200/40 dark:border-white/5 cursor-ew-resize select-none"
        >
          {/* Legacy Before image (Base background) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={activeProject.beforeImage}
              alt="Prototype Before"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.8]"
            />
            <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/70 border border-white/10 text-[10px] font-mono text-white rounded-sm tracking-widest uppercase backdrop-blur-sm z-10">
              Legacy Base Prototype (Before)
            </div>
          </div>

          {/* Premium Redesign After image (Revealed overlay layer) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-75"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ width: `${100 / (sliderPosition / 100)}%` }}>
              <img
                src={activeProject.afterImage}
                alt="Premium Redesign After"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-100"
                style={{ width: sliderContainerRef.current?.getBoundingClientRect().width }}
              />
              <div className="absolute bottom-6 right-6 px-4 py-2 bg-[#D12B2B] border border-white/10 text-[10px] font-mono text-white rounded-sm tracking-widest uppercase backdrop-blur-sm z-10">
                Al Galib Redesign (After)
              </div>
            </div>
          </div>

          {/* Interactive Drag Divider Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#D12B2B] pointer-events-none transition-all duration-75"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#D12B2B] text-white flex items-center justify-center shadow-lg border-2 border-white select-none pointer-events-none">
              <span className="text-xs font-mono font-bold">↔</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. High-end Results Metrics list & Lessons Learned */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 z-10 relative">
        <div className="lg:col-span-4 space-y-4">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B] block">
            VERDICTS & RETROSPECTIVE
          </span>
          <h2 className="text-fluid-h2 font-light font-serif italic text-neutral-900 dark:text-white">
            Deliveries & Lessons
          </h2>
        </div>

        <div className="lg:col-span-8 space-y-10">
          {/* Results Checklist */}
          <div className="p-8 md:p-12 bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-md rounded-sm space-y-6 shadow-md">
            <h4 className="text-lg font-bold font-serif italic text-neutral-900 dark:text-[#F5F5F4] uppercase tracking-wider border-b border-neutral-200/40 dark:border-white/5 pb-3">
              Commercial Deliveries
            </h4>
            <div className="space-y-4">
              {activeProject.results.map((r, i) => (
                <div key={i} className="flex gap-4 items-start text-sm text-neutral-600 dark:text-zinc-400 font-sans font-light">
                  <CheckCircle className="w-5 h-5 text-[#D12B2B] flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {r}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Lessons list */}
          <div className="p-8 md:p-12 bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-md rounded-sm space-y-6 shadow-md">
            <h4 className="text-lg font-bold font-serif italic text-neutral-900 dark:text-[#F5F5F4] uppercase tracking-wider border-b border-neutral-200/40 dark:border-white/5 pb-3">
              Architectural Lessons Learned
            </h4>
            <div className="space-y-4">
              {activeProject.lessonsLearned.map((l, i) => (
                <div key={i} className="flex gap-4 items-start text-sm text-neutral-600 dark:text-zinc-400 font-sans font-light">
                  <span className="font-mono text-xs font-bold text-[#D12B2B] pt-0.5">
                    0{i + 1}
                  </span>
                  <p className="leading-relaxed">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Gallery Carousel display */}
      <section className="max-w-7xl mx-auto px-6 space-y-8 z-10 relative">
        <div className="border-b border-neutral-200/40 dark:border-white/5 pb-6">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B] block">
            VISUAL EXPOSITIONS
          </span>
          <h2 className="text-fluid-h2 font-light font-serif italic text-neutral-900 dark:text-white">
            Case Gallery
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeProject.gallery.map((imgUrl, index) => (
            <div key={index} className="overflow-hidden rounded-sm aspect-[4/3] bg-neutral-100 border border-neutral-200/40 dark:border-white/5 shadow-sm relative group">
              <img
                src={imgUrl}
                alt={`Gallery detail ${index + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-all duration-700 filter brightness-95"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 8. NEXT PROJECT NAVIGATION BAR (CTA to keep user engaged) */}
      <section className="px-6 max-w-7xl mx-auto z-10 relative pt-12">
        <div
          onClick={handleNextProject}
          onMouseEnter={() => setCursorMode('hover')}
          onMouseLeave={() => setCursorMode('default')}
          className="p-8 md:p-16 rounded-sm bg-[#0A0A0A] border border-white/5 cursor-pointer text-center md:text-left hover:border-[#D12B2B]/40 hover:bg-[#111] transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden group shadow-xl"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#D12B2B]/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="space-y-3 relative z-10">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#D12B2B] uppercase block">
              PROCEED TO THE NEXT ARCHITECTURAL EXPEDITION
            </span>
            <h3 className="text-fluid-h2 font-light font-serif italic group-hover:text-[#D12B2B] transition-colors">
              Discover Next Curated Case study
            </h3>
            <p className="text-xs text-zinc-400 font-sans">
              Keep exploring Al Galib's diverse graphic and product portfolio.
            </p>
          </div>

          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto md:mx-0 group-hover:bg-[#D12B2B] group-hover:border-transparent group-hover:scale-110 transition-all duration-300">
            <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>

    </div>
  );
};
