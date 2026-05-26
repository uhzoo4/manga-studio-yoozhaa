"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const characters = [
  {
    id: 1,
    name: "YUAN",
    role: "THE VESSEL",
    kanji: "呪",
    stats: { power: 95, control: 40, will: 88 },
    theme: "light",
    quote: "The shadows don't just speak. They remember.",
    shape: "polygon(50% 0%, 35% 15%, 25% 10%, 30% 25%, 20% 35%, 5% 55%, 15% 58%, 10% 75%, 25% 65%, 35% 100%, 65% 100%, 75% 65%, 90% 75%, 85% 58%, 95% 55%, 80% 35%, 70% 25%, 75% 10%, 65% 15%)"
  },
  {
    id: 2,
    name: "KAITO",
    role: "THE BLADE",
    kanji: "刃",
    stats: { power: 82, speed: 98, technique: 100 },
    theme: "dark",
    quote: "A severed thread cannot be retied. It must be cut clean.",
    shape: "polygon(50% 0%, 40% 10%, 30% 5%, 35% 20%, 15% 40%, 5% 60%, 20% 55%, 15% 80%, 30% 70%, 40% 100%, 60% 100%, 70% 70%, 85% 80%, 80% 55%, 95% 60%, 85% 40%, 65% 20%, 70% 5%, 60% 10%)"
  }
];

