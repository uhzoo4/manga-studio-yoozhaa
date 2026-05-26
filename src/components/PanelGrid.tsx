"use client";


import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Per-panel cinematic motion config
type PanelMotion = {
  y: number;
  scale: number;
  duration: number;
  ease: string;
};

const panelMotionMap: Record<string, Partial<PanelMotion>> = {
  "THE STRIKE": {
    // Restrained punch emphasis — slightly deeper scale travel
    scale: 0.985,
    y: 18,
    duration: 0.82,
    ease: "power2.out",
  },
  "RISING SHADOW": {
    // Shadow reveal — slower, heavier, atmospheric
    y: 24,
    scale: 0.99,
    duration: 1.05,
    ease: "power2.inOut",
  },
  "THE AWAKENING": {
    // Subtle emergence — reader attention first
    y: 14,
    scale: 0.995,
    duration: 0.95,
    ease: "power1.out",
  },
};

const defaultMotion: PanelMotion = {
  y: 18,
  scale: 0.99,
  duration: 0.82,
  ease: "power2.out",
};

const TILT_MAX_DEGREES = 5;
const TILT_PERSPECTIVE = 1200;
const TILT_TRACK_TRANSITION = "transform 140ms ease-out, box-shadow 400ms ease";
const TILT_RESET_TRANSITION = "transform 400ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 400ms ease";

const panelsData = [
  {
    id: 1,
    number: "01",
    title: "THE AWAKENING",
    watermark: "AWAKENING",
    desc: "A forgotten power stirs deep within...",
    size: "col-span-1 md:col-span-6 row-span-1 md:row-span-3 min-h-[250px] md:min-h-0",
    sfx: "What is this... power?!",
    image: "/panels/chapter-01.png",
    chapter: "CHAPTER 01",
    position: "object-[50%_22%]",
  },
  {
    id: 2,
    number: "02",
    title: "RISING SHADOW",
    watermark: "SHADOW",
    desc: "Darkness creeps across the land.",
    size: "col-span-1 md:col-span-4 row-span-1 md:row-span-6 min-h-[350px] md:min-h-0",
    sfx: null,
    image: "/panels/chapter-02.png",
    chapter: "CHAPTER 02",
    position: "center",
  },
  {
    id: 3,
    number: "03",
    title: "THE CLASH",
    watermark: "THE CLASH",
    desc: "Heroes collide in an epic battle!",
    size: "col-span-1 md:col-span-6 row-span-1 md:row-span-3 min-h-[250px] md:min-h-0",
    sfx: "BOOM!!",
    image: "/panels/chapter-03.png",
    chapter: "CHAPTER 03",
    position: "center",
  },
  {
    id: 6,
    number: "06",
    title: "THE STRIKE",
    watermark: "THE STRIKE",
    desc: "One blow to end it all.",
    size: "col-span-1 md:col-span-10 row-span-1 md:row-span-3 min-h-[250px] md:min-h-0",
    sfx: "ドゴッ!",
    image: "/panels/chapter-06.png",
    chapter: "CHAPTER 06",
    position: "object-[50%_35%]",
  },
  {
    id: 4,
    number: "04",
    title: "AFTERMATH",
    watermark: "AFTERMATH",
    desc: "Silence falls over the broken land.",
    size: "col-span-1 md:col-span-4 row-span-1 md:row-span-3 min-h-[220px] md:min-h-0",
    sfx: null,
    image: "/panels/chapter-04.png",
    chapter: "CHAPTER 04",
    position: "center",
  },
  {
    id: 5,
    number: "05",
    title: "REBIRTH",
    watermark: "REBIRTH",
    desc: "From ashes, a new legend rises.",
    size: "col-span-1 md:col-span-6 row-span-1 md:row-span-4 min-h-[300px] md:min-h-0",
    sfx: null,
    image: "/panels/chapter-05.png",
    chapter: "CHAPTER 05",
    position: "center",
  },
];

