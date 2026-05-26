import { useState } from 'react';
import Reveal from './Reveal';
import './Work.css';

interface Project {
  number: string;
  name: string;
  tagline: string;
  problem: string;
  stack: string[];
  image: string;     // path relative to /public
  url: string;       // live link
  urlLabel: string;  // what shows in the browser URL bar
}

const PROJECTS: Project[] = [
  {
    number: "01",
    name: "PhishFinder",
    tagline: "Real-time phishing URL detection with ML confidence scoring and a developer API.",
    problem:
      "A web app that detects phishing URLs in real time using machine learning, with confidence scoring, threat levels, and a developer API.",
    stack: ["Flask", "PostgreSQL", "Python", "Gradio Client", "Chrome Extension"],
    image: "/phishfinder.png",
    url: "https://phishing-detector-flask.vercel.app/",
    urlLabel: "phishing-detector-flask.vercel.app",
  },
  {
    number: "02",
    name: "Lumo",
    tagline: "A collaborative writing platform with real-time editing and AI tools.",
    problem:
      "A collaborative writing platform with real-time editing, AI-powered title generation, and role-based document sharing.",
    stack: ["React", "TypeScript", "Node.js", "Express", "Supabase", "Socket.IO"],
    image: "/Lumo.png",
    url: "https://lumo-five-phi.vercel.app/",
    urlLabel: "lumo-five-phi.vercel.app",
  },
  {
    number: "03",
    name: "Crestline Development Initiative",
    tagline: "Connecting people to scholarships, grants, and events that help them grow.",
    problem:
      "A community platform connecting people to scholarships, grants, and events that help them grow.",
    stack: ["Next.js", "React", "Supabase", "TailwindCSS"],
    image: "/crestline.png",
    url: "https://www.crestlineinitiativengo.com/",
    urlLabel: "crestlineinitiativengo.com",
  },
  {
    number: "04",
    name: "KLYP",
    tagline: "A lightweight cross-device clipboard sync tool — copy here, pull it up anywhere.",
    problem:
      "A lightweight cross-device clipboard sync tool. Copy something on one device, pull it up on another — fast, simple, no clutter.",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Vite"],
    image: "/klyp.png",
    url: "https://klyp-sigma.vercel.app/",
    urlLabel: "klyp-sigma.vercel.app",
  },
];

function BrowserMockup({ project }: { project: Project }) {
  return (
    <div className="browser" aria-label={`${project.name} preview`}>
      {/* Chrome bar */}
      <div className="browser__bar">
        <div className="browser__dots" aria-hidden="true">
          <span className="browser__dot browser__dot--red" />
          <span className="browser__dot browser__dot--yellow" />
          <span className="browser__dot browser__dot--green" />
        </div>
        <div className="browser__url" aria-hidden="true">
          {project.urlLabel}
        </div>
      </div>
      <div className="browser__divider" aria-hidden="true" />

      {/* Screenshot */}
      <div className="browser__content">
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          className="browser__screenshot"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 60}>
      <div className={`project ${open ? 'project--open' : ''}`}>
        <button
          className="project__header"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          id={`project-btn-${project.number}`}
        >
          <span className="project__number">{project.number}</span>
          <span className="project__title">{project.name}</span>
          <span className="project__tagline">{project.tagline}</span>
          <span className="project__chevron" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>

        <div className="project__body" aria-labelledby={`project-btn-${project.number}`}>
          <div className="project__body-inner">
            <p className="project__problem">{project.problem}</p>

            <div className="project__stack">
              {project.stack.map((tech) => (
                <span key={tech} className="project__tech">{tech}</span>
              ))}
            </div>

            <BrowserMockup project={project} />

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project__live-link"
              id={`project-link-${project.number}`}
            >
              View live ↗
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section className="work" id="work" aria-label="Projects">
      <div className="work__inner">
        <Reveal>
          <h2 className="work__heading">Things I've built<span className="accent">.</span></h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="work__subheading">Each one solved a real problem.</p>
        </Reveal>

        <div className="work__list">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.number} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
