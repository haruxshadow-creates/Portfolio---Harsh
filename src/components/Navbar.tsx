import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-5 md:px-20 py-7 transition-all duration-500 ${isScrolled ? 'bg-black/92 backdrop-blur-[22px] saturate-[160%] py-4 border-bottom border-blue/8' : ''}`}
    >
      <div className="font-display font-black text-[0.95rem] tracking-[0.22em] text-white cursor-none select-none relative">
        <span className="text-blue text-glow-blue">X</span>IECOR_STUDIOS
      </div>
      <ul className="hidden md:flex gap-11 list-none">
        {['Services', 'Work', 'Process', 'Contact'].map((item, i) => (
          <motion.li 
            key={item}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={() => smoothScroll(item.toLowerCase() === 'work' ? 'portfolio' : item.toLowerCase())}
              className="font-sans text-[0.68rem] tracking-[0.22em] uppercase text-white/45 bg-none border-none cursor-none transition-all duration-300 hover:text-white hover:tracking-[0.28em] relative group"
            >
              {item}
              <span className="absolute bottom-[-5px] left-0 w-0 h-[1px] bg-blue transition-all duration-350 group-hover:w-full" />
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
