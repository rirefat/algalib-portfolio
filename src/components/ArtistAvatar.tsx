import React from 'react';
import { motion } from 'motion/react';
const galibImage = 'https://i.ibb.co.com/tMNC5hMv/al-galib-image.png';

export const ArtistAvatar: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center p-4 rounded-sm bg-[#100204] overflow-hidden group select-none border border-white/10 shadow-2xl">
      {/* 1. Base Crimson Radial Background Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-[#4c0d15]/60 via-[#150204] to-[#0d0102] z-0" />

      {/* 2. Technical Blueprint Drafting Grid Lines */}
      <div className="absolute inset-0 technical-grid opacity-30 z-1 pointer-events-none" />

      {/* 3. Outer Decorative Compass Frame */}
      <div className="absolute inset-4 border border-white/5 rounded-xs pointer-events-none z-10" />
      <div className="absolute inset-6 border border-dashed border-[#7b2121]/10 rounded-xs pointer-events-none z-10" />

      {/* Crosshair Target Marks */}
      <div className="absolute top-2 left-2 text-white/30 font-mono text-[9px] pointer-events-none">+[00, 00]</div>
      <div className="absolute top-2 right-2 text-white/30 font-mono text-[9px] pointer-events-none">+[10, 00]</div>
      <div className="absolute bottom-2 left-2 text-white/30 font-mono text-[9px] pointer-events-none">+[00, 10]</div>
      <div className="absolute bottom-2 right-2 text-white/30 font-mono text-[9px] pointer-events-none">SYS_ACTIVE</div>

      {/* 4. Rotating Swiss Mechanical Gear & Drafting Circles in background */}
      <motion.svg
        className="absolute w-72 h-72 text-white/10 pointer-events-none z-0"
        viewBox="0 0 200 200"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {/* Outer compass degree ring */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="40 10" />
        {/* Gear teeth */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="10"
            x2="100"
            y2="20"
            stroke="currentColor"
            strokeWidth="2"
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}
      </motion.svg>

      {/* Floating Design Calipers/Compass Line */}
      <div className="absolute top-[10%] left-[15%] w-[1px] h-[80%] bg-[#7b2121]/10 pointer-events-none z-0" />
      <div className="absolute top-[50%] left-[5%] right-[5%] h-[1px] bg-[#7b2121]/10 pointer-events-none z-0" />

      {/* 5. Master SVG Geometric Artist Avatar */}
      <motion.div
        className="relative z-10 w-64 h-64 flex items-center justify-center cursor-pointer"
        whileHover="hover"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_10px_25px_rgba(209,43,43,0.15)]"
        >
          <defs>
            {/* Portrait crop clip path */}
            <clipPath id="avatarClip">
              <circle cx="100" cy="100" r="55" />
            </clipPath>
            {/* Soft skin gradient */}
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5d6c6" />
              <stop offset="100%" stopColor="#ddaba0" />
            </linearGradient>
            {/* Shadow skin gradient */}
            <linearGradient id="skinShadowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cb9a8f" />
              <stop offset="100%" stopColor="#ad796d" />
            </linearGradient>
            {/* Hair dark gradient */}
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c2c35" />
              <stop offset="100%" stopColor="#15151a" />
            </linearGradient>
            {/* Crimson metallic highlight */}
            <linearGradient id="crimsonMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            {/* Glass lens shimmer */}
            <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* BACKGROUND HALO */}
          <motion.circle
            cx="100"
            cy="100"
            r="75"
            fill="none"
            stroke="url(#crimsonMetal)"
            strokeWidth="1"
            opacity="0.3"
            variants={{
              hover: { scale: 1.08, opacity: 0.6 }
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* ARTIST COMPASS / RULER (behind ear) */}
          <motion.path
            d="M 50 110 L 65 40 L 75 42 L 60 112 Z"
            fill="#d1d5db"
            stroke="#9ca3af"
            strokeWidth="0.5"
            variants={{
              hover: { rotate: -8, x: -5, y: -2 }
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Graphite tip of custom pencil / scale ruler */}
          <motion.polygon
            points="65,40 68,30 71,41"
            fill="#4b5563"
            variants={{
              hover: { rotate: -8, x: -5, y: -2 }
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* NECK BASE */}
          <polygon points="90,140 110,140 106,170 94,170" fill="url(#skinShadowGrad)" opacity="0.25" />

          {/* CLOTHES / SHIRT */}
          <path
            d="M 65 175 C 65 160, 90 160, 93 168 L 100 178 L 107 168 C 110 160, 135 160, 135 175 L 140 200 L 60 200 Z"
            fill="#1f1f23"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
          {/* Collar Line / Contrast stitching */}
          <path d="M 85 160 L 100 176 L 115 160" fill="none" stroke="#7b2121" strokeWidth="1" opacity="0.6" />

          {/* REAL PORTRAIT LENS OVERLAY (Swiss Mechanical Watch Concept) */}
          <g>
            {/* Outer circular frame border */}
            <circle cx="100" cy="100" r="57" fill="#100204" stroke="url(#crimsonMetal)" strokeWidth="1.5" />
            
            {/* Real portrait photo clipped mathematically */}
            <g clipPath="url(#avatarClip)">
              <image
                href={galibImage}
                x="43"
                y="43"
                width="114"
                height="114"
                preserveAspectRatio="xMidYMid slice"
              />
            </g>

            {/* Futuristic tactical UI glass gauge rings overlay */}
            <circle cx="100" cy="100" r="57" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <circle cx="100" cy="100" r="52" fill="none" stroke="#7b2121" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.45" />
            
            {/* Precision Crosshair Target Mark directly over lens */}
            <line x1="100" y1="36" x2="100" y2="40" stroke="#7b2121" strokeWidth="1" opacity="0.6" />
            <line x1="100" y1="160" x2="100" y2="164" stroke="#7b2121" strokeWidth="1" opacity="0.6" />
            <line x1="36" y1="100" x2="40" y2="100" stroke="#7b2121" strokeWidth="1" opacity="0.6" />
            <line x1="160" y1="100" x2="164" y2="100" stroke="#7b2121" strokeWidth="1" opacity="0.6" />
            
            {/* Glass Lens Light Refraction/Shimmer Reflection */}
            <circle cx="100" cy="100" r="57" fill="url(#shimmer)" pointerEvents="none" />
          </g>
        </svg>

        {/* Hover Target Floating Coordinates */}
        <motion.div
          className="absolute -bottom-4 bg-black/90 px-3 py-1 border border-white/10 rounded-full shadow-lg text-[9px] font-mono tracking-widest text-white uppercase"
          variants={{
            hover: { scale: 1.05, borderColor: '#7b2121' }
          }}
          transition={{ duration: 0.3 }}
        >
          AVATAR_NODE_V3.1
        </motion.div>
      </motion.div>

      {/* 6. Technical Floating Metrics Panels */}
      <div className="absolute top-6 left-6 flex flex-col gap-1 text-[8px] font-mono tracking-widest text-zinc-500 max-w-[120px] pointer-events-none">
        <span className="text-zinc-400 font-bold text-[9px] text-white">SYS_SPEC //</span>
        <span>RESOLUTION: SCALE</span>
        <span>ROT_ANGLE: DYNAMIC</span>
        <span>GRID_LOCK: TRUE</span>
      </div>

      <div className="absolute bottom-6 right-6 flex flex-col gap-1 text-[8px] font-mono tracking-widest text-zinc-500 text-right pointer-events-none">
        <span className="text-zinc-400 font-bold text-[9px]">ENGINE_OP //</span>
        <span>RENDER: VECTOR</span>
        <span>FPS: CAP_60</span>
        <span className="text-white">CRAFT_FACTOR: 1.00</span>
      </div>
    </div>
  );
};
