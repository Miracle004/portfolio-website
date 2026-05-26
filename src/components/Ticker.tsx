import './Ticker.css';
import Reveal from './Reveal';

const ROW_1 = [
  'JavaScript', 'TypeScript', 'Python', 'PHP',
  'React', 'React Native', 'Next.js', 'Node.js',
  'Express', 'Flask', 'TailwindCSS',
];

const ROW_2 = [
  'PGadmin', 'Supabase',
  'Git', 'GitHub', 'Neo4j'
];

interface RowProps {
  label: string;
  items: string[];
  desktopSpeed: number;
  mobileSpeed: number;
}

/**
 * Seamless infinite scroll using the duplicate-content trick.
 * The track contains [original set] + [duplicate set].
 * Total track width = 2× one set. Animation: 0 → −50% = one full set width.
 * When the duplicate reaches start position, the loop restarts invisibly.
 */
function TickerRow({ label, items, desktopSpeed, mobileSpeed }: RowProps) {
  const text = items.join(' · ');

  return (
    <div className="ticker__row">
      <div
        className="ticker__track"
        style={{
          '--spd-d': `${desktopSpeed}s`,
          '--spd-m': `${mobileSpeed}s`,
        } as React.CSSProperties}
        aria-hidden="true"
      >
        {/* Two identical sets — the second makes the loop seamless */}
        {[0, 1].map((i) => (
          <span key={i} className="ticker__set">
            <span className="ticker__label">{label}&ensp;</span>
            <span className="ticker__text">{text}</span>
            <span className="ticker__gap">&ensp;·&ensp;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Ticker() {
  return (
    <Reveal delay={300}>
      <div className="ticker" aria-label="Technologies and tools">
        <TickerRow
          label="LANGUAGES —"
          items={ROW_1}
          desktopSpeed={35}
          mobileSpeed={25}
        />
        <TickerRow
          label="TOOLS —"
          items={ROW_2}
          desktopSpeed={42}
          mobileSpeed={30}
        />
      </div>
    </Reveal>
  );
}
