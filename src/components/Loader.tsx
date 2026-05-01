import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w: number, h: number;
    let lPts: LParticle[] = [];
    let slideLines: SlideLine[] = [];
    let lRings: Ring[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    function rnd(a: number, b: number) { return Math.random() * (b - a) + a; }

    class LParticle {
      x: number = 0; y: number = 0; vy: number = 0; vx: number = 0; r: number = 0; a: number = 0; blue: boolean = false; phase: number = 0;
      constructor() { this.reset(); this.y = rnd(0, h); }
      reset() {
        this.x = rnd(0, w);
        this.y = h + 10;
        this.vy = rnd(-0.7, -0.15);
        this.vx = rnd(-0.1, 0.1);
        this.r = rnd(0.4, 1.8);
        this.a = rnd(0.08, 0.4);
        this.blue = Math.random() > 0.45;
        this.phase = rnd(0, Math.PI * 2);
      }
      tick(t: number) {
        this.x += this.vx + Math.sin(t * 0.0003 + this.phase) * 0.2;
        this.y += this.vy;
        if (this.y < -5) this.reset();
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.blue ? `rgba(0,195,255,${this.a})` : `rgba(168,85,247,${this.a})`;
        ctx.fill();
      }
    }

    class SlideLine {
      x: number = 0; y: number = 0; speed: number = 0; len: number = 0; w: number = 0; blue: boolean = false; alpha: number = 0;
      constructor() { this.reset(); this.x = rnd(-300, -50); }
      reset() {
        this.y = rnd(0, h);
        this.speed = rnd(4.5, 12);
        this.len = rnd(90, 290);
        this.w = rnd(0.3, 2);
        this.blue = Math.random() > 0.45;
        this.alpha = rnd(0.18, 0.72);
        this.x = -this.len - 10;
      }
      tick() {
        this.x += this.speed;
        if (this.x > w + 60) this.reset();
      }
      draw() {
        if (!ctx) return;
        const col = this.blue ? '0,195,255' : '168,85,247';
        const g = ctx.createLinearGradient(this.x - this.len, this.y, this.x + 10, this.y);
        g.addColorStop(0, `rgba(${col},0)`);
        g.addColorStop(0.55, `rgba(${col},${this.alpha})`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx.beginPath();
        ctx.moveTo(this.x - this.len, this.y);
        ctx.lineTo(this.x + 10, this.y);
        ctx.strokeStyle = g;
        ctx.lineWidth = this.w;
        ctx.stroke();
      }
    }

    class Ring {
      delay: number; r: number = 0; maxR: number; a: number; speed: number; blue: boolean; born: boolean = false;
      constructor(d: number) {
        this.delay = d;
        this.maxR = rnd(85, 260);
        this.a = rnd(0.3, 0.65);
        this.speed = rnd(1.2, 2.8);
        this.blue = Math.random() > 0.5;
      }
      tick(e: number) {
        if (e < this.delay) return;
        this.born = true;
        this.r += this.speed;
        this.a = (1 - this.r / this.maxR) * (this.blue ? 0.45 : 0.38);
      }
      draw() {
        if (!ctx || !this.born || this.r <= 0 || this.a <= 0.005) return;
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, this.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${this.blue ? '0,195,255' : '168,85,247'},${this.a})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      isDone() { return this.born && this.r >= this.maxR; }
    }

    resize();
    lPts = Array.from({ length: 58 }, () => new LParticle());
    slideLines = Array.from({ length: 20 }, () => new SlideLine());
    slideLines.forEach((l, i) => { l.y = (h / 20) * i + rnd(-25, 25); });
    const spawnRings = () => { lRings = Array.from({ length: 7 }, (_, i) => new Ring(i * 260)); };
    spawnRings();

    let elapsed = 0;
    let frameId: number;
    const loop = (t: number) => {
      elapsed += 16;
      ctx.clearRect(0, 0, w, h);
      const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.75);
      bg.addColorStop(0, 'rgba(0,12,32,.4)');
      bg.addColorStop(1, 'rgba(0,0,15,0)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      
      ctx.strokeStyle = 'rgba(0,195,255,.022)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < w; gx += 70) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); }
      for (let gy = 0; gy < h; gy += 70) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }
      
      slideLines.forEach(l => { l.tick(); l.draw(); });
      lRings.forEach(r => { r.tick(elapsed); r.draw(); });
      if (lRings.every(r => r.isDone())) spawnRings();
      lPts.forEach(p => { p.tick(t); p.draw(); });
      frameId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    frameId = requestAnimationFrame(loop);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + (100 - prev) * 0.028 + 0.45, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 350);
        }
        return next;
      });
    }, 26);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isExiting) {
      setTimeout(onComplete, 1200);
    }
  }, [isExiting, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="loader"
          className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center pointer-events-none"
          exit={{ 
            opacity: [1, 0.8, 1, 0], 
            scale: [1, 1.02, 1.05, 1.5], 
            filter: ['blur(0px) hue-rotate(0deg)', 'blur(4px) hue-rotate(90deg) contrast(150%)', 'blur(0px) hue-rotate(-90deg)', 'blur(20px) hue-rotate(180deg)'],
            x: [0, -15, 25, -40, 0],
            y: [0, 8, -12, 20, 0],
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], times: [0, 0.2, 0.4, 1] }
          }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
          <motion.div 
            className="relative z-10 flex flex-col items-center gap-8 perspective-[1000px]"
            exit={{ opacity: 0, transition: { staggerChildren: 0.1 } }}
          >
            <motion.div 
              className="relative w-[110px] h-[110px]"
              exit={{ 
                scale: 3, 
                opacity: 0, 
                filter: 'blur(25px)', 
                rotateX: 180, 
                rotateY: -90, 
                rotateZ: 45, 
                x: -100, 
                transition: { duration: 0.9, ease: 'easeIn' } 
              }}
            >
              <div className="absolute -inset-[14px] rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(0,195,255,0.55)_20%,transparent_40%,rgba(168,85,247,0.55)_65%,transparent_85%)] animate-spin-slow blur-[5px]" />
              <div className="absolute -inset-[5px] rounded-full border border-blue/20 animate-spin-slow-reverse">
                <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] bg-blue rounded-full glow-blue" />
              </div>
              <div className="absolute inset-0 rounded-full border border-purple/10 animate-spin-slow">
                <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] bg-purple rounded-full glow-purple" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-[2.6rem] bg-gradient-to-br from-blue to-purple bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(0,195,255,0.6)] animate-pulse">
                ⬡
              </div>
            </motion.div>
            <motion.div 
              className="font-display text-[1.1rem] font-black tracking-[0.38em] uppercase text-white relative overflow-hidden"
              exit={{ 
                y: -150, 
                x: 100,
                rotateZ: -15,
                rotateX: 45,
                scale: 2, 
                opacity: 0, 
                filter: 'blur(15px)', 
                letterSpacing: '1.2em', 
                transition: { duration: 1, ease: 'easeIn' } 
              }}
            >
              <motion.span
                initial={{ opacity: 0, letterSpacing: '0.62em', filter: 'blur(14px)' }}
                animate={{ opacity: 1, letterSpacing: '0.38em', filter: 'blur(0px)' }}
                transition={{ duration: 1.6, ease: 'easeOut', delay: 0.3 }}
                className="block"
              >
                XIECOR_STUDIOS
              </motion.span>
              <div className="absolute right-[-1px] top-0 bottom-0 w-[2px] bg-blue animate-pulse" />
            </motion.div>
            <motion.div 
              className="w-[220px] h-[1px] bg-white/5 relative overflow-hidden rounded-sm"
              exit={{ 
                scaleX: 5, 
                rotateZ: 25,
                opacity: 0, 
                y: 100, 
                x: -50,
                filter: 'blur(15px)', 
                transition: { duration: 0.8, ease: 'easeIn' } 
              }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue to-purple rounded-sm shadow-[0_0_10px_rgba(0,195,255,0.9)]"
                style={{ width: `${progress}%` }}
              />
            </motion.div>
            <motion.div 
              className="font-display text-[0.52rem] tracking-[0.35em] text-blue/55 -mt-2.5 min-w-[3em] text-center"
              exit={{ 
                y: 120, 
                x: 80,
                rotateZ: 45,
                scale: 0.2, 
                opacity: 0, 
                filter: 'blur(10px)', 
                transition: { duration: 0.9, ease: 'easeIn' } 
              }}
            >
              {Math.round(progress)}%
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
