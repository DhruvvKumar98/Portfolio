import { useState, useEffect, useRef } from 'react';
import profile from '../data/profile.js';
import { selectedWork, practice } from '../data/projects.js';
import experience from '../data/experience.js';
import skills from '../data/skills.js';
import posts, { allPostsUrl } from '../data/writing.js';

const SECTION_IDS = ['hero', 'projects', 'experience', 'credentials', 'posts', 'human', 'contact'];

const VIBE_TAGS = ['AI implementation', 'stakeholder workshops', 'SQL & Power BI', 'Berlin'];

const EDUCATION = [
  { degree: 'M.Sc. Data Science', school: 'University of Europe for Applied Sciences, Berlin', dates: 'Oct 2023 - Feb 2025', note: 'Grade 2.0 (gut)' },
  { degree: 'B.Tech Information Technology', school: 'Sreenidhi Institute of Science and Technology, Hyderabad', dates: 'Jun 2016 - Nov 2020', note: 'First Class' },
];

const LANGUAGES = ['English C2 (Fluent)', 'German B2 (actively advancing)', 'Hindi C1 (Fluent)'];
const CERTS = ['Google Analytics', 'BigQuery', 'AWS Cloud Fundamentals', 'AI Essentials'];
const PUBLICATION = 'Language Detection in Speech Using Machine Learning Techniques. IRJET, 2020.';
const VOLUNTEERING = 'AIESEC Hyderabad, Outgoing Talent and External Relations, 2017 - 2018';

