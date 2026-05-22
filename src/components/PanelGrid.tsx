"use client";


import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const panelsData = [
  {
    id: 1,
    number: "01",
    title: "THE AWAKENING",
    desc: "A forgotten power stirs deep within...",
    size: "col-span-1 md:col-span-2 row-span-2",
    sfx: "What is this... power?!",
    image: "/panels/chapter-01.png",
    chapter: "CHAPTER 01",
    position: "object-top",
  },
  {
    id: 2,
    number: "02",
    title: "RISING SHADOW",
    desc: "Darkness creeps across the land.",
    size: "col-span-1 row-span-2",
    sfx: null,
    image: "/panels/chapter-02.png",
    chapter: "CHAPTER 02",
    position: "center",
  },
  {
    id: 3,
    number: "03",
    title: "THE CLASH",
    desc: "Heroes collide in an epic battle!",
    size: "col-span-1 md:col-span-2",
    sfx: "BOOM!!",
    image: "/panels/chapter-03.png",
    chapter: "CHAPTER 03",
    position: "center",
  },
  {
    id: 4,
    number: "04",
    title: "AFTERMATH",
    desc: "Silence falls over the broken land.",
    size: "col-span-1",
    sfx: null,
    image: "/panels/chapter-04.png",
    chapter: "CHAPTER 04",
    position: "center",
  },
  {
    id: 5,
    number: "05",
    title: "REBIRTH",
    desc: "From ashes, a new legend rises.",
    size: "col-span-1 md:col-span-1",
    sfx: null,
    image: "/panels/chapter-05.png",
    chapter: "CHAPTER 05",
    position: "object-top",
  },
  {
    id: 6,
    number: "06",
    title: "THE STRIKE",
    desc: "One blow to end it all.",
    size: "col-span-1",
    sfx: "ドゴッ!",
    image: "/panels/chapter-06.png",
    chapter: "CHAPTER 06",
    position: "object-top",
  },
];

export default function PanelGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.manga-panel');

      panels.forEach((panel) => {
        const img = panel.querySelector('.panel-art');

        gsap.fromTo(panel,
          { clipPath: "inset(100% 0 0 0)", scale: 0.95 },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 90%",
              end: "bottom 80%",
              scrub: 0.5
            }
          }
        );

        if (img) {
          gsap.fromTo(img,
            { y: -20, scale: 1.1 },
            {
              y: 20,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 max-w-7xl mx-auto relative z-10 bg-[var(--color-manga-white)] group/grid">

      {/* Section heading */}
      <div className="text-center mb-16 relative">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(4rem,14vw,10rem)] font-bold opacity-[0.04] whitespace-nowrap pointer-events-none select-none uppercase text-[var(--color-manga-black)]"
          style={{ fontFamily: 'var(--font-title)' }}>
          CHAPTERS
        </span>
        <p className="text-xs tracking-[0.4em] text-[var(--color-manga-gray)] font-bold uppercase mb-3"
          style={{ fontFamily: 'var(--font-noto)' }}>
          物語
        </p>
        <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-[0.15em] text-[var(--color-manga-black)] relative z-10 uppercase"
          style={{ fontFamily: 'var(--font-title)' }}>
          THE STORY
        </h2>
        <div className="mt-4 mx-auto w-16 h-[3px] bg-[var(--color-manga-black)]/20" />
      </div>

      {/* Panel grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[240px] md:auto-rows-[300px] gap-[6px]">
        {panelsData.map((panel) => (
          <motion.article
            key={panel.id}
            className={`manga-panel relative border-[4px] border-[var(--color-manga-black)] overflow-hidden cursor-crosshair group/panel ${panel.size} group-hover/grid:opacity-50 hover:!opacity-100 hover:z-20 transition-opacity duration-500`}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Real image */}
            <div className="panel-art absolute inset-[-10%] w-[120%] h-[120%]">
              <Image
                src={panel.image ?? ''}
                alt={panel.title ?? ''}
                fill
                className="object-cover grayscale-[20%] contrast-110 group-hover/panel:grayscale-0 group-hover/panel:contrast-100 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Base dark overlay */}
            <div className="absolute inset-0 z-10 bg-black/50 group-hover/panel:bg-black/20 transition-colors duration-500" />

            {/* Option B — cinematic hover reveal overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end translate-y-full group-hover/panel:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="bg-gradient-to-t from-black/95 via-black/80 to-transparent p-6 pt-16">
                <p className="text-[0.6rem] tracking-[0.4em] text-white/50 font-bold uppercase mb-2">
                  {panel.chapter}
                </p>
                <h3 className="text-xl md:text-2xl tracking-widest font-bold uppercase text-white mb-3"
                  style={{ fontFamily: 'var(--font-title)' }}>
                  {panel.title}
                </h3>
                {panel.desc && (
                  <p className="text-xs text-white/60 tracking-wider mb-5 leading-relaxed">
                    {panel.desc}
                  </p>
                )}
                <button className="group/btn flex items-center gap-3 text-xs tracking-[0.2em] font-bold text-white uppercase border-b border-white/30 pb-0.5 hover:border-white transition-colors duration-300">
                  <span>READ NOW</span>
                  <span className="translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>

            {/* Always-visible bottom info (hidden on hover) */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-[15] group-hover/panel:opacity-0 transition-opacity duration-300">
              <span className="absolute top-4 right-4 text-4xl opacity-15 font-bold text-white"
                style={{ fontFamily: 'var(--font-title)' }}>
                {panel.number}
              </span>
              <h3 className="text-lg md:text-xl tracking-widest font-bold uppercase text-white"
                style={{ fontFamily: 'var(--font-title)' }}>
                {panel.title}
              </h3>
              {panel.desc && (
                <p className="text-xs text-white/60 mt-1 tracking-wide">{panel.desc}</p>
              )}
            </div>

            {/* SFX badge */}
            {panel.sfx && (
              <div className="absolute top-5 left-5 z-30 bg-white text-black border-[3px] border-black px-3 py-1.5 font-bold text-xs transform -rotate-2 group-hover/panel:scale-110 group-hover/panel:-rotate-3 transition-all duration-300"
                style={{ fontFamily: 'var(--font-space)' }}>
                {panel.sfx}
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}