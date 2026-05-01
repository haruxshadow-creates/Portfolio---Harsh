import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hue, setHue] = useState(195);
  const [hDir, setHDir] = useState(1);

  const ringX = useSpring(0, { damping: 20, stiffness: 150 });
  const ringY = useSpring(0, { damping: 20, stiffness: 150 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable = target.closest('button, a, .service-card, .p-card, .plat-link, .stat-block, .testi-card');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ringX, ringY]);

  useEffect(() => {
    let frameId: number;
    const updateHue = () => {
      setHue(prev => {
        let next = prev + hDir * 0.38;
        if (next > 289) {
          setHDir(-1);
          next = 289;
        } else if (next < 186) {
          setHDir(1);
          next = 186;
        }
        return next;
      });
      frameId = requestAnimationFrame(updateHue);
    };
    frameId = requestAnimationFrame(updateHue);
    return () => cancelAnimationFrame(frameId);
  }, [hDir]);

  const color = `hsl(${hue}, 100%, 62%)`;
  const glow = `hsl(${hue}, 100%, 54%)`;

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full border-[1.5px] mix-blend-screen will-change-[left,top]"
        style={{
          left: ringX,
          top: ringY,
          width: isHovering ? 58 : 38,
          height: isHovering ? 58 : 38,
          x: '-50%',
          y: '-50%',
          borderColor: color,
          backgroundColor: isHovering ? `hsla(${hue}, 100%, 62%, 0.07)` : 'transparent',
        }}
      />
      <div
        className="fixed pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full will-change-[left,top]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          backgroundColor: color,
          boxShadow: `0 0 7px ${glow}, 0 0 22px ${glow}44`,
        }}
      />
    </>
  );
}
