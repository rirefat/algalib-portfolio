import React, { useState, useEffect } from 'react';
import { JOURNAL_POSTS } from '../../data/portfolioData';
import { usePortfolioStore } from '../../hooks/usePortfolioStore';
import { Calendar, Clock, ArrowLeft, ArrowUpRight, BookOpen, Link, Check } from 'lucide-react';
import { calculateReadingTime } from '../../utils/readingTime';

export const JournalView: React.FC = () => {
  const { setCursorMode } = usePortfolioStore();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const activePost = JOURNAL_POSTS.find((post) => post.id === selectedPostId);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

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
        <article className="relative w-full overflow-hidden pb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          {/* Scroll progress indicator */}
          <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-900 z-[120] pointer-events-none">
            <div 
              className="h-full bg-[#7b2121] transition-all duration-75"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Hero Section with Image */}
          <div className="relative h-[60vh] md:h-[75vh] w-full mt-[-4rem] mb-16 md:mb-24 flex flex-col justify-end border-b border-white/5">
            {activePost.image ? (
              <div className="absolute inset-0 z-0">
                <img 
                  src={activePost.image} 
                  alt={activePost.title} 
                  className="w-full h-full object-cover filter grayscale contrast-125 opacity-30" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/40 to-transparent" />
              </div>
            ) : (
               <div className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-900/20 to-[#030303]" />
            )}
            
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 pb-12 md:pb-20 flex flex-col items-start">
              {/* Back Action Trigger */}
              <button
                onClick={handleBack}
                onMouseEnter={() => setCursorMode('hover')}
                onMouseLeave={() => setCursorMode('default')}
                className="group inline-flex items-center gap-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 hover:text-white transition-colors mb-12 md:mb-16"
              >
                <div className="w-8 h-[1px] bg-neutral-600 group-hover:w-12 group-hover:bg-white group-hover:text-black transition-all duration-500" />
                <span>Return Index</span>
              </button>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#7b2121] border border-[#7b2121]/30 px-3 py-1 bg-[#7b2121]/5 backdrop-blur-sm rounded-sm">
                  {activePost.category}
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  {activePost.date}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light font-serif italic text-white leading-[1.05] tracking-tight max-w-4xl drop-shadow-2xl">
                {activePost.title}
              </h1>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-12 lg:gap-24 relative">
            {/* Sidebar Meta */}
            <div className="md:w-1/4 shrink-0 order-2 md:order-1">
              <div className="sticky top-32 space-y-10 border-t border-white/5 md:border-t-0 pt-10 md:pt-0">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-600 uppercase block mb-3">Reading Time</span>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Clock className="w-4 h-4 text-[#7b2121]" />
                    <span className="font-mono text-xs tracking-wider">{calculateReadingTime([activePost.title, activePost.excerpt, activePost.content]).text}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-600 uppercase block mb-3">Words</span>
                  <span className="font-mono text-xs tracking-wider text-neutral-300">
                    {calculateReadingTime([activePost.title, activePost.excerpt, activePost.content]).wordCount}
                  </span>
                </div>
                
                <div className="w-12 h-[1px] bg-white/5" />

                <div className="space-y-4">
                  <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-600 uppercase block">Share</span>
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-white hover:text-white text-neutral-500 cursor-pointer transition-colors bg-[#030303]/50">
                      <span className="text-[10px] font-mono uppercase">X</span>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-white hover:text-white text-neutral-500 cursor-pointer transition-colors bg-[#030303]/50">
                      <span className="text-[10px] font-mono uppercase">In</span>
                    </div>
                    <div 
                      onClick={handleCopyLink}
                      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-white hover:text-white text-neutral-500 cursor-pointer transition-colors bg-[#030303]/50 relative"
                      title="Copy Link"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-[#7b2121]" /> : <Link className="w-3.5 h-3.5" />}
                      {isCopied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest text-[#7b2121] bg-[#7b2121]/10 px-2 py-1 rounded-sm backdrop-blur-sm border border-[#7b2121]/20">
                          COPIED
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="md:w-3/4 order-1 md:order-2">
              <p className="text-xl md:text-2xl text-neutral-300 font-serif italic font-light leading-relaxed mb-16 max-w-3xl">
                {activePost.excerpt}
              </p>

              <div className="w-full h-[1px] bg-gradient-to-r from-[#7b2121]/50 via-transparent to-transparent mb-16" />

              <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-400 font-sans text-sm md:text-base leading-loose space-y-8 pr-0 lg:pr-12">
                {/* Custom renderer for markdown blocks */}
                {activePost.content.trim().split('\n\n').map((block, index) => {
                  const isHeader3 = block.startsWith('###');
                  const isBulletList = block.startsWith('-');
                  const isNumberedList = /^\d+\./.test(block);

                  if (isHeader3) {
                    return (
                      <h3 key={index} className="text-2xl md:text-3xl font-light font-serif italic text-white tracking-tight pt-10 pb-4 border-b border-white/5">
                        {block.replace('###', '').trim()}
                      </h3>
                    );
                  }

                  if (isBulletList || isNumberedList) {
                    return (
                      <ul key={index} className="space-y-4 font-sans font-light my-8">
                        {block.split('\n').map((li, liIndex) => {
                          const content = isBulletList ? li.replace('-', '').trim() : li.replace(/^\d+\./, '').trim();
                          if (!content) return null;
                          return (
                            <li key={liIndex} className="text-sm md:text-base flex items-start gap-4 group">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7b2121]/40 mt-2.5 shrink-0 group-hover:bg-white group-hover:text-black transition-colors" />
                              <span className="opacity-80 group-hover:opacity-100 transition-opacity duration-300" dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-normal">$1</strong>') }} />
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }

                  return (
                    <p key={index} className="leading-loose font-light opacity-80 hover:opacity-100 transition-opacity duration-500">
                      <span dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-normal">$1</strong>') }} />
                    </p>
                  );
                })}
              </div>

              {/* Author Signature */}
              <div className="mt-20 pt-12 border-t border-white/5 flex flex-col items-end gap-2 pr-0 lg:pr-12">
                <span className="text-4xl md:text-5xl font-serif italic text-white/80 font-light tracking-wide opacity-90" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
                  Abdullah Al Galib
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#7b2121]/50" />
                  <span className="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Principal Architect</span>
                </div>
              </div>

              {/* End of article marker */}
              <div className="mt-24 flex flex-col items-center gap-10 border-t border-white/5 pt-16">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-[#7b2121] rounded-full opacity-100" />
                  <div className="w-1.5 h-1.5 bg-[#7b2121] rounded-full opacity-50" />
                  <div className="w-1.5 h-1.5 bg-[#7b2121] rounded-full opacity-20" />
                </div>
                
                <button
                  onClick={handleBack}
                  onMouseEnter={() => setCursorMode('hover')}
                  onMouseLeave={() => setCursorMode('default')}
                  className="group relative px-8 py-4 border border-white/10 hover:border-white/50 overflow-hidden rounded-full transition-all duration-500 flex items-center gap-3 bg-[#030303] hover:shadow-[0_0_20px_rgba(123,33,33,0.1)]"
                >
                  <div className="absolute inset-0 bg-[#7b2121]/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  <ArrowLeft className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:-translate-x-1 transition-all duration-500 relative z-10" />
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-400 group-hover:text-white transition-colors relative z-10">
                    Return to Index
                  </span>
                </button>
              </div>
            </div>
          </div>
        </article>
      ) : (
        /* Editorial List of posts */
        <div className="space-y-16 lg:space-y-24">
          {/* Header */}
          <section className="relative space-y-6 max-w-4xl mx-auto text-center">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-32 bg-[#7b2121]/20 rounded-[100%] blur-[80px] pointer-events-none" />
            
            <div className="flex items-center justify-center gap-4">
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#7b2121]" />
              <span className="text-[10px] md:text-[11px] font-mono tracking-[0.4em] uppercase text-neutral-400">
                Editorial Thoughts
              </span>
              <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#7b2121]" />
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light font-serif italic text-white leading-tight tracking-tight relative z-10">
              Journal & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">Inquiries.</span>
            </h1>
            
            <p className="text-xs md:text-sm text-neutral-400 font-sans leading-relaxed font-light max-w-2xl mx-auto pt-4 relative z-10">
              In-depth research and critical design inquiries covering spatial UI materials, subtractive typography codes, and physical-digital brand bridges.
            </p>
          </section>

          {/* Unique Typographic List Layout */}
          <section className="max-w-6xl mx-auto relative">
            {/* Left aligned vertical line connecting the items */}
            <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-[1px] bg-white/5" />

            <div className="flex flex-col relative z-10">
              {JOURNAL_POSTS.map((post, index) => {
                const numStr = (index + 1).toString().padStart(2, '0');
                return (
                  <div
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                    onMouseEnter={() => setCursorMode('hover')}
                    onMouseLeave={() => setCursorMode('default')}
                    className="group relative flex flex-col md:flex-row items-start md:items-center py-12 md:py-20 border-b border-white/5 cursor-pointer transition-colors duration-700 hover:bg-white/[0.01]"
                  >
                    {/* Background image reveal on hover */}
                    {post.image && (
                      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 overflow-hidden pointer-events-none">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out filter grayscale" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent" />
                      </div>
                    )}

                    {/* Hover reveal gradient */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#7b2121]/0 via-[#7b2121]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                    
                    {/* Index Number */}
                    <div className="w-full md:w-[120px] shrink-0 mb-6 md:mb-0 relative z-10">
                      <span className="text-4xl md:text-5xl font-light font-serif italic text-neutral-800 group-hover:text-white transition-colors duration-500">
                        {numStr}
                      </span>
                    </div>

                    {/* Content Core */}
                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12 relative z-10 md:pl-12">
                      <div className="flex-1 space-y-5 max-w-2xl">
                        <div className="flex items-center gap-4">
                          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#7b2121] border border-[#7b2121]/30 px-2 py-0.5 rounded-sm bg-[#7b2121]/5">
                            {post.category}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1.5 uppercase tracking-widest">
                            <Clock className="w-3 h-3" />
                            {calculateReadingTime([post.title, post.excerpt, post.content]).text}
                          </span>
                        </div>
                        
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white transition-all duration-500 ease-out tracking-tight leading-[1.1] group-hover:text-neutral-300">
                          {post.title}
                        </h3>
                        
                        <p className="text-xs md:text-sm text-neutral-400 font-sans font-light leading-relaxed max-w-lg opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Right Side: Image Thumbnail & Action Trigger */}
                      <div className="shrink-0 flex items-center gap-6 md:gap-10">
                        {post.image && (
                          <div className="hidden lg:block w-32 h-32 rounded-full overflow-hidden border border-white/10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] relative shadow-[0_0_30px_rgba(123,33,33,0.15)] group-hover:shadow-[0_0_50px_rgba(123,33,33,0.3)]">
                            <img 
                              src={post.image} 
                              alt="Thumbnail" 
                              className="w-full h-full object-cover transform scale-125 group-hover:scale-100 transition-transform duration-[2s] ease-out filter grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-[#7b2121]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4">
                          <div className="h-[1px] w-0 bg-[#7b2121] group-hover:w-12 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-500 text-white shadow-sm">
                            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

    </div>
  );
};
