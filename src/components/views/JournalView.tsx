import React, { useState, useEffect } from 'react';
import { JOURNAL_POSTS } from '../../data/portfolioData';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { Calendar, Clock, ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-react';
import { calculateReadingTime } from '../../utils/readingTime';

export const JournalView: React.FC = () => {
  const { setCursorMode } = usePortfolioStore();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const activePost = JOURNAL_POSTS.find((post) => post.id === selectedPostId);

  useEffect(() => {
    if (!activePost) {
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePost]);

  const handlePostClick = (id: string) => {
    setSelectedPostId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedPostId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="space-y-16 pb-24 px-6 max-w-7xl mx-auto pt-32 md:pt-40 lg:pt-44 select-none">
      
      {/* Article Detail View */}
      {activePost ? (
        <article className="max-w-3xl mx-auto space-y-10">
          {/* Scroll progress indicator */}
          <div className="fixed top-0 left-0 right-0 h-1.5 bg-neutral-200 dark:bg-neutral-800 z-[120] pointer-events-none">
            <div 
              className="h-full bg-[#7b2121] transition-all duration-75"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Back Action Trigger */}
          <button
            onClick={handleBack}
            onMouseEnter={() => setCursorMode('hover')}
            onMouseLeave={() => setCursorMode('default')}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 hover:text-[#7b2121] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to journal listings</span>
          </button>

          {/* Meta header details */}
          <div className="space-y-4 border-b border-neutral-200/40 dark:border-white/5 pb-8">
            <span className="px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-sm bg-[#7b2121]/10 text-white border border-[#7b2121]/20">
              {activePost.category}
            </span>
            <h1 className="text-fluid-h1 font-light font-serif italic text-white leading-[1.1]">
              {activePost.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-neutral-400 pt-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{activePost.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>{calculateReadingTime([activePost.title, activePost.excerpt, activePost.content]).text}</span>
                <span className="text-neutral-400 dark:text-zinc-500 font-light font-mono text-[10px]">
                  ({calculateReadingTime([activePost.title, activePost.excerpt, activePost.content]).wordCount} words)
                </span>
              </div>
            </div>
          </div>

          {/* Article typography core body */}
          <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-300 dark:text-neutral-300 font-sans text-base leading-relaxed space-y-6">
            {/* Split paragraph blocks by double newline and format headers */}
            {activePost.content.trim().split('\n\n').map((block, index) => {
              const isHeader3 = block.startsWith('###');
              const isBulletList = block.startsWith('-');

              if (isHeader3) {
                return (
                  <h3 key={index} className="text-xl md:text-2xl font-bold font-serif italic text-white tracking-tight pt-4">
                    {block.replace('###', '').trim()}
                  </h3>
                );
              }

              if (isBulletList) {
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 pl-4 text-neutral-400 dark:text-neutral-400 font-sans font-light">
                    {block.split('\n').map((li, liIndex) => (
                      <li key={liIndex} className="text-sm">
                        {li.replace('-', '').trim()}
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={index} className="leading-relaxed font-light">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Return button */}
          <div className="pt-12 border-t border-neutral-200/40 dark:border-white/5 text-center">
            <button
              onClick={handleBack}
              onMouseEnter={() => setCursorMode('hover')}
              onMouseLeave={() => setCursorMode('default')}
              className="px-8 py-3.5 rounded-sm border border-neutral-300 dark:border-neutral-700 hover:border-[#7b2121] text-xs font-mono tracking-widest uppercase text-neutral-200 dark:hover:border-[#7b2121] transition-colors"
            >
              Back to list index
            </button>
          </div>
        </article>
      ) : (
        /* Grid List of posts */
        <div className="space-y-12">
          {/* Header */}
          <section className="space-y-4 max-w-3xl">
            
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block">
              EDITORIAL THOUGHTS
            </span>
            <h1 className="text-fluid-h1 font-light font-serif italic text-white leading-[1.05]">
              Journal & Inquiries.
            </h1>
            <p className="text-sm md:text-base text-neutral-400 dark:text-zinc-400 font-sans leading-relaxed font-light max-w-xl">
              In-depth research and critical design inquiries covering spatial UI materials, subtractive typography codes, and physical-digital brand bridges.
            </p>
          </section>

          {/* Grid Layout list */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
            {JOURNAL_POSTS.map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className="group p-8 rounded-sm bg-white/5 dark:bg-[#0A0A0A]/40 border border-neutral-200/40 dark:border-white/5 backdrop-blur-md cursor-pointer hover:border-[#7b2121]/40 transition-all flex flex-col justify-between gap-6 shadow-md"
              >
                <div className="space-y-4">

                  {/* Category & Time stamp */}
                  <div className="flex items-center justify-between border-b border-neutral-200/40 dark:border-white/5 pb-3">
                    <span className="px-3 py-0.5 text-[9px] font-mono font-bold uppercase rounded-sm bg-neutral-100 dark:bg-neutral-950 text-neutral-400 dark:text-neutral-400">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#7b2121]" />
                      <span>{calculateReadingTime([post.title, post.excerpt, post.content]).text}</span>
                    </span>
                  </div>
                  {/* Title and Excerpt */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-serif italic text-white tracking-tight transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-xs text-neutral-400 dark:text-zinc-400 font-sans font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Bottom Trigger action link */}
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white group-hover:text-[#7b2121] transition-colors">
                  <span>READ ESSAY</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </section>
        </div>
      )}

    </div>
  );
};
