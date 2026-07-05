import React, { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { ProjectCard } from '../ProjectCard';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';

export const WorksView: React.FC = () => {
  const { setCursorMode } = usePortfolioStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'product' | 'graphic'>('all');

  const categories = [
    { label: 'All Artifacts', id: 'all' as const },
    { label: 'Product Design', id: 'product' as const },
    { label: 'Graphic Design', id: 'graphic' as const },
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'product') return project.category.toLowerCase().includes('product');
    if (activeFilter === 'graphic') return project.category.toLowerCase().includes('graphic');
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
        <div className="flex flex-wrap items-center gap-2 p-1 bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 rounded-full max-w-md backdrop-blur-sm">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className={`px-6 py-2 rounded-full font-sans text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-[#D12B2B] dark:text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
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
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-neutral-200/40 dark:border-white/5 rounded-sm">
            <p className="text-sm text-neutral-500 font-sans font-medium">
              No matching artifacts index available in this category.
            </p>
          </div>
        )}
      </section>

    </div>
  );
};
