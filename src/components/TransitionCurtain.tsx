import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolioStore } from '../hooks/usePortfolioStore';

export const TransitionCurtain: React.FC = () => {
  const { 
    isTransitioning, 
    setIsTransitioning, 
    pendingView, 
    setActualView,
    setPendingView 
  } = usePortfolioStore();

  const handleAnimationComplete = () => {
    // When the slide-in is complete, update the view state behind the curtain,
    // then immediately slide the curtain out to reveal the new page.
    if (pendingView) {
      setActualView(pendingView);
      setPendingView(null);
      setIsTransitioning(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          id="global-transition-curtain"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.8,
            ease: [0.85, 0, 0.15, 1], // Custom editorial symmetric ease
          }}
          onAnimationComplete={handleAnimationComplete}
          className="fixed inset-0 bg-[#0A0A0A] z-[9999] flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Minimalist Premium Editorial Branding on Curtain */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              delay: 0.15,
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="text-center space-y-3 select-none"
          >
            <div className="font-sans text-3xl md:text-4xl text-[#F5F5F4] tracking-tight">
              Abdullah Al Galib
            </div>
            <div className="h-[1px] w-12 bg-[#7b2121]/50 mx-auto" />
            <div className="text-[10px] tracking-[0.35em] font-mono text-zinc-500 uppercase">
              Visual Experience Architect
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
