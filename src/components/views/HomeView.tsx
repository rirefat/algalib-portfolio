import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { VelocityHeading } from '../VelocityHeading';
import galibImage from '@/assets/al-galib-image.png';
import { PROJECTS, CLIENTS, AWARDS, TESTIMONIALS, JOURNAL_POSTS } from '../../data/portfolioData';
import { ProjectCard } from '../ProjectCard';
import { ArrowDown, ArrowUpRight, Compass, Layers, Feather, Package, ChevronLeft, ChevronRight, Award, Quote } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

const posterVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 45 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.3,
      delay: 0.4,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

const maskTextVariants = {
  hidden: { y: "115%" },
  visible: {
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

const charContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    }
  }
};

const charVariants = {
  hidden: { y: "115%" },
  visible: {
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

const cardScrollContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    }
  }
};

const cardScrollRevealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

export const HomeView: React.FC = () => {
  const { setCurrentView, setActiveProject, setCursorMode, setCustomCursorText } = usePortfolioStore();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [splitPercent, setSplitPercent] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSplitPercent(percentage);
    setIsHovered(true);
    setCursorMode('hover');
    setCustomCursorText('DRAG');
  };

  const handleMouseLeave = () => {
    setSplitPercent(50);
    setIsHovered(false);
    setCursorMode('default');
    setCustomCursorText('');
  };

  const featuredProjects = PROJECTS.slice(0, 2);
  const latestJournal = JOURNAL_POSTS.slice(0, 2);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleProjectClick = (project: any) => {
    setActiveProject(project);
    setCurrentView('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-36 md:space-y-52 pb-36 md:pb-52">
      
      {/* 1. Creative Technical Grid Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-start px-6 pt-44 md:pt-52 lg:pt-64 pb-28 md:pb-36 max-w-7xl mx-auto z-10 select-none">
        {/* Ambient artistic soft red blurred backdrop glows */}
        <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#D12B2B]/4 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] bg-[#D12B2B]/3 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative">
          
          {/* Left Column: Typographic Deck & Core Navigation */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-8 text-left"
          >
            {/* Availability Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 dark:bg-[#0A0A0A]/80 border border-neutral-200/40 dark:border-white/5 backdrop-blur-md shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D12B2B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D12B2B]"></span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-zinc-600 dark:text-zinc-400">
                ACTIVE COORDINATES — DHAKA, BD
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[#D12B2B] text-xs font-bold uppercase tracking-[0.4em] block">
                  CREATIVE DIRECTOR & PRODUCT ARCHITECT
                </span>
                <span className="hidden md:block w-8 h-[1px] bg-neutral-300 dark:bg-zinc-800" />
                <span className="hidden md:inline text-[9px] font-mono text-zinc-400 tracking-wider">
                  [ VER 4.2 ]
                </span>
              </div>
              {/* Core Huge Narrative Typography with Editorial Clip-Path Reveal */}
              <VelocityHeading as="h1" maxSkew={6} maxX={10} className="text-fluid-hero tracking-tight text-neutral-900 dark:text-white leading-[0.82] uppercase font-display flex flex-col gap-1 md:gap-2 w-full">
                <div className="overflow-hidden block h-fit pb-1 md:pb-2">
                  <motion.span 
                    variants={charContainerVariants}
                    className="flex flex-wrap font-medium tracking-[0.03em]"
                  >
                    {"ABDULLAH".split("").map((char, index) => (
                      <span key={index} className="inline-block overflow-hidden pb-1">
                        <motion.span
                          variants={charVariants}
                          className="inline-block origin-bottom"
                        >
                          {char}
                        </motion.span>
                      </span>
                    ))}
                  </motion.span>
                </div>
                <div className="overflow-hidden block h-fit pb-1 md:pb-2">
                  <motion.span 
                    variants={charContainerVariants}
                    className="flex flex-wrap items-baseline"
                  >
                    {"al ".split("").map((char, index) => (
                      <span key={`al-${index}`} className="inline-block overflow-hidden pb-1">
                        <motion.span
                          variants={charVariants}
                          className="inline-block text-zinc-400 dark:text-zinc-500 font-serif italic font-light lowercase origin-bottom"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      </span>
                    ))}
                    {"GALIB".split("").map((char, index) => (
                      <span key={`galib-${index}`} className="inline-block overflow-hidden pb-1">
                        <motion.span
                          variants={charVariants}
                          className="inline-block uppercase font-display font-extrabold text-neutral-900 dark:text-white tracking-tight origin-bottom"
                        >
                          {char}
                        </motion.span>
                      </span>
                    ))}
                  </motion.span>
                </div>
              </VelocityHeading>
            </motion.div>

            {/* Creative Sub-headline with artistic left border and clip reveal */}
            <div className="overflow-hidden">
              <motion.p 
                variants={maskTextVariants}
                className="max-w-xl text-neutral-700 dark:text-zinc-300 text-sm md:text-base leading-relaxed font-light italic border-l-2 border-[#D12B2B] pl-6"
              >
                Sculpting high-end digital operating systems, premium physical identities, and absolute visual standards for ventures demanding design authority and visual dominance.
              </motion.p>
            </div>

            {/* Action Call buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => {
                  setCurrentView('works');
                  window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' });
                }}
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className="px-8 py-3.5 text-xs font-mono tracking-widest uppercase rounded-full bg-[#D12B2B] text-white hover:bg-neutral-950 dark:hover:bg-white dark:hover:text-[#100204] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#D12B2B]/20 font-bold"
              >
                SELECTED WORKS
              </button>
              <button
                onClick={() => {
                  setCurrentView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className="px-8 py-3.5 text-xs font-mono tracking-widest uppercase rounded-full border border-neutral-300 dark:border-white/10 text-neutral-800 dark:text-zinc-300 hover:bg-[#D12B2B] hover:text-white hover:border-transparent hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                INITIATE VENTURE
              </button>
            </motion.div>

            {/* Counter stats segment directly below, matching the design specifications */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 md:gap-8 max-w-lg border-t border-neutral-200/40 dark:border-white/5 pt-8 mt-12"
            >
              <div>
                <div className="text-3xl md:text-4xl font-light mb-1 italic text-neutral-900 dark:text-[#F5F5F4] font-serif">08+</div>
                <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono">Years Exp</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-light mb-1 italic text-neutral-900 dark:text-[#F5F5F4] font-serif">42</div>
                <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono">Design Honors</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-light mb-1 italic text-neutral-900 dark:text-[#F5F5F4] font-serif">120+</div>
                <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono">Global Assets</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Replicated Custom Image Masterpiece Poster with Interactive Split Swipe */}
          <motion.div 
            variants={posterVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex items-center justify-center pt-8 lg:pt-0"
          >
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative aspect-[3/4] max-w-sm w-full bg-[#100204] rounded-sm overflow-hidden shadow-2xl border border-white/10 group cursor-none"
            >
              
              {/* Base Crimson Gradient Studio Backdrop Layer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#150204] via-[#4c0d15] to-[#7a1420]" />
              
              {/* Technical Draft Coordinate Grid overlay within poster */}
              <div className="absolute inset-0 technical-grid opacity-35 mix-blend-overlay z-10" />

              {/* Dual-Focused Split Portrait Composition - Dynamic Interactive Mode */}
              <div className="absolute inset-0 select-none pointer-events-none">
                
                {/* 1. Underlying Base Layer: Soft-Focus Blurred Crimson-Tinted Portrait */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={`${galibImage}?v=2`}
                    alt="Abdullah Al Galib Portrait - Soft Focus Base"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover filter blur-[3px] opacity-75 contrast-[1.1] brightness-[0.75] saturate-150 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  {/* Crimson color overlay for deep luxury portrait tint */}
                  <div className="absolute inset-0 bg-[#4c0d15]/40 mix-blend-color" />
                </div>

                {/* 2. Overlay Layer: Sharp Full-Color Portrait (Clipped dynamically) */}
                <div 
                  className="absolute inset-0 overflow-hidden transition-all duration-75"
                  style={{
                    clipPath: `polygon(0 0, ${splitPercent}% 0, ${splitPercent}% 100%, 0 100%)`
                  }}
                >
                  <img
                    src={`${galibImage}?v=2`}
                    alt="Abdullah Al Galib Portrait - Sharp Focus Overlay"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                {/* 3. Interactive Split Slider Dividers & Hubs */}
                <div 
                  className="absolute top-0 bottom-0 w-[1px] bg-white/20 z-20 shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-75"
                  style={{ left: `${splitPercent}%` }}
                />
                
                <div 
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#100204]/90 border border-white/20 flex items-center justify-center z-25 transition-all duration-75 shadow-lg"
                  style={{ left: `${splitPercent}%` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D12B2B] animate-pulse" />
                </div>

                {/* Interactive Drag Hint Label (Only visible when not hovering or at center) */}
                {!isHovered && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#100204]/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full z-20 animate-bounce">
                    <span className="text-[8px] font-mono tracking-widest uppercase text-zinc-300">
                      ↔ SWIPE TO INTERACT
                    </span>
                  </div>
                )}
              </div>

              {/* Editorial Typography Overlay exactly matching the design pattern */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-30 bg-gradient-to-t from-[#100204]/95 via-transparent to-transparent">
                <div className="space-y-4">
                  
                  {/* Headline & Outline Interactive Chevron Circle Button */}
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="font-condensed text-3xl md:text-[34px] font-bold text-white leading-[0.9] uppercase tracking-tight text-shadow-crimson">
                      MOST NEW<br />
                      FOUNDERS<br />
                      SKIP BRAND<br />
                      IDENTITY
                    </h3>
                    
                    {/* Replicated outline button (>) */}
                    <button
                      onClick={() => {
                        setCurrentView('services');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      onMouseEnter={() => setCursorMode('hover')}
                      onMouseLeave={() => setCursorMode('default')}
                      className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-transparent hover:scale-110 transition-all duration-300 flex-shrink-0 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5 transform translate-x-[0.5px]" />
                    </button>
                  </div>

                  {/* Wide uppercase details list */}
                  <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-300 font-sans leading-relaxed">
                    THEY WONDER WHY CUSTOMERS FORGET THEM
                  </p>

                  <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-[9px] font-mono tracking-[0.2em] text-zinc-400">
                    <span>DESIGNERS FOUNDERS CREATORS</span>
                    <span className="text-brand-red font-bold font-mono">AL GALIB</span>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Cinematic Scroll Indicator */}
        <div className="absolute bottom-6 left-6 flex items-center gap-3 text-neutral-400 dark:text-zinc-500 lg:flex hidden">
          <div className="w-8 h-12 rounded-full border border-neutral-300 dark:border-zinc-800 flex justify-center py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D12B2B] animate-bounce" />
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase">
            SCROLL TO DISCOVER
          </span>
        </div>
      </section>

      {/* 2. Selected Masterpieces Grid */}
      <section className="px-6 max-w-7xl mx-auto z-10 relative">
        <div className="space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/40 dark:border-white/5 pb-8">
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B]">
                CURATED EXPEDITIONS — 01
              </span>
              <VelocityHeading as="h2" direction="right" className="text-fluid-h1 font-light font-serif italic text-neutral-900 dark:text-white">
                Selected Works
              </VelocityHeading>
            </div>
            <button
              onClick={() => {
                setCurrentView('works');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onMouseEnter={() => setCursorMode('hover')}
              onMouseLeave={() => setCursorMode('default')}
              className="group flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-950 dark:text-zinc-200 hover:text-[#D12B2B] dark:hover:text-[#D12B2B] transition-colors"
            >
              <span>Explore All Works ({PROJECTS.length})</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Cards Grid with Framer Motion on-scroll stagger reveal */}
          <motion.div
            variants={cardScrollContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10"
          >
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={cardScrollRevealVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Creative Philosophy Statement (The luxury differentiator) */}
      <section className="px-6 py-12 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-md rounded-sm p-8 md:p-16">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B]">
              CORE PRINCIPLES — 02
            </span>
            <VelocityHeading as="h3" direction="left" className="text-fluid-h2 font-light font-serif italic text-neutral-900 dark:text-[#F5F5F4]">
              The Philosophy of Absolute Subtraction.
            </VelocityHeading>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-500">
              "We strip the ornament to expose the ultimate structural truth."
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="text-sm md:text-base text-neutral-600 dark:text-zinc-400 font-sans leading-relaxed space-y-4 font-light border-l-2 border-[#D12B2B]/60 pl-6">
              I believe that premium design is not an act of decorative assembly, but a ruthless process of reduction. Whether drawing vector badges for raw electric superbikes or laying down depth grids for spatial applications, the goal is same: <strong className="font-semibold text-neutral-900 dark:text-[#F5F5F4]">create silence.</strong>
              <br /><br />
              By treating typography as architecture and white space as material, the products we launch do not compete for attention. They command it through sheer structural confidence.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Capabilities / Services Teaser */}
      <section className="px-6 max-w-7xl mx-auto z-10 relative">
        <div className="space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/40 dark:border-white/5 pb-8">
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B]">
                CAPABILITIES — 03
              </span>
              <VelocityHeading as="h2" direction="right" className="text-fluid-h1 font-light font-serif italic text-neutral-900 dark:text-white">
                Design Services
              </VelocityHeading>
            </div>
            <button
              onClick={() => {
                setCurrentView('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onMouseEnter={() => setCursorMode('hover')}
              onMouseLeave={() => setCursorMode('default')}
              className="group flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-950 dark:text-zinc-200 hover:text-[#D12B2B] dark:hover:text-[#D12B2B] transition-colors"
            >
              <span>Deep Capability Specs</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Core Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-sm bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-sm space-y-6 shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#D12B2B]/10 text-[#D12B2B] flex items-center justify-center font-mono text-sm font-bold">
                01
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-medium text-neutral-900 dark:text-[#F5F5F4] font-serif italic">Product Design</h4>
                <p className="text-xs text-neutral-500 dark:text-zinc-400 font-sans leading-relaxed">
                  Intuitive spatial systems, pixel-perfect layouts, interactive prototypes, and modular design guides.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-sm space-y-6 shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#D12B2B]/10 text-[#D12B2B] flex items-center justify-center font-mono text-sm font-bold">
                02
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-medium text-neutral-900 dark:text-[#F5F5F4] font-serif italic">Brand Identity</h4>
                <p className="text-xs text-neutral-500 dark:text-zinc-400 font-sans leading-relaxed">
                  Bespoke visual badging, corporate typography grids, editorial curation, and cohesive brand systems.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-sm space-y-6 shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#D12B2B]/10 text-[#D12B2B] flex items-center justify-center font-mono text-sm font-bold">
                03
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-medium text-neutral-900 dark:text-[#F5F5F4] font-serif italic">Creative Direction</h4>
                <p className="text-xs text-neutral-500 dark:text-zinc-400 font-sans leading-relaxed">
                  Conceptual spark, creative guidelines, artistic oversight, and visual narrative unification.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-sm space-y-6 shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#D12B2B]/10 text-[#D12B2B] flex items-center justify-center font-mono text-sm font-bold">
                04
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-medium text-neutral-900 dark:text-[#F5F5F4] font-serif italic">Premium Packaging</h4>
                <p className="text-xs text-neutral-500 dark:text-zinc-400 font-sans leading-relaxed">
                  Tactile paper stocks, structural baselines, embossed graphic badges, and luxury boxing layouts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Testimonials Board */}
      <section className="px-6 max-w-7xl mx-auto z-10 relative">
        <div className="bg-[#0A0A0A] text-white rounded-sm p-8 md:p-16 border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Accent light blob */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D12B2B]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-4xl space-y-10 relative z-10">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B]">
              REPUTATION — 04
            </span>

            {/* Testimonial Active Slide */}
            <div className="space-y-8 min-h-[220px]">
              <Quote className="w-10 h-10 text-[#D12B2B] opacity-60" />
              <p className="text-lg md:text-2xl font-light font-serif tracking-tight leading-relaxed text-[#F5F5F4] italic">
                "{TESTIMONIALS[activeTestimonial].content}"
              </p>
              
              {/* Reviewer Details */}
              <div className="flex items-center gap-4">
                <img
                  src={TESTIMONIALS[activeTestimonial].avatar}
                  alt={TESTIMONIALS[activeTestimonial].name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#D12B2B]"
                />
                <div>
                  <h5 className="font-serif italic font-light text-base text-white">
                    {TESTIMONIALS[activeTestimonial].name}
                  </h5>
                  <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    {TESTIMONIALS[activeTestimonial].role}, <span className="text-[#D12B2B]">{TESTIMONIALS[activeTestimonial].company}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-3 pt-6">
              <button
                onClick={prevTestimonial}
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-white text-zinc-400 hover:text-white flex items-center justify-center transition-all bg-[#0A0A0A]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs text-zinc-500">
                0{activeTestimonial + 1} / 0{TESTIMONIALS.length}
              </span>
              <button
                onClick={nextTestimonial}
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-white text-zinc-400 hover:text-white flex items-center justify-center transition-all bg-[#0A0A0A]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Selected Clients Bar */}
      <section className="px-6 max-w-7xl mx-auto z-10 relative">
        <div className="space-y-8">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 block text-center">
            COLLABORATIONS & PATRONS
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {CLIENTS.map((client, index) => (
              <div
                key={index}
                className="py-5 px-3 rounded-sm border border-neutral-200/40 dark:border-white/5 bg-white/5 dark:bg-[#0A0A0A]/20 backdrop-blur-sm flex items-center justify-center text-center text-xs font-mono font-medium tracking-wider text-neutral-600 dark:text-zinc-400 uppercase hover:text-[#D12B2B] dark:hover:text-[#D12B2B] transition-colors"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Awards Board Grid */}
      <section className="px-6 max-w-7xl mx-auto z-10 relative">
        <div className="space-y-10">
          <div className="border-b border-neutral-200/40 dark:border-white/5 pb-6">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B]">
              ACCOLADES & VERDICTS — 05
            </span>
            <VelocityHeading as="h2" direction="left" className="text-fluid-h2 font-light font-serif italic text-neutral-900 dark:text-white">
              Selected Accolades
            </VelocityHeading>
          </div>

          <div className="divide-y divide-neutral-200/40 dark:divide-white/5">
            {AWARDS.map((award, index) => (
              <div
                key={index}
                className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-[#D12B2B]/5 px-4 rounded-sm transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-[#D12B2B] font-bold">
                    {award.year}
                  </span>
                  <div>
                    <h4 className="font-serif italic font-medium text-lg text-neutral-900 dark:text-white group-hover:text-[#D12B2B] transition-colors">
                      {award.title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-sans">
                      Category: {award.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                  <span>FOR: {award.project}</span>
                  <Award className="w-3.5 h-3.5 text-zinc-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call To Action Footer Board */}
      <section className="px-6 max-w-7xl mx-auto z-10 relative">
        <div className="bg-[#0A0A0A] border border-white/5 backdrop-blur-md rounded-sm p-8 md:p-16 text-center space-y-8 relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#D12B2B]/5 rounded-full blur-[60px] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B]">
              COMMENCE THE JOURNEY
            </span>
            <VelocityHeading as="h2" direction="right" className="text-fluid-h1 font-light font-serif italic text-[#F5F5F4] leading-tight">
              Have a premium concept you wish to bring to life?
            </VelocityHeading>
            <p className="text-sm text-zinc-400 font-sans">
              I collaborate with luxury creators and avant-garde technology labs globally to design absolute visual dominance. Let’s start the blueprint.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setCurrentView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className="inline-flex items-center gap-2 px-10 py-5 bg-[#D12B2B] text-white hover:bg-[#b02222] text-xs font-mono tracking-widest uppercase rounded-full shadow-lg shadow-[#D12B2B]/20 transition-all font-bold"
              >
                <span>INITIATE VENTURE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
