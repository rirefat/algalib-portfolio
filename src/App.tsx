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

import { ArrowUpRight } from 'lucide-react';

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
    <div className="min-h-screen text-neutral-800 dark:text-neutral-200 selection:bg-red-500/20 font-sans transition-colors duration-500 flex flex-col justify-between relative overflow-x-hidden">
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

      {/* Premium Luxury Minimal Footer */}
      <footer className="w-full z-10 relative bg-neutral-950 text-white border-t border-white/5 py-16 px-6 select-none">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Left Col: Brand Logo & Mission */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2 font-sans text-2xl font-bold tracking-tight text-white">
                <span className="bg-red-500 text-white w-7 h-7 rounded-sm flex items-center justify-center font-mono font-black text-sm">
                  G
                </span>
                <span>Al Galib</span>
              </div>
              <p className="text-xs text-neutral-400 font-sans max-w-sm leading-relaxed">
                A creative studio based in Dhaka, orchestrating world-class product UI/UX architectures and tactile graphic identity blueprints globally since 2020.
              </p>
            </div>

            {/* Middle Col: Indexed navigation links */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">CURATIONS</span>
                <ul className="space-y-2 text-xs font-sans text-neutral-400">
                  <li>
                    <button
                      onClick={() => handleFooterNavClick('works')}
                      onMouseEnter={() => setCursorMode('hover')}
                      onMouseLeave={() => setCursorMode('default')}
                      className="hover:text-red-500 transition-colors"
                    >
                      All Works
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleFooterNavClick('services')}
                      onMouseEnter={() => setCursorMode('hover')}
                      onMouseLeave={() => setCursorMode('default')}
                      className="hover:text-red-500 transition-colors"
                    >
                      Capabilities
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleFooterNavClick('journal')}
                      onMouseEnter={() => setCursorMode('hover')}
                      onMouseLeave={() => setCursorMode('default')}
                      className="hover:text-red-500 transition-colors"
                    >
                      Design Journal
                    </button>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">RESOURCES</span>
                <ul className="space-y-2 text-xs font-sans text-neutral-400">
                  <li>
                    <button
                      onClick={() => handleFooterNavClick('about')}
                      onMouseEnter={() => setCursorMode('hover')}
                      onMouseLeave={() => setCursorMode('default')}
                      className="hover:text-red-500 transition-colors"
                    >
                      Studio Story
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleFooterNavClick('experience')}
                      onMouseEnter={() => setCursorMode('hover')}
                      onMouseLeave={() => setCursorMode('default')}
                      className="hover:text-red-500 transition-colors"
                    >
                      Career Timeline
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleFooterNavClick('privacy')}
                      onMouseEnter={() => setCursorMode('hover')}
                      onMouseLeave={() => setCursorMode('default')}
                      className="hover:text-red-500 transition-colors"
                    >
                      Privacy Policy
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Col: Connection & Signal coordinates */}
            <div className="md:col-span-3 space-y-3 text-left">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">DIRECT INQUIRIES</span>
              <a
                href="mailto:rafiulrefat23@gmail.com"
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className="text-sm font-sans font-medium text-neutral-200 hover:text-red-500 transition-colors flex items-center gap-1 group"
              >
                <span>rafiulrefat23@gmail.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-red-500" />
              </a>
              <p className="text-[10px] font-mono text-neutral-500 pt-2">
                STUDIO STATUS: Dhaka, Bangladesh — Active UTC+6
              </p>
            </div>

          </div>

          {/* Bottom segment: Custom Handwritten signature effects & copyrights */}
          <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Elegant luxury handwritten brand signature */}
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">
                CREATIVE SOVEREIGNTY SIGNATURE
              </span>
              <div className="text-xl md:text-2xl font-semibold italic text-neutral-100 font-sans tracking-wide">
                Abdullah Al Galib
              </div>
            </div>

            {/* Copyright & credit details */}
            <div className="text-center sm:text-right space-y-1">
              <p className="text-xs text-neutral-400 font-sans font-medium">
                Designed & Crafted by Abdullah Al Galib
              </p>
              <p className="text-[10px] font-mono text-neutral-600">
                &copy; {new Date().getFullYear()} Al Galib. All Rights Deserved. WCAG AA compliant.
              </p>
            </div>

          </div>

        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioLayout />
    </PortfolioProvider>
  );
}