export default function Characters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const bars = containerRef.current?.querySelectorAll<HTMLElement>('.stat-bar-fill');
      bars?.forEach((bar) => {
        bar.style.width = bar.getAttribute('data-width') || '0%';
      });
      return;
    }

    const ctx = gsap.context(() => {

      // --- Narrative heading reveal ---
      gsap.from(".char-narrative", {
        opacity: 0,
        y: 16,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });

      // --- YUAN dossier reveal (left panel) ---
      if (leftPanelRef.current) {
        // Panel fade + rise
        gsap.from(leftPanelRef.current, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: leftPanelRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          }
        });

        // Staggered internal elements — editorial dossier reveal
        const leftInternals = leftPanelRef.current.querySelectorAll('.dossier-element');
        gsap.from(leftInternals, {
          opacity: 0,
          y: 12,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: leftPanelRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        });

        // Stat bars — YUAN
        const leftBars = leftPanelRef.current.querySelectorAll('.stat-bar-fill');
        leftBars.forEach((bar) => {
          const targetWidth = bar.getAttribute('data-width') || '0%';
          gsap.fromTo(bar,
            { width: '0%' },
            {
              width: targetWidth,
              duration: 0.95,
              ease: "power2.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 92%",
                toggleActions: "play none none none",
              }
            }
          );
        });
      }

      // --- KAITO dossier reveal (right panel) ---
      if (rightPanelRef.current) {
        // Panel fade + rise with slight delay for reading stagger
        gsap.from(rightPanelRef.current, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          delay: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rightPanelRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          }
        });

        // Staggered internal elements
        const rightInternals = rightPanelRef.current.querySelectorAll('.dossier-element');
        gsap.from(rightInternals, {
          opacity: 0,
          y: 12,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.16,
          scrollTrigger: {
            trigger: rightPanelRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        });

        // Stat bars — KAITO
        const rightBars = rightPanelRef.current.querySelectorAll('.stat-bar-fill');
        rightBars.forEach((bar) => {
          const targetWidth = bar.getAttribute('data-width') || '0%';
          gsap.fromTo(bar,
            { width: '0%' },
            {
              width: targetWidth,
              duration: 0.95,
              delay: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 92%",
                toggleActions: "play none none none",
              }
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 px-4 md:px-8 max-w-[80rem] mx-auto border-b-[2px] border-[var(--color-manga-black)] bg-[var(--color-manga-white)] relative z-10 overflow-hidden">
      
      {/* Narrative Lead-in */}
      <div className="max-w-3xl mx-auto text-center mb-16 relative z-10 px-4 char-narrative">
        <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[var(--color-manga-gray)] mb-4">
          The Narrative Divides
        </p>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[0.05em] text-[var(--color-manga-black)] uppercase leading-[1.1] -skew-x-[6deg]">
          Two Souls.<br/>One Inevitable Clash.
        </h2>
      </div>

      {/* Dual Character Dossiers */}
      <div className="flex flex-col lg:flex-row w-full border-[2px] border-[var(--color-manga-black)] shadow-[8px_8px_0_var(--color-manga-black)] bg-white relative mx-auto max-w-6xl">
        
        {/* YUAN DOSSIER */}
        <div 
          ref={leftPanelRef} 
          className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 border-b-[2px] lg:border-b-0 lg:border-r-[2px] border-[var(--color-manga-black)] relative group overflow-hidden bg-[var(--color-manga-white)] text-[var(--color-manga-black)]"
        >
          <div className="absolute inset-0 bg-crosshatch-1 opacity-[0.03] pointer-events-none mix-blend-multiply"></div>
          <span className="absolute -top-6 -right-6 text-[14rem] leading-none opacity-[0.03] font-bold pointer-events-none transition-transform duration-1000 group-hover:scale-105" style={{ fontFamily: 'var(--font-noto)' }}>{characters[0].kanji}</span>
          
          <div className="relative z-10 h-full flex flex-col justify-between min-h-[450px]">
            <div className="dossier-element flex justify-between items-start">
              <div>
                <h3 className="text-4xl sm:text-5xl font-bold tracking-[0.02em] -skew-x-[8deg] uppercase leading-none">{characters[0].name}</h3>
                <p className="text-xs font-bold tracking-[0.3em] mt-2 uppercase opacity-70">{characters[0].role}</p>
              </div>
              <span className="text-[3.5rem] sm:text-[4.5rem] leading-none opacity-10 font-bold" style={{ fontFamily: 'var(--font-noto)' }}>{characters[0].kanji}</span>
            </div>

            <div className="dossier-element flex-1 flex items-center justify-center py-10">
              <div 
                className="w-32 h-44 sm:w-40 sm:h-56 bg-[var(--color-manga-black)] relative before:absolute before:inset-0 before:bg-white before:opacity-[0.05] before:mix-blend-overlay transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:scale-[1.02]"
                style={{ clipPath: characters[0].shape }}
              />
            </div>

            <div className="flex flex-col gap-6">
              <p className="dossier-element text-sm sm:text-base font-medium italic tracking-wide opacity-80 border-l-4 pl-4 border-[var(--color-manga-black)] py-1">
                &quot;{characters[0].quote}&quot;
              </p>

              <div className="dossier-element flex flex-col gap-3 mt-2">
                {Object.entries(characters[0].stats).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-4">
                    <span className="w-16 text-[0.65rem] font-bold tracking-[0.2em] uppercase opacity-80">{key}</span>
                    <div className="flex-1 h-1 border-[1px] border-[var(--color-manga-black)] relative overflow-hidden bg-[var(--color-manga-light)]">
                      <div
                        className="stat-bar-fill absolute top-0 left-0 h-full bg-[var(--color-manga-black)]"
                        data-width={`${val}%`}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KAITO DOSSIER */}
        <div 
          ref={rightPanelRef} 
          className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 relative group overflow-hidden bg-[var(--color-manga-black)] text-[var(--color-manga-white)]"
        >
          <span className="absolute -bottom-6 -left-6 text-[14rem] leading-none opacity-[0.05] font-bold pointer-events-none transition-transform duration-1000 group-hover:scale-105" style={{ fontFamily: 'var(--font-noto)' }}>{characters[1].kanji}</span>
          
          <div className="relative z-10 h-full flex flex-col justify-between min-h-[450px]">
            <div className="dossier-element flex justify-between items-start">
              <div>
                <h3 className="text-4xl sm:text-5xl font-bold tracking-[0.02em] -skew-x-[8deg] uppercase leading-none">{characters[1].name}</h3>
                <p className="text-xs font-bold tracking-[0.3em] mt-2 uppercase opacity-70">{characters[1].role}</p>
              </div>
              <span className="text-[3.5rem] sm:text-[4.5rem] leading-none opacity-[0.07] font-bold" style={{ fontFamily: 'var(--font-noto)' }}>{characters[1].kanji}</span>
            </div>

            <div className="dossier-element flex-1 flex items-center justify-center py-10">
              <div 
                className="w-32 h-44 sm:w-40 sm:h-56 bg-[var(--color-manga-white)] relative before:absolute before:inset-0 before:bg-black before:opacity-[0.05] before:mix-blend-overlay transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:scale-[1.02]"
                style={{ clipPath: characters[1].shape }}
              />
            </div>

            <div className="flex flex-col gap-6">
              <p className="dossier-element text-sm sm:text-base font-medium italic tracking-wide opacity-80 border-l-4 pl-4 border-[var(--color-manga-white)] py-1">
                &quot;{characters[1].quote}&quot;
              </p>

              <div className="dossier-element flex flex-col gap-3 mt-2">
                {Object.entries(characters[1].stats).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-4">
                    <span className="w-16 text-[0.65rem] font-bold tracking-[0.2em] uppercase opacity-80">{key}</span>
                    <div className="flex-1 h-1 border-[1px] border-[var(--color-manga-white)] relative overflow-hidden bg-black/[0.3]">
                      <div
                        className="stat-bar-fill absolute top-0 left-0 h-full bg-[var(--color-manga-white)]"
                        data-width={`${val}%`}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
