import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { VelocityHeading } from '../VelocityHeading';
import { ArtistAvatar } from '../ArtistAvatar';
import { CreativeButton } from '../CreativeButton';

import { SkillsExpertise } from '../SkillsExpertise';
const aboutImage = 'https://i.ibb.co.com/tMNC5hMv/al-galib-image.png';

const AnimatedCounter = ({ value }: { value: string }) => {
  const numericValue = parseInt(value.replace(/\D/g, ''), 10);
  const suffix = value.replace(/\d/g, '');

  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [motionValue, isInView, numericValue]);

  const display = useTransform(springValue, (current) => Math.round(current) + suffix);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, ReactSetIsOpen] = React.useState(false);
  const { setCursorMode } = usePortfolioStore();

  return (
    <div className="border-b border-neutral-200/40 dark:border-white/10 last:border-b-0 py-6">
      <button 
        onClick={() => ReactSetIsOpen(!isOpen)}
        onMouseEnter={() => setCursorMode('hover')}
        onMouseLeave={() => setCursorMode('default')}
        className="w-full flex items-center justify-between text-left focus:outline-none group"
      >
        <h4 className="text-xl md:text-2xl font-serif italic text-neutral-800 dark:text-white pr-8 group-hover:text-[#7b2121] transition-colors duration-300">{question}</h4>
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'border-[#7b2121] text-[#7b2121]' : 'border-neutral-300 dark:border-white/20 text-neutral-400 dark:text-white/50 group-hover:border-[#7b2121] group-hover:text-[#7b2121]'}`}>
          <svg className={`w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="pt-6 text-neutral-500 dark:text-neutral-400 font-sans font-light leading-relaxed max-w-2xl">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

