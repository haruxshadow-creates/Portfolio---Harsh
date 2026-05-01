import { useEffect, useRef } from 'react';

export default function GlobalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w: number, h: number;
    let pts: Pt[] = [];
    let streaks: Streak[] = [];
    let mX = window.innerWidth / 2;
    let mY = window.innerHeight / 2;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mX = e.clientX;
      mY = e.clientY;
    };

    function r(a: number, b: number) { return Math.random() * (b - a) + a; }

    class Pt {
      x: number; y: number; vx: number; vy: number; rad: number; a: number; phase: number; da: number; blue: boolean;
      constructor() {
        this.x = r(0, w);
        this.y = r(0, h);
        this.vx = r(-0.15, 0.15);
        this.vy = r(-0.22, -0.04);
        this.rad = r(0.5, 2);
        this.a = r(0.1, 0.5);
        this.phase = r(0, Math.PI * 2);
        this.da = r(0.001, 0.003);
        this.blue = Math.random() > 0.5;
      }
      tick(t: number) {
        this.x += this.vx + Math.sin(t * 0.0004 + this.phase) * 0.12;
        this.y += this.vy;
        this.a += Math.sin(t * 0.0012 + this.phase) * this.da;
        this.a = Math.max(0.05, Math.min(0.55, this.a));
        if (this.y < -4) { this.y = h + 4; this.x = r(0, w); }
        if (this.x < -4) this.x = w + 4;
        if (this.x > w + 4) this.x = -4;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
        ctx.fillStyle = this.blue ? `rgba(0,195,255,${this.a})` : `rgba(168,85,247,${this.a})`;
        ctx.fill();
      }
    }

    class Streak {
      x: number = 0; y: number = 0; len: number = 0; spd: number = 0; ang: number = 0; a: number = 0; maxA: number = 0; life: number = 0; maxL: number = 0; col: string = '';
      constructor() { this.reset(); }
      reset() {
        this.x = r(0, w);
        this.y = r(0, h * 0.6);
        this.len = r(55, 170);
        this.spd = r(3, 7);
        this.ang = r(-0.4, 0.15) + Math.PI * 0.25;
        this.a = 0;
        this.maxA = r(0.2, 0.45);
        this.life = 0;
        this.maxL = r(55, 110);
        this.col = Math.random() > 0.5 ? '0,195,255' : '168,85,247';
      }
      tick() {
        this.life++;
        if (this.life < 18) this.a = this.maxA * (this.life / 18);
        else if (this.life > this.maxL - 18) this.a = this.maxA * ((this.maxL - this.life) / 18);
        this.x += Math.cos(this.ang) * this.spd;
        this.y += Math.sin(this.ang) * this.spd;
        if (this.life >= this.maxL) this.reset();
      }
      draw() {
        if (!ctx) return;
        ctx.save();
        const g = ctx.createLinearGradient(this.x, this.y, this.x - Math.cos(this.ang) * this.len, this.y - Math.sin(this.ang) * this.len);
        g.addColorStop(0, `rgba(${this.col},${this.a})`);
        g.addColorStop(1, `rgba(${this.col},0)`);
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - Math.cos(this.ang) * this.len, this.y - Math.sin(this.ang) * this.len);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.1;
        ctx.stroke();
        ctx.restore();
      }
    }

    function init() {
      const N = Math.min(Math.floor(w * h / 13000), 95);
      pts = Array.from({ length: N }, () => new Pt());
      streaks = Array.from({ length: 4 }, () => {
        const s = new Streak();
        s.life = Math.floor(Math.random() * s.maxL);
        return s;
      });
    }

    function drawLinks() {
      if (!ctx) return;
      const D = 110;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < D) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,195,255,${0.045 * (1 - d / D)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
    }

    let frameId: number;
    const loop = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createRadialGradient(mX, mY, 0, mX, mY, 280);
      g.addColorStop(0, 'rgba(0,195,255,0.038)');
      g.addColorStop(0.5, 'rgba(168,85,247,0.015)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      drawLinks();
      pts.forEach(p => { p.tick(t); p.draw(); });
      streaks.forEach(s => { s.tick(); s.draw(); });
      frameId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    frameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
