import React from 'react';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { VelocityHeading } from '../VelocityHeading';
import galibImage from '@/assets/al-galib-image.png';
import { Award, Code, CheckCircle, Lightbulb, Coffee, Compass } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentView, setCursorMode } = usePortfolioStore();

  const stats = [
    { number: '6+', label: 'Years Design Experience' },
    { number: '25+', label: 'Global Clients Served' },
    { number: '5', label: 'Design Awards Won' },
    { number: '100%', label: 'Craftsmanship Focus' },
  ];

  const skillGroups = [
    {
      title: 'Product Design (Digital)',
      skills: ['UI/UX Architecture', 'Interactive Prototyping', 'Spatial Systems Design', 'Design Systems Engineering', 'Usability Mapping'],
    },
    {
      title: 'Graphic Design (Physical & Visual)',
      skills: ['Swiss Grid Typography', 'Bespoke Brand Identities', 'Premium Box Packaging', 'Editorial Curation', 'Logo Geometry Badge Design'],
    },
    {
      title: 'Tools & Workflows',
      skills: ['Figma (Advanced Componentry)', 'Adobe Creative Suite', 'Cinema 4D (Drafts)', 'React / Tailwind CSS / Framer Motion', 'Clay & Physical Prototyping'],
    },
  ];

  const funFacts = [
    'Fascinated by high-precision Swiss mechanical timepieces and skeleton dials.',
    'Obsessed with 1970s Milanese brutalist graphic grids and typesetting.',
    'Fueled by double shots of pure espresso and ambient synth loops under midnight grids.',
    'Drafts concepts with custom graphite pencils on heavy ivory sketchbooks before opening software.',
  ];

  return (
    <div className="space-y-24 pb-24 px-6 max-w-7xl mx-auto pt-32 md:pt-40 lg:pt-44 select-none">
      
      {/* 1. Header Hero block */}
      <section className="space-y-6 max-w-4xl">
        <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B]">
          THE ARTISAN BEHIND THE SCREENS
        </span>
        <VelocityHeading as="h1" direction="right" className="text-fluid-h1 font-light font-serif italic text-neutral-900 dark:text-white leading-[1.05]">
          A Creative Mind Sculpting Visual Legacies.
        </VelocityHeading>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-zinc-300 font-sans font-light leading-relaxed">
          I am Abdullah Al Galib (Al Galib). I combine the analytical precision of digital <strong className="font-semibold text-neutral-900 dark:text-[#F5F5F4]">Product Design</strong> with the emotional gravity of editorial <strong className="font-semibold text-neutral-900 dark:text-[#F5F5F4]">Graphic Design</strong>.
        </p>
      </section>

      {/* 2. Portrait Mockup & Narrative Stories */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Artistic portrait mockup matching the crimson drafting grid aesthetic */}
        <div className="lg:col-span-5 relative group overflow-hidden rounded-sm bg-[#100204] aspect-[4/5] shadow-2xl border border-white/10">
          {/* Base grid layer behind image */}
          <div className="absolute inset-0 technical-grid opacity-30 z-10 pointer-events-none" />
          
          <img
            src={`${galibImage}?v=2`}
            alt="Abdullah Al Galib portrait"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
          
          <div className="absolute bottom-6 left-6 text-white space-y-1 z-20 bg-black/40 backdrop-blur-xs p-2 rounded-xs">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#D12B2B] font-bold">
              AL GALIB
            </span>
            <p className="text-sm font-sans font-bold text-neutral-100">Creative Lead & Principal Designer</p>
          </div>
        </div>

        {/* Narrative blocks */}
        <div className="lg:col-span-7 space-y-8 text-neutral-600 dark:text-zinc-400 font-sans text-base leading-relaxed font-light">
          <VelocityHeading as="h3" direction="left" className="text-xl md:text-2xl font-bold font-serif italic text-neutral-900 dark:text-white tracking-tight">
            Bridging Physical Sensation & Weightless Software.
          </VelocityHeading>
          <p>
            My journey began at the intersection of paper weights, ink absorptions, and typography scales. I spent years study Dutch and Swiss graphic masters, discovering how layouts guide attention, build authority, and evoke trust.
          </p>
          <p>
            As software matured, I realized digital interfaces had become sterile and flat. I set out to apply physical principles—weight, lighting, material refractiveness, and depth—to modern digital operating systems, portals, and dashboard systems.
          </p>
          <p>
            Today, I work with high-end brands, luxury watchmakers, and forward-thinking electric mobility ventures to unify physical branding with stellar, high-end digital applications. My designs do not look like web pages; they feel like custom mechanical systems or spatial luxury art pieces.
          </p>

          {/* Quick stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-neutral-200/40 dark:border-white/5">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <span className="text-2xl md:text-3xl font-serif italic font-bold text-[#D12B2B] block">
                  {stat.number}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Skill Matrices groups */}
      <section className="space-y-12">
        <div className="border-b border-neutral-200/40 dark:border-white/5 pb-6">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B]">
            EXPERTISE BLUEPRINT
          </span>
          <VelocityHeading as="h2" direction="right" className="text-fluid-h2 font-light font-serif italic text-neutral-900 dark:text-white">
            Curated Skill Groups
          </VelocityHeading>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, i) => (
            <div
              key={i}
              className="p-8 rounded-sm bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-md space-y-6 shadow-md"
            >
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white font-serif italic border-b border-neutral-200/40 dark:border-white/5 pb-3">
                {group.title}
              </h4>
              <ul className="space-y-3.5">
                {group.skills.map((skill, skIndex) => (
                  <li key={skIndex} className="flex items-center gap-3 text-sm text-neutral-600 dark:text-zinc-400 font-sans">
                    <CheckCircle className="w-4 h-4 text-[#D12B2B] flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Personality / Personal facts */}
      <section className="space-y-10 bg-[#0A0A0A] text-white rounded-sm p-8 md:p-16 border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#D12B2B]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-4xl space-y-10 relative z-10">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B]">
            BEYOND WORK — PERSONAL HABITS
          </span>
          <VelocityHeading as="h3" direction="left" className="text-2xl md:text-4xl font-bold font-serif italic leading-tight text-[#F5F5F4]">
            Some Curiosities & Values I Live By.
          </VelocityHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {funFacts.map((fact, i) => {
              const icons = [Compass, Award, Coffee, Lightbulb];
              const IconComp = icons[i % icons.length];
              return (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#D12B2B]">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-sans text-zinc-400 leading-relaxed pt-1.5 font-light">
                    {fact}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Direct CTA board */}
      <section className="text-center space-y-6 max-w-xl mx-auto">
        <VelocityHeading as="h3" direction="right" className="text-2xl font-bold font-serif italic text-neutral-900 dark:text-white">
          Want to discover my career timeline?
        </VelocityHeading>
        <p className="text-sm text-neutral-500 dark:text-zinc-400 font-sans font-light">
          Review my professional coordinates, companies I helped scale, and milestones I conquered on the Experience page.
        </p>
        <div>
          <button
            onClick={() => {
              setCurrentView('experience');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onMouseEnter={() => setCursorMode('hover')}
            onMouseLeave={() => setCursorMode('default')}
            className="px-8 py-3.5 bg-neutral-900 text-white dark:bg-white dark:text-black font-mono text-xs uppercase tracking-widest rounded-full hover:bg-[#D12B2B] dark:hover:bg-[#D12B2B] dark:hover:text-white transition-all shadow-md font-bold"
          >
            EXPLORE CAREER EXPEDITIONS
          </button>
        </div>
      </section>

    </div>
  );
};
