import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolioStore } from '../hooks/usePortfolioStore';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { setCursorMode } = usePortfolioStore();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          onMouseEnter={() => setCursorMode('hover')}
          onMouseLeave={() => setCursorMode('default')}
          className="fixed bottom-12 md:bottom-20 right-6 md:right-10 z-50 group flex flex-col items-center justify-center gap-2"
          aria-label="Scroll to top"
        >
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/0 group-hover:text-white/60 transition-all duration-500 -translate-y-2 group-hover:translate-y-0 pointer-events-none">
            Top
          </span>
          <div className="relative flex items-center justify-center w-14 h-14">
            {/* Outer static ring */}
            <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/30 group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
            
            {/* Inner dashed spinning ring */}
            <div className="absolute inset-1.5 rounded-full border border-dashed border-white/20 animate-[spin_15s_linear_infinite] group-hover:animate-[spin_5s_linear_infinite] opacity-50 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Core dot */}
            <div className="relative flex items-center justify-center w-8 h-8 bg-white/5 backdrop-blur-md group-hover:bg-white text-white group-hover:text-black rounded-full transition-all duration-500">
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
