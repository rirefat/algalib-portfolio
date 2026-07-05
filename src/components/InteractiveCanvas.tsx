import React, { useEffect, useRef } from 'react';
import { usePortfolioStore } from '../hooks/usePortfolioStore';

export const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = usePortfolioStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position
    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic Particle definitions
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      baseAlpha: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const isRed = Math.random() > 0.85;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        color: isRed ? '229, 62, 62' : '150, 150, 150',
        alpha: Math.random() * 0.5 + 0.1,
        baseAlpha: Math.random() * 0.4 + 0.1,
      });
    }

    // Ribbon flow equations
    let time = 0;

    // Canvas render loop
    const render = () => {
      time += 0.002;
      ctx.clearRect(0, 0, width, height);

      // Set backgrounds based on theme
      if (theme === 'dark') {
        ctx.fillStyle = '#100204'; // Premium deep crimson-black from portrait backdrop shadows
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.fillStyle = '#fcfbf9'; // Soft cream off-white
        ctx.fillRect(0, 0, width, height);
      }

      // Draw aesthetic organic glowing backgrounds (large abstract light blobs matching studio portrait)
      const gradientX = width * 0.75;
      const gradientY = height * 0.35;
      const gradientRadius = Math.max(width, height) * 0.6;

      const radialGrad = ctx.createRadialGradient(
        gradientX + Math.sin(time) * 150,
        gradientY + Math.cos(time) * 150,
        20,
        gradientX,
        gradientY,
        gradientRadius
      );

      if (theme === 'dark') {
        radialGrad.addColorStop(0, 'rgba(76, 13, 21, 0.45)'); // Deep warm burgundy center glow
        radialGrad.addColorStop(0.3, 'rgba(209, 43, 43, 0.12)'); // Radiant crimson halo
        radialGrad.addColorStop(0.7, 'rgba(26, 4, 7, 0.2)');
        radialGrad.addColorStop(1, 'rgba(16, 2, 4, 0)');
      } else {
        radialGrad.addColorStop(0, 'rgba(209, 43, 43, 0.04)'); // Ultra-delicate red/rose tint
        radialGrad.addColorStop(0.5, 'rgba(250, 248, 245, 0)');
        radialGrad.addColorStop(1, 'rgba(252, 251, 249, 0)');
      }
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw abstract vector ribbons
      ctx.lineWidth = 1.2;
      const ribbonCount = 3;
      for (let r = 0; r < ribbonCount; r++) {
        ctx.beginPath();
        const offset = r * 150;
        const speedMultiplier = 1 + r * 0.2;

        for (let x = 0; x <= width; x += 20) {
          // Combination of sine waves to simulate a liquid fluid ribbon
          const sinY1 = Math.sin(x * 0.002 + time * speedMultiplier + offset) * 120;
          const sinY2 = Math.cos(x * 0.001 - time * 0.5 * speedMultiplier + r) * 60;
          const y = height * (0.4 + r * 0.1) + sinY1 + sinY2;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        if (theme === 'dark') {
          // High-end translucent charcoal/red lines
          ctx.strokeStyle = r === 0 
            ? 'rgba(229, 62, 62, 0.06)' 
            : 'rgba(255, 255, 255, 0.015)';
        } else {
          ctx.strokeStyle = r === 0 
            ? 'rgba(229, 62, 62, 0.04)' 
            : 'rgba(0, 0, 0, 0.015)';
        }
        ctx.stroke();
      }

      // Render and update particles
      particles.forEach((p) => {
        // Drifting motion
        p.x += p.vx;
        p.y += p.vy;

        // Bounce back inside boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse attraction/magnetic logic
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 250) {
            const force = (250 - distance) / 250;
            // Pull towards mouse slightly
            p.x += (dx / distance) * force * 1.5;
            p.y += (dy / distance) * force * 1.5;
            p.alpha = Math.min(0.8, p.baseAlpha + force * 0.4);
          } else {
            // Decay back to base alpha
            p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          }
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Render particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        const rColor = theme === 'dark' ? p.color : '115, 115, 115';
        ctx.fillStyle = `rgba(${rColor}, ${p.alpha})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Absolute Noise Layer overlay to add fine luxury physical feel */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.015] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
