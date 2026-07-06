import React from 'react';
import { motion } from 'motion/react';
import { usePortfolioStore } from '../hooks/usePortfolioStore';

interface CreativeButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  index?: string;
  className?: string;
}

export const CreativeButton: React.FC<CreativeButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  index,
  className = '',
}) => {
  const { setCursorMode } = usePortfolioStore();

  // Primary variant: Solid crimson button with sliding tech dark mask overlay, drafting crosshairs on hover, and custom vector arrow
  if (variant === 'primary') {
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setCursorMode('hover')}
        onMouseLeave={() => setCursorMode('default')}
        className={`relative group select-none overflow-hidden font-mono text-[11.5px] font-bold tracking-[0.22em] uppercase px-8 py-4 bg-[#7b2121] text-white rounded-sm border border-[#7b2121] transition-all duration-500 ease-[0.16,1,0.3,1] shadow-lg shadow-[#7b2121]/10 active:scale-[0.98] ${className}`}
      >
        {/* Slid-over background overlay for premium modern feel */}
        <div className="absolute inset-0 bg-[#0A0A0A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />

        {/* Content Wrapper */}
        <div className="relative z-10 flex items-center justify-center gap-2.5 transition-colors duration-500 group-hover:text-white">
          {index && (
            <span className="text-[9px] opacity-40 group-hover:opacity-60 transition-opacity font-medium tracking-normal mr-0.5">
              [{index}]
            </span>
          )}
          <span>{children}</span>
          
          {/* Custom vector architectural arrow */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="transform transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <path
              d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Framing Corners (Minimalistic Technical Ticks) */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-white/20 transition-colors duration-500" />
        <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-white/20 transition-colors duration-500" />
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-white/20 transition-colors duration-500" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-white/20 transition-colors duration-500" />
      </button>
    );
  }

  // Secondary variant: Minimalist outlined drafting button with thin red hover track & diagonal displacement
  if (variant === 'secondary') {
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setCursorMode('hover')}
        onMouseLeave={() => setCursorMode('default')}
        className={`relative group select-none overflow-hidden font-mono text-[11.5px] font-medium tracking-[0.22em] uppercase px-8 py-4 bg-transparent text-neutral-200 dark:text-zinc-200 rounded-sm border border-neutral-300 dark:border-white/10 hover:border-white dark:hover:border-white transition-all duration-500 ease-[0.16,1,0.3,1] active:scale-[0.98] ${className}`}
      >
        {/* Red sliding track at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7b2121] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1] origin-left" />

        {/* Soft background glow */}
        <div className="absolute inset-0 bg-[#7b2121]/0 group-hover:bg-white group-hover:text-black/[0.05] dark:group-hover:bg-white group-hover:text-black/[0.08] transition-colors duration-500" />

        {/* Content Wrapper */}
        <div className="relative z-10 flex items-center justify-center gap-2.5 transition-all duration-500 group-hover:text-white">
          {index && (
            <span className="text-[9px] text-neutral-400 dark:text-neutral-400 group-hover:text-white transition-colors font-mono tracking-normal mr-0.5">
              {index}//
            </span>
          )}
          <span>{children}</span>
          
          {/* Minimal coordinate cross */}
          <div className="relative w-2.5 h-2.5 flex items-center justify-center">
            <span className="absolute w-2.5 h-[1px] bg-neutral-400 dark:bg-zinc-600 group-hover:bg-white transition-colors" />
            <span className="absolute h-2.5 w-[1px] bg-neutral-400 dark:bg-zinc-600 group-hover:bg-white transition-colors" />
          </div>
        </div>

        {/* Dynamic decorative red dot in top-right */}
        <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-transparent group-hover:bg-white group-hover:text-black transition-colors duration-500" />
      </button>
    );
  }

  // Tertiary variant: Pure minimal text link with clean kinetic line sweep
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setCursorMode('hover')}
      onMouseLeave={() => setCursorMode('default')}
      className={`relative group select-none font-mono text-[11px] font-bold tracking-[0.25em] uppercase py-2 bg-transparent text-neutral-200 transition-colors duration-300 ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
        {children}
        <span className="text-[9px] text-white font-mono transform transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#7b2121] group-hover:w-full transition-all duration-500 ease-[0.16,1,0.3,1]" />
    </button>
  );
};
