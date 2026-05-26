import Reveal from './Reveal';
import Ticker from './Ticker';
import './About.css';

export default function About() {
  return (
    <section className="about" id="about" aria-label="About">
      <div className="about__inner">
        <Reveal>
          <h2 className="about__heading">The person behind the build.</h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="about__bio">
            I'm a Computer Science graduate with experience in building not just software but experiences. Every person has a story, and every story deserves to be told through a well-crafted digital experience. I care less about the stack and more about
            what the thing does to the person using it.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p className="about__bio about__bio--secondary">
            I believe that great software has a texture. It responds before you ask,
            it explains before you wonder. That's the standard I hold every build to.
          </p>
        </Reveal>

        <Ticker />
      </div>
    </section>
  );
}
