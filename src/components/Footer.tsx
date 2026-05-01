import { motion } from 'motion/react';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="px-5 md:px-20 py-16 bg-black border-t border-white/5 relative z-10"
    >
      <div className="max-w-[1220px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="font-display font-black text-[0.85rem] tracking-[0.22em] text-white select-none">
            <span className="text-blue text-glow-blue">X</span>IECOR_STUDIOS
          </div>
          <p className="text-[0.62rem] tracking-[0.18em] uppercase text-white/22">
            © {new Date().getFullYear()} — All Rights Reserved
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-3 text-[0.58rem] tracking-[0.3em] uppercase text-white/45">
            <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse glow-blue" />
            Made with Precision
          </div>
          <p className="text-[0.55rem] tracking-[0.22em] uppercase text-white/12">
            Visual Design Agency · Est. 2024
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