const HUMAN_ITEMS = [
  { label: 'Berlin', rot: -5, url: 'https://en.wikipedia.org/wiki/Berlin', svg: `<svg width="70" height="90" viewBox="0 0 70 90" fill="none"><rect x="2" y="2" width="66" height="86" rx="6" fill="#FF6B35" stroke="#1a1a1a" stroke-width="3"/><line x1="35" y1="82" x2="35" y2="35" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="35" cy="32" r="10" fill="#fff" stroke="#1a1a1a" stroke-width="2"/><circle cx="35" cy="32" r="5" fill="#FF6B35"/><line x1="35" y1="22" x2="35" y2="10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><line x1="28" y1="82" x2="42" y2="82" stroke="#fff" stroke-width="4" stroke-linecap="round"/><rect x="30" y="45" width="10" height="3" rx="1" fill="rgba(255,255,255,0.5)"/><rect x="30" y="52" width="10" height="3" rx="1" fill="rgba(255,255,255,0.5)"/></svg>` },
  { label: 'German B2', rot: 3, url: null, svg: `<svg width="80" height="65" viewBox="0 0 80 65" fill="none"><rect x="2" y="2" width="76" height="61" rx="6" fill="#1a1a1a" stroke="#1a1a1a" stroke-width="3"/><rect x="5" y="5" width="70" height="18" rx="3" fill="#1a1a1a"/><rect x="5" y="23" width="70" height="18" fill="#DD0000"/><rect x="5" y="41" width="70" height="18" rx="3" fill="#FFCC00"/><text x="40" y="38" text-anchor="middle" fill="#fff" font-family="'Permanent Marker',cursive" font-size="18" opacity="0.9">B2!</text><circle cx="65" cy="12" r="6" fill="#2ED573" stroke="#1a1a1a" stroke-width="2"/></svg>` },
  { label: 'M.Sc. Data Science', rot: 4, url: 'https://github.com/DhruvvKumar98', svg: `<svg width="75" height="75" viewBox="0 0 75 75" fill="none"><rect x="2" y="2" width="71" height="71" rx="8" fill="#7B2FF7" stroke="#1a1a1a" stroke-width="3"/><rect x="15" y="50" width="10" height="15" rx="2" fill="#fff" opacity="0.9"/><rect x="28" y="35" width="10" height="30" rx="2" fill="#fff" opacity="0.9"/><rect x="41" y="25" width="10" height="40" rx="2" fill="#FFD700"/><rect x="54" y="15" width="10" height="50" rx="2" fill="#2ED573"/><path d="M18 48L33 32L46 22L59 12" stroke="#FF1493" stroke-width="2.5" stroke-linecap="round" fill="none"/><circle cx="59" cy="12" r="3" fill="#FF1493"/></svg>` },
  { label: 'Manga', rot: -6, url: null, svg: `<svg width="80" height="75" viewBox="0 0 80 75" fill="none"><rect x="2" y="2" width="76" height="71" rx="8" fill="#FF4757" stroke="#1a1a1a" stroke-width="3"/><ellipse cx="40" cy="35" rx="22" ry="18" fill="#fff" stroke="#1a1a1a" stroke-width="2"/><ellipse cx="40" cy="33" rx="12" ry="13" fill="#1a1a1a"/><ellipse cx="42" cy="30" rx="5" ry="6" fill="#fff"/><ellipse cx="36" cy="36" rx="2" ry="2.5" fill="#fff" opacity="0.7"/><path d="M20 55Q30 65 40 58Q50 65 60 55" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/><line x1="58" y1="20" x2="68" y2="10" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/><line x1="62" y1="24" x2="72" y2="14" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/></svg>` },
  { label: 'Cyberdecks', rot: 2, url: null, svg: `<svg width="85" height="65" viewBox="0 0 85 65" fill="none"><rect x="2" y="2" width="81" height="61" rx="6" fill="#00D2FF" stroke="#1a1a1a" stroke-width="3"/><rect x="12" y="10" width="40" height="28" rx="3" fill="#1a1a1a"/><rect x="14" y="12" width="36" height="24" rx="2" fill="#0a3d0a"/><text x="32" y="28" text-anchor="middle" fill="#2ED573" font-family="monospace" font-size="10">&gt;_</text><rect x="12" y="42" width="8" height="6" rx="1" fill="#1a1a1a"/><rect x="22" y="42" width="8" height="6" rx="1" fill="#1a1a1a"/><rect x="32" y="42" width="8" height="6" rx="1" fill="#1a1a1a"/><rect x="42" y="42" width="8" height="6" rx="1" fill="#1a1a1a"/><rect x="12" y="50" width="18" height="5" rx="1" fill="#1a1a1a"/><rect x="32" y="50" width="18" height="5" rx="1" fill="#1a1a1a"/><line x1="60" y1="15" x2="75" y2="15" stroke="#1a1a1a" stroke-width="2"/><line x1="60" y1="22" x2="72" y2="22" stroke="#1a1a1a" stroke-width="2"/><line x1="60" y1="29" x2="78" y2="29" stroke="#1a1a1a" stroke-width="2"/><circle cx="62" cy="45" r="4" fill="#FF1493" stroke="#1a1a1a" stroke-width="1.5"/><circle cx="73" cy="45" r="4" fill="#FFD700" stroke="#1a1a1a" stroke-width="1.5"/></svg>` },
  { label: 'AI ethics', rot: -3, url: 'https://www.linkedin.com/in/dhruvvkumar', svg: `<svg width="75" height="80" viewBox="0 0 75 80" fill="none"><rect x="2" y="2" width="71" height="76" rx="8" fill="#2ED573" stroke="#1a1a1a" stroke-width="3"/><path d="M22 30Q25 15 37 22Q45 12 53 22Q60 15 58 30Q62 40 52 45Q48 52 37 48Q26 52 22 45Q15 40 22 30Z" fill="#fff" stroke="#1a1a1a" stroke-width="2"/><line x1="37" y1="48" x2="37" y2="58" stroke="#1a1a1a" stroke-width="2.5"/><line x1="25" y1="58" x2="49" y2="58" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round"/><line x1="25" y1="58" x2="20" y2="68" stroke="#1a1a1a" stroke-width="2"/><line x1="49" y1="58" x2="54" y2="68" stroke="#1a1a1a" stroke-width="2"/><circle cx="18" cy="70" r="5" fill="#FFD700" stroke="#1a1a1a" stroke-width="1.5"/><circle cx="56" cy="70" r="5" fill="#FF4757" stroke="#1a1a1a" stroke-width="1.5"/><circle cx="30" cy="30" r="2" fill="#1a1a1a"/><circle cx="44" cy="30" r="2" fill="#1a1a1a"/></svg>` },
  { label: 'Semiconductors', rot: 5, url: null, svg: `<svg width="75" height="75" viewBox="0 0 75 75" fill="none"><rect x="2" y="2" width="71" height="71" rx="8" fill="#1E90FF" stroke="#1a1a1a" stroke-width="3"/><rect x="20" y="20" width="35" height="35" rx="3" fill="#1a1a1a"/><rect x="23" y="23" width="29" height="29" rx="2" fill="#2a2a4a"/><rect x="30" y="30" width="15" height="15" rx="1" fill="#FFD700" opacity="0.8"/><line x1="25" y1="17" x2="25" y2="10" stroke="#fff" stroke-width="2"/><line x1="33" y1="17" x2="33" y2="10" stroke="#fff" stroke-width="2"/><line x1="41" y1="17" x2="41" y2="10" stroke="#fff" stroke-width="2"/><line x1="49" y1="17" x2="49" y2="10" stroke="#fff" stroke-width="2"/><line x1="25" y1="58" x2="25" y2="65" stroke="#fff" stroke-width="2"/><line x1="33" y1="58" x2="33" y2="65" stroke="#fff" stroke-width="2"/><line x1="41" y1="58" x2="41" y2="65" stroke="#fff" stroke-width="2"/><line x1="49" y1="58" x2="49" y2="65" stroke="#fff" stroke-width="2"/><line x1="17" y1="25" x2="10" y2="25" stroke="#fff" stroke-width="2"/><line x1="17" y1="33" x2="10" y2="33" stroke="#fff" stroke-width="2"/><line x1="17" y1="41" x2="10" y2="41" stroke="#fff" stroke-width="2"/><line x1="17" y1="49" x2="10" y2="49" stroke="#fff" stroke-width="2"/><line x1="58" y1="25" x2="65" y2="25" stroke="#fff" stroke-width="2"/><line x1="58" y1="33" x2="65" y2="33" stroke="#fff" stroke-width="2"/><line x1="58" y1="41" x2="65" y2="41" stroke="#fff" stroke-width="2"/><line x1="58" y1="49" x2="65" y2="49" stroke="#fff" stroke-width="2"/></svg>` },
  { label: 'Coffee addict', rot: -4, url: null, svg: `<svg width="65" height="80" viewBox="0 0 65 80" fill="none"><rect x="2" y="2" width="61" height="76" rx="8" fill="#8B4513" stroke="#1a1a1a" stroke-width="3"/><rect x="12" y="30" width="30" height="35" rx="4" fill="#fff" stroke="#1a1a1a" stroke-width="2"/><path d="M42 38Q52 38 52 48Q52 58 42 58" stroke="#fff" stroke-width="3" fill="none"/><ellipse cx="27" cy="32" rx="14" ry="4" fill="#6B3410"/><path d="M20 20Q22 12 24 20" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M27 18Q29 8 31 18" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M34 20Q36 12 38 20" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>` },
  { label: 'Night owl', rot: 3, url: null, svg: `<svg width="75" height="80" viewBox="0 0 75 80" fill="none"><rect x="2" y="2" width="71" height="76" rx="8" fill="#2C2C54" stroke="#1a1a1a" stroke-width="3"/><ellipse cx="37" cy="42" rx="20" ry="22" fill="#8B6914"/><circle cx="28" cy="35" r="9" fill="#fff" stroke="#1a1a1a" stroke-width="2"/><circle cx="46" cy="35" r="9" fill="#fff" stroke="#1a1a1a" stroke-width="2"/><circle cx="28" cy="35" r="5" fill="#1a1a1a"/><circle cx="46" cy="35" r="5" fill="#1a1a1a"/><circle cx="30" cy="33" r="2" fill="#fff"/><circle cx="48" cy="33" r="2" fill="#fff"/><path d="M34 45L37 50L40 45" fill="#FFD700" stroke="#1a1a1a" stroke-width="1.5"/><path d="M15 25L22 30L18 22Z" fill="#8B6914"/><path d="M59 25L52 30L56 22Z" fill="#8B6914"/><circle cx="12" cy="12" r="3" fill="#FFD700"/><circle cx="60" cy="8" r="2" fill="#FFD700"/><circle cx="55" cy="18" r="1.5" fill="#FFD700" opacity="0.6"/></svg>` },
  { label: 'Football', rot: -2, url: null, svg: `<svg width="75" height="75" viewBox="0 0 75 75" fill="none"><rect x="2" y="2" width="71" height="71" rx="8" fill="#4CAF50" stroke="#1a1a1a" stroke-width="3"/><circle cx="37" cy="37" r="22" fill="#fff" stroke="#1a1a1a" stroke-width="2.5"/><polygon points="37,19 43,27 40,35 34,35 31,27" fill="#1a1a1a"/><polygon points="52,30 53,40 46,43 41,37 45,28" fill="#1a1a1a"/><polygon points="47,50 40,54 33,50 35,43 43,43" fill="#1a1a1a"/><polygon points="22,30 29,28 33,37 28,43 21,40" fill="#1a1a1a"/><polygon points="27,50 30,43 34,50 30,55 23,52" fill="#1a1a1a"/></svg>` },
];

