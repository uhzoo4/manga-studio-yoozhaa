"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Cta() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const frame = document.querySelector('.cta-frame');
      const anims = document.querySelectorAll('.cta-anim');
      if (frame) {
        (frame as HTMLElement).style.opacity = '1';
        (frame as HTMLElement).style.transform = 'none';
      }
      anims.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      // --- Poster frame reveal ---
      gsap.from(".cta-frame", {
        scale: 0.98,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });

      // --- Typography & Elements stagger ---
      const elements = gsap.utils.toArray<HTMLElement>('.cta-anim');
      gsap.from(elements, {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="p-4 md:p-8 bg-[var(--color-manga-white)] text-[var(--color-manga-black)] min-h-[90vh] flex flex-col relative z-10 border-b-[2px] border-[var(--color-manga-black)]"
    >
      
      {/* Poster Frame */}
      <div className="cta-frame flex-1 border-[4px] md:border-[6px] border-[var(--color-manga-black)] relative flex flex-col p-8 md:p-16 lg:p-24 overflow-hidden bg-[var(--color-manga-white)] will-change-[transform,opacity]">
        
        {/* Background Texture & Kanji */}
        <div className="absolute inset-0 bg-crosshatch-4 opacity-[0.03] pointer-events-none mix-blend-multiply"></div>
        <div 
          className="absolute -top-10 right-[-5%] md:right-10 text-[15rem] md:text-[30rem] font-bold leading-none opacity-[0.03] pointer-events-none -skew-x-[8deg] select-none" 
          style={{ fontFamily: 'var(--font-noto)' }}
        >
          次章
        </div>

        {/* Top Content: Dramatic Typography */}
        <div className="relative z-10 max-w-5xl">
          <p className="cta-anim text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-8 md:mb-12 border-l-4 border-[var(--color-manga-black)] pl-4 opacity-80 will-change-[transform,opacity]">
            Final Page // 最終ページ
          </p>
          <h2 
            className="cta-anim text-[clamp(4rem,11vw,10rem)] font-bold uppercase leading-[0.85] tracking-[0.02em] -skew-x-[6deg] will-change-[transform,opacity]" 
            style={{ fontFamily: 'var(--font-title)' }}
          >
            YOUR TURN<br/>
            <span className="text-stroke-manga text-transparent block mt-2 md:mt-4">
              TO CREATE.
            </span>
          </h2>
        </div>

        {/* Bottom Content: Intentional Whitespace pushes this down */}
        <div className="mt-auto pt-32 flex flex-col xl:flex-row items-start xl:items-end justify-between gap-16 relative z-10">
          
          <div className="max-w-xl cta-anim will-change-[transform,opacity]">
            <p className="text-xl md:text-2xl font-medium tracking-wide leading-relaxed opacity-80">
              The story doesn&apos;t end here. Step into the studio, claim your pen, and shape the next era of manga.
            </p>
          </div>

          {/* Form / Join Action */}
          <div className="w-full xl:w-auto cta-anim will-change-[transform,opacity]">
            <form 
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                const btn = e.currentTarget.querySelector('button span');
                if (btn) btn.textContent = 'JOINED!! ★';
              }}
            >
              <div className="flex flex-col sm:flex-row border-[3px] border-[var(--color-manga-black)] bg-white overflow-hidden shadow-[8px_8px_0_var(--color-manga-black)] focus-within:shadow-[12px_12px_0_var(--color-manga-black)] focus-within:-translate-y-1 focus-within:-translate-x-1 transition-all duration-300">
                <input
                  type="email"
                  placeholder="AUTHOR@EMAIL.COM"
                  className="flex-1 px-6 py-6 md:py-8 text-lg md:text-xl font-bold outline-none placeholder:text-black/20 uppercase tracking-widest min-w-[280px]"
                  required
                />
                <button
                  type="submit"
                  className="bg-[var(--color-manga-black)] text-[var(--color-manga-white)] px-10 py-6 md:py-8 font-bold tracking-[0.3em] uppercase text-lg relative overflow-hidden group/btn hover:bg-black/90 transition-colors"
                >
                  <span className="relative z-10 mix-blend-difference block transition-all">ENTER</span>
                  <div className="absolute inset-0 bg-white translate-y-[101%] group-hover/btn:translate-y-[0%] transition-transform duration-500 ease-[var(--ease-cinematic)]"></div>
                </button>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[var(--color-manga-gray)] opacity-60 uppercase">
                  Free to join · Cancel anytime
                </p>
                <div className="w-12 h-[2px] bg-[var(--color-manga-black)] opacity-20 hidden sm:block"></div>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
