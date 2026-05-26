import './index.css';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Range from './components/Range';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <Cursor />
      <main>
        <Hero />
        <About />
        <Work />
        <Range />
        <Contact />
      </main>
    </>
  );
}
