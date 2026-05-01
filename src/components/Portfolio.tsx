import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const projects = [
  {
    id: 0,
    type: 'project',
    cat: 'Social Media & Product Ad Design',
    title: 'Cab booking – Social Media Campaign Concept',
    tag: 'Social Media & Product Ad Design',
    desc: 'A high-octane branding campaign for a premium urban taxi service, emphasizing rapid response times and a seamless digital booking experience.',
    bg: "url('https://i.ibb.co/PsrV53Fs/IMG-20260317-174239.png')",
    span: 'col-span-1'
  },
  {
    id: 1,
    type: 'project',
    cat: 'Social Media & Product Ad Design',
    title: 'Monarch Jewelry – Luxury Ring Product Ad',
    tag: 'Social Media & Product Ad Design',
    desc: 'An exquisite high-end jewelry piece featuring a brilliant-cut diamond set in a custom-crafted platinum band, embodying the pinnacle of luxury and elegance.',
    bg: "url('https://i.ibb.co/VYy5Z4z6/file-000000001280720bbd360705a2de2484.png')",
    span: 'col-span-1'
  },
  {
    id: 104,
    type: 'quote',
    cat: 'all',
    num: '01',
    quote: 'Designs that actually attracts',
    span: 'col-span-1 lg:col-span-2'
  },
  {
    id: 2,
    type: 'project',
    cat: 'Social Media & Product Ad Design',
    title: 'Shadow X-Series Smartphone – Product Ad Concept',
    tag: 'Social Media & Product Ad Design',
    desc: 'A futuristic branding campaign for the Shadow smartphone, featuring high-contrast neon aesthetics and a sleek digital identity.',
    bg: "url('https://i.ibb.co/s9ZnpGdG/IMG-20260409-214233.png')",
    span: 'col-span-1'
  },
  {
    id: 4,
    type: 'project',
    cat: 'Social Media & Product Ad Design',
    title: 'Shadow Streetwear – Brand Campaign Design',
    tag: 'Social Media & Product Ad Design',
     desc: 'A mysterious and high-contrast product launch campaign for the Shadow Series, focusing on minimalist luxury and exclusive visual storytelling.',
    bg: "url('https://i.ibb.co/rKbPGrv2/IMG-20260409-213930.jpg')",
    span: 'col-span-1'
  },
  {
    id: 101,
    type: 'quote',
    cat: 'all',
    num: '02',
    quote: 'Turning ideas into high converting designs',
    span: 'col-span-1 lg:col-span-2'
  },
  {
    id: 5,
    type: 'project',
    cat: 'Social Media & Product Ad Design',
    title: 'Vortexo Footwear – Sports Shoe Ad Series',
    tag: 'Social Media & Product Ad Design',
    desc: 'Next-generation athletic footwear design combining ergonomic performance with a bold, futuristic visual language.',
    bg: "url('https://i.ibb.co/vv1by4fN/20260331-121005.jpg')",
    span: 'col-span-1'
  },
  {
    id: 7,
    type: 'project',
    cat: 'Social Media & Product Ad Design',
    title: 'Vortexo Sportswear – Performance Campaign',
    tag: 'Social Media & Product Ad Design',
    desc: 'High-performance athletic apparel designed for maximum breathability and movement, blending futuristic style with elite-level functionality.',
    bg: "url('https://i.ibb.co/CsnHVRj6/20260403-010336.jpg')",
    span: 'col-span-1'
  },
  {
    id: 102,
    type: 'quote',
    cat: 'all',
    num: '03',
    quote: 'Need eye catching designs for brand ?',
    span: 'col-span-1 lg:col-span-2'
  },
  {
    id: 3,
    type: 'project',
    cat: 'Social Media & Product Ad Design',
    title: 'BMW M4 COMPETITION – Automotive Ad Concept',
    tag: 'Social Media & Product Ad Design',
    desc: 'Custom widebody kit and aerodynamic optimization for the M4 Competition, featuring a signature carbon fiber finish.',
    bg: "url('https://i.ibb.co/QtdFLTq/BMW-20260314-175526-0000.png')",
    span: 'col-span-1'
  },
  {
    id: 6,
    type: 'project',
    cat: 'Social Media & Product Ad Design',
    title: 'KOENIGSEGG JESKO – Automotive Ad Concept',
    tag: 'Social Media & Product Ad Design',
    desc: 'Hypercar livery concept for the Jesko, pushing the boundaries of speed and visual aggression with a neon-infused aesthetic.',
    bg: "url('https://i.ibb.co/v4nLXKmK/Koenigsegg-jesko.png')",
    span: 'col-span-1'
  },
  {
    id: 103,
    type: 'quote',
    cat: 'all',
    num: '04',
    quote: 'Research → Concept → Design → Impact',
    span: 'col-span-1 lg:col-span-2'
  },
  {
    id: 8,
    type: 'project',
    cat: 'Brand Identity',
    title: 'Glowmora – Health and care Brand logo',
    tag: 'Brand Identity',
    desc: 'Logo design for a small business specializing in Moringa and Drumstick products, focusing on natural wellness and organic growth.',
    bg: "url('https://i.ibb.co/9mTyQYNf/Yt-1.png')",
    span: 'col-span-1'
  },
  {
    id: 9,
    type: 'project',
    cat: 'Brand Identity',
    title: 'Monarch – Luxury Brand Logo',
    tag: 'Brand Identity',
    desc: 'A premium visual identity for a luxurious accessories brand, embodying sophistication, royalty, and timeless craftsmanship.',
    bg: "url('https://i.ibb.co/4R5S7C4z/IMG-20260303-WA0000.jpg')",
    span: 'col-span-1'
  }
];

