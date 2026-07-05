import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolioStore } from '../hooks/usePortfolioStore';
import { X, ArrowRight, Calendar, User, Briefcase, Tag } from 'lucide-react';

export const ProjectQuickViewModal: React.FC = () => {
  const { 
    quickViewProject, 
    setQuickViewProject, 
    setActiveProject, 
    setCurrentView,
    setCursorMode
  } = usePortfolioStore();

  // Close modal on Escape keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickViewProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setQuickViewProject]);

  const handleClose = () => {
    setQuickViewProject(null);
    setCursorMode('default');
  };

  const handleViewFullCaseStudy = () => {
    if (quickViewProject) {
      setActiveProject(quickViewProject);
      setCurrentView('project-detail');
      setQuickViewProject(null);
      setCursorMode('default');
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    }
  };

  return (
    <AnimatePresence>
      {quickViewProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleClose}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-2xl cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[85vh] md:h-[75vh] max-h-[800px] bg-white/5 dark:bg-[#060606]/90 border border-neutral-200/20 dark:border-white/10 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl z-10 select-none backdrop-blur-3xl"
          >
            {/* Left/Top Image Panel */}
            <div className="relative w-full md:w-1/2 h-[35%] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-neutral-200/20 dark:border-white/10">
              <img
                src={quickViewProject.image}
                alt={quickViewProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.8] dark:brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-950/60 to-transparent" />
              
              {/* Badge Overlay */}
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-3.5 py-1 text-[10px] font-mono font-medium uppercase tracking-wider rounded-full bg-black/80 text-[#F5F5F4] backdrop-blur-sm border border-white/5">
                  {quickViewProject.category}
                </span>
                <span className="px-3.5 py-1 text-[10px] font-mono font-medium uppercase tracking-wider rounded-full bg-black/80 text-[#F5F5F4] backdrop-blur-sm border border-white/5">
                  {quickViewProject.year}
                </span>
              </div>
            </div>

            {/* Right/Bottom Content Details */}
            <div className="w-full md:w-1/2 h-[65%] md:h-full flex flex-col justify-between p-6 md:p-10 lg:p-12 overflow-y-auto">
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className="absolute top-6 right-6 p-2 rounded-full border border-neutral-200/30 dark:border-white/15 bg-white/5 dark:bg-[#0A0A0A]/80 text-neutral-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all duration-300 hover:scale-105 z-20"
                aria-label="Close panel"
              >
                <X size={18} />
              </button>

              <div className="space-y-6 md:space-y-8 mt-4 md:mt-0">
                {/* Visual Label */}
                <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[#D12B2B] font-bold block">
                  ARTIFACT DIRECTORY
                </span>

                {/* Title and Subtitle */}
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif italic text-neutral-900 dark:text-white leading-tight">
                    {quickViewProject.title}
                  </h2>
                  <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {quickViewProject.subtitle}
                  </p>
                </div>

                {/* Brief Abstract */}
                <div className="space-y-2.5 pt-2 border-t border-neutral-200/10 dark:border-white/5">
                  <span className="text-[10px] tracking-wider font-mono uppercase text-neutral-400 dark:text-neutral-500 block">
                    PROJECT ABSTRACT
                  </span>
                  <p className="text-xs md:text-sm text-neutral-700 dark:text-zinc-300 font-sans font-light leading-relaxed">
                    {quickViewProject.overview}
                  </p>
                </div>

                {/* Core Specifications Bento Metadata Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200/10 dark:border-white/5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase">
                      <User size={10} className="text-[#D12B2B]" />
                      <span>Client</span>
                    </div>
                    <p className="text-xs font-sans font-medium text-neutral-900 dark:text-white">
                      {quickViewProject.client || 'Internal Project'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase">
                      <Briefcase size={10} className="text-[#D12B2B]" />
                      <span>Role</span>
                    </div>
                    <p className="text-xs font-sans font-medium text-neutral-900 dark:text-white">
                      {quickViewProject.role || 'Design & Dev Lead'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom CTA Block */}
              <div className="pt-8 border-t border-neutral-200/10 dark:border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 md:mt-0">
                <button
                  onClick={handleViewFullCaseStudy}
                  onMouseEnter={() => setCursorMode('hover')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-900 text-white dark:bg-[#D12B2B] dark:text-white font-sans text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 dark:hover:bg-[#b02222] transition-colors rounded-sm shadow-lg group"
                >
                  <span>View Full Case Study</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button
                  onClick={handleClose}
                  onMouseEnter={() => setCursorMode('hover')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="w-full sm:w-auto text-center py-2 text-neutral-500 dark:text-zinc-400 hover:text-black dark:hover:text-white font-mono text-[10px] tracking-wider uppercase transition-colors"
                >
                  Dismiss Overlay
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
