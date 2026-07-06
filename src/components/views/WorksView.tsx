import React, { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { ProjectCard } from '../ProjectCard';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const DUMMY_LOGOS = [
  { id: '01', client: 'Aura Skincare', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-square', category: 'brand-identity', description: 'Comprehensive brand identity and packaging design for an organic skincare line, focusing on minimalism and earthy tones.' },
  { id: '02', client: 'Nexus Tech', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-[3/4]', category: 'logos', description: 'Sleek, futuristic logomark created for a B2B SaaS platform specializing in data analytics and machine learning.' },
  { id: '03', client: 'Monolith', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-[4/3]', category: 'icons', description: 'A custom iconography system designed for a fintech application, emphasizing clarity and structural stability.' },
  { id: '04', client: 'Orbit', image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-[16/9]', category: 'logos', description: 'Dynamic wordmark and visual system for a modern logistics company aiming for a global reach.' },
  { id: '05', client: 'Velocity', image: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-square', category: 'brand-identity', description: 'High-energy brand identity for a sports apparel startup, featuring bold typography and vibrant color palettes.' },
  { id: '06', client: 'Zenith', image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-[3/4]', category: 'icons', description: 'Refined icon set for a luxury hospitality brand, integrating elegant strokes and subtle gradients.' },
  { id: '07', client: 'Arc Studios', image: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-[4/5]', category: 'logos', description: 'Monogram and visual identity for an architectural firm, inspired by structural forms and geometry.' },
  { id: '08', client: 'Pulse Data', image: 'https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-[3/2]', category: 'brand-identity', description: 'Data-driven visual identity showcasing dynamic patterns and a clean, technical aesthetic.' },
  { id: '09', client: 'Kinetic', image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-square', category: 'icons', description: 'Action-oriented icon library for a fitness tracking application, designed for maximum legibility at small sizes.' },
  { id: '10', client: 'Echo', image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-[4/3]', category: 'brand-identity', description: 'Visual identity system for a sound engineering studio, utilizing wave-like motifs and a monochromatic palette.' },
  { id: '11', client: 'Nova', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-square', category: 'logos', description: 'Stellar logo design for an aerospace startup, capturing the essence of exploration and cutting-edge technology.' },
  { id: '12', client: 'Lumina', image: 'https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-[3/4]', category: 'icons', description: 'Illuminating icon system for a smart home device ecosystem, focusing on intuitive user interaction.' },
  { id: '13', client: 'Vertex', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-[16/9]', category: 'brand-identity', description: 'Comprehensive brand overhaul for a mountain resort, blending rustic elements with modern typography.' },
  { id: '14', client: 'Prism', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-square', category: 'logos', description: 'Multifaceted logo design for a creative agency, showcasing versatility and a spectrum of services.' },
  { id: '15', client: 'Quantum', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=500', aspect: 'aspect-[4/5]', category: 'icons', description: 'Micro-interactions and iconography for a quantum computing research platform, prioritizing precision and technical accuracy.' },
];

export const WorksView: React.FC = () => {
  const { setCursorMode } = usePortfolioStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'ui-ux' | 'graphic' | 'branding' | 'logos'>('all');
  const [selectedLogo, setSelectedLogo] = useState<typeof DUMMY_LOGOS[0] | null>(null);

  const categories = [
    { label: 'All Artifacts', id: 'all' as const },
    { label: 'UI/UX Design', id: 'ui-ux' as const },
    { label: 'Graphic Design', id: 'graphic' as const },
    { label: 'Brand Identity', id: 'branding' as const },
    { label: 'Logofolio', id: 'logos' as const },
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
        
        <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block">
          ARCHIVE
        </span>
        <h1 className="text-fluid-h1 font-light font-serif italic text-white leading-[1.05]">
          Curated Visual Collections.
        </h1>
        <p className="text-sm md:text-base text-neutral-400 dark:text-zinc-400 font-sans max-w-xl leading-relaxed font-light">
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
                    className="absolute inset-0 bg-neutral-900 dark:bg-[#7b2121] rounded-full z-[-1]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={isActive ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors duration-200'}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Static high-end indices indicators */}
        <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-400">
          <div>
            SHOWCASE COUNT: <span className="text-white font-bold">{activeFilter === 'logos' ? DUMMY_LOGOS.length : filteredProjects.length}</span>
          </div>
          <div>
            TOTAL REPUTATIONS: <span className="text-white font-bold">5 WINNERS</span>
          </div>
        </div>
      </section>

      {/* 3. Curator Project Cards Grid */}
      <section>
        <AnimatePresence mode="popLayout">
          {activeFilter === 'logos' ? (
            <motion.div 
              key="logofolio-masonry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              {DUMMY_LOGOS.map((logo, idx) => (
                <div 
                  key={logo.id}
                  className="break-inside-avoid relative group cursor-pointer"
                  onMouseEnter={() => setCursorMode('hover')}
                  onMouseLeave={() => setCursorMode('default')}
                  onClick={() => setSelectedLogo(logo)}
                >
                  <div className={`w-full ${logo.aspect} bg-white/5 dark:bg-[#050505] border border-neutral-200/40 dark:border-white/5 rounded-sm overflow-hidden relative`}>
                        <img 
                          src={logo.image} 
                          alt={logo.client}
                          className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
                        />
                        
                        {/* Dark gradient overlay for text legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Meta information */}
                        <div className="absolute bottom-0 left-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono tracking-widest text-[#7b2121]">
                              {logo.id}
                            </span>
                            <h3 className="text-lg font-serif italic text-white">
                              {logo.client}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </motion.div>
          ) : filteredProjects.length > 0 ? (
            <motion.div 
              layout
              className="flex flex-col"
            >
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={project} isLast={idx === filteredProjects.length - 1} />
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
              <p className="text-sm text-neutral-400 font-sans font-medium">
                No matching artifacts index available in this category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedLogo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedLogo(null)}
          >
            <button
              onClick={() => setSelectedLogo(null)}
              className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-200 z-50"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="max-w-4xl w-full flex flex-col md:flex-row gap-8 items-center justify-center pointer-events-none"
            >
              <img
                src={selectedLogo.image.replace('w=500', 'w=1200')}
                alt={selectedLogo.client}
                className="w-full md:w-2/3 max-h-[75vh] object-contain rounded-sm"
              />
              <div className="w-full md:w-1/3 space-y-4 text-left pointer-events-auto bg-black/40 p-6 backdrop-blur-md border border-white/10 rounded-sm">
                <span className="text-[10px] font-mono tracking-widest text-[#7b2121] uppercase">
                  Artifact {selectedLogo.id}
                </span>
                <h3 className="text-3xl font-serif italic text-white">
                  {selectedLogo.client}
                </h3>
                <p className="text-sm text-neutral-400 font-sans font-light leading-relaxed">
                  {selectedLogo.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
