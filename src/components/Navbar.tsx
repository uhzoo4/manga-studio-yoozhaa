"use client";

import { useEffect, useState } from 'react';

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Panels", href: "#panels" },
  { label: "Characters", href: "#characters" },
  { label: "Action", href: "#action" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] px-6 md:px-10 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-[var(--color-manga-white)] border-b-[2px] border-[var(--color-manga-black)]' : 'bg-transparent border-b-[2px] border-transparent'}`}>
      <a href="#story" onClick={(e) => handleNav(e, '#story')} className="flex items-center gap-2">
        <span style={{ fontFamily: "var(--font-noto)" }} className="text-lg font-bold text-[var(--color-manga-black)]">
          漫画
        </span>
        <span className="text-sm tracking-[0.2em] font-bold text-[var(--color-manga-black)] uppercase">
          STUDIO
        </span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNav(e, link.href)}
            className="text-xs tracking-[0.15em] font-bold text-[var(--color-manga-black)] uppercase hover:opacity-50 transition-opacity duration-200"
          >
            {link.label}
          </a>
        ))}
        <a 
          href="#join"
          onClick={(e) => handleNav(e, '#join')}
          className="border-[2px] border-[var(--color-manga-black)] px-4 py-1.5 text-xs tracking-[0.15em] font-bold text-[var(--color-manga-black)] uppercase hover:bg-[var(--color-manga-black)] hover:text-[var(--color-manga-white)] transition-all duration-300"
        >
          Join Now
        </a>
      </div>
    </nav>
  );
}
