import React from 'react';
import { VelocityHeading } from './VelocityHeading';
import { 
  SiFigma, SiFigmaHex,
  SiFramer, SiFramerHex,
  SiWebflow, SiWebflowHex,
  SiSketch, SiSketchHex,
  SiBlender, SiBlenderHex,
  SiCinema4d,
  SiInkscape,
  SiMiro,
  SiDavinciresolve
} from '@icons-pack/react-simple-icons';
import { usePortfolioStore } from '../hooks/usePortfolioStore';

const lightenHex = (hex: string) => {
  const darkColors = ['000000', '050038', '020F59'];
  if (darkColors.includes(hex.toUpperCase()) || darkColors.includes(hex)) return '#FFFFFF';
  return `#${hex}`;
};

const SKILL_DOMAINS = [
  {
    id: 'product-design',
    title: 'Product Design',
    description: 'Translating architectural concepts into spatial interfaces. I craft interactive prototypes and scalable design systems that feel intuitive.',
    tools: [
      { name: 'Figma', icon: SiFigma, color: lightenHex(SiFigmaHex) },
      { name: 'Framer', icon: SiFramer, color: lightenHex(SiFramerHex) },
      { name: 'Sketch', icon: SiSketch, color: lightenHex(SiSketchHex) },
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI / UX Design',
    description: 'Designing human-centered digital experiences rooted in empathy. I focus on micro-interactions, responsive fluidity, and accessibility.',
    tools: [
      { name: 'Webflow', icon: SiWebflow, color: lightenHex(SiWebflowHex) },
      { name: 'Miro', icon: SiMiro, color: '#FFD02F' }, 
      { name: '3D UI', icon: SiBlender, color: lightenHex(SiBlenderHex) }, 
    ]
  },
  {
    id: 'visual-graphic',
    title: 'Visual & Graphic',
    description: 'Establishing strong brand identities through editorial typography, bespoke layouts, and meticulous vector geometry.',
    tools: [
      { name: 'Inkscape', icon: SiInkscape, color: '#FFFFFF' }, 
      { name: 'Resolve', icon: SiDavinciresolve, color: '#FFFFFF' }, 
      { name: 'Cinema 4D', icon: SiCinema4d, color: '#2B40D6' }, 
    ]
  }
];

export const SkillsExpertise: React.FC = () => {
  const { setCursorMode } = usePortfolioStore();

  return (
    <div className="space-y-16 w-full py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
        <div className="space-y-2">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block">
            TECHNICAL ARSENAL — 04
          </span>
          <VelocityHeading as="h2" direction="left" className="text-fluid-h1 font-light font-serif italic text-white">
            Tools & Expertise
          </VelocityHeading>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILL_DOMAINS.map((domain, index) => (
          <div 
            key={domain.id} 
            className="group relative p-8 md:p-10 rounded-[2rem] bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-colors duration-500 overflow-hidden"
          >
            {/* Subtle glow on hover */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <div className="space-y-12 relative z-10 flex flex-col h-full justify-between">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-[0.2em] text-white uppercase shadow-sm font-medium">
                  <span className="text-[#7b2121]">0{index + 1}</span>
                  <div className="w-1 h-1 rounded-full bg-neutral-600" />
                  <span>{domain.id.replace('-', ' ')}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif italic text-white leading-tight drop-shadow-sm">
                  {domain.title}
                </h3>
                <p className="text-sm font-sans font-light text-neutral-300 leading-relaxed">
                  {domain.description}
                </p>
              </div>
              
              <div className="pt-6 border-t border-white/5 flex items-center gap-6">
                {domain.tools.map((tool, i) => {
                  const Icon = tool.icon;
                  return (
                    <div 
                      key={i} 
                      className="flex flex-col items-center gap-3 group/tool cursor-pointer"
                      onMouseEnter={() => setCursorMode('hover')}
                      onMouseLeave={() => setCursorMode('default')}
                      style={{ '--hover-color': tool.color } as React.CSSProperties}
                    >
                      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-neutral-400 transition-all duration-500 ease-out group-hover/tool:-translate-y-1 group-hover/tool:bg-white/10 group-hover/tool:border-white/20 group-hover/tool:shadow-xl">
                        <Icon className="w-6 h-6 transition-colors duration-300 group-hover/tool:text-[var(--hover-color)]" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-medium group-hover/tool:text-white transition-colors duration-300">
                        {tool.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
