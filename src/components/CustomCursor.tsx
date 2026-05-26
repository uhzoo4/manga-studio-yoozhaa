"use client";

import { useEffect, useRef } from "react";

type InkParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  ttl: number;
  alpha: number;
  angle: number;
};

const MAX_PARTICLES = 54;
const TRAIL_LERP = 0.16;
const TRAIL_INTERVAL_MS = 34;
const TRAIL_DISTANCE = 12;
const INK = "0, 0, 0";

const randomRange = (min: number, max: number) => min + Math.random() * (max - min);

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    const supportsInkCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsInkCursor || prefersReduced) {
      canvas.style.display = "none";
      return;
    }

    const particles: InkParticle[] = [];
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
    const brush = { x: pointer.x, y: pointer.y };
    const lastInk = { x: pointer.x, y: pointer.y, time: 0 };
    let lastMoveTime = 0;
    let lastFrameTime = performance.now();
    let animationFrame = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addParticle = (
      x: number,
      y: number,
      radius: number,
      alpha: number,
      ttl: number,
      vx = 0,
      vy = 0,
    ) => {
      particles.push({
        x,
        y,
        vx,
        vy,
        radius,
        life: ttl,
        ttl,
        alpha,
        angle: randomRange(-0.5, 0.5),
      });

      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES);
      }
    };

    const addTrailPoint = (now: number) => {
      const dx = brush.x - lastInk.x;
      const dy = brush.y - lastInk.y;
      const distance = Math.hypot(dx, dy);
      const isMoving = now - lastMoveTime < 90;

      if (!isMoving || now - lastInk.time < TRAIL_INTERVAL_MS || distance < TRAIL_DISTANCE) return;

      addParticle(
        brush.x + randomRange(-2.5, 2.5),
        brush.y + randomRange(-2.5, 2.5),
        randomRange(1.8, 4.2),
        randomRange(0.74, 0.95),
        randomRange(1100, 1650),
        randomRange(-0.04, 0.04),
        randomRange(-0.04, 0.04),
      );

      lastInk.x = brush.x;
      lastInk.y = brush.y;
      lastInk.time = now;
    };

    const addClickBurst = (event: PointerEvent) => {
      if (event.button !== 0) return;

      const count = 7;
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + randomRange(-0.22, 0.22);
        const velocity = randomRange(0.2, 0.75);

        addParticle(
          event.clientX + randomRange(-1.5, 1.5),
          event.clientY + randomRange(-1.5, 1.5),
          randomRange(1.8, 4),
          randomRange(0.82, 1),
          randomRange(900, 1250),
          Math.cos(angle) * velocity,
          Math.sin(angle) * velocity,
        );
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      lastMoveTime = performance.now();

      if (!pointer.active) {
        pointer.active = true;
        brush.x = pointer.x;
        brush.y = pointer.y;
        lastInk.x = pointer.x;
        lastInk.y = pointer.y;
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const drawParticle = (particle: InkParticle, fade: number) => {
      const alpha = particle.alpha * fade;
      const edgeAlpha = alpha * 0.62;

      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.angle);

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.radius * 2.2);
      gradient.addColorStop(0, `rgba(${INK}, ${alpha})`);
      gradient.addColorStop(0.55, `rgba(${INK}, ${alpha * 0.94})`);
      gradient.addColorStop(1, `rgba(${INK}, ${edgeAlpha})`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, particle.radius * 1.25, particle.radius * 0.82, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const tick = (now: number) => {
      const dt = Math.min(now - lastFrameTime, 32);
      lastFrameTime = now;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      brush.x += (pointer.x - brush.x) * TRAIL_LERP;
      brush.y += (pointer.y - brush.y) * TRAIL_LERP;

      addTrailPoint(now);

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.life -= dt;

        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.vx *= 0.985;
        particle.vy *= 0.985;

        drawParticle(particle, Math.pow(particle.life / particle.ttl, 0.56));
      }

      const idleFade = Math.max(0, 1 - (now - lastMoveTime) / 600);
      if (pointer.active && idleFade > 0) {
        ctx.save();
        ctx.fillStyle = `rgba(${INK}, ${0.72 * idleFade})`;
        ctx.beginPath();
        ctx.ellipse(brush.x, brush.y, 1.8, 1.35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", addClickBurst, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", addClickBurst);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      particles.length = 0;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] hidden md:block pointer-events-none"
    />
  );
}
