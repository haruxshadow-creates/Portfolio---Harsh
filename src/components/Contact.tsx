import { motion } from 'motion/react';

export default function Contact() {
  return (
    <section id="contact" className="px-5 md:px-20 py-44 relative z-10 bg-black/92 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-blue/12 blur-[120px] -bottom-[200px] -left-[150px] animate-pulse pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple/12 blur-[120px] -top-[150px] -right-[100px] animate-pulse pointer-events-none delay-700" />

      <div className="max-w-[1050px] mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-4 mb-7 px-6 py-2 border border-blue/25 rounded-full bg-blue/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse glow-blue" />
            <span className="text-[0.58rem] tracking-[0.45em] uppercase text-blue">Available for Projects</span>
          </div>
          <h2 className="font-display text-[clamp(2.4rem,6.5vw,5.5rem)] font-black leading-[0.95] tracking-[-0.02em] mb-9">
            LET'S BUILD <br />
            <span className="bg-gradient-to-r from-blue to-purple bg-clip-text text-transparent animate-pulse">SOMETHING EPIC</span>
          </h2>
          <p className="text-[clamp(0.9rem,1.8vw,1.15rem)] text-white/42 max-w-[550px] mx-auto leading-[1.85] tracking-[0.02em]">
            Ready to take your brand to the next level? Drop me a message and let's talk about your vision.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-14"
        >
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { label: 'Instagram', url: 'https://instagram.com/xiecor' },
              { label: 'Behance', url: 'https://behance.net/xiecor' },
              { label: 'Dribbble', url: 'https://dribbble.net/xiecor' },
              { label: 'Twitter', url: 'https://twitter.com/xiecor' }
            ].map((plat, i) => (
              <motion.a
                key={plat.label}
                href={plat.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                className="font-display text-[0.62rem] tracking-[0.35em] uppercase text-white/35 hover:text-blue transition-colors duration-320 cursor-none relative group"
              >
                {plat.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-blue transition-all duration-350 group-hover:w-full" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
