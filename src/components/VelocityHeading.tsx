import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'motion/react';

interface VelocityHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
  direction?: 'left' | 'right';
  maxSkew?: number; // maximum skew in degrees
  maxX?: number;     // maximum horizontal shift in pixels
}

export const VelocityHeading: React.FC<VelocityHeadingProps> = ({
  children,
  className = '',
  as = 'h2',
  direction = 'left',
  maxSkew = 7,
  maxX = 12,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Track vertical scroll velocity
  const scrollVelocity = useVelocity(scrollY);

  const dirMultiplier = direction === 'left' ? -1 : 1;
  
  // Map velocity range (-3000 to 3000) to precise skew & translate values
  const rawSkew = useTransform(
    scrollVelocity,
    [-3000, 3000],
    [-maxSkew * dirMultiplier, maxSkew * dirMultiplier]
  );
  
  const rawX = useTransform(
    scrollVelocity,
    [-3000, 3000],
    [-maxX * dirMultiplier, maxX * dirMultiplier]
  );

  // Apply responsive spring physics to smooth the visual response
  const springConfig = { damping: 40, stiffness: 300, mass: 0.4 };
  const skewX = useSpring(rawSkew, springConfig);
  const x = useSpring(rawX, springConfig);

  const Component = motion[as] as any;

  return (
    <Component
      ref={containerRef}
      style={{ skewX, x }}
      className={`inline-block origin-left transition-shadow ${className}`}
    >
      {children}
    </Component>
  );
};