const filters = ['all', 'Social Media & Product Ad Design', 'Brand Identity'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const filteredProjects = projects.filter(p => activeFilter === 'all' || p.cat === activeFilter || p.cat === 'all');

  return (
    <section id="portfolio" className="px-5 md:px-20 py-36 relative z-10 bg-black/90">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="h-full w-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -70, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.9 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="font-display text-[0.58rem] text-blue tracking-[0.3em] animate-pulse">02</span>
              <div className="w-[26px] h-[1px] bg-blue/50" />
              <span className="text-[0.6rem] tracking-[0.44em] uppercase text-blue">Selected Work</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 65, rotateX: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(1.9rem,4.2vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.01em] perspective-[1000px]"
            >
              My <em className="not-italic bg-gradient-to-r from-blue to-purple bg-clip-text text-transparent">Portfolio</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-[0.75rem] text-white/40 max-w-[450px] leading-relaxed tracking-wide"
            >
              These are self-initiated concept projects created to practice and demonstrate my skills in social media and ad design.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 70, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`font-sans text-[0.62rem] tracking-[0.22em] uppercase px-5 py-2.5 rounded-[2px] cursor-none transition-all duration-320 ease-out-expo border ${
                  activeFilter === f
                    ? 'border-blue text-white shadow-[0_0_22px_rgba(0,195,255,0.85)] bg-blue/7'
                    : 'bg-white/2 border-white/8 text-white/35 hover:border-blue/40 hover:text-white/75 hover:bg-blue/4'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 relative max-w-[1200px] mx-auto"
        >
          {/* Subtle Multi-grid Background Effects */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
            <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-blue/10 blur-[180px] animate-pulse" />
            <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[50%] bg-purple/10 blur-[150px] animate-pulse delay-700" />
          </div>

          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => {
              const isActive = activeCardId === p.id;
              return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, amount: 0.1, margin: "-100px" }}
                exit={{ opacity: 0, scale: 0.9, y: 40, filter: 'blur(8px)' }}
                transition={{ duration: 0.8, delay: (Math.min(i, 4)) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`${p.span} group relative bg-mid/97 border border-white/5 cursor-none will-change-transform rounded-3xl flex flex-col h-auto overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_45px_100px_-20px_rgba(30,30,30,0.8)] transition-all duration-700`}
                onClick={() => setActiveCardId(isActive ? null : p.id)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                  const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
                  
                  if (p.type === 'project') {
                    const lift = (Math.abs(x) + Math.abs(y)) * 0.5;
                    e.currentTarget.style.transform = `perspective(1200px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(${lift * 20}px)`;
                    e.currentTarget.style.boxShadow = `${-x * 25}px ${y * 25}px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,195,255,${0.05 + lift * 0.1})`;
                  } else {
                    const mx = ((e.clientX - rect.left) / rect.width) * 100;
                    const my = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--mx', `${mx}%`);
                    e.currentTarget.style.setProperty('--my', `${my}%`);
                  }
                }}
                onTouchMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const touch = e.touches[0];
                  const x = (touch.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                  const y = (touch.clientY - rect.top - rect.height / 2) / (rect.height / 2);
                  
                  if (p.type === 'project') {
                    const lift = (Math.abs(x) + Math.abs(y)) * 0.5;
                    e.currentTarget.style.transform = `perspective(1200px) rotateX(${-y * 11}deg) rotateY(${x * 11}deg) translateZ(${lift * 14}px)`;
                    e.currentTarget.style.boxShadow = `${-x * 18}px ${y * 18}px 55px rgba(0,0,0,0.68), 0 0 45px rgba(0,195,255,${0.04 + lift * 0.07})`;
                  } else {
                    const mx = ((touch.clientX - rect.left) / rect.width) * 100;
                    const my = ((touch.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--mx', `${mx}%`);
                    e.currentTarget.style.setProperty('--my', `${my}%`);
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                  setActiveCardId(null);
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {p.type === 'project' ? (
                  <div className="relative overflow-hidden rounded-3xl w-full">
                    {/* Background Image Container - Natural Aspect Ratio */}
                    <div className="relative w-full overflow-hidden flex flex-col">
                      <img 
                        src={p.bg?.match(/url\(['"]?(.*?)['"]?\)/)?.[1] || p.bg}
                        alt={p.title}
                        className={`w-full h-auto block object-contain transition-transform duration-1000 ease-out-expo z-0 ${isActive ? 'scale-105' : 'group-hover:scale-110'}`}
                        referrerPolicy="no-referrer"
                      />
                      {/* Vignette/Overlay for legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Shimmer interaction */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out-expo z-20 ${isActive ? 'translate-x-[200%]' : '-translate-x-full group-hover:translate-x-[200%]'}`} />
                    </div>

                    {/* Info Overlay */}
                    <div className={`absolute inset-0 p-8 md:p-12 transition-all duration-700 ease-out-expo z-40 flex flex-col justify-end items-start text-left ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <div className={`mb-4 transform transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
                        <span className="inline-block text-[0.55rem] tracking-[0.4em] uppercase text-blue px-5 py-2 border border-blue/40 rounded-full bg-blue/20 backdrop-blur-xl font-black">
                          {p.tag}
                        </span>
                      </div>
                      <h3 className={`font-display text-[1.4rem] md:text-[2rem] font-black leading-tight tracking-[0.02em] mb-4 text-white transform transition-all duration-700 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
                        {p.title}
                      </h3>
                      <p className={`text-[0.85rem] md:text-[1rem] text-white/80 leading-relaxed font-light max-w-[85%] transform transition-all duration-700 delay-200 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
                        {p.desc}
                      </p>
                    </div>

                    {/* Corner Brackets */}
                    <div className={`absolute w-14 h-14 border-t-[4px] border-l-[4px] border-blue/60 transition-all duration-800 z-50 ${isActive ? 'opacity-100 top-12 left-12 scale-110' : 'opacity-0 top-8 left-8 scale-90 group-hover:opacity-100 group-hover:top-12 group-hover:left-12 group-hover:scale-110'}`} />
                    <div className={`absolute w-14 h-14 border-b-[4px] border-r-[4px] border-purple/60 transition-all duration-800 z-50 ${isActive ? 'opacity-100 bottom-12 right-12 scale-110' : 'opacity-0 bottom-8 right-8 scale-90 group-hover:opacity-100 group-hover:bottom-12 group-hover:right-12 group-hover:scale-110'}`} />
                  </div>
                ) : (
                  <div className={`relative p-16 md:p-24 flex flex-col items-center justify-center text-center h-full min-h-[300px] md:min-h-[400px] bg-white/[0.01] border rounded-3xl transition-all duration-700 flex-1 overflow-hidden ${isActive ? 'border-blue/50 bg-blue/5' : 'border-white/5 group-hover:border-blue/40 group-hover:bg-blue/5'}`}>
                    {/* Noise Texture for Quotes */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 rotate-12 scale-150" />
                    
                    {/* Spotlight */}
                    <div className={`absolute inset-0 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(0,195,255,0.25)_0%,transparent_70%)] transition-opacity duration-700 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                    
                    <span className="font-display text-[0.8rem] text-blue tracking-[0.6em] mb-10 block uppercase font-black opacity-60">{p.num}</span>
                    
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[5px] bg-gradient-to-r from-blue via-purple to-blue transition-all duration-1000 ease-out-expo ${isActive ? 'w-1/2' : 'w-0 group-hover:w-1/2'}`} />

                    <p className={`font-display text-[1.8rem] md:text-[2.6rem] lg:text-[3rem] font-black tracking-tight leading-[1.05] relative z-10 transition-all duration-800 drop-shadow-2xl p-6 max-w-[900px] mx-auto ${isActive ? 'scale-105 text-white' : 'text-white/60 group-hover:scale-105 group-hover:text-white'}`}>
                      “{p.quote}”
                    </p>

                    <div className={`mt-12 px-10 py-4 border border-blue/30 rounded-full text-[0.7rem] tracking-[0.5em] uppercase font-bold text-blue/80 transition-all duration-700 bg-blue/5 backdrop-blur-md ${isActive ? 'opacity-100 translate-y-0 scale-110 shadow-lg' : 'opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-105'}`}>
                      Explore the Vision
                    </div>
                  </div>
                )}
              </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
