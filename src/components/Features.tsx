"use client";

import { useEffect, useRef, useState } from 'react';

const features = [
  {
    id: 1,
    title: "DYNAMIC STORIES",
    desc: "Interactive narratives that respond to your choices.",
    detail: "Branch across 200+ story paths. Every choice reshapes the world around you permanently — no two playthroughs are the same.",
    sfx: "ドン!",
    number: "01",
  },
  {
    id: 2,
    title: "EPIC BATTLES",
    desc: "Real-time combat with devastating combos.",
    detail: "Chain up to 50-hit combos. Master 12 unique fighting styles across 30 hand-drawn arenas.",
    sfx: "バキ!",
    number: "02",
  },
  {
    id: 3,
    title: "CUSTOM PANELS",
    desc: "Create your own manga panels with our tools.",
    detail: "Pro-grade panel editor with 500+ assets, ink brushes, speech bubble tools, and one-click export to share.",
    sfx: "ゴゴゴ",
    number: "03",
  },
  {
    id: 4,
    title: "COMMUNITY",
    desc: "Join thousands of creators in our universe.",
    detail: "Weekly tournaments, creator showcases, and a global leaderboard updated in real-time. Your story deserves an audience.",
    sfx: "ワー!",
    number: "04",
  },
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set());
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleIds((prev) => new Set([...prev, features[index].id]));
            }
            if (entry.target.classList.contains('features-heading-el')) {
              setHeadingVisible(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    const heading = containerRef.current?.querySelector('.features-heading-el');
    if (heading) observer.observe(heading);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .f-card {
          opacity: 0;
          transform: translateX(-40px) skewX(-6deg);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease;
        }
        .f-card:nth-child(2) { transition-delay: 0.1s; }
        .f-card:nth-child(3) { transition-delay: 0.2s; }
        .f-card:nth-child(4) { transition-delay: 0.3s; }
        .f-card.is-visible {
          opacity: 1;
          transform: translateX(0) skewX(0deg);
        }
        .f-heading {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .f-heading.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .f-sweep::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 3px;
          background: white;
          transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .f-sweep:hover::after { width: 100%; }
        .f-detail {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .f-detail.is-open { grid-template-rows: 1fr; }
        .f-detail-inner { overflow: hidden; }
      `}</style>

      <section
        ref={containerRef}
        className="py-24 px-6 bg-[var(--color-manga-black)] relative overflow-hidden border-b-[6px] border-[var(--color-manga-white)] z-10"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full" />
          <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/[0.05] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Heading */}
          <div className={`features-heading-el f-heading text-center mb-20 relative ${headingVisible ? 'is-visible' : ''}`}>
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(5rem,16vw,12rem)] font-bold text-white opacity-[0.03] whitespace-nowrap pointer-events-none select-none uppercase"
              style={{ fontFamily: 'var(--font-title)' }}
            >
              POWER
            </span>
            <p className="text-xs tracking-[0.4em] text-white/30 font-bold uppercase mb-4" style={{ fontFamily: 'var(--font-noto)' }}>
              機能
            </p>
            <h2
              className="text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-[0.15em] text-[var(--color-manga-white)] uppercase"
              style={{ fontFamily: 'var(--font-title)' }}
            >
              Features
            </h2>
            <div className="mt-4 mx-auto w-16 h-[3px] bg-white/20" />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {features.map((feature, i) => {
              const isVisible = visibleIds.has(feature.id);
              const isActive = activeId === feature.id;

              return (
                <div
                  key={feature.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  onClick={() => setActiveId(isActive ? null : feature.id)}
                  className={`f-card f-sweep relative p-10 overflow-hidden group cursor-pointer ${isVisible ? 'is-visible' : ''} ${isActive ? 'bg-white/[0.06]' : 'bg-[var(--color-manga-black)] hover:bg-white/[0.04]'}`}
                >
                  {/* Number watermark */}
                  <span
                    className="absolute top-6 right-8 text-[5rem] leading-none font-bold select-none transition-all duration-500 text-white/[0.04] group-hover:text-white/[0.08]"
                    style={{ fontFamily: 'var(--font-title)' }}
                  >
                    {feature.number}
                  </span>

                  {/* SFX */}
                  <div
                    className={`absolute bottom-8 right-8 text-3xl font-bold select-none transition-all duration-500 ${isActive ? 'text-white/30 scale-110' : 'text-white/[0.06] group-hover:text-white/20'}`}
                    style={{ fontFamily: 'var(--font-noto)' }}
                  >
                    {feature.sfx}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`h-[2px] mb-8 bg-white/20 transition-all duration-500 ${isActive ? 'w-16 bg-white/80' : 'w-8 group-hover:w-16 group-hover:bg-white/60'}`} />

                    <div className="flex items-start justify-between gap-4">
                      <h3
                        className="text-2xl text-[var(--color-manga-white)] font-bold tracking-[0.12em] mb-4 uppercase"
                        style={{ fontFamily: 'var(--font-title)' }}
                      >
                        {feature.title}
                      </h3>
                      <div className={`mt-1 w-5 h-5 border-[2px] flex-shrink-0 relative flex items-center justify-center transition-all duration-300 ${isActive ? 'border-white/60 rotate-45' : 'border-white/20 group-hover:border-white/40'}`}>
                        <div className={`w-2 h-[2px] bg-white/60 absolute transition-opacity duration-200 ${isActive ? 'opacity-0' : 'opacity-100'}`} />
                        <div className={`w-[2px] h-2 bg-white/60 absolute transition-opacity duration-200 ${isActive ? 'opacity-0' : 'opacity-100'}`} />
                      </div>
                    </div>

                    <p className={`tracking-wider leading-relaxed text-sm transition-colors duration-500 ${isActive ? 'text-white/60' : 'text-white/30 group-hover:text-white/50'}`}>
                      {feature.desc}
                    </p>

                    {/* Expandable detail */}
                    <div className={`f-detail ${isActive ? 'is-open' : ''}`}>
                      <div className="f-detail-inner">
                        <div className="pt-6 mt-6 border-t border-white/10">
                          <p className="text-white/50 text-sm tracking-wider leading-relaxed">
                            {feature.detail}
                          </p>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="mt-6 text-xs tracking-[0.2em] font-bold text-white/40 uppercase border-b border-white/20 pb-0.5 hover:text-white/80 hover:border-white/60 transition-all duration-300"
                          >
                            Learn More →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}