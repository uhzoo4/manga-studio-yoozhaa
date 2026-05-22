"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Cta() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      const anomaly = document.querySelector('.anomaly-text');
      if (anomaly) {
        anomaly.addEventListener('mouseenter', () => {
          gsap.to(anomaly, {
            x: "random(-3, 3)",
            y: "random(-3, 3)",
            duration: 0.08,
            repeat: 4,
            yoyo: true,
            ease: "none",
            onComplete: () => gsap.set(anomaly, { x: 0, y: 0 })
          });
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-32 pb-32 px-6 text-center relative overflow-hidden bg-[var(--color-manga-white)] z-10 border-b-[2px] border-[var(--color-manga-black)]">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_40px,rgba(0,0,0,0.03)_40px,rgba(0,0,0,0.03)_41px)] pointer-events-none"></div>

      <div className="cta-content relative z-9 max-w-3xl mx-auto flex flex-col items-center">
        <div className="bg-[var(--color-manga-white)] border-[2px] border-[var(--color-manga-black)] px-8 md:px-16 py-8 md:py-10 relative mb-16 shadow-[6px_6px_0_var(--color-manga-black)]">
          <h2 className="text-[clamp(2rem,6vw,4rem)] font-bold tracking-[0.1em] text-[var(--color-manga-black)] -skew-x-[8deg]">
            READY TO BEGIN?!
          </h2>
          <div
            className="absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-[var(--color-manga-black)]"
            aria-hidden="true"
          />
        </div>

        <p className="text-xl md:text-2xl text-[var(--color-manga-gray)] font-medium tracking-[0.1em] mb-16 max-w-xl">
          Your manga journey starts <strong className="text-[var(--color-manga-black)] anomaly-text cursor-pointer inline-block font-bold">NOW</strong>. No turning back.
        </p>

        <form className="w-full max-w-2xl" onSubmit={(e) => {
          e.preventDefault();
          const btn = e.currentTarget.querySelector('button span');
          if (btn) btn.textContent = 'JOINED!! ★';
        }}>
          <div className="flex flex-col md:flex-row border-[2px] border-[var(--color-manga-black)] bg-white overflow-hidden group focus-within:ring-2 ring-[var(--color-manga-black)] ring-offset-2 transition-shadow duration-300">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-8 py-5 md:py-6 text-lg font-medium bg-transparent outline-none text-[var(--color-manga-black)] placeholder:text-black/30 tracking-wide"
              required
            />
            <button
              type="submit"
              className="bg-[var(--color-manga-black)] text-[var(--color-manga-white)] px-12 py-5 md:py-6 font-bold tracking-[0.2em] text-lg relative overflow-hidden group/btn hover:bg-black/90 transition-colors"
            >
              <span className="relative z-10 mix-blend-difference block transition-all">JOIN NOW!!</span>
              <div className="absolute inset-0 bg-white translate-y-[101%] group-hover/btn:translate-y-[0%] transition-transform duration-500 ease-[var(--ease-cinematic)]"></div>
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-bold tracking-[0.2em] text-[var(--color-manga-gray)] opacity-50 uppercase">
          Free to join · No credit card · Cancel anytime
        </p>
      </div>
    </section>
  );
}
