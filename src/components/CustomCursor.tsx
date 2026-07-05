import React, { useEffect, useState, useRef } from 'react';
import { usePortfolioStore } from '../hooks/usePortfolioStore';

export const CustomCursor: React.FC = () => {
  const { cursorMode, customCursorText } = usePortfolioStore();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const targetPos = useRef({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouchDevice();

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth interpolation (Lerp) for cursor follower
    let animationFrameId: number;
    const updatePosition = () => {
      setPosition((prev) => {
        const dx = targetPos.current.x - prev.x;
        const dy = targetPos.current.y - prev.y;
        // Adjust speed for a responsive but beautifully lagging feel (lerp factor 0.15)
        const speed = 0.16;
        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });
      animationFrameId = requestAnimationFrame(updatePosition);
    };
    
    updatePosition();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice || isHidden) return null;

  // Render cursor style based on mode
  let cursorClass = "w-4 h-4 bg-[#D12B2B] rounded-full";
  let outerClass = "w-10 h-10 border border-neutral-400 dark:border-neutral-600 rounded-full scale-100";

  if (cursorMode === 'hover') {
    cursorClass = "w-2 h-2 bg-[#D12B2B] rounded-full";
    outerClass = "w-14 h-14 border border-[#D12B2B] bg-[#D12B2B]/10 dark:bg-[#D12B2B]/5 rounded-full scale-110";
  } else if (cursorMode === 'view') {
    cursorClass = "w-16 h-16 bg-[#D12B2B]/90 flex items-center justify-center rounded-full text-[10px] uppercase font-mono tracking-widest text-white font-bold text-center select-none shadow-lg shadow-[#D12B2B]/20";
    outerClass = "w-20 h-20 border border-[#D12B2B]/50 rounded-full scale-105 opacity-50";
  } else if (cursorMode === 'text') {
    cursorClass = "w-1 h-6 bg-[#D12B2B] rounded-sm";
    outerClass = "w-4 h-8 border border-neutral-300 dark:border-neutral-700 rounded-sm scale-100";
  } else if (cursorMode === 'drag') {
    cursorClass = "w-14 h-14 bg-neutral-900/90 dark:bg-white/90 flex items-center justify-center rounded-full text-[10px] uppercase font-mono tracking-widest text-white dark:text-black font-bold text-center select-none shadow-lg";
    outerClass = "w-16 h-16 border border-neutral-400 dark:border-neutral-500 rounded-full scale-105";
  }

  const isExpandedMode = cursorMode === 'view' || cursorMode === 'drag';

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: 'transform 0.1s cubic-bezier(0.215, 0.610, 0.355, 1)',
        transform: `translate(-50%, -50%) ${isClicking ? 'scale(0.85)' : 'scale(1)'}`,
      }}
    >
      {/* Outer Ring */}
      {!isExpandedMode && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out pointer-events-none ${outerClass}`}
          style={{
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
          }}
        />
      )}

      {/* Inner Core */}
      <div
        className={`flex items-center justify-center transition-all duration-300 ease-out pointer-events-none ${cursorClass}`}
      >
        {cursorMode === 'view' && (
          <span className="text-white text-[10px] font-mono tracking-wider font-bold select-none">
            {customCursorText || 'VIEW'}
          </span>
        )}
        {cursorMode === 'drag' && (
          <span className="text-white dark:text-black text-[10px] font-mono tracking-wider font-bold select-none">
            DRAG
          </span>
        )}
      </div>
    </div>
  );
};
