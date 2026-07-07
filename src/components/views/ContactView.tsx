import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { Check, ArrowUpRight, Copy, Globe2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ContactView: React.FC = () => {
  const { setCursorMode } = usePortfolioStore();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [discipline, setDiscipline] = useState('Product Design');
  
  // Validation and process states
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const progress = (([name, email, brief].filter(f => f.trim().length > 0).length) / 3) * 100;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('abdullahalgalib255@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleValidationAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: string[] = [];

    if (!name.trim()) validationErrors.push('Your name or company is required.');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) validationErrors.push('Please enter a valid email address.');
    
    if (brief.length < 15) validationErrors.push('Please describe your creative brief with at least 15 characters.');

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Success simulation
    setErrors([]);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Reset form
      setName('');
      setEmail('');
      setBrief('');
    }, 1800);
  };

  const disciplines = [
    'Product Design',
    'Brand Identity',
    'Digital Experience',
    'Art Direction'
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto select-none relative overflow-hidden">
      
      {/* Cosmic Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: 'linear-gradient(#7b2121 1px, transparent 1px), linear-gradient(90deg, #7b2121 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7b2121]/5 blur-[120px] rounded-full pointer-events-none z-0 transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#7b2121]/5 blur-[150px] rounded-full pointer-events-none z-0 transform -translate-x-1/3 translate-y-1/3" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 lg:mb-32 relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-6 mb-8">
            <span className="w-16 h-[1px] bg-[#7b2121]/50"></span>
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#ff8a8a]">
              Initiate Contact
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light font-serif italic text-white leading-[1.05] tracking-tight drop-shadow-md">
            Let's shape the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a8a] to-[#7b2121]">future</span>.
          </h1>
        </div>
        <div className="max-w-xs hidden md:block">
          <p className="text-sm font-sans text-neutral-400 font-light leading-relaxed">
            Book an onboarding session, request capability sheets, or describe your project requirements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
        
        {/* Left Column: Contact Details */}
        <div className="lg:col-span-4 flex flex-col gap-12 lg:gap-16">
          
          {/* Status Terminal Widget */}
          <div className="relative p-6 md:p-8 rounded-[2rem] border border-[#7b2121]/30 bg-gradient-to-br from-[#0c0202] via-[#1a0505] to-[#050101] shadow-[0_0_30px_rgba(123,33,33,0.1)] overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,33,33,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="flex justify-between items-start mb-10 relative z-10">
              <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#ff8a8a] flex items-center gap-3">
                <div className="relative flex items-center justify-center w-2 h-2">
                  <div className="absolute w-full h-full bg-[#ff4a4a] rounded-full animate-ping opacity-75" />
                  <div className="relative w-1 h-1 bg-[#ff4a4a] rounded-full" />
                </div>
                System Status
              </h3>
              <Globe2 className="w-4 h-4 text-[#7b2121] group-hover:text-[#ff8a8a] transition-colors duration-500" />
            </div>
            
            <div className="space-y-8 relative z-10">
              <div>
                <p className="text-[10px] font-mono tracking-widest text-neutral-500 mb-2">AVAILABILITY</p>
                <p className="text-sm md:text-base font-sans text-neutral-300 font-light leading-relaxed">
                  Currently accepting selective design projects for {new Date().toLocaleString('default', { month: 'long' })}.
                </p>
              </div>
            </div>
          </div>

          {/* Direct Contacts */}
          <div className="space-y-6 pt-4 border-t border-white/5">
            <h3 className="text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-neutral-600"></span> DIRECT CHANNELS
            </h3>
            
            <button 
              onClick={handleCopy}
              onMouseEnter={() => setCursorMode('hover')}
              onMouseLeave={() => setCursorMode('default')}
              className="w-full text-left group flex items-center justify-between pb-6 border-b border-white/5 hover:border-white/20 transition-all duration-500"
            >
              <div className="flex flex-col items-start gap-2">
                <span className="text-[10px] font-mono tracking-widest text-neutral-600 group-hover:text-[#ff8a8a] transition-colors">EMAIL</span>
                <span className="text-sm md:text-base font-sans font-light text-neutral-300 group-hover:text-white transition-colors">abdullahalgalib255@gmail.com</span>
              </div>
              <div className="relative w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-[#7b2121]/50 group-hover:bg-[#7b2121]/10 transition-all duration-500 overflow-hidden">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div key="check" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                      <Check className="w-4 h-4 text-[#ff8a8a]" />
                    </motion.div>
                  ) : (
                    <motion.div key="copy" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                      <Copy className="w-4 h-4 text-neutral-500 group-hover:text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </div>

          {/* Enhanced Socials Section */}
          <div className="space-y-6 pt-8 border-t border-white/5">
            <h3 className="text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-neutral-600"></span> DIGITAL PRESENCE
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/abdullahalgalib' },
                { name: 'Behance', url: 'http://behance.net/Abdullahalgalib' }
              ].map((social, i) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorMode('hover')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="group relative flex items-center justify-between p-6 rounded-[1.5rem] border border-white/5 bg-white/[0.01] hover:bg-[#7b2121]/5 hover:border-[#7b2121]/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7b2121]/0 via-[#7b2121]/10 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                  
                  <div className="relative z-10 flex items-center gap-6">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-600 group-hover:text-[#ff8a8a] transition-colors duration-500">
                      0{i + 1}
                    </span>
                    <span className="text-2xl md:text-3xl font-serif italic text-neutral-400 group-hover:text-white transition-colors duration-500">
                      {social.name}
                    </span>
                  </div>
                  
                  <div className="relative z-10 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#ff4a4a] group-hover:bg-[#ff4a4a] group-hover:shadow-[0_0_20px_rgba(255,74,74,0.3)] transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-8 lg:pl-12 xl:pl-24 relative">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex flex-col justify-center items-start space-y-8"
              >
                <div className="relative w-20 h-20">
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border border-emerald-500/30 bg-emerald-500/5"
                  />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
                        d="M20 6L9 17l-5-5"
                      />
                    </svg>
                  </motion.div>
                </div>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl md:text-5xl font-light font-serif italic text-white leading-tight"
                >
                  Transmission <br /> Cleared
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-neutral-400 font-sans font-light leading-relaxed max-w-md"
                >
                  Your brief has safely entered Abdullah Al Galib's design queue. Expect a formal response with calendar slots within 12 business hours.
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  onClick={() => setIsSuccess(false)}
                  onMouseEnter={() => setCursorMode('hover')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="mt-8 px-8 py-4 text-[10px] font-mono tracking-[0.3em] uppercase rounded-full border border-white/10 text-neutral-300 hover:bg-white hover:text-black hover:border-white transition-all duration-500"
                >
                  Send another
                </motion.button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleValidationAndSubmit} 
                className="space-y-12 lg:space-y-16"
              >
                {/* Errors */}
              {errors.length > 0 && (
                <div className="pb-6 border-b border-[#7b2121]/30">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-[#7b2121] mb-3">Corrections Needed:</p>
                  <ul className="space-y-2">
                    {errors.map((err, idx) => (
                      <li key={idx} className="text-sm font-sans font-light text-neutral-400 flex items-start gap-3">
                        <span className="w-1 h-1 rounded-full bg-[#7b2121] mt-2"></span>
                        {err}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Form Fields */}
              {/* Form Progress Indicator */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-[1px] bg-white/5 relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#7b2121] to-[#ff4a4a] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#ff8a8a] w-12 text-right">
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="relative group">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What's your name?" 
                  className="w-full bg-transparent border-b border-white/10 text-2xl md:text-3xl font-light font-serif italic text-white placeholder:text-neutral-600 placeholder:not-italic py-4 focus:outline-none focus:border-[#ff4a4a] transition-colors"
                />
                <span className="absolute left-0 -top-4 text-[9px] font-mono tracking-[0.3em] text-[#ff8a8a] uppercase opacity-0 group-focus-within:opacity-100 transition-opacity">Name / Brand</span>
              </div>
              
              <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="And your email?" 
                  className="w-full bg-transparent border-b border-white/10 text-2xl md:text-3xl font-light font-serif italic text-white placeholder:text-neutral-600 placeholder:not-italic py-4 focus:outline-none focus:border-[#ff4a4a] transition-colors"
                />
                <span className="absolute left-0 -top-4 text-[9px] font-mono tracking-[0.3em] text-[#ff8a8a] uppercase opacity-0 group-focus-within:opacity-100 transition-opacity">Email Address</span>
              </div>

              <div className="space-y-6 pt-4">
                <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-600 uppercase block flex items-center gap-3">
                  <span className="w-3 h-[1px] bg-neutral-700"></span> Primary Discipline
                </span>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {disciplines.map((d) => {
                    const isSelected = discipline === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDiscipline(d)}
                        onMouseEnter={() => setCursorMode('hover')}
                        onMouseLeave={() => setCursorMode('default')}
                        className={`px-6 py-3 rounded-full text-[10px] font-mono tracking-widest uppercase whitespace-nowrap shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isSelected 
                            ? 'bg-gradient-to-r from-[#7b2121] to-[#a52c2c] text-white border-transparent shadow-[0_0_20px_rgba(123,33,33,0.4)] scale-105' 
                            : 'bg-transparent border border-white/10 text-neutral-500 hover:border-[#7b2121]/50 hover:text-white'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative group pt-4">
                <textarea 
                  rows={4}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Tell me about your vision..." 
                  className="w-full bg-transparent border-b border-white/10 text-lg md:text-xl font-light font-sans text-white placeholder:text-neutral-600 py-4 focus:outline-none focus:border-[#ff4a4a] transition-colors resize-none leading-relaxed"
                />
                <span className="absolute left-0 -top-4 text-[9px] font-mono tracking-[0.3em] text-[#ff8a8a] uppercase opacity-0 group-focus-within:opacity-100 transition-opacity">Project Details</span>
              </div>

              <div className="pt-8 flex justify-start">
                <button 
                  type="submit"
                  disabled={isLoading}
                  onMouseEnter={() => setCursorMode('hover')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="group relative overflow-hidden flex items-center justify-center gap-4 w-full md:w-auto px-12 py-5 bg-white text-[#030303] hover:text-white rounded-full transition-all duration-500 font-mono text-[10px] uppercase tracking-[0.3em] disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7b2121] to-[#ff4a4a] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                    {isLoading ? 'Orchestrating...' : 'Send Transmission'}
                  </span>
                  
                  {!isLoading && (
                    <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-500" />
                  )}
                </button>
              </div>
            </motion.form>
          )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
