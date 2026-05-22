"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const characters = [
  { id: 1, name: "KAITO", role: "THE PROTAGONIST", kanji: "英雄", power: 85, speed: 92, will: 100 },
  { id: 2, name: "YAMI", role: "THE SHADOW", kanji: "影", power: 78, stealth: 99, intel: 90 },
  { id: 3, name: "HIKARI", role: "THE GUARDIAN", kanji: "光", power: 95, defense: 100, heal: 88 },
];

export default function Characters() {
  const [activeId, setActiveId] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".char-title", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const activeChar = characters.find(c => c.id === activeId)!;

  return (
    <section ref={containerRef} className="py-24 px-6 max-w-7xl mx-auto border-b-[2px] border-[var(--color-manga-black)] bg-[var(--color-manga-white)] relative z-10">
      <div className="text-center mb-20 relative char-title">
        <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-[0.15em] text-[var(--color-manga-black)] relative z-10 uppercase -skew-x-[8deg]">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(4rem,14vw,10rem)] opacity-[0.03] whitespace-nowrap pointer-events-none tracking-normal">HEROES</span>
          Characters
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          {characters.map((char) => (
            <button
              key={char.id}
              onClick={() => setActiveId(char.id)}
              className={`text-left p-6 border-[2px] border-[var(--color-manga-black)] relative overflow-hidden transition-all duration-500 ease-[var(--ease-cinematic)] ${activeId === char.id ? 'bg-[var(--color-manga-black)] text-[var(--color-manga-white)] shadow-[6px_6px_0_rgba(17,17,17,0.15)] -translate-y-1' : 'bg-transparent text-[var(--color-manga-black)] hover:bg-black/[0.03] hover:-translate-y-0.5'}`}
            >
              {activeId === char.id && (
                <motion.div layoutId="char-active-bg" className="absolute inset-0 bg-[var(--color-manga-black)] z-0" />
              )}
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold tracking-[0.1em] -skew-x-[6deg]">{char.name}</h3>
                  <p className="text-xs opacity-70 tracking-[0.15em] mt-1 font-bold uppercase">{char.role}</p>
                </div>
                <span className="text-4xl opacity-20 font-bold" style={{ fontFamily: 'var(--font-noto)' }}>{char.kanji}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="w-full md:w-2/3 border-[2px] border-[var(--color-manga-black)] p-10 relative overflow-hidden bg-white min-h-[450px] shadow-[8px_8px_0_var(--color-manga-black)]">
          <div className="absolute inset-0 bg-crosshatch-1 opacity-[0.04] pointer-events-none mix-blend-multiply"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-10 flex flex-col md:flex-row gap-10 h-full"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
                <div className="relative">
                  <span className="text-[10rem] leading-none text-[var(--color-manga-black)] opacity-[0.03] absolute -top-12 -left-8 pointer-events-none" style={{ fontFamily: 'var(--font-noto)' }}>{activeChar.kanji}</span>
                  <h3 className="text-6xl font-bold tracking-[0.05em] text-[var(--color-manga-black)] -skew-x-[8deg] uppercase relative z-10">{activeChar.name}</h3>
                  <p className="text-sm font-bold tracking-[0.2em] text-[var(--color-manga-gray)] mt-3 uppercase relative z-10">{activeChar.role}</p>
                </div>

                <div className="flex flex-col gap-5 mt-6 relative z-10">
                  {Object.entries(activeChar).filter(([k]) => !['id', 'name', 'role', 'kanji'].includes(k)).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-5">
                      <span className="w-24 text-xs font-bold tracking-[0.15em] uppercase opacity-80">{key}</span>
                      <div className="flex-1 h-2 border-[1px] border-[var(--color-manga-black)] bg-[var(--color-manga-light)] relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 1.2, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                          className="absolute top-0 left-0 h-full bg-[var(--color-manga-black)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-1/2 relative min-h-[300px] flex items-end justify-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                  className="w-56 h-80 bg-[var(--color-manga-black)] mb-4 relative before:absolute before:inset-0 before:bg-white before:opacity-[0.05] before:mix-blend-overlay"
                  style={{
                    clipPath: activeId === 1
                      ? "polygon(50% 0%, 35% 15%, 25% 10%, 30% 25%, 20% 35%, 5% 55%, 15% 58%, 10% 75%, 25% 65%, 35% 100%, 65% 100%, 75% 65%, 90% 75%, 85% 58%, 95% 55%, 80% 35%, 70% 25%, 75% 10%, 65% 15%)"
                      : activeId === 2
                        ? "polygon(50% 0%, 40% 10%, 30% 5%, 35% 20%, 15% 40%, 5% 60%, 20% 55%, 15% 80%, 30% 70%, 40% 100%, 60% 100%, 70% 70%, 85% 80%, 80% 55%, 95% 60%, 85% 40%, 65% 20%, 70% 5%, 60% 10%)"
                        : "polygon(50% 0%, 38% 12%, 20% 8%, 28% 28%, 8% 45%, 0% 62%, 18% 58%, 12% 82%, 28% 72%, 38% 100%, 62% 100%, 72% 72%, 88% 82%, 82% 58%, 100% 62%, 92% 45%, 72% 28%, 80% 8%, 62% 12%)"
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
