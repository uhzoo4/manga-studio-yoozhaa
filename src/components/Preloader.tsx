"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsComplete(true)
    });

    tl.fromTo(textRef.current, 
      { scale: 2, opacity: 0, rotation: 5 }, 
      { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "power4.out" }
    )
    .to(textRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: "power2.inOut",
      delay: 0.5
    })
    .to(panelsRef.current, {
      height: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.inOut"
    }, "-=0.2");

  }, []);

  if (isComplete) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col pointer-events-none overflow-hidden">
      {[0, 1, 2].map(i => (
        <div 
          key={i}
          ref={el => { if (el) panelsRef.current[i] = el; }}
          className="w-full flex-1 bg-[var(--color-manga-black)] border-b-2 border-white/5"
        />
      ))}
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={textRef} className="text-[var(--color-manga-white)] flex flex-col items-center">
          <span style={{ fontFamily: 'var(--font-noto)' }} className="text-8xl md:text-9xl">読</span>
          <span style={{ fontFamily: 'var(--font-space)' }} className="mt-6 text-xl md:text-2xl tracking-[0.4em] font-bold">LOADING</span>
        </div>
      </div>
    </div>
  );
}
