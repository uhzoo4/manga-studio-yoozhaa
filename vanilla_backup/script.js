/* ======================================================
   MANGA STUDIO — Landing Page JavaScript
   Heavy animations · Intersection Observer · Ink Canvas
   ====================================================== */
(function () {
  'use strict';
  // ---- PRELOADER ----
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      initAll();
    }, 2400);
  });
  document.body.style.overflow = 'hidden';
  function initAll() {
    initScrollAnimations();
    initPowerBars();
    initBurger();
    initInkCanvas();
    initParallax();
    initFormSFX();
    initNavHide();
    initPanelClick();
  }
  // ---- INTERSECTION OBSERVER SCROLL ANIMATIONS ----
  function initScrollAnimations() {
    const els = document.querySelectorAll('.animate-on-scroll');
    if (!els.length) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || '0', 10);
            if (prefersReduced) {
              entry.target.classList.add('visible');
            } else {
              setTimeout(() => entry.target.classList.add('visible'), delay);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
  }
  // ---- POWER BARS (character stats) ----
  function initPowerBars() {
    const bars = document.querySelectorAll('.power-fill');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const power = entry.target.dataset.power || 50;
            entry.target.style.width = power + '%';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    bars.forEach((b) => observer.observe(b));
  }
  // ---- BURGER MENU ----
  function initBurger() {
    const btn = document.getElementById('burger-btn');
    const links = document.getElementById('nav-links');
    if (!btn || !links) return;
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      btn.classList.toggle('active');
      btn.setAttribute('aria-expanded', open);
    });
    // Close on link click
    links.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }
  // ---- INK SPLASH CANVAS (cursor trail) ----
  function initInkCanvas() {
    const canvas = document.getElementById('ink-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    const splashes = [];
    const MAX_SPLASHES = 40;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    // Only on desktop
    if (window.matchMedia('(pointer: fine)').matches) {
      document.addEventListener('mousemove', (e) => {
        if (splashes.length > MAX_SPLASHES) return;
        if (Math.random() > 0.6) return; // throttle
        splashes.push({
          x: e.clientX,
          y: e.clientY,
          r: Math.random() * 6 + 2,
          alpha: 0.25,
          decay: 0.008 + Math.random() * 0.01,
        });
      });
      function drawSplashes() {
        ctx.clearRect(0, 0, w, h);
        for (let i = splashes.length - 1; i >= 0; i--) {
          const s = splashes[i];
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(17,17,17,${s.alpha})`;
          ctx.fill();
          s.alpha -= s.decay;
          s.r += 0.1;
          if (s.alpha <= 0) splashes.splice(i, 1);
        }
        requestAnimationFrame(drawSplashes);
      }
      drawSplashes();
    }
  }
  // ---- PARALLAX on Hero starburst ----
  function initParallax() {
    const star = document.querySelector('.hero-starburst');
    if (!star || window.matchMedia('(pointer: coarse)').matches) return;
    document.addEventListener('mousemove', (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 20;
      const cy = (e.clientY / window.innerHeight - 0.5) * 20;
      star.style.transform = `translate(${cx}px, ${cy}px)`;
    });
  }
  // ---- FORM SFX ----
  function initFormSFX() {
    const form = document.getElementById('signup-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      btn.querySelector('.btn-text').textContent = 'JOINED!! ★';
      btn.style.background = '#333';
      setTimeout(() => {
        btn.querySelector('.btn-text').textContent = 'JOIN NOW!!';
        btn.style.background = '';
      }, 2000);
    });
  }
  // ---- NAV HIDE ON SCROLL DOWN ----
  function initNavHide() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    let lastY = 0;
    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY;
        if (y > lastY && y > 200) {
          nav.style.transform = 'translateY(-100%)';
        } else {
          nav.style.transform = 'translateY(0)';
        }
        lastY = y;
      },
      { passive: true }
    );
  }
  // ---- PANEL CLICK EFFECT ----
  function initPanelClick() {
    document.querySelectorAll('.comic-panel').forEach((panel) => {
      panel.addEventListener('click', () => {
        panel.style.transition = 'none';
        panel.style.transform = 'scale(0.95)';
        requestAnimationFrame(() => {
          panel.style.transition = '';
          panel.style.transform = '';
        });
      });
    });
  }
})();
