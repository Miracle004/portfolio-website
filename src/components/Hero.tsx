import { useEffect, useState, useRef } from 'react';
import './Hero.css';
import HeroAnimation from './HeroAnimation';

const FULL_TEXT = "I build real solutions embedded in experiences";
const ACCENT_START = FULL_TEXT.indexOf("experiences"); // 35
const CHAR_DELAY = 75; // ms per character
const POST_TYPING_PAUSE = 1200;
// Stickman animation: fades 4.2s–5.2s. Start typing at 4.8s (midpoint)
// so text materialises exactly as the figure dissolves.
const TYPEWRITER_DELAY = 4800;

export default function Hero() {
  const [displayed, setDisplayed] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const typeNext = () => {
      if (indexRef.current < FULL_TEXT.length) {
        indexRef.current += 1;
        setDisplayed(FULL_TEXT.slice(0, indexRef.current));
        timerRef.current = setTimeout(typeNext, CHAR_DELAY);
      } else {
        timerRef.current = setTimeout(() => {
          setShowName(true);
          setTimeout(() => setShowScroll(true), 800);
        }, POST_TYPING_PAUSE);
      }
    };

    timerRef.current = setTimeout(() => {
      setShowContent(true); // fade content wrapper in
      typeNext();
    }, TYPEWRITER_DELAY);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Split displayed text into cream portion and ember-orange "experiences"
  const plainPart  = displayed.slice(0, Math.min(displayed.length, ACCENT_START));
  const accentPart = displayed.length > ACCENT_START
    ? displayed.slice(ACCENT_START)
    : '';

  return (
    <section className="hero" id="hero" aria-label="Hero">
      <HeroAnimation />

      {/* Content fades in once the stickman animation begins dissolving */}
      <div className={`hero__content ${showContent ? 'hero__content--visible' : ''}`}>
        <h1 className="hero__tagline">
          <span className="hero__plain">{plainPart}</span>
          {accentPart && (
            <span className="hero__accent-word">{accentPart}</span>
          )}
          <span className="hero__cursor" aria-hidden="true">|</span>
        </h1>

        <div className={`hero__name-block ${showName ? 'hero__name-block--visible' : ''}`}>
          <p className="hero__name">Ogunyemi Oluwapelumi</p>
          <p className="hero__label">Fullstack Developer · Lagos, Nigeria</p>
        </div>
      </div>

      <div
        className={`hero__scroll-indicator ${showScroll ? 'hero__scroll-indicator--visible' : ''}`}
        aria-hidden="true"
      >
        <div className="hero__chevron">
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
}
