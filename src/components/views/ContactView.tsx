import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { Mail, Phone, MapPin, Check, Send, AlertTriangle, Calendar, Globe } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { setCursorMode } = usePortfolioStore();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Design Project');
  const [brief, setBrief] = useState('');
  const [budget, setBudget] = useState('$5,000 — $10,000');
  
  // Validation and process states
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Timezone clock states (Dhaka, Bangladesh Local Time: UTC+6)
  const [dhakaTime, setDhakaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      // Dhaka is UTC+6. Let's calculate based on current system time
      const date = new Date();
      // Use Intl to format exactly in Dhaka timezone
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setDhakaTime(formatter.format(date));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const budgets = [
    '$2,500 — $5,000',
    '$5,000 — $10,000',
    '$10,000 — $25,000',
    '$25,000+'
  ];

  return (
    <div className="space-y-16 pb-24 px-6 max-w-7xl mx-auto pt-32 md:pt-40 lg:pt-44 select-none">
      
      {/* 1. Intro Header block */}
      <section className="space-y-4 max-w-3xl border-b border-neutral-200/40 dark:border-white/5 pb-8">
        <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#D12B2B]">
          CHANNELS & NETWORKS
        </span>
        <h1 className="text-fluid-h1 font-light font-serif italic text-neutral-900 dark:text-white leading-[1.05]">
          Let’s Formulate Sovereignty.
        </h1>
        <p className="text-sm md:text-base text-neutral-600 dark:text-zinc-400 font-sans max-w-xl leading-relaxed font-light">
          Book an onboarding session, request capability sheets, or describe your project requirements in the direct pipeline below.
        </p>
      </section>

      {/* 2. Form & Contacts details grids */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Direct Form portal */}
        <div className="lg:col-span-7 bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-md p-8 md:p-12 rounded-sm relative shadow-md">
          
          {isSuccess ? (
            /* Success confirmation panel */
            <div className="py-12 text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-serif italic text-neutral-900 dark:text-white">
                  Transmission Cleared!
                </h3>
                <p className="text-xs text-neutral-500 dark:text-zinc-400 font-sans max-w-sm mx-auto font-light">
                  Your brief has safely entered Abdullah Al Galib's design queue. Expect a formal response with calendar slots within 12 business hours.
                </p>
              </div>
              <button
                onClick={() => setIsSuccess(false)}
                className="px-6 py-2.5 text-xs font-mono tracking-[0.2em] uppercase rounded-sm border border-neutral-300 dark:border-neutral-850 text-neutral-700 dark:text-zinc-300 hover:bg-[#D12B2B] hover:text-white hover:border-[#D12B2B] transition-all"
              >
                Send another message
              </button>
            </div>
          ) : (
            /* Contact Form inputs */
            <form onSubmit={handleValidationAndSubmit} className="space-y-6">
              
              {/* Errors container list */}
              {errors.length > 0 && (
                <div className="p-4 rounded-sm bg-[#D12B2B]/10 border border-[#D12B2B]/30 text-[#D12B2B] text-xs font-sans space-y-1.5 flex gap-2.5">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold uppercase tracking-wider text-[10px]">CORRECTIONS NEEDED:</p>
                    <ul className="list-disc list-inside space-y-0.5 pt-1">
                      {errors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Form inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase block">
                    Your Name / Brand
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Helena / Aether Labs"
                    className="w-full px-4 py-3 bg-neutral-100/40 dark:bg-neutral-950/40 border border-neutral-200/40 dark:border-white/5 rounded-sm text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-[#D12B2B] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase block">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. client@brand.com"
                    className="w-full px-4 py-3 bg-neutral-100/40 dark:bg-neutral-950/40 border border-neutral-200/40 dark:border-white/5 rounded-sm text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-[#D12B2B] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase block">
                  Venture Focus Area
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-100/40 dark:bg-neutral-950/40 border border-neutral-200/40 dark:border-white/5 rounded-sm text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-[#D12B2B] transition-colors"
                >
                  <option value="Product Design Project">Product Design (Spatial/Digital Systems)</option>
                  <option value="Brand Identity System">Brand Identity & Graphic Curation</option>
                  <option value="Premium Packaging Venture">Premium Physical Packaging</option>
                  <option value="Contract Creative Direction">Direct Creative Consulting</option>
                </select>
              </div>

              {/* Budget slider choices */}
              <div className="space-y-3">
                <label className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase block">
                  Project Budget Index
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {budgets.map((b) => {
                    const isSelected = budget === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        onMouseEnter={() => setCursorMode('hover')}
                        onMouseLeave={() => setCursorMode('default')}
                        className={`py-2 px-3 border rounded-sm text-center text-xs font-semibold tracking-wide transition-all ${
                          isSelected
                            ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-[#D12B2B] dark:border-[#D12B2B] dark:text-white'
                            : 'bg-neutral-100/40 dark:bg-neutral-950/40 border-neutral-200/40 dark:border-white/5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase block">
                  Creative Brief & Core Milestones
                </label>
                <textarea
                  rows={5}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Describe your goals, challenges, parameters, and timeline expectations..."
                  className="w-full px-4 py-3 bg-neutral-100/40 dark:bg-neutral-950/40 border border-neutral-200/40 dark:border-white/5 rounded-sm text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-[#D12B2B] transition-colors resize-none"
                />
              </div>

              {/* Submit Trigger button */}
              <button
                type="submit"
                disabled={isLoading}
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className="w-full py-4 bg-[#D12B2B] hover:bg-[#b02222] text-white font-mono text-xs uppercase tracking-[0.2em] rounded-sm transition-all shadow-md flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>ORCHESTRATING SECURE TRANSFERS...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SUBMIT DESIGN BRIEF</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right column: Technical clocks, physical coords, calendar blocks */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
          
          {/* Active Local Clock Widget (Dhaka) */}
          <div className="p-8 bg-neutral-950 text-white border border-white/5 rounded-sm space-y-6 relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D12B2B]/10 rounded-full blur-[40px] pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Dhaka (Bangladesh)</span>
              </span>
              <span className="px-2 py-0.5 text-[8px] font-mono font-bold bg-emerald-500/10 text-emerald-400 rounded-sm">
                ● ACTIVE & GREEN
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-mono font-bold text-neutral-100 select-none">
                {dhakaTime || '00:00:00 PM'}
              </div>
              <p className="text-[11px] font-mono text-neutral-400">
                ACTIVE COORDS: UTC+6 / DHAKA TIMEZONE
              </p>
            </div>

            <p className="text-xs text-neutral-400 font-sans leading-relaxed font-light">
              I align workflows directly across London, New York, Zurich, and Silicon Valley timelines. Feel free to initiate briefs regardless of local zone.
            </p>
          </div>

          {/* Quick coordinates coordinates contact details list */}
          <div className="p-8 bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-sm rounded-sm space-y-6 shadow-md">
            <h3 className="text-sm font-bold font-serif italic text-neutral-900 dark:text-[#F5F5F4] uppercase tracking-wider border-b border-neutral-200/40 dark:border-white/5 pb-3">
              Direct Channels
            </h3>
            
            <div className="space-y-4">
              <a
                href="mailto:rafiulrefat23@gmail.com"
                className="flex items-center gap-4 text-neutral-600 hover:text-[#D12B2B] dark:text-zinc-300 dark:hover:text-[#D12B2B] transition-colors group"
              >
                <div className="w-10 h-10 rounded-sm bg-white/5 dark:bg-neutral-950 flex items-center justify-center group-hover:bg-[#D12B2B]/10 border border-neutral-200/40 dark:border-white/5">
                  <Mail className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">DIRECT EMAIL</span>
                  <span className="text-sm font-sans font-medium">rafiulrefat23@gmail.com</span>
                </div>
              </a>

              <div className="flex items-center gap-4 text-neutral-600 dark:text-zinc-300">
                <div className="w-10 h-10 rounded-sm bg-white/5 dark:bg-neutral-950 flex items-center justify-center border border-neutral-200/40 dark:border-white/5">
                  <Phone className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">ENCRYPTED SIGNAL</span>
                  <span className="text-sm font-sans font-medium">+880 170 000 000</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-neutral-600 dark:text-zinc-300">
                <div className="w-10 h-10 rounded-sm bg-white/5 dark:bg-neutral-950 flex items-center justify-center border border-neutral-200/40 dark:border-white/5">
                  <MapPin className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">STUDIO COORDS</span>
                  <span className="text-sm font-sans font-medium">Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social connections lists */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorMode('hover')}
              onMouseLeave={() => setCursorMode('default')}
              className="px-5 py-2.5 text-xs font-mono rounded-full bg-white/5 hover:bg-[#D12B2B]/10 dark:bg-[#0A0A0A]/40 dark:hover:bg-neutral-800/40 border border-neutral-200/40 dark:border-white/5 text-neutral-600 dark:text-zinc-300 transition-all"
            >
              LINKEDIN
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorMode('hover')}
              onMouseLeave={() => setCursorMode('default')}
              className="px-5 py-2.5 text-xs font-mono rounded-full bg-white/5 hover:bg-[#D12B2B]/10 dark:bg-[#0A0A0A]/40 dark:hover:bg-neutral-800/40 border border-neutral-200/40 dark:border-white/5 text-neutral-600 dark:text-zinc-300 transition-all"
            >
              DRIBBBLE
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorMode('hover')}
              onMouseLeave={() => setCursorMode('default')}
              className="px-5 py-2.5 text-xs font-mono rounded-full bg-white/5 hover:bg-[#D12B2B]/10 dark:bg-[#0A0A0A]/40 dark:hover:bg-neutral-800/40 border border-neutral-200/40 dark:border-white/5 text-neutral-600 dark:text-zinc-300 transition-all"
            >
              BEHANCE
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};
