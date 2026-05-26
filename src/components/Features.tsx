"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const rows = document.querySelectorAll('.f-row');
      rows.forEach((r) => {
        (r as HTMLElement).style.opacity = '1';
        (r as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      // --- Heading reveal ---
      gsap.from(".features-heading-el", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-heading-el",
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });

      // --- Feature rows: subtle staggered reveal ---
      const rows = gsap.utils.toArray<HTMLElement>('.f-row');
      rows.forEach((row) => {
        gsap.fromTo(row,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              toggleActions: "play none none none",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .f-row {
          opacity: 0;
          will-change: transform, opacity;
        }
      `}</style>

      <section
        ref={containerRef}
        className="py-24 md:py-32 bg-[var(--color-manga-black)] relative overflow-hidden border-b-[6px] border-[var(--color-manga-white)] z-10"
      >
        {/* Subtle background halftone/texture */}
        <div className="absolute inset-0 bg-crosshatch-3 opacity-[0.02] pointer-events-none mix-blend-screen" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Magazine Editorial Heading */}
          <div className="features-heading-el flex flex-col md:flex-row items-start md:items-end justify-between mb-20 md:mb-28 px-6 md:px-12 relative">
            <div>
              <p className="text-xs tracking-[0.4em] text-white/40 font-bold uppercase mb-4" style={{ fontFamily: 'var(--font-noto)' }}>
                収録内容 — Contents
              </p>
              <h2
                className="text-[clamp(3.5rem,10vw,7rem)] font-bold tracking-[0.05em] text-[var(--color-manga-white)] uppercase leading-none -skew-x-[6deg]"
                style={{ fontFamily: 'var(--font-title)' }}
              >
                SYSTEMS
              </h2>
            </div>
            <div className="mt-8 md:mt-0 max-w-xs md:text-right hidden md:block">
              <p className="text-[0.65rem] tracking-[0.2em] font-bold text-white/30 uppercase leading-loose">
                An editorial overview of the core mechanics governing this universe.
              </p>
            </div>
          </div>

          {/* Table of Contents List */}
          <div className="border-b-[1px] border-white/20">
            {features.map((feature) => {
              const isActive = activeId === feature.id;

              return (
                <article
                  key={feature.id}
                  onClick={() => setActiveId(isActive ? null : feature.id)}
                  className="f-row relative border-t-[1px] border-white/20 py-16 md:py-24 group hover:bg-white/[0.02] transition-colors duration-500 cursor-pointer overflow-hidden"
                >
                  {/* Oversized background number */}
                  <span
                    className="absolute top-1/2 -translate-y-1/2 left-[5%] md:left-[8%] text-[12rem] md:text-[22rem] font-bold text-white/[0.02] pointer-events-none select-none transition-transform duration-700 group-hover:scale-105 group-hover:text-white/[0.035] -skew-x-[6deg]"
                    style={{ fontFamily: 'var(--font-title)' }}
                  >
                    {feature.number}
                  </span>

                  <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative z-10 items-start">
                    
                    {/* Left/Chapter marker */}
                    <div className="md:col-span-2 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start md:text-right pt-2 border-b-[1px] md:border-b-0 border-white/10 pb-6 md:pb-0">
                      <div>
                        <span className="block text-[0.65rem] tracking-[0.3em] font-bold text-white/40 uppercase mb-1 md:mb-0">Chapter</span>
                        <span className="text-3xl md:text-4xl font-bold text-white/80" style={{ fontFamily: 'var(--font-title)' }}>{feature.number}</span>
                      </div>
                      <span className="text-2xl text-white/20 md:mt-16" style={{ fontFamily: 'var(--font-noto)' }}>{feature.sfx}</span>
                    </div>

                    {/* Center/Title & Desc */}
                    <div className="md:col-span-8">
                      <h3
                        className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-[0.08em] text-[var(--color-manga-white)] uppercase mb-6"
                        style={{ fontFamily: 'var(--font-title)' }}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-lg md:text-xl text-white/70 tracking-wide leading-relaxed font-medium">
                        {feature.desc}
                      </p>

                      {/* Expandable detail (Accordion) */}
                      <div
                        className={`grid transition-all duration-700 ease-[var(--ease-cinematic)] ${
                          isActive ? 'grid-rows-[1fr] opacity-100 mt-8' : 'grid-rows-[0fr] opacity-0 mt-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="pt-8 border-t-[1px] border-white/10 flex flex-col md:flex-row gap-6">
                            <div className="w-8 h-[2px] bg-[var(--color-manga-gray)] mt-3 hidden md:block flex-shrink-0" />
                            <p className="text-white/50 text-sm md:text-base tracking-wider leading-relaxed">
                              {feature.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right/Action (Plus icon) */}
                    <div className="md:col-span-2 hidden md:flex items-start justify-end pt-4">
                       <div className={`w-12 h-12 rounded-full border-[1px] flex items-center justify-center transition-all duration-500 ease-[var(--ease-cinematic)] ${
                         isActive 
                          ? 'border-white bg-white text-black rotate-[135deg]' 
                          : 'border-white/20 bg-transparent text-white group-hover:border-white/50 group-hover:scale-110'
                       }`}>
                         <span className="text-2xl font-light leading-none relative -top-[2px]">+</span>
                       </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}