import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current) return;
      const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      logoRef.current.style.transform = `perspective(600px) rotateX(${-dy * 12}deg) rotateY(${dx * 12}deg) translateZ(16px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-transparent">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-30 animate-pulse bg-[linear-gradient(rgba(0,195,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(0,195,255,0.032)_1px,transparent_1px)] bg-[size:70px_70px]" />
      <div className="absolute inset-0 z-0 opacity-25 bg-[radial-gradient(circle,rgba(0,195,255,0.18)_1px,transparent_1px)] bg-[size:70px_70px] bg-no-repeat" />
      
      {/* Vignette & Orbs */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,rgba(0,195,255,0.055)_0%,transparent_65%),radial-gradient(ellipse_55%_55%_at_50%_45%,rgba(168,85,247,0.045)_0%,transparent_60%),linear-gradient(to_bottom,transparent_68%,#00000f_100%)]" />
      <div className="absolute w-[650px] h-[650px] rounded-full bg-blue/10 blur-[110px] -top-[180px] -left-[180px] animate-pulse pointer-events-none" />
      <div className="absolute w-[550px] h-[550px] rounded-full bg-purple/10 blur-[110px] -bottom-[120px] -right-[120px] animate-pulse pointer-events-none delay-1000" />

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo Wrap */}
        <motion.div
          ref={logoRef}
          initial={{ opacity: 0, scale: 0.45, rotate: -25, filter: 'blur(35px)' }}
          whileInView={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 0, 
            filter: 'blur(0px)',
          }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ 
            opacity: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
            scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
            rotate: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
            filter: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
          }}
          className="w-[150px] h-[150px] mb-10 relative preserve-3d"
        >
          {/* Floating animation separated to avoid conflict with viewport transform */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            <div className="absolute -inset-8 rounded-full border border-transparent bg-clip-padding bg-[linear-gradient(rgba(0,0,15,0),rgba(0,0,15,0))] border-box bg-[conic-gradient(from_0deg,rgba(0,195,255,0),rgba(0,195,255,0.5)_25%,rgba(168,85,247,0.5)_50%,rgba(0,195,255,0)_75%)] animate-spin-slow" />
            <div className="absolute -inset-[20px] rounded-full bg-[conic-gradient(from_0deg,transparent_0%,rgba(0,195,255,0.6)_20%,transparent_40%,rgba(168,85,247,0.6)_60%,transparent_80%,rgba(0,195,255,0.3)_100%)] animate-spin-slow blur-[10px]" />
            <div className="absolute -inset-3 rounded-full border border-blue/20 animate-spin-slow-reverse">
              <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue rounded-full glow-blue shadow-[0_0_15px_rgba(0,195,255,0.8)]" />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue/10 to-purple/10 blur-xl animate-pulse" />
            <img
              src="https://i.ibb.co/zWn2zwSw/Chat-GPT-Image-Mar-24-2026-01-28-17-AM-removebg-preview.png"
              alt="Xiecor Studios"
              className="w-full h-full object-contain relative z-10 mix-blend-screen brightness-[1.1] saturate-[1.2] drop-shadow-[0_0_30px_rgba(0,195,255,1)] drop-shadow-[0_0_60px_rgba(168,85,247,0.5)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="w-[38px] h-[1px] bg-gradient-to-r from-transparent to-blue" />
          <span className="text-[0.62rem] tracking-[0.45em] uppercase text-blue">Visual Design Agency</span>
          <div className="w-[38px] h-[1px] bg-gradient-to-l from-transparent to-blue" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 55, rotateX: 45, filter: 'blur(10px)', scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.8rem,7.5vw,7rem)] font-black leading-[0.93] tracking-[-0.02em] perspective-[1000px]"
        >
          <span className="block drop-shadow-[0_4px_24px_rgba(0,195,255,0.2)]">DESIGN THAT</span>
          <span className="bg-gradient-to-r from-blue to-purple bg-clip-text text-transparent inline-block animate-pulse drop-shadow-[0_4px_24px_rgba(168,85,247,0.3)]">BREAKS LIMITS</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 35, rotateX: -20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 text-[clamp(0.88rem,1.8vw,1.05rem)] font-light text-white/42 max-w-[470px] leading-[1.85] tracking-[0.02em] perspective-[800px]"
        >
          We build brands, visuals, and identities that people actually stop and stare at.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 flex flex-wrap gap-6 justify-center"
        >
          <button onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="font-display text-[0.66rem] font-bold tracking-[0.22em] uppercase px-11 py-4 bg-gradient-to-br from-blue to-purple text-white rounded-[2px] shadow-[0_0_35px_rgba(0,195,255,0.38),0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-350 hover:shadow-[0_0_60px_rgba(0,195,255,0.7),0_18px_50px_rgba(0,0,0,0.5)] hover:-translate-y-1 cursor-none relative overflow-hidden group">
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-white/24 -translate-x-[115%] -skew-x-[22deg] transition-transform duration-550 group-hover:translate-x-[125%]" />
          </button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="font-display text-[0.66rem] font-bold tracking-[0.22em] uppercase px-11 py-4 bg-white/2 border border-blue/22 text-[#80a4ff] rounded-[2px] transition-all duration-350 hover:border-blue/65 hover:shadow-[0_0_22px_rgba(0,195,255,0.85)] hover:-translate-y-1 cursor-none relative overflow-hidden group">
            <span className="relative z-10">Work With Us</span>
            <div className="absolute inset-0 bg-gradient-to-br from-blue/7 to-purple/7 opacity-0 transition-opacity duration-350 group-hover:opacity-100" />
          </button>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="relative mt-11 flex flex-col items-center gap-2 text-[0.55rem] tracking-[0.38em] uppercase text-white/18 pointer-events-none"
        >
          <div className="w-[1px] h-[52px] bg-gradient-to-b from-blue/80 to-transparent animate-bounce" />
          <span>scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
