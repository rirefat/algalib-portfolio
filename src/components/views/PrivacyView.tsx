import React from 'react';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { Shield, ArrowLeft } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  const { setCurrentView } = usePortfolioStore();

  return (
    <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 space-y-8 select-none">
      
      {/* Return action */}
      <button
        onClick={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 hover:text-[#7b2121] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to home</span>
      </button>

      {/* Meta header */}
      <div className="space-y-4 border-b border-neutral-200/40 dark:border-white/5 pb-6">
        <div className="w-12 h-12 rounded-sm bg-[#7b2121]/10 text-white flex items-center justify-center border border-[#7b2121]/20 animate-pulse">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-serif italic text-white">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-neutral-400">
          LAST MODIFIED: JULY 04, 2026
        </p>
      </div>

      {/* Narrative */}
      <div className="text-sm font-sans text-neutral-400 dark:text-zinc-400 space-y-6 leading-relaxed font-light">
        <p>
          This privacy policy documents our practices regarding the information processed on this portfolio website for **Abdullah Al Galib (Al Galib)**.
        </p>

        <h3 className="text-lg font-bold font-serif italic text-white">
          1. Information We Collect
        </h3>
        <p>
          We do not track, profile, or sell any personal data of visitors browsing this portfolio. Any details provided via our direct contact form (including name, email address, and project brief) are processed securely solely for initiating design collaboration inquiries.
        </p>

        <h3 className="text-lg font-bold font-serif italic text-white">
          2. Cookies & Local Storage
        </h3>
        <p>
          We use browser local storage exclusively to persist client preferences (such as light or dark theme choices, and reduced motion settings). These are stored locally on your device and are never transmitted to any external analytics database.
        </p>

        <h3 className="text-lg font-bold font-serif italic text-white">
          3. Security
        </h3>
        <p>
          We implement industry-standard encryption protocols. Data is hosted securely on modern servers with zero third-party access coordinates.
        </p>

        <h3 className="text-lg font-bold font-serif italic text-white">
          4. Contact
        </h3>
        <p>
          For questions, or to request complete deletion of any submitted creative briefs, email us at <strong className="text-white font-medium">rafiulrefat23@gmail.com</strong>.
        </p>
      </div>

    </div>
  );
};
