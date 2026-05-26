import { useEffect, useRef } from 'react';
import './cursor.css';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const handleMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    };

    const animate = () => {
      currentX.current = lerp(currentX.current, targetX.current, 0.18);
      currentY.current = lerp(currentY.current, targetY.current, 0.18);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX.current - 5}px, ${currentY.current - 5}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
