export default function Footer() {
  return (
    <footer className="bg-[var(--color-manga-black)] text-[var(--color-manga-white)] py-14 px-6 relative z-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,240,232,0.03),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex items-center gap-4 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-noto)' }}>漫画</span>
          <span className="text-2xl font-bold tracking-[0.2em] -skew-x-[6deg] text-white">STUDIO</span>
        </div>

        <p className="text-[0.65rem] tracking-[0.2em] opacity-40 font-bold uppercase">
          © 2026 MANGA STUDIO. All Rights Reserved.
        </p>

        <div className="flex gap-8 text-xs font-bold tracking-[0.15em] uppercase">
          <a href="#" className="opacity-60 hover:opacity-100 hover:-translate-y-0.5 transition-all duration-300">Twitter</a>
          <a href="#" className="opacity-60 hover:opacity-100 hover:-translate-y-0.5 transition-all duration-300">Discord</a>
          <a href="#" className="opacity-60 hover:opacity-100 hover:-translate-y-0.5 transition-all duration-300">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
