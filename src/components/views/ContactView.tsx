import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { Check, ArrowUpRight, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto select-none relative">
      
      {/* Background glow */}
      <div className="absolute top-40 right-20 w-[400px] h-[400px] bg-[#7b2121]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 lg:mb-32 relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-6 mb-8">
            <span className="w-16 h-[1px] bg-[#7b2121]/50"></span>
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-500">
              Initiate Contact
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light font-serif italic text-white leading-[1.05] tracking-tight">
            Let's shape the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b2121] to-neutral-500">future</span>.
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
          
          {/* Status / Availability */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-600 mb-6 flex items-center gap-3">
              <span className="w-3 h-[1px] bg-neutral-700"></span> Availability
            </h3>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              <div>
                <p className="text-sm md:text-base font-sans text-neutral-300 font-light leading-relaxed">
                  Currently accepting new projects.
                </p>
                <p className="text-xs md:text-sm font-sans text-neutral-500 font-light mt-2">
                  Available for freelance opportunities and selective collaborations starting next month.
                </p>
              </div>
            </div>
          </div>

          {/* Studio Focus */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-600 mb-6 flex items-center gap-3">
              <span className="w-3 h-[1px] bg-neutral-700"></span> Studio Focus
            </h3>
            <ul className="space-y-3">
              {[
                "End-to-End Product Design",
                "Digital Brand Identity",
                "Design Systems & Architecture",
                "Creative Direction & Strategy"
              ].map((item, idx) => (
                <li key={idx} className="text-xs md:text-sm font-sans font-light text-neutral-400 flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-neutral-700"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="space-y-6 pt-4 border-t border-white/5">
            <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-600 mb-6 flex items-center gap-3">
              <span className="w-3 h-[1px] bg-neutral-700"></span> Direct Channels
            </h3>
            
            <a 
              href="mailto:abdullahalgalib255@gmail.com" 
              onMouseEnter={() => setCursorMode('hover')}
              onMouseLeave={() => setCursorMode('default')}
              className="group flex items-center justify-between pb-6 border-b border-white/5 hover:border-white/50 transition-colors"
            >
              <span className="text-sm md:text-base font-sans font-light text-neutral-300 group-hover:text-white transition-colors">abdullahalgalib255@gmail.com</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
            </a>
          </div>

          {/* Socials */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-600 mb-6 flex items-center gap-3">
              <span className="w-3 h-[1px] bg-neutral-700"></span> Digital Presence
            </h3>
            <div className="flex flex-wrap gap-6">
              {[
                { name: 'LinkedIn', url: '#' },
                { name: 'Dribbble', url: '#' },
                { name: 'Behance', url: '#' }
              ].map(social => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  onMouseEnter={() => setCursorMode('hover')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="group flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-neutral-500 hover:text-white transition-colors"
                >
                  {social.name}
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-8 lg:pl-12 xl:pl-24">
          {isSuccess ? (
            <div className="h-full flex flex-col justify-center items-start space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="w-20 h-20 rounded-full border border-emerald-500/30 flex items-center justify-center bg-emerald-500/5">
                <Check className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-4xl md:text-5xl font-light font-serif italic text-white leading-tight">
                Transmission <br /> Cleared
              </h3>
              <p className="text-neutral-400 font-sans font-light leading-relaxed max-w-md">
                Your brief has safely entered Abdullah Al Galib's design queue. Expect a formal response with calendar slots within 12 business hours.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className="mt-8 px-8 py-4 text-[10px] font-mono tracking-[0.3em] uppercase rounded-full border border-white/10 text-neutral-300 hover:bg-white hover:text-black hover:border-white transition-all duration-500"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleValidationAndSubmit} className="space-y-12 lg:space-y-16">
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
              <div className="relative group">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What's your name?" 
                  className="w-full bg-transparent border-b border-white/10 text-2xl md:text-3xl font-light font-serif italic text-white placeholder:text-neutral-500 placeholder:not-italic py-4 focus:outline-none focus:border-white transition-colors"
                />
                <span className="absolute left-0 -top-4 text-[9px] font-mono tracking-[0.3em] text-white uppercase opacity-0 group-focus-within:opacity-100 transition-opacity">Name / Brand</span>
              </div>
              
              <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="And your email?" 
                  className="w-full bg-transparent border-b border-white/10 text-2xl md:text-3xl font-light font-serif italic text-white placeholder:text-neutral-500 placeholder:not-italic py-4 focus:outline-none focus:border-white transition-colors"
                />
                <span className="absolute left-0 -top-4 text-[9px] font-mono tracking-[0.3em] text-white uppercase opacity-0 group-focus-within:opacity-100 transition-opacity">Email Address</span>
              </div>

              <div className="space-y-6 pt-4">
                <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-600 uppercase block flex items-center gap-3">
                  <span className="w-3 h-[1px] bg-neutral-700"></span> Primary Discipline
                </span>
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {disciplines.map((d) => {
                    const isSelected = discipline === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDiscipline(d)}
                        onMouseEnter={() => setCursorMode('hover')}
                        onMouseLeave={() => setCursorMode('default')}
                        className={`px-6 py-3 rounded-full text-[10px] font-mono tracking-widest uppercase whitespace-nowrap shrink-0 transition-all duration-300 ${
                          isSelected 
                            ? 'bg-white text-black border-transparent scale-105' 
                            : 'bg-transparent border border-white/10 text-neutral-500 hover:border-white/50 hover:text-white'
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
                  className="w-full bg-transparent border-b border-white/10 text-lg md:text-xl font-light font-sans text-white placeholder:text-neutral-500 py-4 focus:outline-none focus:border-white transition-colors resize-none leading-relaxed"
                />
                <span className="absolute left-0 -top-4 text-[9px] font-mono tracking-[0.3em] text-white uppercase opacity-0 group-focus-within:opacity-100 transition-opacity">Project Details</span>
              </div>

              <div className="pt-8 flex justify-start">
                <button 
                  type="submit"
                  disabled={isLoading}
                  onMouseEnter={() => setCursorMode('hover')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="group relative overflow-hidden flex items-center justify-center gap-4 w-full md:w-auto px-12 py-5 bg-white text-[#030303] hover:text-white rounded-full transition-all duration-500 font-mono text-[10px] uppercase tracking-[0.3em] disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-[#7b2121] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                    {isLoading ? 'Orchestrating...' : 'Send Transmission'}
                  </span>
                  
                  {!isLoading && (
                    <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-500" />
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
