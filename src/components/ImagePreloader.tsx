import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS, TESTIMONIALS } from '../data/portfolioData';
const galibImage = 'https://i.ibb.co.com/tMNC5hMv/al-galib-image.png';
const aboutImage = 'https://i.ibb.co.com/tMNC5hMv/al-galib-image.png';

interface ImagePreloaderProps {
  onComplete: () => void;
}

export const ImagePreloader: React.FC<ImagePreloaderProps> = ({ onComplete }) => {
  const [displayedPercent, setDisplayedPercent] = useState(0);
  const [actualPercent, setActualPercent] = useState(0);
  const [statusText, setStatusText] = useState('Initializing spatial assets...');
  const [isExiting, setIsExiting] = useState(false);
  const percentRef = useRef(0);

  // 1. Gather all high-res portfolio images
  useEffect(() => {
    const urls: string[] = [];

    // Add portfolio projects images
    PROJECTS.forEach((project) => {
      if (project.image) urls.push(project.image);
      if (project.beforeImage) urls.push(project.beforeImage);
      if (project.afterImage) urls.push(project.afterImage);
      if (project.gallery) {
        project.gallery.forEach((img) => {
          if (img) urls.push(img);
        });
      }
    });

    // Add testimonial avatar images
    TESTIMONIALS.forEach((t) => {
      if (t.avatar) urls.push(t.avatar);
    });

    // Add Galib portrait
    if (galibImage) {
      urls.push(galibImage);
    }
    if (aboutImage) {
      urls.push(aboutImage);
    }

    // De-duplicate URLs
    const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));
    const totalImages = uniqueUrls.length;

    if (totalImages === 0) {
      setActualPercent(100);
      return;
    }

    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      const currentPercent = Math.round((loadedCount / totalImages) * 100);
      setActualPercent(currentPercent);
    };

    // Preload each image asynchronously
    uniqueUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // Continue even if an image fails to load
    });

    // Enforce a maximum timeout of 5 seconds to ensure the user is never stuck
    const timeout = setTimeout(() => {
      setActualPercent(100);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  // 2. Smooth the displayed progress percentage
  useEffect(() => {
    const interval = setInterval(() => {
      if (percentRef.current < actualPercent) {
        percentRef.current += 1;
        setDisplayedPercent(percentRef.current);
      } else if (percentRef.current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
        }, 600);
      }
    }, 12); // Smooth fluid increments

    return () => clearInterval(interval);
  }, [actualPercent]);

  // 3. Update the status messages dynamically matching Al Galib's design philosophy
  useEffect(() => {
    if (displayedPercent < 20) {
      setStatusText('WARMING GEOMETRIC CANVAS...');
    } else if (displayedPercent < 45) {
      setStatusText('CACHING EDITORIAL PHOTOGRAPHY...');
    } else if (displayedPercent < 70) {
      setStatusText('NESTING DEPTH & REFRACTION LAYERS...');
    } else if (displayedPercent < 90) {
      setStatusText('CALIBRATING ABSOLUTE SUBTRACTION MATRIX...');
    } else if (displayedPercent < 100) {
      setStatusText('ALIGNING CHRONOS METRICS & COORDINATES...');
    } else {
      setStatusText('SYSTEM READY. DISPELLING SHADOWS.');
    }
  }, [displayedPercent]);

  const padZero = (num: number): string => {
    if (num < 10) return `00${num}`;
    if (num < 100) return `0${num}`;
    return `${num}`;
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -20,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col justify-between p-8 md:p-12 select-none overflow-hidden"
        >
          {/* Subtle Technical Drafting Grid Background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Top segment: Title and coordinates */}
          <div className="flex justify-between items-start z-10">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#D12B2B] font-bold uppercase block">
                AL GALIB PORTFOLIO
              </span>
              <span className="text-[9px] font-mono text-zinc-500 tracking-wider block">
                ESTABLISHED 2020 // DUPLICATE PREVENTER ACTIVE
              </span>
            </div>
            <div className="text-right space-y-1">
              <span className="text-[9px] font-mono text-zinc-500 tracking-wider block">
                CORE SYSTEM CAPABILITIES: ON
              </span>
              <span className="text-[9px] font-mono text-zinc-500 tracking-wider block">
                UTC+6 DHAKA // ACCESSIBILITY ACTIVE
              </span>
            </div>
          </div>

          {/* Center segment: Giant Percentage, Progress line, & Compass ornament */}
          <div className="flex flex-col items-center justify-center space-y-10 z-10 my-auto">
            {/* Elegant Compass / Crosshair Motif */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border border-zinc-800 rounded-full"
              />
              <div className="w-1.5 h-1.5 bg-[#D12B2B] rounded-full" />
              <div className="absolute h-6 w-[1px] bg-zinc-800" />
              <div className="absolute w-6 h-[1px] bg-zinc-800" />
            </div>

            {/* Giant Monospace Stabilized Percentage Tracker */}
            <div className="text-center">
              <div className="text-8xl md:text-9xl lg:text-[10rem] font-black font-mono tracking-tighter text-zinc-100 flex items-baseline justify-center">
                <span>{padZero(displayedPercent)}</span>
                <span className="text-2xl md:text-3xl text-zinc-600 font-sans font-light ml-1">%</span>
              </div>
            </div>

            {/* Premium Centered Thin Progress Bar */}
            <div className="w-full max-w-sm h-[1px] bg-zinc-900 relative overflow-hidden">
              <motion.div
                className="absolute h-full bg-[#D12B2B] left-0 top-0"
                style={{ width: `${displayedPercent}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Bottom segment: Loading details and active system status */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 z-10 border-t border-zinc-900 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D12B2B] animate-ping" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#D12B2B]" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 font-semibold uppercase">
                {statusText}
              </span>
            </div>
            
            <div className="text-zinc-600 font-mono text-[9px] uppercase tracking-wider">
              {displayedPercent === 100 ? (
                <span className="text-emerald-500 font-bold">READY TO COMMENCE</span>
              ) : (
                <span>WARMING CACHE SYSTEM...</span>
              )}
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
