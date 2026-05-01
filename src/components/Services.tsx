import { useState } from 'react';
import { motion } from 'motion/react';

const services = [
  {
    num: '01',
    icon: '⬡',
    title: 'Brand Identity',
    desc: 'Your logo, colours, fonts — everything that makes your brand look like you. Built to work across every platform and last for years.'
  },
  {
    num: '02',
    icon: '◈',
    title: 'Product Design',
    desc: 'Packaging, merch mockups, and product visuals that make people want to buy before they even read the description.'
  },
  {
    num: '03',
    icon: '▲',
    title: 'Poster & Print',
    desc: 'Event posters, anime art, and album covers that hit hard. The kind of designs people screenshot and save.'
  },
  {
    num: '04',
    icon: '◉',
    title: 'Social Media Design',
    desc: 'Posts, thumbnails, and story templates that get the scroll to stop. Consistent, sharp, and built for growth.'
  }
];

export default function Services() {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section id="services" className="px-5 md:px-20 py-36 relative z-10 bg-black/92">
      <div className="max-w-[1220px] mx-auto">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -70, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.9 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="font-display text-[0.58rem] text-blue tracking-[0.3em] animate-pulse">01</span>
            <div className="w-[26px] h-[1px] bg-blue/50" />
            <span className="text-[0.6rem] tracking-[0.44em] uppercase text-blue">Services</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 65, rotateX: 30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(1.9rem,4.2vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.01em] perspective-[1000px]"
          >
            What I <em className="not-italic bg-gradient-to-r from-blue to-purple bg-clip-text text-transparent">Create</em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-blue/7 border border-blue/7">
          {services.map((s, i) => {
            const isActive = activeService === s.num;
            return (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 65, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.9, delay: 0.1 * (i + 1) }}
              className="bg-mid/97 p-12 relative overflow-hidden group cursor-none will-change-transform z-10"
              onClick={() => setActiveService(isActive ? null : s.num)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
                const lift = (Math.abs(x) + Math.abs(y)) * 0.5;
                e.currentTarget.style.transform = `perspective(900px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) translateZ(${lift * 12}px)`;
                e.currentTarget.style.boxShadow = `${-x * 15}px ${y * 15}px 45px rgba(0,0,0,0.6), 0 0 35px rgba(0,195,255,${0.03 + lift * 0.05})`;
                e.currentTarget.style.zIndex = '30';

                const mx = ((e.clientX - rect.left) / rect.width) * 100;
                const my = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mx', `${mx}%`);
                e.currentTarget.style.setProperty('--my', `${my}%`);
              }}
              onTouchMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.touches[0];
                const x = (touch.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                const y = (touch.clientY - rect.top - rect.height / 2) / (rect.height / 2);
                const lift = (Math.abs(x) + Math.abs(y)) * 0.5;
                e.currentTarget.style.transform = `perspective(900px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) translateZ(${lift * 12}px)`;
                e.currentTarget.style.boxShadow = `${-x * 15}px ${y * 15}px 45px rgba(0,0,0,0.6), 0 0 35px rgba(0,195,255,${0.03 + lift * 0.05})`;
                e.currentTarget.style.zIndex = '30';

                const mx = ((touch.clientX - rect.left) / rect.width) * 100;
                const my = ((touch.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mx', `${mx}%`);
                e.currentTarget.style.setProperty('--my', `${my}%`);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.zIndex = '10';
                setActiveService(null);
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.zIndex = '10';
              }}
            >
              {/* Spotlight */}
              <div className={`absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_var(--mx,50%)_var(--my,50%),rgba(0,195,255,0.07)_0%,rgba(168,85,247,0.05)_45%,transparent_70%)] transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              
              {/* Shimmer */}
              <div className={`absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.028)_50%,transparent_60%)] bg-[size:200%_100%] transition-transform pointer-events-none ${isActive ? 'translate-x-[200%] duration-750 ease-out-expo' : '-translate-x-full duration-0 group-hover:translate-x-[200%] group-hover:duration-750 group-hover:ease-out-expo'}`} />
              
              {/* Bottom Bar */}
              <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue to-purple transition-all duration-650 ease-out-expo ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />

              <span className="font-display text-[0.55rem] text-blue/50 tracking-[0.35em] mb-7 block pointer-events-none">{s.num}</span>
              <span className={`text-[2rem] mb-5 block transition-all duration-500 ease-back pointer-events-none ${isActive ? 'scale-125 -rotate-8 drop-shadow-[0_0_14px_rgba(0,195,255,0.8)]' : 'group-hover:scale-125 group-hover:-rotate-8 group-hover:drop-shadow-[0_0_14px_rgba(0,195,255,0.8)]'}`}>
                {s.icon}
              </span>
              <h3 className={`font-display text-[0.85rem] font-bold tracking-[0.12em] mb-3.5 transition-colors duration-300 pointer-events-none ${isActive ? 'text-blue' : 'group-hover:text-blue'}`}>
                {s.title}
              </h3>
              <p className="text-[0.82rem] leading-[1.8] text-white/35 font-light pointer-events-none">
                {s.desc}
              </p>
              <span className={`absolute bottom-9 right-9 text-[1.1rem] text-blue transition-all duration-380 pointer-events-none ${isActive ? 'opacity-100 translate-x-[5px] -translate-y-[5px]' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-[5px] group-hover:-translate-y-[5px]'}`}>
                ↗
              </span>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