const HUMAN_PHOTOS = [
  { src: '/Portfolio/photos/museum-gallery.jpg', alt: 'Museum gallery' },
  { src: '/Portfolio/photos/berlin-sunset.jpg', alt: 'Berlin sunset' },
  { src: '/Portfolio/photos/canal-sunset.jpg', alt: 'Berlin canal sunset' },
  { src: '/Portfolio/photos/train-ride.jpg', alt: 'Train ride through Germany' },
];

export default function Home() {
  return (
    <div>
      <ScrollProgress />
      <SectionDots />
      <Hero />
      <Projects />
      <ExperienceList />
      <Credentials />
      <PostsSection />
      <HumanBounce />
      <ContactTerminal />
    </div>
  );
}

/* ── SCROLL PROGRESS ──────────────────────────────────── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />;
}

/* ── SECTION DOTS ─────────────────────────────────────── */
function SectionDots() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const sections = SECTION_IDS.map(id => document.getElementById(id));
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="section-dots" aria-label="Sections">
      {SECTION_IDS.map((id, i) => (
        <button key={id} className={`section-dot ${i === active ? 'active' : ''}`}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          aria-label={id} />
      ))}
    </nav>
  );
}

/* ── HERO ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" style={{ padding: '6rem var(--pad-x) 4rem' }}>
      <div className="hero-grid" style={{ maxWidth: 'var(--max-w)', margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '4rem', alignItems: 'center' }}>
        <div className="hero-stagger">
          <p style={{ fontFamily: 'var(--f-mono)', fontSize: 'var(--fs-xs)', color: 'var(--c-faint)',
            letterSpacing: '0.08em', marginBottom: '1rem' }}>
            {profile.workAuth}
          </p>
          <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 'var(--fs-hero)',
            lineHeight: 1.1, marginBottom: '1.25rem', color: 'var(--c-ink)' }}>
            {profile.name.split(' ').slice(0, 2).join(' ')}
          </h1>
          <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--c-gold)',
            marginBottom: '0.5rem' }}>
            {profile.title}
          </p>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)', maxWidth: '55ch',
            marginBottom: '1.5rem', lineHeight: 1.65 }}>
            {profile.intro}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {VIBE_TAGS.map(t => <span key={t} className="vibe-tag">{t}</span>)}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <a href={profile.resumeUrl} className="btn btn-gold" download="Dhruv_Kumar_Boothu_CV.pdf">Download CV</a>
            <a href="#projects" className="btn btn-ink">View work</a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer"
              className="btn btn-ink">LinkedIn</a>
          </div>
        </div>
        <div style={{ maxWidth: '340px', margin: '0 auto', borderRadius: 'var(--radius-lg)',
          overflow: 'hidden', border: '1px solid var(--c-paper-3)' }}>
          <img src={profile.photo} alt={profile.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center',
              filter: 'grayscale(15%) contrast(1.05)' }} />
        </div>
      </div>
    </section>
  );
}

/* ── PROJECTS ─────────────────────────────────────────── */
function Projects() {
  return (
    <section id="projects" className="section reveal">
      <div className="section-inner">
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'var(--fs-h1)',
          marginBottom: 'var(--sp-12)' }}>
          Selected work
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {selectedWork.map(p => <ProjectCard key={p.title} p={p} />)}
        </div>

        <details style={{ marginTop: 'var(--sp-12)' }}>
          <summary style={{ fontFamily: 'var(--f-mono)', fontSize: 'var(--fs-sm)', color: 'var(--c-gold)',
            cursor: 'pointer', marginBottom: '0.75rem' }}>
            Practice and learning
          </summary>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.75rem' }}>
            {practice.map(p => (
              <li key={p.title} style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)',
                marginBottom: '0.5rem', lineHeight: 1.6 }}>
                {p.githubUrl ? (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--c-ink)', fontWeight: 500 }}>{p.title}</a>
                ) : p.title}
                {' — '}{p.oneLiner}
              </li>
            ))}
          </ul>
        </details>

        <p style={{ marginTop: 'var(--sp-8)', fontSize: 'var(--fs-sm)', color: 'var(--c-muted)' }}>
          Also built: Email assistant over 2 inboxes with a 4-layer local LLM classifier (private code).
        </p>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  return (
    <div style={{ borderRadius: 'var(--radius)', border: '1px solid var(--c-paper-3)',
      overflow: 'hidden', background: 'var(--c-paper)',
      transition: 'border-color 0.2s var(--ease-out)' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--c-gold)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--c-paper-3)'}>
      {p.image && (
        <img src={p.image} alt={p.title} loading="lazy"
          style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
      )}
      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--c-ink)' }}>{p.title}</h3>
          {p.note && <span className="tag" style={{ fontSize: '0.65rem' }}>{p.note}</span>}
        </div>
        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-muted)', lineHeight: 1.6,
          marginBottom: '0.5rem' }}>{p.problem}</p>
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-ink)', lineHeight: 1.6,
          marginBottom: '0.75rem' }}>{p.outcome}</p>
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {p.tags.slice(0, 5).map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {p.liveUrl && (
            <div>
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                className="btn btn-gold" style={{ fontSize: 'var(--fs-xs)', padding: '0.35rem 0.85rem' }}>
                Live demo ↗
              </a>
              <p style={{ fontSize: '0.6rem', color: 'var(--c-faint)', marginTop: '0.2rem' }}>
                Free hosting, may take a minute to wake.
              </p>
            </div>
          )}
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
              className="btn btn-ink" style={{ fontSize: 'var(--fs-xs)', padding: '0.35rem 0.85rem' }}>
              Code ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── EXPERIENCE — plain vertical list ────────────────── */
function ExperienceList() {
  return (
    <section id="experience" className="section reveal">
      <div className="section-inner">
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'var(--fs-h1)',
          marginBottom: 'var(--sp-12)' }}>
          Experience
        </h2>
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '2rem', paddingBottom: '2rem',
            borderBottom: i < experience.length - 1 ? '1px solid var(--c-paper-3)' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--c-ink)' }}>
                {exp.role}
              </h3>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 'var(--fs-xs)',
                color: 'var(--c-gold)', whiteSpace: 'nowrap' }}>
                {exp.dates}
              </span>
            </div>
            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-faint)', marginBottom: '0.75rem' }}>
              {exp.company}
            </p>
            {exp.bullets.length > 0 && (
              <ul style={{ paddingLeft: '1.25rem' }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)',
                    lineHeight: 1.65, marginBottom: '0.35rem' }}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CREDENTIALS — education, skills, languages, certs ── */
