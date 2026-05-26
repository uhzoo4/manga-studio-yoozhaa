"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const starburstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        // Title character animation
        gsap.from(".hero-char", {
          y: 100,
          opacity: 0,
          rotateX: -90,
          stagger: 0.05,
          duration: 1.2,
          ease: "power4.out",
          delay: 2.8
        });

        // Sub-elements fade up
        gsap.from(".hero-anim-up", {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          delay: 3.5
        });

        // --- PHASE 2: Light parallax on starburst background ---
        if (starburstRef.current) {
          gsap.fromTo(starburstRef.current,
            { y: 0 },
            {
              y: 200,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const renderSplitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="hero-char inline-block whitespace-pre">
        {char}
      </span>
    ));
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden border-b-[2px] border-[var(--color-manga-black)] pt-28 pb-24 px-6 bg-gradient-to-b from-[var(--color-manga-white)] to-[#ebe6de]">
      <div
        ref={starburstRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 -translate-y-[5%] will-change-transform"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 70% at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at center, black 30%, transparent 80%)',
        }}
      >
        <svg className="w-[140%] max-w-[1600px] opacity-[0.06] starburst-spin" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
          <polygon className="fill-[var(--color-manga-black)]" points="400,0 440,300 800,200 480,380 700,600 420,440 400,800 380,440 100,600 320,380 0,200 360,300" />
        </svg>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="relative bg-[var(--color-manga-white)] border-[2px] border-[var(--color-manga-black)] px-7 py-3 mb-6 hero-anim-up opacity-0">
          <p style={{ fontFamily: 'var(--font-noto)' }} className="text-sm md:text-base tracking-widest text-[var(--color-manga-black)] font-bold">
            あなたのストーリーが始まる
          </p>
          <div
            className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[13px] border-t-[var(--color-manga-black)]"
            aria-hidden="true"
          />
        </div>

        <h1 ref={titleRef} className="text-[clamp(4rem,15vw,12rem)] leading-[0.95] uppercase overflow-visible" style={{ fontFamily: 'var(--font-title)', perspective: 1000 }}>
          <div className="block title-flicker text-stroke-manga text-[clamp(4rem,15vw,12rem)] tracking-[0.04em] -skew-x-[10deg]">{renderSplitText("MANGA")}</div>
          <div className="block text-[clamp(3rem,10vw,7.5rem)] tracking-[0.15em] text-[var(--color-manga-black)] -skew-x-[10deg]">{renderSplitText("STUDIO")}</div>
        </h1>

        <div className="mt-4 hero-anim-up opacity-0 border-y-[2px] border-[var(--color-manga-black)] py-4 px-8">
          <p className="text-[clamp(1rem,3vw,1.8rem)] tracking-[0.25em] text-[var(--color-manga-black)] opacity-50 font-bold">
            CREATE. FIGHT. CONQUER.
          </p>
        </div>

        <div className="mt-8 flex gap-4 hero-anim-up opacity-0">
          <button className="group relative overflow-hidden bg-[var(--color-manga-black)] text-[var(--color-manga-white)] border-[2px] border-[var(--color-manga-black)] px-7 py-3 font-bold tracking-[3px] hover:scale-[1.02] transition-all duration-300">
            <span className="relative z-10 mix-blend-difference">START READING</span>
            <div className="absolute inset-0 bg-[var(--color-manga-white)] translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-300 ease-[var(--ease-cinematic)] z-0"></div>
          </button>
          <button className="bg-transparent text-[var(--color-manga-black)] border-[2px] border-[var(--color-manga-black)] px-7 py-3 font-bold tracking-[3px] hover:bg-[var(--color-manga-black)] hover:text-[var(--color-manga-white)] hover:scale-[1.02] transition-all duration-300">
            EXPLORE
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center hero-anim-up opacity-0">
        <div className="w-5 h-5 border-r-[4px] border-b-[4px] border-[var(--color-manga-black)] rotate-45 mb-2 animate-[bounce_2.5s_ease-in-out_infinite]"></div>
        <span className="text-[0.65rem] tracking-[0.3em] font-bold text-[var(--color-manga-gray)] opacity-50">SCROLL DOWN</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgba(17,17,17,0.05)] to-transparent pointer-events-none z-[1]" aria-hidden="true" />
    </section >
  );
}