export default function PanelGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chaptersWatermarkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.manga-panel');

      // --- Section heading reveal ---
      gsap.from(".story-heading", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });

      // --- PHASE 1: Sequential panel reveal ---
      panels.forEach((panel, index) => {
        const title = panel.getAttribute('data-panel-title') || '';
        const motionOverride = panelMotionMap[title] || {};
        const motion = { ...defaultMotion, ...motionOverride };

        gsap.fromTo(panel,
          {
            opacity: 0,
            y: motion.y,
            scale: motion.scale,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: motion.duration,
            delay: index * 0.045,
            ease: motion.ease,
            scrollTrigger: {
              trigger: panel,
              start: "top 88%",
              toggleActions: "play none none none",
            }
          }
        );

        // Subtle internal image parallax (very light depth)
        const img = panel.querySelector('.panel-art');
        if (img) {
          gsap.fromTo(img,
            { y: -8 },
            {
              y: 8,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        }
      });

      // --- PHASE 2: Light parallax on "CHAPTERS" watermark ---
      if (chaptersWatermarkRef.current) {
        gsap.fromTo(chaptersWatermarkRef.current,
          { y: -12 },
          {
            y: 12,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsFineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReduced || !supportsFineHover || !containerRef.current) return;

    const panels = Array.from(containerRef.current.querySelectorAll<HTMLElement>('.story-panel-tilt'));
    const cleanups = panels.map((panel) => {
      const frame = panel.querySelector<HTMLElement>('.panel-tilt-frame');
      if (!frame) return () => {};

      let frameId = 0;
      let rotateX = 0;
      let rotateY = 0;

      const applyTransform = () => {
        frameId = 0;
        frame.style.transform = `perspective(${TILT_PERSPECTIVE}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;
      };

      const requestTransform = () => {
        if (frameId) return;
        frameId = window.requestAnimationFrame(applyTransform);
      };

      const handlePointerMove = (event: PointerEvent) => {
        const rect = panel.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

        rotateX = Math.max(-1, Math.min(1, -y)) * TILT_MAX_DEGREES;
        rotateY = Math.max(-1, Math.min(1, x)) * TILT_MAX_DEGREES;
        frame.style.transition = TILT_TRACK_TRANSITION;
        requestTransform();
      };

      const resetTilt = () => {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        }

        rotateX = 0;
        rotateY = 0;
        frame.style.transition = TILT_RESET_TRANSITION;
        frame.style.transform = `perspective(${TILT_PERSPECTIVE}px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
      };

      panel.addEventListener('pointermove', handlePointerMove);
      panel.addEventListener('pointerleave', resetTilt);

      return () => {
        if (frameId) window.cancelAnimationFrame(frameId);
        panel.removeEventListener('pointermove', handlePointerMove);
        panel.removeEventListener('pointerleave', resetTilt);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <section ref={containerRef} className="py-20 px-4 md:px-6 max-w-[70rem] mx-auto relative z-10 bg-[var(--color-manga-white)] group/grid">

      {/* Section heading */}
      <div className="story-heading text-center mb-14 relative">
        <span
          ref={chaptersWatermarkRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(3.5rem,10vw,9rem)] font-bold opacity-[0.03] whitespace-nowrap pointer-events-none select-none uppercase text-[var(--color-manga-black)] will-change-transform"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          CHAPTERS
        </span>
        <p className="text-[10px] tracking-[0.4em] text-[var(--color-manga-gray)] font-bold uppercase mb-3"
          style={{ fontFamily: 'var(--font-noto)' }}>
          物語
        </p>
        <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-bold tracking-[0.15em] text-[var(--color-manga-black)] relative z-10 uppercase"
          style={{ fontFamily: 'var(--font-title)' }}>
          THE STORY
        </h2>
        <div className="mt-5 mx-auto w-12 h-[2px] bg-[var(--color-manga-black)]/30" />
      </div>

      {/* Panel grid - Compact 10-column Asymmetrical Manga Spread */}
      <div className="grid grid-cols-1 md:grid-cols-10 auto-rows-[auto] md:auto-rows-[90px] gap-3 md:gap-4 items-stretch">
        {panelsData.map((panel) => (
          <article
            key={panel.id}
            data-panel-title={panel.title}
            className={`manga-panel story-panel-tilt relative group/panel ${panel.size} group-hover/grid:opacity-50 hover:!opacity-100 hover:z-20 transition-opacity duration-500 will-change-[transform,opacity]`}
            style={{ opacity: 0 }}
          >
            <div className="panel-tilt-frame panel-hover absolute inset-0 border-[2px] md:border-[3px] border-[var(--color-manga-black)] overflow-hidden cursor-crosshair will-change-transform">
            {/* Real image */}
            <div className="panel-art absolute inset-[-10%] w-[120%] h-[120%] will-change-transform">
              <div className="panel-art-breath absolute inset-0">
              <Image
                src={panel.image ?? ''}
                alt={panel.title ?? ''}
                fill
                className={`object-cover grayscale-[20%] contrast-110 group-hover/panel:grayscale-0 group-hover/panel:contrast-100 transition-all duration-700 ${panel.position}`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              </div>
            </div>

            {/* Base dark overlay */}
            <div className="absolute inset-0 z-10 bg-black/40 group-hover/panel:bg-black/10 transition-colors duration-500" />

            {/* Explicit Unique Background Watermark */}
            <div className="absolute inset-0 z-[12] flex items-center justify-center overflow-hidden pointer-events-none mix-blend-overlay opacity-30 group-hover/panel:opacity-50 transition-opacity duration-500">
              <span className="text-[3rem] md:text-[5.5rem] font-bold text-white uppercase whitespace-nowrap transform -rotate-[8deg] tracking-widest" style={{ fontFamily: 'var(--font-title)' }}>
                {panel.watermark}
              </span>
            </div>

            {/* Cinematic hover reveal overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end translate-y-full group-hover/panel:translate-y-0 transition-transform duration-500 ease-[var(--ease-cinematic)]">
              <div className="bg-gradient-to-t from-black/95 via-black/80 to-transparent p-5 md:p-6 pt-12">
                <p className="text-[0.55rem] tracking-[0.3em] text-white/60 font-bold uppercase mb-1.5">
                  {panel.chapter}
                </p>
                <h3 className="text-lg md:text-xl tracking-widest font-bold uppercase text-white mb-2"
                  style={{ fontFamily: 'var(--font-title)' }}>
                  {panel.title}
                </h3>
                {panel.desc && (
                  <p className="text-[10px] md:text-xs text-white/70 tracking-wider mb-4 leading-relaxed max-w-[90%]">
                    {panel.desc}
                  </p>
                )}
                <button className="group/btn flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold text-white uppercase border-b border-white/30 pb-0.5 hover:border-white transition-colors duration-300 w-fit">
                  <span>READ NOW</span>
                  <span className="translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>

            {/* Always-visible bottom info (hidden on hover) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-[15] group-hover/panel:opacity-0 transition-opacity duration-300">
              <span className="absolute top-3 right-4 text-3xl md:text-4xl opacity-[0.12] font-bold text-white"
                style={{ fontFamily: 'var(--font-title)' }}>
                {panel.number}
              </span>
              <h3 className="text-base md:text-lg tracking-widest font-bold uppercase text-white"
                style={{ fontFamily: 'var(--font-title)' }}>
                {panel.title}
              </h3>
              {panel.desc && (
                <p className="text-[10px] text-white/60 mt-1 tracking-wide truncate max-w-[75%]">{panel.desc}</p>
              )}
            </div>

            {/* SFX badge */}
            {panel.sfx && (
              <div className="absolute top-4 left-4 z-30 bg-white text-black border-[2px] border-black px-2 py-1 font-bold text-[10px] md:text-xs transform -rotate-2 group-hover/panel:scale-110 group-hover/panel:-rotate-3 transition-all duration-300 shadow-[3px_3px_0_rgba(0,0,0,0.5)]"
                style={{ fontFamily: 'var(--font-space)' }}>
                {panel.sfx}
              </div>
            )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