function Credentials() {
  return (
    <section id="credentials" className="section reveal">
      <div className="section-inner">
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'var(--fs-h1)',
          marginBottom: 'var(--sp-12)' }}>
          Education & skills
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem', marginBottom: 'var(--sp-12)' }}>
          {EDUCATION.map((ed, i) => (
            <div key={i}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--c-ink)', marginBottom: '0.25rem' }}>
                {ed.degree}
              </h3>
              <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)' }}>{ed.school}</p>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-faint)', fontFamily: 'var(--f-mono)' }}>
                {ed.dates} · {ed.note}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 'var(--sp-8)' }}>
          {skills.map(group => (
            <div key={group.group} style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--c-ink)',
                marginBottom: '0.4rem' }}>{group.group}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {group.items.map(item => <span key={item} className="tag">{item}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem', fontSize: 'var(--fs-sm)', color: 'var(--c-muted)' }}>
          <div>
            <h4 style={{ fontWeight: 600, color: 'var(--c-ink)', marginBottom: '0.35rem' }}>Languages</h4>
            {LANGUAGES.map(l => <p key={l} style={{ lineHeight: 1.6 }}>{l}</p>)}
          </div>
          <div>
            <h4 style={{ fontWeight: 600, color: 'var(--c-ink)', marginBottom: '0.35rem' }}>Certifications</h4>
            {CERTS.map(c => <p key={c} style={{ lineHeight: 1.6 }}>{c}</p>)}
          </div>
          <div>
            <h4 style={{ fontWeight: 600, color: 'var(--c-ink)', marginBottom: '0.35rem' }}>Publication</h4>
            <p style={{ lineHeight: 1.6 }}>{PUBLICATION}</p>
            <h4 style={{ fontWeight: 600, color: 'var(--c-ink)', marginBottom: '0.35rem', marginTop: '1rem' }}>Volunteering</h4>
            <p style={{ lineHeight: 1.6 }}>{VOLUNTEERING}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── POSTS — LinkedIn post cards ─────────────────────── */
function PostsSection() {
  return (
    <section id="posts" className="section reveal">
      <div className="section-inner">
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'var(--fs-h1)',
          marginBottom: 'var(--sp-8)' }}>
          Posts
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {posts.map((post, i) => (
            <a key={i} href={post.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'block', padding: '1.25rem', borderRadius: 'var(--radius)',
                border: '1px solid var(--c-paper-3)', textDecoration: 'none', color: 'inherit',
                transition: 'border-color 0.2s var(--ease-out)',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--c-gold)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--c-paper-3)'}>
              <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-ink)', lineHeight: 1.6 }}>
                "{post.opening}"
              </p>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-gold)', marginTop: '0.5rem',
                fontFamily: 'var(--f-mono)' }}>
                Read on LinkedIn →
              </p>
            </a>
          ))}
        </div>
        <a href={allPostsUrl} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-block', marginTop: '1rem', fontSize: 'var(--fs-sm)',
            color: 'var(--c-gold)', fontFamily: 'var(--f-mono)' }}>
          All posts →
        </a>
      </div>
    </section>
  );
}