export const AboutView: React.FC = () => {
  const { setCurrentView, setCursorMode } = usePortfolioStore();

  const stats = [
    { number: '6+', label: 'Years Design Experience' },
    { number: '25+', label: 'Global Clients Served' },
    { number: '5', label: 'Design Awards Won' },
    { number: '100%', label: 'Craftsmanship Focus' },
  ];

  const funFacts = [
    'Fascinated by high-precision Swiss mechanical timepieces and skeleton dials.',
    'Obsessed with 1970s Milanese brutalist graphic grids and typesetting.',
    'Fueled by double shots of pure espresso and ambient synth loops under midnight grids.',
    'Drafts concepts with custom graphite pencils on heavy ivory sketchbooks before opening software.',
  ];

  const faqs = [
    { question: "What is your typical design process?", answer: "I begin with deep research and conceptual framing, move into structural wireframing to test interaction logic, and finish with high-fidelity visual design focusing on typography, space, and motion. Every step is highly collaborative." },
    { question: "Do you build the websites you design?", answer: "While my core expertise is in Product and Graphic Design, I frequently collaborate closely with engineering teams and provide highly detailed specifications, interactive prototypes, and production-ready assets to ensure pixel-perfect implementation." },
    { question: "What industries do you usually work with?", answer: "I have partnered with clients across fintech, luxury goods, high-performance automotive, and digital tooling. My minimalist, high-contrast aesthetic adapts well to brands seeking a premium, structured identity." },
    { question: "How long does a typical project take?", answer: "A comprehensive brand identity or core product design engagement usually ranges from 4 to 8 weeks, depending on the complexity of the domain and the required deliverables." }
  ];

  return (
    <div className="space-y-24 pb-24 px-6 max-w-7xl mx-auto pt-32 md:pt-40 lg:pt-44 select-none">
      
      {/* 1. Header Hero block */}
      <section className="space-y-6 max-w-4xl">
        
        <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block">
          ABOUT THE DESIGNER
        </span>
        <VelocityHeading as="h1" direction="right" className="text-fluid-h1 font-light font-serif italic text-white leading-[1.05]">
          A Creative Mind Sculpting Visual Legacies.
        </VelocityHeading>
        <p className="text-lg md:text-xl text-neutral-400 dark:text-zinc-300 font-sans font-light leading-relaxed">
          I am Abdullah Al Galib (Al Galib). I combine the analytical precision of digital <strong className="font-semibold text-white">Product Design</strong> with the emotional gravity of editorial <strong className="font-semibold text-white">Graphic Design</strong>.
        </p>
      </section>

      {/* 2. Portrait Mockup & Narrative Stories */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Artistic portrait mockup matching the crimson drafting grid aesthetic */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-neutral-200/40 dark:border-white/10 group bg-[#0A0A0A] shadow-2xl"
            onMouseEnter={() => setCursorMode('hover')}
            onMouseLeave={() => setCursorMode('default')}
          >
            {/* Real photographic portrait */}
            <img
              src={aboutImage}
              alt="Abdullah Al Galib Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85 group-hover:scale-[1.03] group-hover:opacity-100 transition-all duration-700 ease-[0.16, 1, 0.3, 1]"
            />

            {/* Swiss Precision Drafting Grid & Coordinate Overlays */}
            <div className="absolute inset-0 pointer-events-none border border-[#7b2121]/20 m-3 z-10" />
            
            {/* Tech-Spec Badges */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-1 font-mono text-[9px] uppercase tracking-widest text-white bg-black/75 px-2 py-1.5 backdrop-blur-sm border border-[#7b2121]/30 rounded-sm">
              <span>REF: ABOUT_PORTRAIT_01</span>
              <span className="text-white">AL GALIB</span>
            </div>

            <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-1 font-mono text-[9px] text-right uppercase tracking-widest text-neutral-400 bg-black/75 px-2.5 py-1.5 backdrop-blur-sm border border-white/5 rounded-sm">
              <span className="text-white">ROLE: ARTISAN LEADER</span>
              <span>EST. 1999</span>
            </div>

            {/* Precision Crosshair HUD Overlays */}
            <div className="absolute top-1/2 left-6 right-6 h-[1px] bg-[#7b2121]/15 z-10 pointer-events-none" />
            <div className="absolute left-1/2 top-6 bottom-6 w-[1px] bg-[#7b2121]/15 z-10 pointer-events-none" />
            
            {/* Dynamic visual framing rings */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#7b2121] z-20" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#7b2121] z-20" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#7b2121] z-20" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#7b2121] z-20" />

            {/* Holographic light refraction overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7b2121]/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
          </motion.div>
        </div>

        {/* Narrative blocks */}
        <div className="lg:col-span-7 space-y-8 text-neutral-400 dark:text-zinc-400 font-sans text-base leading-relaxed font-light">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block">
            MY JOURNEY
          </span>
          <VelocityHeading as="h3" direction="left" className="text-xl md:text-2xl font-bold font-serif italic text-white tracking-tight">
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

          {/* Precision Stats Array - Minimal */}
          <div className="pt-8 md:pt-12 w-full mt-6 border-t border-neutral-200/40 dark:border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="text-4xl md:text-5xl font-serif italic text-white tracking-tight">
                    <AnimatedCounter value={stat.number} />
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 leading-relaxed">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Skill Matrices groups */}
      <section className="space-y-12">
        <SkillsExpertise />
      </section>

      {/* 4. Personality / Personal facts */}
      <section className="space-y-10 pt-16 border-t border-neutral-200/40 dark:border-white/10">
        <div className="max-w-4xl space-y-10">
          
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block">
            GUIDING PRINCIPLES
          </span>
          <VelocityHeading as="h3" direction="left" className="text-2xl md:text-4xl font-bold font-serif italic leading-tight text-white">
            Some Curiosities & Values I Live By.
          </VelocityHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 pt-8">
            {funFacts.map((fact, i) => (
              <div 
                key={i} 
                className="flex flex-col gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono tracking-widest text-[#7b2121]">
                    0{i + 1}
                  </span>
                  <div className="w-full h-[1px] bg-neutral-200/40 dark:bg-white/10 group-hover:bg-[#7b2121]/40 transition-colors duration-500" />
                </div>
                <p className="text-base font-sans text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-300 font-light leading-relaxed">
                  {fact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5. FAQ Section */}
      <section className="space-y-10 pt-16 border-t border-neutral-200/40 dark:border-white/10">
        <div className="max-w-4xl space-y-10">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block">
            INQUIRIES
          </span>
          <VelocityHeading as="h3" direction="right" className="text-2xl md:text-4xl font-bold font-serif italic leading-tight text-white">
            Common Client Questions.
          </VelocityHeading>
          <div className="pt-8">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Direct CTA board */}
      <section className="text-center space-y-6 max-w-xl mx-auto pt-16">
        <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block">
          EXPERIENCE
        </span>
        <VelocityHeading as="h3" direction="right" className="text-2xl font-bold font-serif italic text-white">
          Want to discover my career timeline?
        </VelocityHeading>
        <p className="text-sm text-neutral-400 dark:text-zinc-400 font-sans font-light">
          Review my professional coordinates, companies I helped scale, and milestones I conquered on the Experience page.
        </p>
        <div>
          <CreativeButton
            variant="primary"
            index="03"
            onClick={() => {
              setCurrentView('experience');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            EXPLORE CAREER EXPEDITIONS
          </CreativeButton>
        </div>
      </section>

    </div>
  );
};
