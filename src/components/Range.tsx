import { useEffect, useRef } from 'react';
import './Range.css';

const DOMAINS = [
  'Machine learning',
  'Web & Mobile Dev',
];

export default function Range() {
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          itemRefs.current.forEach((el, i) => {
            if (el) {
              setTimeout(() => {
                el.classList.add('range__domain--lit');
              }, i * 200);
            }
          });
          observer.unobserve(section);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="range" id="range" ref={sectionRef} aria-label="Range of work">
      <div className="range__inner">
        <div className="range__domains">
          {DOMAINS.map((domain, i) => (
            <span key={domain}>
              <span
                className="range__domain"
                ref={(el) => { itemRefs.current[i] = el; }}
              >
                {domain}
              </span>
              {i < DOMAINS.length - 1 && (
                <span className="range__separator" aria-hidden="true"> · </span>
              )}
            </span>
          ))}
        </div>
        <p className="range__sub">One developer<span className="range__accent">.</span> Many dimensions<span className="range__accent">.</span></p>
      </div>
    </section>
  );
}