/* ── HUMAN — bouncing sticker scatter + photos ───────── */
function HumanBounce() {
  const arenaRef = useRef(null);
  const itemsRef = useRef([]);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;
    const rect = arena.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    const cols = 5, rows = 2;
    itemsRef.current = HUMAN_ITEMS.map((_, idx) => {
      const col = idx % cols, row = Math.floor(idx / cols);
      const cellW = (W - 90) / cols, cellH = (H - 90) / rows;
      return {
        x: col * cellW + Math.random() * cellW * 0.5 + 10,
        y: row * cellH + Math.random() * cellH * 0.5 + 10,
        vx: (0.3 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1),
        vy: (0.3 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1),
      };
    });

    const animate = () => {
      if (!pausedRef.current) {
        const items = itemsRef.current;
        const els = arena.querySelectorAll('.bounce-sticker');
        items.forEach((item, i) => {
          item.x += item.vx;
          item.y += item.vy;
          const elW = els[i]?.offsetWidth || 80;
          const elH = els[i]?.offsetHeight || 80;
          if (item.x <= 0 || item.x >= W - elW) item.vx *= -1;
          if (item.y <= 0 || item.y >= H - elH) item.vy *= -1;
          item.x = Math.max(0, Math.min(W - elW, item.x));
          item.y = Math.max(0, Math.min(H - elH, item.y));
          if (els[i]) {
            els[i].style.left = item.x + 'px';
            els[i].style.top = item.y + 'px';
          }
        });
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section id="human" className="section reveal">
      <div className="section-inner">
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'var(--fs-h1)',
          marginBottom: 'var(--sp-8)' }}>
          The human side
        </h2>
        <div ref={arenaRef} className="bounce-arena"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}>
          {HUMAN_ITEMS.map((item, i) => {
            const Tag = item.url ? 'a' : 'div';
            const linkProps = item.url ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Tag key={i} {...linkProps} className="bounce-sticker"
                style={{ transform: `rotate(${item.rot}deg)`, cursor: item.url ? 'pointer' : 'default' }}>
                <div dangerouslySetInnerHTML={{ __html: item.svg }} />
                <span className="sticker-tooltip">{item.label}{item.url ? ' →' : ''}</span>
              </Tag>
            );
          })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem', marginTop: 'var(--sp-8)' }}>
          {HUMAN_PHOTOS.map((photo, i) => (
            <div key={i} style={{ borderRadius: 'var(--radius)', overflow: 'hidden',
              height: '180px' }}>
              <img src={photo.src} alt={photo.alt} loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT — terminal ───────────────────────────────── */
function ContactTerminal() {
  return (
    <section id="contact" className="section reveal">
      <div className="section-inner" style={{ maxWidth: '640px' }}>
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'var(--fs-h1)',
          marginBottom: '0.75rem' }}>
          Get in touch
        </h2>
        <p style={{ color: 'var(--c-muted)', fontSize: 'var(--fs-sm)', marginBottom: 'var(--sp-8)' }}>
          Lass uns zusammenarbeiten.
        </p>
        <div className="terminal">
          <div className="terminal-bar">
            <span className="terminal-dot" style={{ background: '#ff5f57' }} />
            <span className="terminal-dot" style={{ background: '#febc2e' }} />
            <span className="terminal-dot" style={{ background: '#28c840' }} />
            <span style={{ fontFamily: 'var(--f-display)', fontSize: '0.5rem', color: '#666',
              marginLeft: '0.5rem' }}>contact.json</span>
          </div>
          <div className="terminal-body">
            <p><span className="comment">{'// '} open to full-time roles in Berlin</span></p>
            <p>{'{'}</p>
            <p>  <span className="key">"name"</span>: <span className="str">"Dhruv Kumar"</span>,</p>
            <p>  <span className="key">"location"</span>: <span className="str">"Berlin, Germany"</span>,</p>
            <p>  <span className="key">"email"</span>: <a href={`mailto:${profile.links.email}`}>
              <span className="str">"{profile.links.email}"</span></a>,</p>
            <p>  <span className="key">"linkedin"</span>: <a href={profile.links.linkedin}
              target="_blank" rel="noopener noreferrer">
              <span className="str">"/in/dhruvvkumar"</span></a>,</p>
            <p>  <span className="key">"github"</span>: <a href={profile.links.github}
              target="_blank" rel="noopener noreferrer">
              <span className="str">"DhruvvKumar98"</span></a>,</p>
            <p>  <span className="key">"resume"</span>: <a href={profile.resumeUrl} download="Dhruv_Kumar_Boothu_CV.pdf">
              <span className="str">"Dhruv_Kumar_Boothu_CV.pdf"</span></a>,</p>
            <p>  <span className="key">"status"</span>: <span className="str">"open to work"</span></p>
            <p>{'}'}<span className="typing-cursor"></span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
