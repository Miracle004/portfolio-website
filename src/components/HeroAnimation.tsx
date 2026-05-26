import './HeroAnimation.css';

/**
 * Simplified stickman — pure CSS keyframes, no SMIL.
 * viewBox 400×280. One-shot play, fades out at 4.2s.
 *
 * Walk: stickman group translateX(-160px) → 0 over 1.6s.
 * Leg alternation uses CSS animation on each leg line.
 * Seated L-shape legs are drawn as separate SVG paths that
 * opacity-in at Phase 2 while walking legs fade out.
 * Desk + laptop use stroke-dashoffset draw-on.
 * Typing dots pulse in sequence.
 */
export default function HeroAnimation() {
  return (
    <svg
      className="ha3-root"
      viewBox="0 0 400 280"
      preserveAspectRatio="none"
      aria-hidden="true"
      role="presentation"
    >
      {/* All drawing shares these inherited stroke attrs */}
      <g
        className="ha3-scene"
        fill="none"
        stroke="#f0ebe0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ── STICKMAN GROUP (walks in) ── */}
        <g className="ha3-stickman">

          {/* Static parts: head, body, arms */}
          <circle cx="200" cy="60" r="14" />
          <line className="ha3-body" x1="200" y1="74" x2="200" y2="130" />
          <line className="ha3-arm-l" x1="200" y1="95" x2="175" y2="115" />
          <line className="ha3-arm-r" x1="200" y1="95" x2="225" y2="115" />

          {/* Walking legs — visible phase 1, fade out at phase 2 */}
          <g className="ha3-walk-legs">
            {/* Left leg: alternates between forward (165) and back (175) */}
            <line className="ha3-leg-l" x1="200" y1="130" x2="180" y2="165" />
            {/* Right leg: alternates between forward (155) and back (175) */}
            <line className="ha3-leg-r" x1="200" y1="130" x2="220" y2="165" />
          </g>

          {/* Seated legs — invisible until phase 2, drawn as L-shapes via polyline */}
          <g className="ha3-sit-legs">
            {/* Left: (200,130) → (170,130) → (170,160) */}
            <polyline className="ha3-sit-leg-l" points="200,130 170,130 170,160" />
            {/* Right: (200,130) → (230,130) → (230,160) */}
            <polyline className="ha3-sit-leg-r" points="200,130 230,130 230,160" />
          </g>

        </g>

        {/* ── DESK LINE (phase 3, draw-on) ── */}
        {/* Length: 280-160 = 120 units */}
        <line className="ha3-desk" x1="160" y1="130" x2="280" y2="130" />

        {/* ── LAPTOP BASE rect (phase 3, draw-on after desk) ── */}
        {/* Perimeter: 2*(70+8)=156 */}
        <rect className="ha3-laptop-base" x="195" y="110" width="70" height="8" rx="2" />

        {/* ── LAPTOP SCREEN (three lines, phase 3) ── */}
        {/* Left side: (195,110)→(210,75), top: (210,75)→(250,75), right: (250,75)→(265,110) */}
        {/* Total approx length: left≈36, top=40, right≈36 → 112 */}
        <polyline className="ha3-laptop-screen" points="195,110 210,75 250,75 265,110" />

        {/* ── TYPING DOTS (phase 4) ── */}
        <circle className="ha3-dot1" cx="213" cy="70" r="2" fill="#f0ebe0" stroke="none" />
        <circle className="ha3-dot2" cx="220" cy="70" r="2" fill="#f0ebe0" stroke="none" />
        <circle className="ha3-dot3" cx="227" cy="70" r="2" fill="#f0ebe0" stroke="none" />
      </g>
    </svg>
  );
}
