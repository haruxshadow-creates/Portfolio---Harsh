import { motion } from 'motion/react';

export default function Marquee() {
  const tags = [
    'Ad Design', 'Product Visuals', 'Automotive Creatives', 'High-Impact Content',
    'Ad Design', 'Product Visuals', 'Automotive Creatives', 'High-Impact Content'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scaleY: 0.8 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden border-y border-blue/7 py-4.5 bg-black/90 relative z-10"
    >
      <div className="flex gap-12 whitespace-nowrap animate-[marquee_22s_linear_infinite]">
        {[...tags, ...tags].map((tag, i) => (
          <div key={i} className="font-display text-[0.6rem] tracking-[0.32em] uppercase text-white/22 flex items-center gap-6">
            <span className="w-[3px] h-[3px] bg-blue rounded-full shadow-[0_0_6px_#00c3ff]" />
            {tag}
            <span className="w-[3px] h-[3px] bg-blue rounded-full shadow-[0_0_6px_#00c3ff]" />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </motion.div>
  );
}
