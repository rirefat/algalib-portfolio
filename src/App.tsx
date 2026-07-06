import React from 'react';
import { PortfolioProvider, usePortfolioStore } from './hooks/usePortfolioStore';
import { CustomCursor } from './components/CustomCursor';
import { InteractiveCanvas } from './components/InteractiveCanvas';
import { GlassNavigation } from './components/GlassNavigation';
import { ProjectQuickViewModal } from './components/ProjectQuickViewModal';
import { TransitionCurtain } from './components/TransitionCurtain';
import Lenis from 'lenis';

// View modules
import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { WorksView } from './components/views/WorksView';
import { ServicesView } from './components/views/ServicesView';
import { ExperienceView } from './components/views/ExperienceView';
import { JournalView } from './components/views/JournalView';
import { ContactView } from './components/views/ContactView';
import { ProjectDetailView } from './components/views/ProjectDetailView';
import { PrivacyView } from './components/views/PrivacyView';

import { ArrowUpRight, Linkedin, Dribbble, Twitter } from 'lucide-react';
import { ImagePreloader } from './components/ImagePreloader';

function PortfolioLayout() {
  const { currentView, setCurrentView, setCursorMode, setActiveProject } = usePortfolioStore();
  const lenisRef = React.useRef<Lenis | null>(null);

  React.useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious exponential out easing
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Fluid animation frame loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll to top instantly on internal layout views transitions
  React.useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [currentView]);

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'about':
        return <AboutView />;
      case 'works':
        return <WorksView />;
      case 'services':
        return <ServicesView />;
      case 'experience':
        return <ExperienceView />;
      case 'journal':
        return <JournalView />;
      case 'contact':
        return <ContactView />;
      case 'project-detail':
        return <ProjectDetailView />;
      case 'privacy':
        return <PrivacyView />;
      default:
        return <HomeView />;
    }
  };

  const handleFooterNavClick = (view: any) => {
    setCurrentView(view);
    setActiveProject(null);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-[#030303] min-h-screen text-neutral-200 selection:bg-[#7b2121]/20 font-sans transition-colors duration-500 flex flex-col justify-between relative overflow-x-hidden">
      {/* Cinematic Custom Follower Cursor */}
      <CustomCursor />

      {/* Global Glassmorphic Quick View Overlay Modal */}
      <ProjectQuickViewModal />

      {/* Global Slide-In Editorial Transition Curtain */}
      <TransitionCurtain />

      {/* Fluid Dynamic Ambient Math Canvas Background */}
      <InteractiveCanvas />

      {/* Architectural Technical Draft Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-1 technical-grid dark:opacity-[0.6] opacity-[0.4] mix-blend-overlay dark:mix-blend-normal" />

      {/* Floating Glassmorphic Header Nav */}
      <GlassNavigation />

      {/* Core Dynamic Screen Viewport */}
      <main className="flex-grow z-10 relative">
        {renderActiveView()}
      </main>

      {/* Swiss Minimalist & Creative Footer */}
      <footer className="w-full bg-[#030303] text-neutral-400 pt-16 md:pt-24 pb-8 px-6 lg:px-12 border-t border-white/5 relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Massive Background Typography */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none flex justify-center items-end select-none z-0">
          <h1 className="text-[22vw] leading-[0.75] font-serif italic font-black tracking-tighter text-white/[0.02] uppercase whitespace-nowrap -mb-[3vw]">
            AL GALIB
          </h1>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 lg:gap-8 pb-12 border-b border-white/10">
            {/* Left: CTA */}
            <div className="flex flex-col items-start w-full lg:w-auto">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-6 block">
                Open for new opportunities
              </span>
              <a
                href="mailto:abdullahalgalib255@gmail.com"
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className="group relative flex flex-col items-start cursor-pointer"
              >
                <div className="overflow-hidden relative pb-1">
                  {/* The primary visible text */}
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif italic font-medium tracking-tighter text-white transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[120%]">
                    Let's connect
                  </h2>
                  {/* The text that slides up */}
                  <h2 className="absolute top-0 left-0 text-5xl md:text-7xl lg:text-8xl font-serif italic text-white translate-y-[120%] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 w-full">
                    right now.
                  </h2>
                </div>
                
                <div className="mt-6 flex items-center gap-4 text-neutral-400 group-hover:text-[#7b2121] transition-colors duration-500">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-700 group-hover:border-white group-hover:bg-white flex items-center justify-center transition-all duration-500 shrink-0">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:text-[#7b2121] group-hover:rotate-45 transition-all duration-500" />
                  </div>
                  <span className="font-mono text-xs md:text-sm tracking-widest lowercase">abdullahalgalib255@gmail.com</span>
                </div>
              </a>
            </div>

            {/* Right: Nav & Socials */}
            <div className="flex gap-12 md:gap-24 text-sm font-sans w-full lg:w-auto justify-between lg:justify-end">
              <div className="flex flex-col gap-4">
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-1">Navigation</span>
                <button onClick={() => handleFooterNavClick('works')} onMouseEnter={() => setCursorMode('hover')} onMouseLeave={() => setCursorMode('default')} className="text-left text-neutral-400 hover:text-[#7b2121] transition-colors">Works</button>
                <button onClick={() => handleFooterNavClick('services')} onMouseEnter={() => setCursorMode('hover')} onMouseLeave={() => setCursorMode('default')} className="text-left text-neutral-400 hover:text-[#7b2121] transition-colors">Capabilities</button>
                <button onClick={() => handleFooterNavClick('about')} onMouseEnter={() => setCursorMode('hover')} onMouseLeave={() => setCursorMode('default')} className="text-left text-neutral-400 hover:text-[#7b2121] transition-colors">Studio</button>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-1">Socials</span>
                <a href="https://www.linkedin.com/in/rafiul-islam-refat-1875181b8/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setCursorMode('hover')} onMouseLeave={() => setCursorMode('default')} className="text-neutral-400 hover:text-[#7b2121] transition-colors flex items-center gap-2 group"><Linkedin className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" /> LinkedIn</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setCursorMode('hover')} onMouseLeave={() => setCursorMode('default')} className="text-neutral-400 hover:text-[#7b2121] transition-colors flex items-center gap-2 group"><Twitter className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" /> Twitter</a>
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setCursorMode('hover')} onMouseLeave={() => setCursorMode('default')} className="text-neutral-400 hover:text-[#7b2121] transition-colors flex items-center gap-2 group"><Dribbble className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" /> Dribbble</a>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <span 
                className="text-white font-sans text-xl font-medium tracking-tight cursor-pointer hover:text-[#7b2121] transition-colors"
                onClick={() => handleFooterNavClick('home')}
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
              >
                AL GALIB
              </span>
              <span className="hidden md:block w-1 h-1 rounded-full bg-neutral-700"></span>
              <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <button onClick={() => handleFooterNavClick('privacy')} onMouseEnter={() => setCursorMode('hover')} onMouseLeave={() => setCursorMode('default')} className="hover:text-[#7b2121] transition-colors">Privacy Policy</button>
              <span className="hidden md:block w-1 h-1 rounded-full bg-neutral-700"></span>
              <span className="text-neutral-400 tracking-widest uppercase">Never stop trying.</span>
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [isPreloaded, setIsPreloaded] = React.useState(false);
  return (
    <PortfolioProvider>
      {!isPreloaded ? (
        <ImagePreloader onComplete={() => setIsPreloaded(true)} />
      ) : (
        <PortfolioLayout />
      )}
    </PortfolioProvider>
  );
}
