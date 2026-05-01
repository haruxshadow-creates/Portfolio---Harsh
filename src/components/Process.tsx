import { useState } from 'react';
import { motion } from 'motion/react';

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'I get to know your goals, your audience, and what you want people to feel when they see your brand.'
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'We build a clear direction together — mood boards, colour ideas, and style choices — before I touch a single file.'
  },
  {
    num: '03',
    title: 'Creation',
    desc: 'I design with precision. Every colour, font, and layout is chosen on purpose. Nothing is accidental.'
  },
  {
    num: '04',
    title: 'Delivery',
    desc: 'You get all your files, in every format you need. Revisions are included until you\'re genuinely happy.'
  }
];

export default function Process() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <section id="process" className="px-5 md:px-20 py-36 relative z-10 bg-black/92">
      <div className="max-w-[1220px] mx-auto">
        <div className="mb-22">
          <motion.div
            initial={{ opacity: 0, x: -70, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.9 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="font-display text-[0.58rem] text-blue tracking-[0.3em] animate-pulse">03</span>
            <div className="w-[26px] h-[1px] bg-blue/50" />
            <span className="text-[0.6rem] tracking-[0.44em] uppercase text-blue">Process</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 65, rotateX: 30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(1.9rem,4.2vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.01em] perspective-[1000px]"
          >
            How I <em className="not-italic bg-gradient-to-r from-blue to-purple bg-clip-text text-transparent">Work</em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[28px] left-8 right-8 h-[1px] bg-gradient-to-r from-blue/20 to-purple/20" />
          <div className="hidden lg:block absolute top-[28px] left-0 w-[100px] h-[2px] bg-[linear-gradient(90deg,transparent,rgba(0,195,255,0.8),transparent)] animate-[lg_4.5s_ease-in-out_infinite] blur-[1px]" />
          <style>{`
            @keyframes lg {
              0% { left: 0; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { left: calc(100% - 100px); opacity: 0; }
            }
          `}</style>

          {steps.map((s, i) => {
            const isActive = activeStep === s.num;
            return (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 65, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.9, delay: 0.1 * (i + 1) }}
              className={`p-10 pb-12 relative group cursor-none will-change-transform rounded-xl flex flex-col bg-mid/97 border border-white/4 ${isActive ? '-translate-y-2 border-blue/30 bg-blue/5' : 'hover:-translate-y-2 hover:border-blue/20 hover:bg-white/[0.02]'} transition-all duration-550 ease-out-expo z-10`}
              onClick={() => setActiveStep(isActive ? null : s.num)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
                const lift = (Math.abs(x) + Math.abs(y)) * 0.5;
                e.currentTarget.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateZ(${lift * 10}px)`;
                e.currentTarget.style.boxShadow = `${-x * 12}px ${y * 12}px 35px rgba(0,0,0,0.5), 0 0 25px rgba(168,85,247,${0.02 + lift * 0.04})`;
                e.currentTarget.style.zIndex = '30';
              }}
              onTouchMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.touches[0];
                const x = (touch.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                const y = (touch.clientY - rect.top - rect.height / 2) / (rect.height / 2);
                const lift = (Math.abs(x) + Math.abs(y)) * 0.5;
                e.currentTarget.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateZ(${lift * 10}px)`;
                e.currentTarget.style.boxShadow = `${-x * 12}px ${y * 12}px 35px rgba(0,0,0,0.5), 0 0 25px rgba(168,85,247,${0.02 + lift * 0.04})`;
                e.currentTarget.style.zIndex = '30';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.zIndex = '10';
                setActiveStep(null);
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.zIndex = '10';
              }}
            >
              {/* Number Badge */}
              <div className={`mb-8 w-14 h-14 border flex items-center justify-center font-display text-[0.7rem] font-bold tracking-[0.12em] transition-all duration-400 pointer-events-none rounded-lg ${isActive ? 'bg-blue/10 border-blue text-blue glow-blue scale-110' : 'bg-transparent border-white/10 text-white/40 group-hover:bg-blue/5 group-hover:border-blue/50 group-hover:text-blue group-hover:scale-110'}`}>
                <span>{s.num}</span>
              </div>
              
              <h3 className={`font-display text-[0.95rem] font-bold tracking-[0.1em] mb-3.5 transition-colors duration-300 pointer-events-none ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                {s.title}
              </h3>
              <p className={`text-[0.78rem] leading-[1.8] font-light pointer-events-none transition-colors duration-300 ${isActive ? 'text-white/60' : 'text-white/35 group-hover:text-white/60'}`}>
                {s.desc}
              </p>

              <div className={`absolute top-0 right-0 p-6 opacity-0 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'group-hover:opacity-100'}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
