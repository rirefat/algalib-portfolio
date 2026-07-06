import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { usePortfolioStore } from '../hooks/usePortfolioStore';
import { ViewMode } from '../types';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

export const GlassNavigation: React.FC = () => {
  const {
    theme,
    toggleTheme,
    currentView,
    setCurrentView,
    setActiveProject,
    setCursorMode
  } = usePortfolioStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Monitor scrolling to hide/reveal nav
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add background blur depth on scroll
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/show logic
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false); // Scrolling down, hide header
      } else {
        setIsVisible(true); // Scrolling up or near top, show header
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems: { label: string; view: ViewMode }[] = [
    { label: 'Home', view: 'home' },
    { label: 'About', view: 'about' },
    { label: 'Services', view: 'services' },
    { label: 'Works', view: 'works' },
    { label: 'Experiences', view: 'experience' },
    { label: 'Journal', view: 'journal' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: ViewMode) => {
    setCurrentView(view);
    setActiveProject(null); // Clear selected project when hitting menu links
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyPress = (e: React.KeyboardEvent, view: ViewMode) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavClick(view);
    }
  };

  return (
    <>
      {/* Floating navigation wrap */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-transform duration-500 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-6 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick('home')}
            onMouseEnter={() => setCursorMode('hover')}
            onMouseLeave={() => setCursorMode('default')}
            className="flex items-center gap-3 group select-none text-left"
          >
            {/* Sophisticated Custom-Designed SVG luxury mark */}
            <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center bg-transparent">
              {/* Outer glowing aura on hover */}
              <div className="absolute inset-0 bg-[#7b2121]/5 dark:bg-[#7b2121]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Fine concentric layout lines */}
              <svg
                width="44"
                height="44"
                viewBox="0 0 100 100"
                className="relative z-10 w-full h-full text-neutral-200 dark:text-neutral-100"
              >
                <defs>
                  {/* Premium Metallic Gradient */}
                  <linearGradient id="luxuryGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#F5E3C3" />
                    <stop offset="70%" stopColor="#7b2121" />
                    <stop offset="100%" stopColor="#1A1A1A" />
                  </linearGradient>
                  
                  <linearGradient id="luxuryCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5252" />
                    <stop offset="50%" stopColor="#7b2121" />
                    <stop offset="100%" stopColor="#7A0E0E" />
                  </linearGradient>
                </defs>

                {/* Outer Luxury Dial - rotating extremely slow */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#7b2121"
                  strokeWidth="0.75"
                  strokeDasharray="2 8"
                  opacity="0.3"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                />

                {/* Middle Hexagonal Framing */}
                <motion.polygon
                  points="50,12 83,31 83,69 50,88 17,69 17,31"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.15"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                />

                {/* Inner Compass Axes */}
                <line x1="50" y1="18" x2="50" y2="82" stroke="currentColor" strokeWidth="0.25" opacity="0.2" />
                <line x1="18" y1="50" x2="82" y2="50" stroke="currentColor" strokeWidth="0.25" opacity="0.2" />

                {/* Custom Monogram 'aG' Crafted with Premium Geometry */}
                {/* The 'a' fluid modern drop shape */}
                <motion.path
                  d="M 45,58 A 8.5,8.5 0 1,1 45,41 A 8.5,8.5 0 0,1 45,58 Z M 53.5,41 L 53.5,58"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-100 transition-colors duration-500 group-hover:text-white"
                  transition={{ duration: 0.5 }}
                />

                {/* The 'G' flowing luxury crimson sweep */}
                <motion.path
                  d="M 68,36 C 63,29 53,27 45.5,30 C 33,35 28.5,49 33.5,60.5 C 38.5,72 53.5,75.5 63,68 C 68,64 70.5,57.5 70.5,51.5 L 53.5,51.5"
                  fill="none"
                  stroke="url(#luxuryCrimson)"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0.9 }}
                  whileHover={{ pathLength: 1, strokeWidth: 3 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {/* Central Core Origin Point */}
                <circle cx="50" cy="50" r="1.5" fill="#7b2121" />
              </svg>

              {/* Shimmer overlay animation */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-full -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </div>

            {/* Refined Luxury Typography */}
            <div className="flex flex-col items-start leading-none gap-0.5">
              <div className="flex items-baseline">
                {/* Italian/Swiss luxury aesthetic styling */}
                <span className="text-[14px] font-sans font-medium tracking-[0.05em] text-neutral-400 dark:text-neutral-400 group-hover:text-neutral-300 transition-colors duration-500">
                  al
                </span>
                <span className="text-[15px] font-sans font-black tracking-[0.25em] uppercase text-white ml-1 transition-all duration-500 group-hover:text-white group-hover:tracking-[0.28em]">
                  GALIB
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-[1px] w-2 bg-[#7b2121]/40 group-hover:w-4 transition-all duration-500" />
                <span className="text-[7.5px] font-mono tracking-[0.45em] uppercase text-neutral-400 dark:text-neutral-400 group-hover:text-neutral-300 transition-colors duration-500">
                  PORTFOLIO
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Link Cluster */}
          <nav className="hidden lg:flex items-center gap-2 p-1 bg-white/5 dark:bg-[#0A0A0A]/40 backdrop-blur-md rounded-full border border-neutral-200/30 dark:border-white/5 shadow-sm transition-all">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  onKeyDown={(e) => handleKeyPress(e, item.view)}
                  onMouseEnter={() => setCursorMode('hover')}
                  onMouseLeave={() => setCursorMode('default')}
                  tabIndex={0}
                  aria-label={`Go to ${item.label} section`}
                  className={`px-5 py-2 rounded-full font-sans text-[11px] uppercase tracking-[0.15em] font-medium transition-all relative ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-neutral-400 dark:text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#7b2121]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action cluster (theme, download cv, contact triggers) */}
          <div className="flex items-center gap-3">

            {/* Quick Resume Link (Aesthetic & functional PDF action) */}
            <a
              href="https://drive.google.com/file/d/15y7NWa7Rf2t0ntyevZ-eIlYHxc6YoSv6/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorMode('hover')}
              onMouseLeave={() => setCursorMode('default')}
              className="hidden sm:flex items-center gap-1 px-4 py-2 text-[10px] uppercase tracking-widest font-mono font-medium rounded-full bg-neutral-900 text-white dark:bg-zinc-900 dark:text-zinc-200 border dark:border-white/5 hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black transition-all shadow-md"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburg Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={() => setCursorMode('hover')}
              onMouseLeave={() => setCursorMode('default')}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2.5 rounded-full bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200/40 dark:border-neutral-800/40 text-neutral-200 hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 transition-all shadow-sm"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Glass Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[110] lg:hidden flex flex-col bg-[#050505]/98 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto overflow-x-hidden ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7b2121]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Fixed Close Button */}
        <div className="fixed top-6 right-6 z-[120]">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-3 rounded-full bg-white/5 text-neutral-300 border border-white/10 hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col justify-center min-h-full py-24">
          <nav className="flex flex-col gap-4 px-8 sm:px-12 max-w-md mx-auto w-full relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[1px] w-8 bg-[#7b2121]"></span>
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-neutral-500">
                Navigation
              </span>
            </div>

            <div className="flex flex-col w-full space-y-2">
              {navItems.map((item, index) => {
                const isActive = currentView === item.view;
                return (
                  <button
                    key={item.view}
                    onClick={() => handleNavClick(item.view)}
                    style={{ 
                      transitionDelay: mobileMenuOpen ? `${100 + index * 60}ms` : '0ms',
                      transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                      opacity: mobileMenuOpen ? 1 : 0
                    }}
                    className={`w-full py-4 text-3xl sm:text-4xl font-serif italic tracking-tight border-b border-white/5 transition-all duration-700 flex items-center justify-between group ${
                      isActive
                        ? 'text-white'
                        : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className={`text-xs sm:text-sm font-mono font-sans not-italic transition-colors duration-500 ${isActive ? 'text-[#7b2121]' : 'text-neutral-700 group-hover:text-neutral-500'}`}>
                        0{index + 1}
                      </span>
                      <span className={`transition-transform duration-500 ${isActive ? 'translate-x-2' : 'group-hover:translate-x-2'}`}>{item.label}</span>
                    </div>
                    <ArrowUpRight className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500 ${isActive ? 'opacity-100 text-[#7b2121]' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white'}`} />
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
