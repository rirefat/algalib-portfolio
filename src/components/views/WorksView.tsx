import React, { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { ProjectCard } from '../ProjectCard';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { motion, AnimatePresence } from 'motion/react';

export const WorksView: React.FC = () => {
  const { setCursorMode } = usePortfolioStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'ui-ux' | 'graphic' | 'branding'>('all');

  const categories = [
    { label: 'All Artifacts', id: 'all' as const },
    { label: 'UI/UX Design', id: 'ui-ux' as const },
    { label: 'Graphic Design', id: 'graphic' as const },
    { label: 'Brand Identity', id: 'branding' as const },
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ui-ux') {
      const cat = project.category.toLowerCase();
      return cat.includes('product') || cat.includes('ui') || cat.includes('ux');
    }
    if (activeFilter === 'graphic') {
      return project.category.toLowerCase().includes('graphic');
    }
    if (activeFilter === 'branding') {
      return project.category.toLowerCase().includes('brand');
    }
    return true;
  });

  return (
    <div className="space-y-16 pb-24 px-6 max-w-7xl mx-auto pt-32 md:pt-40 lg:pt-44 select-none">
      
      {/* 1. Header Hero Area */}
      <section className="space-y-4 max-w-3xl">
        <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B]">
          INDEXED CURATIONS
        </span>
        <h1 className="text-fluid-h1 font-light font-serif italic text-neutral-900 dark:text-white leading-[1.05]">
          Curated Visual Collections.
        </h1>
        <p className="text-sm md:text-base text-neutral-600 dark:text-zinc-400 font-sans max-w-xl leading-relaxed font-light">
          Explore award-winning digital spatial interfaces, tactical superbike telemetry dashboards, structural visual badging, and physical magazine grids.
        </p>
      </section>

      {/* 2. Visual Metrics & Filter Bar */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-200/40 dark:border-white/5 pb-6">
        
        {/* Dynamic tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1 bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 rounded-full backdrop-blur-sm relative">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className="relative px-5 py-2.5 rounded-full font-sans text-xs font-semibold tracking-wide transition-colors duration-300 z-10"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeWorksTab"
                    className="absolute inset-0 bg-neutral-900 dark:bg-[#D12B2B] rounded-full z-[-1]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200'}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Static high-end indices indicators */}
        <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          <div>
            SHOWCASE COUNT: <span className="text-[#D12B2B] font-bold">{filteredProjects.length}</span>
          </div>
          <div>
            TOTAL REPUTATIONS: <span className="text-neutral-900 dark:text-white font-bold">5 WINNERS</span>
          </div>
        </div>
      </section>

      {/* 3. Curator Project Cards Grid */}
      <section>
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center border border-dashed border-neutral-200/40 dark:border-white/5 rounded-sm w-full"
            >
              <p className="text-sm text-neutral-500 font-sans font-medium">
                No matching artifacts index available in this category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

    </div>
  );
};
