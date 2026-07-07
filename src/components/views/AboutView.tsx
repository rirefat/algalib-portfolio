import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { VelocityHeading } from '../VelocityHeading';
import { ArtistAvatar } from '../ArtistAvatar';
import { CreativeButton } from '../CreativeButton';
import { Coins, Mail, Flame, GraduationCap } from 'lucide-react';

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

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, ReactSetIsOpen] = React.useState(false);
  const { setCursorMode } = usePortfolioStore();
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <div className="border-b border-neutral-200/40 dark:border-white/10 last:border-b-0 py-6 md:py-8 group">
      <button 
        onClick={() => ReactSetIsOpen(!isOpen)}
        onMouseEnter={() => setCursorMode('hover')}
        onMouseLeave={() => setCursorMode('default')}
        className="w-full flex items-start gap-4 md:gap-8 text-left focus:outline-none"
      >
        <span className={`text-xs md:text-sm font-mono mt-2 transition-colors duration-500 ${isOpen ? 'text-[#7b2121]' : 'text-neutral-500'}`}>{formattedIndex}</span>
        
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between gap-6">
            <h4 className={`text-xl md:text-3xl font-serif italic pr-8 transition-colors duration-500 ${isOpen ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
              {question}
            </h4>
            <div className={`mt-1 md:mt-2 w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${isOpen ? 'border-[#7b2121] bg-[#7b2121] text-white' : 'border-neutral-500 text-neutral-500 group-hover:border-white group-hover:text-white'}`}>
              <svg className={`w-4 h-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-45' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: -10 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 md:pb-6">
                  <div className="p-6 md:p-8 bg-[#0a0a0a] border border-white/5 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#7b2121]" />
                    <p className="text-neutral-300 font-sans font-light leading-relaxed md:text-lg">
                      {answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
};

const PrincipleCard = ({ index, fact }: { index: number; fact: string }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="group relative cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Line */}
      <div className="flex items-center gap-4 mb-6 relative">
        <span className={`text-xs font-mono tracking-widest font-bold transition-colors duration-500 ${isHovered ? 'text-white' : 'text-[#a53030]'}`}>
          0{index + 1}
        </span>
        <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden">
          {/* Animated track indicator */}
          <motion.div 
            className="absolute top-0 left-0 h-full w-[200%] bg-gradient-to-r from-transparent via-[#ff4a4a] to-transparent"
            initial={{ x: '-100%', opacity: 0 }}
            animate={isHovered ? { x: '50%', opacity: 1 } : { x: '-100%', opacity: 0 }}
            transition={isHovered ? { duration: 2, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
          />
        </div>

        {/* Glowing orb */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ scale: 0, opacity: 0, x: -20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0, opacity: 0, x: 20 }}
              className="absolute right-[20%] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#ff4a4a]/40 flex items-center justify-center bg-[#1a0505]/80 backdrop-blur-md z-20 shadow-[0_0_20px_rgba(255,74,74,0.3)]"
            >
              <motion.div 
                className="w-2.5 h-2.5 rounded-full bg-[#ffcaca]"
                animate={{ boxShadow: ['0 0 0px #ff4a4a', '0 0 15px #ff4a4a', '0 0 0px #ff4a4a'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <p className={`text-lg font-sans font-light leading-relaxed max-w-sm transition-colors duration-500 ${isHovered ? 'text-white' : 'text-neutral-400'}`}>
        {fact}
      </p>
    </div>
  );
};

export const AboutView: React.FC = () => {
  const { setCurrentView, setCursorMode } = usePortfolioStore();

  const stats = [
    { number: '7+', label: 'Years Design Experience' },
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
    { question: "What is your primary design philosophy?", answer: "I believe in 'Architectural Honesty'. Every element must serve a functional purpose. I strip away the superfluous to reveal the core essence of a product, relying on strong typography, precise spacing, and intentional motion to create premium experiences." },
    { question: "How do you approach a new project?", answer: "My process begins with deep immersion into the problem space. I conduct extensive research, analyze the competitive landscape, and define clear strategic goals before sketching any visual concepts." },
    { question: "Do you offer web development services?", answer: "My core expertise is product and graphic design. However, I collaborate seamlessly with engineering teams, delivering meticulous specifications, high-fidelity interactive prototypes, and production-ready assets to ensure pixel-perfect implementation." },
    { question: "What industries do you typically work with?", answer: "I frequently partner with clients in fintech, luxury goods, high-performance automotive, and digital tooling. My high-contrast, minimalist aesthetic is well-suited for brands seeking a highly structured, premium identity." },
    { question: "How long does a typical engagement last?", answer: "Project timelines vary based on scope. A comprehensive brand identity or core product design engagement generally ranges from 4 to 8 weeks, allowing for rigorous research, iterative design, and refinement." },
    { question: "Can we hire you for a quick UI audit?", answer: "Yes, I offer focused UI/UX audits. I will review your existing product, identify usability friction points, and provide actionable design recommendations to elevate the user experience." },
    { question: "What tools do you use in your workflow?", answer: "My primary tool stack includes Figma for interface design and prototyping, Adobe Creative Cloud (Illustrator, Photoshop, After Effects) for visual assets and motion, and custom sketching tools for early ideation." },
    { question: "Do you design for both web and mobile platforms?", answer: "Absolutely. I design responsive, cross-platform experiences, ensuring that the visual integrity and functional logic remain consistent whether on a massive desktop display or a compact mobile screen." },
    { question: "How do you handle project communication and updates?", answer: "I maintain transparent and structured communication. Clients receive regular asynchronous updates via Slack or email, accompanied by weekly synchronous alignment calls to review progress and gather feedback." },
    { question: "Are you available for full-time roles or just freelance?", answer: "I am currently focused on select freelance and contract engagements, partnering with forward-thinking teams. However, I am open to discussing full-time opportunities if the product vision strongly aligns with my design philosophy." }
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
            Certified Graphic Designer with 7+ Years of Experience.
          </VelocityHeading>
          <p>
            I am a Certified Graphic Designer (NSDA Level-3) with more than 7 years of experience in branding and digital design. I specialize in branding, social media design, ad creatives, marketing visuals, and digital content creation, helping businesses build a strong and professional online presence.
          </p>
          <p>
            I have worked as a freelance designer and as a full-time designer at Initux Software Limited and INTECH Properties Ltd. Currently, I work as a Senior Designer at FB International, creating branding, web essentials, and ad creatives for different clients.
          </p>
          <p>
            I also mentor students at DeepNet IT and have strong skills in Adobe Creative Suite, focusing on clear and engaging visual design. My objective is to consistently deliver high-quality, impactful designs that elevate brands and communicate their unique stories effectively.
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
      <section className="relative overflow-hidden rounded-[2.5rem] border border-[#7b2121]/30 bg-gradient-to-br from-[#0c0202] via-[#1a0505] to-[#050101] py-20 px-8 md:px-16 mt-24 mb-12 shadow-[0_0_50px_rgba(123,33,33,0.1)]">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#7b2121 1px, transparent 1px), linear-gradient(90deg, #7b2121 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}
        />
        
        {/* Abstract Glowing Orbs in background */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7b2121]/10 blur-[100px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7b2121]/5 blur-[120px] rounded-full pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 space-y-16">
          <div className="space-y-4">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#ff8a8a] block">
              GUIDING PRINCIPLES
            </span>
            <VelocityHeading as="h3" direction="left" className="text-3xl md:text-5xl font-bold font-serif italic leading-tight text-white drop-shadow-md">
              Some Curiosities & Values I Live By.
            </VelocityHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 pt-8">
            {funFacts.map((fact, i) => (
              <PrincipleCard key={i} index={i} fact={fact} />
            ))}
          </div>
        </div>
      </section>

      {/* 4.5. Life Memberships - Horizontal Accordion */}
      <section className="space-y-10 pt-20 border-t border-neutral-200/40 dark:border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-400 flex items-center gap-3">
              <span className="w-4 h-[1px] bg-neutral-400"></span>
              AFFILIATIONS
            </span>
            <VelocityHeading as="h3" direction="right" className="text-2xl md:text-4xl font-bold font-serif italic leading-tight text-neutral-900 dark:text-white">
              Life Memberships.
            </VelocityHeading>
          </div>
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest max-w-xs text-left md:text-right hidden md:block">
            Commitments to cultural and professional preservation societies.
          </p>
        </div>

        <div className="flex flex-col md:flex-row h-auto md:h-[400px] w-full gap-2">
          {[
            { title: "Bangladesh Numismatics & Collectors Society", short: "Numismatics", code: "BNCS", icon: Coins, color: "text-amber-500 dark:text-amber-400", glow: "bg-amber-500/20 dark:bg-amber-500/10" },
            { title: "Philatelist Association Bangladesh", short: "Philatelist", code: "PAB", icon: Mail, color: "text-sky-500 dark:text-sky-400", glow: "bg-sky-500/20 dark:bg-sky-500/10" },
            { title: "Bangladesh Matchbox Collectors Club", short: "Matchbox", code: "BMCC", icon: Flame, color: "text-rose-500 dark:text-rose-400", glow: "bg-rose-500/20 dark:bg-rose-500/10" },
            { title: "Alumni Association of Ideal Commerce College", short: "Alumni", code: "AAICC", icon: GraduationCap, color: "text-indigo-500 dark:text-indigo-400", glow: "bg-indigo-500/20 dark:bg-indigo-500/10" },
          ].map((item, i) => (
            <div 
              key={i} 
              className="group relative flex-1 md:hover:flex-[2.5] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden bg-neutral-50 dark:bg-[#0A0A0A] border border-neutral-200/40 dark:border-white/5 hover:border-neutral-300 dark:hover:border-white/20 min-h-[160px]"
            >
              {/* Colorful Glow Effect */}
              <div className={`absolute right-0 bottom-0 w-64 h-64 md:w-96 md:h-96 rounded-full blur-[80px] md:blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ${item.glow} pointer-events-none transform translate-x-1/4 translate-y-1/4`} />
              
              {/* Elegant oversized colorful graphic */}
              <div className="absolute right-0 bottom-0 p-8 opacity-[0.15] dark:opacity-[0.1] group-hover:opacity-[0.8] dark:group-hover:opacity-[0.6] group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none transform translate-x-1/4 translate-y-1/4">
                <item.icon className={`w-48 h-48 md:w-64 md:h-64 ${item.color} drop-shadow-2xl`} strokeWidth={1} />
              </div>
              
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10 h-full">
                
                {/* Top Section */}
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-500">
                    0{i + 1}
                  </span>
                  <div className="h-6 overflow-hidden">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7b2121] block translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      {item.code}
                    </span>
                  </div>
                </div>
                
                {/* Bottom Section - Full Title (Visible on hover on Desktop, always on Mobile) */}
                <div className="flex flex-col justify-end h-full mt-8 md:mt-0 md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
                   <h4 className="text-lg md:text-2xl font-serif italic text-black dark:text-white leading-snug">
                     {item.title}.
                   </h4>
                   <div className="w-0 h-[1px] bg-black/20 dark:bg-white/20 mt-6 group-hover:w-full transition-all duration-1000 ease-in-out delay-100" />
                </div>

                {/* Vertical Short Title (Visible non-hover on Desktop) */}
                <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                   <span className="origin-center -rotate-90 whitespace-nowrap text-xl font-serif text-neutral-300 dark:text-neutral-700 tracking-widest uppercase">
                     {item.short}
                   </span>
                </div>
              </div>

              {/* Background gradient effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* 4.6. FAQ Section */}
      <section className="space-y-10 pt-16 border-t border-neutral-200/40 dark:border-white/10">
        <div className="w-full space-y-10">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block">
            INQUIRIES
          </span>
          <VelocityHeading as="h3" direction="right" className="text-2xl md:text-4xl font-bold font-serif italic leading-tight text-white">
            Common Client Questions.
          </VelocityHeading>
          <div className="pt-8">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
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
