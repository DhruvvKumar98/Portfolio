import { useState, useEffect, useRef, useCallback } from 'react';
import profile from '../data/profile.js';
import projects from '../data/projects.js';
import experiences from '../data/experience.js';
import building from '../data/building.js';
import writing from '../data/writing.js';

const VIBE_TAGS = [
  'AI enablement', 'DIY builder', 'ships code',
  'Berlin-based', 'business analyst',
];

const HUMAN_ITEMS = [
  { label: 'Berlin', rot: -5, svg: `<svg width="70" height="90" viewBox="0 0 70 90" fill="none"><rect x="2" y="2" width="66" height="86" rx="6" fill="#FF6B35" stroke="#1a1a1a" stroke-width="3"/><line x1="35" y1="82" x2="35" y2="35" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="35" cy="32" r="10" fill="#fff" stroke="#1a1a1a" stroke-width="2"/><circle cx="35" cy="32" r="5" fill="#FF6B35"/><line x1="35" y1="22" x2="35" y2="10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><line x1="28" y1="82" x2="42" y2="82" stroke="#fff" stroke-width="4" stroke-linecap="round"/><rect x="30" y="45" width="10" height="3" rx="1" fill="rgba(255,255,255,0.5)"/><rect x="30" y="52" width="10" height="3" rx="1" fill="rgba(255,255,255,0.5)"/></svg>` },
  { label: 'German B1→B2', rot: 3, svg: `<svg width="80" height="65" viewBox="0 0 80 65" fill="none"><rect x="2" y="2" width="76" height="61" rx="6" fill="#1a1a1a" stroke="#1a1a1a" stroke-width="3"/><rect x="5" y="5" width="70" height="18" rx="3" fill="#1a1a1a"/><rect x="5" y="23" width="70" height="18" fill="#DD0000"/><rect x="5" y="41" width="70" height="18" rx="3" fill="#FFCC00"/><text x="40" y="38" text-anchor="middle" fill="#fff" font-family="'Permanent Marker',cursive" font-size="18" opacity="0.9">B2!</text><circle cx="65" cy="12" r="6" fill="#2ED573" stroke="#1a1a1a" stroke-width="2"/></svg>` },
  { label: 'ADHD energy', rot: -2, svg: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="36" fill="#FF1493" stroke="#1a1a1a" stroke-width="3"/><path d="M25 35Q30 20 40 28Q50 20 55 35Q60 45 50 50Q45 58 40 55Q35 58 30 50Q20 45 25 35Z" fill="#fff" stroke="#1a1a1a" stroke-width="1.5"/><path d="M35 38L32 30L38 34Z" fill="#FF1493"/><path d="M45 38L48 30L42 34Z" fill="#FF1493"/><path d="M60 15L65 8L58 12Z" fill="#FFD700" stroke="#1a1a1a" stroke-width="1"/><path d="M18 18L13 10L20 15Z" fill="#FFD700" stroke="#1a1a1a" stroke-width="1"/><path d="M65 60L70 55L63 57Z" fill="#FFD700" stroke="#1a1a1a" stroke-width="1"/><line x1="12" y1="40" x2="6" y2="38" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/><line x1="68" y1="40" x2="74" y2="38" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/><path d="M33 45Q37 50 40 46Q43 50 47 45" stroke="#1a1a1a" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>` },
  { label: 'M.Sc. Data Science', rot: 4, svg: `<svg width="75" height="75" viewBox="0 0 75 75" fill="none"><rect x="2" y="2" width="71" height="71" rx="8" fill="#7B2FF7" stroke="#1a1a1a" stroke-width="3"/><rect x="15" y="50" width="10" height="15" rx="2" fill="#fff" opacity="0.9"/><rect x="28" y="35" width="10" height="30" rx="2" fill="#fff" opacity="0.9"/><rect x="41" y="25" width="10" height="40" rx="2" fill="#FFD700"/><rect x="54" y="15" width="10" height="50" rx="2" fill="#2ED573"/><path d="M18 48L33 32L46 22L59 12" stroke="#FF1493" stroke-width="2.5" stroke-linecap="round" fill="none"/><circle cx="59" cy="12" r="3" fill="#FF1493"/></svg>` },
  { label: 'Manga', rot: -6, svg: `<svg width="80" height="75" viewBox="0 0 80 75" fill="none"><rect x="2" y="2" width="76" height="71" rx="8" fill="#FF4757" stroke="#1a1a1a" stroke-width="3"/><ellipse cx="40" cy="35" rx="22" ry="18" fill="#fff" stroke="#1a1a1a" stroke-width="2"/><ellipse cx="40" cy="33" rx="12" ry="13" fill="#1a1a1a"/><ellipse cx="42" cy="30" rx="5" ry="6" fill="#fff"/><ellipse cx="36" cy="36" rx="2" ry="2.5" fill="#fff" opacity="0.7"/><path d="M20 55Q30 65 40 58Q50 65 60 55" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/><line x1="58" y1="20" x2="68" y2="10" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/><line x1="62" y1="24" x2="72" y2="14" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/></svg>` },
  { label: 'Cyberdecks', rot: 2, svg: `<svg width="85" height="65" viewBox="0 0 85 65" fill="none"><rect x="2" y="2" width="81" height="61" rx="6" fill="#00D2FF" stroke="#1a1a1a" stroke-width="3"/><rect x="12" y="10" width="40" height="28" rx="3" fill="#1a1a1a"/><rect x="14" y="12" width="36" height="24" rx="2" fill="#0a3d0a"/><text x="32" y="28" text-anchor="middle" fill="#2ED573" font-family="monospace" font-size="10">&gt;_</text><rect x="12" y="42" width="8" height="6" rx="1" fill="#1a1a1a"/><rect x="22" y="42" width="8" height="6" rx="1" fill="#1a1a1a"/><rect x="32" y="42" width="8" height="6" rx="1" fill="#1a1a1a"/><rect x="42" y="42" width="8" height="6" rx="1" fill="#1a1a1a"/><rect x="12" y="50" width="18" height="5" rx="1" fill="#1a1a1a"/><rect x="32" y="50" width="18" height="5" rx="1" fill="#1a1a1a"/><line x1="60" y1="15" x2="75" y2="15" stroke="#1a1a1a" stroke-width="2"/><line x1="60" y1="22" x2="72" y2="22" stroke="#1a1a1a" stroke-width="2"/><line x1="60" y1="29" x2="78" y2="29" stroke="#1a1a1a" stroke-width="2"/><circle cx="62" cy="45" r="4" fill="#FF1493" stroke="#1a1a1a" stroke-width="1.5"/><circle cx="73" cy="45" r="4" fill="#FFD700" stroke="#1a1a1a" stroke-width="1.5"/></svg>` },
  { label: 'AI ethics', rot: -3, svg: `<svg width="75" height="80" viewBox="0 0 75 80" fill="none"><rect x="2" y="2" width="71" height="76" rx="8" fill="#2ED573" stroke="#1a1a1a" stroke-width="3"/><path d="M22 30Q25 15 37 22Q45 12 53 22Q60 15 58 30Q62 40 52 45Q48 52 37 48Q26 52 22 45Q15 40 22 30Z" fill="#fff" stroke="#1a1a1a" stroke-width="2"/><line x1="37" y1="48" x2="37" y2="58" stroke="#1a1a1a" stroke-width="2.5"/><line x1="25" y1="58" x2="49" y2="58" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round"/><line x1="25" y1="58" x2="20" y2="68" stroke="#1a1a1a" stroke-width="2"/><line x1="49" y1="58" x2="54" y2="68" stroke="#1a1a1a" stroke-width="2"/><circle cx="18" cy="70" r="5" fill="#FFD700" stroke="#1a1a1a" stroke-width="1.5"/><circle cx="56" cy="70" r="5" fill="#FF4757" stroke="#1a1a1a" stroke-width="1.5"/><circle cx="30" cy="30" r="2" fill="#1a1a1a"/><circle cx="44" cy="30" r="2" fill="#1a1a1a"/></svg>` },
  { label: 'Semiconductors', rot: 5, svg: `<svg width="75" height="75" viewBox="0 0 75 75" fill="none"><rect x="2" y="2" width="71" height="71" rx="8" fill="#1E90FF" stroke="#1a1a1a" stroke-width="3"/><rect x="20" y="20" width="35" height="35" rx="3" fill="#1a1a1a"/><rect x="23" y="23" width="29" height="29" rx="2" fill="#2a2a4a"/><rect x="30" y="30" width="15" height="15" rx="1" fill="#FFD700" opacity="0.8"/><line x1="25" y1="17" x2="25" y2="10" stroke="#fff" stroke-width="2"/><line x1="33" y1="17" x2="33" y2="10" stroke="#fff" stroke-width="2"/><line x1="41" y1="17" x2="41" y2="10" stroke="#fff" stroke-width="2"/><line x1="49" y1="17" x2="49" y2="10" stroke="#fff" stroke-width="2"/><line x1="25" y1="58" x2="25" y2="65" stroke="#fff" stroke-width="2"/><line x1="33" y1="58" x2="33" y2="65" stroke="#fff" stroke-width="2"/><line x1="41" y1="58" x2="41" y2="65" stroke="#fff" stroke-width="2"/><line x1="49" y1="58" x2="49" y2="65" stroke="#fff" stroke-width="2"/><line x1="17" y1="25" x2="10" y2="25" stroke="#fff" stroke-width="2"/><line x1="17" y1="33" x2="10" y2="33" stroke="#fff" stroke-width="2"/><line x1="17" y1="41" x2="10" y2="41" stroke="#fff" stroke-width="2"/><line x1="17" y1="49" x2="10" y2="49" stroke="#fff" stroke-width="2"/><line x1="58" y1="25" x2="65" y2="25" stroke="#fff" stroke-width="2"/><line x1="58" y1="33" x2="65" y2="33" stroke="#fff" stroke-width="2"/><line x1="58" y1="41" x2="65" y2="41" stroke="#fff" stroke-width="2"/><line x1="58" y1="49" x2="65" y2="49" stroke="#fff" stroke-width="2"/></svg>` },
  { label: 'Coffee addict', rot: -4, svg: `<svg width="65" height="80" viewBox="0 0 65 80" fill="none"><rect x="2" y="2" width="61" height="76" rx="8" fill="#8B4513" stroke="#1a1a1a" stroke-width="3"/><rect x="12" y="30" width="30" height="35" rx="4" fill="#fff" stroke="#1a1a1a" stroke-width="2"/><path d="M42 38Q52 38 52 48Q52 58 42 58" stroke="#fff" stroke-width="3" fill="none"/><ellipse cx="27" cy="32" rx="14" ry="4" fill="#6B3410"/><path d="M20 20Q22 12 24 20" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M27 18Q29 8 31 18" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M34 20Q36 12 38 20" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>` },
  { label: 'Night owl', rot: 3, svg: `<svg width="75" height="80" viewBox="0 0 75 80" fill="none"><rect x="2" y="2" width="71" height="76" rx="8" fill="#2C2C54" stroke="#1a1a1a" stroke-width="3"/><ellipse cx="37" cy="42" rx="20" ry="22" fill="#8B6914"/><circle cx="28" cy="35" r="9" fill="#fff" stroke="#1a1a1a" stroke-width="2"/><circle cx="46" cy="35" r="9" fill="#fff" stroke="#1a1a1a" stroke-width="2"/><circle cx="28" cy="35" r="5" fill="#1a1a1a"/><circle cx="46" cy="35" r="5" fill="#1a1a1a"/><circle cx="30" cy="33" r="2" fill="#fff"/><circle cx="48" cy="33" r="2" fill="#fff"/><path d="M34 45L37 50L40 45" fill="#FFD700" stroke="#1a1a1a" stroke-width="1.5"/><path d="M15 25L22 30L18 22Z" fill="#8B6914"/><path d="M59 25L52 30L56 22Z" fill="#8B6914"/><circle cx="12" cy="12" r="3" fill="#FFD700"/><circle cx="60" cy="8" r="2" fill="#FFD700"/><circle cx="55" cy="18" r="1.5" fill="#FFD700" opacity="0.6"/></svg>` },
];

const PHOTOS = [
  { alt: 'Berlin sunset', src: '/Portfolio/photos/berlin-sunset.jpg' },
  { alt: 'Train ride through Germany', src: '/Portfolio/photos/train-ride.jpg' },
  { alt: 'Class gathering', src: '/Portfolio/photos/class-gathering.jpg' },
  { alt: 'Berlin canal sunset', src: '/Portfolio/photos/canal-sunset.jpg' },
];

const SECTION_IDS = ['hero', 'projects', 'photos', 'experience', 'status', 'writing', 'human', 'contact'];

export default function Home() {
  return (
    <div>
      <ScrollProgress />
      <SectionDots />
      <Hero />
      <ProjectList />
      <PhotoMarquee />
      <ExperienceScroll />
      <StatusBoard />
      <WritingQuotes />
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
    <section id="hero" style={{ minHeight: '95vh', display: 'flex', alignItems: 'center',
      padding: '6rem var(--pad-x) 4rem' }}>
      <div className="hero-grid" style={{ maxWidth: 'var(--max-w)', margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '4rem', alignItems: 'center' }}>
        <div className="hero-stagger">
          <p style={{ fontFamily: 'var(--f-mono)', fontSize: 'var(--fs-xs)', color: 'var(--c-faint)',
            letterSpacing: '0.08em', marginBottom: '1rem' }}>
            52.5200° N, 13.4050° E — somewhere near the Fernsehturm, probably caffeinated
          </p>
          <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 'var(--fs-hero)',
            lineHeight: 1.1, marginBottom: '1.25rem', color: 'var(--c-ink)' }}>
            Dhruv Kumar
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--c-muted)', maxWidth: '50ch',
            marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Tools that ship, not slide decks about it.
            <br />
            <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-faint)' }}>
              Business analyst. AI builder. Based in Berlin.
            </span>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {VIBE_TAGS.map(t => <span key={t} className="vibe-tag">{t}</span>)}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <a href="#projects" className="btn btn-ink">View work</a>
            <a href={profile.resumeUrl} className="btn btn-gold" download>Download CV</a>
          </div>
        </div>
        <PhotoStack />
      </div>
    </section>
  );
}

function PhotoStack() {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '340px', aspectRatio: '3/4',
      margin: '0 auto', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {[2, 1].map(i => (
        <div key={i} style={{
          position: 'absolute', inset: 0, borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--c-paper-3)', background: 'var(--c-paper-2)',
          transform: hovered
            ? `rotate(${i === 2 ? -8 : 5}deg) translateX(${i === 2 ? -20 : 15}px)`
            : `rotate(${i === 2 ? -3 : 2}deg)`,
          transition: 'transform 0.4s var(--ease-out)',
          zIndex: i,
        }} />
      ))}
      <div style={{
        position: 'relative', zIndex: 3, width: '100%', height: '100%',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        border: '1px solid var(--c-paper-3)',
      }}>
        <img src={profile.photo} alt="Dhruv Kumar"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center',
            filter: 'grayscale(15%) contrast(1.05)' }} />
      </div>
    </div>
  );
}

/* ── PROJECTS — text list with cursor-following image ── */
function ProjectList() {
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  const [activeIdx, setActiveIdx] = useState(-1);
  const [expanded, setExpanded] = useState(-1);

  const onMouseMove = useCallback((e) => {
    setImgPos({ x: e.clientX + 20, y: e.clientY - 100 });
  }, []);

  const projectImages = [
    '/Portfolio/projects/email-cc.jpg',
    '/Portfolio/projects/decision-ledger.jpg',
    '/Portfolio/projects/xai-stock.jpg',
    '/Portfolio/projects/market-basket.jpg',
    '/Portfolio/projects/ecommerce-rec.jpg',
    '/Portfolio/projects/data-pipeline.jpg',
    '/Portfolio/projects/eda.jpg',
    '/Portfolio/projects/return-radar.jpg',
    '/Portfolio/projects/cohort-retention.jpg',
    '/Portfolio/projects/cac-dashboard.jpg',
  ];

  return (
    <section id="projects" className="section reveal">
      <div className="section-inner">
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'var(--fs-h1)',
          marginBottom: 'var(--sp-12)' }}>
          Selected work
        </h2>
        <div onMouseMove={onMouseMove}>
          {projects.map((p, i) => (
            <div key={p.title}>
              <div
                style={{
                  padding: '1.5rem 0', borderBottom: '1px solid var(--c-paper-3)',
                  cursor: 'pointer', transition: 'padding-left 0.2s var(--ease-out)',
                  paddingLeft: activeIdx === i ? '1rem' : '0',
                }}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(-1)}
                onClick={() => setExpanded(expanded === i ? -1 : i)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: 'var(--fs-xs)',
                      color: 'var(--c-faint)', minWidth: '2ch' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--c-ink)' }}>
                      {p.title}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {p.tags.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>
              {expanded === i && (
                <div style={{
                  padding: '1.5rem 0 2rem 2.5rem',
                  borderBottom: '1px solid var(--c-paper-3)',
                  animation: 'fadeUp 0.3s var(--ease-out) both',
                }}>
                  {p.problem && (
                    <div style={{ marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--c-ink)',
                        marginBottom: '0.3rem' }}>Problem</h4>
                      <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)', maxWidth: '65ch',
                        lineHeight: 1.7 }}>{p.problem}</p>
                    </div>
                  )}
                  {p.decision && (
                    <div style={{ marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--c-ink)',
                        marginBottom: '0.3rem' }}>Solution</h4>
                      <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)', maxWidth: '65ch',
                        lineHeight: 1.7 }}>{p.decision}</p>
                    </div>
                  )}
                  <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)', maxWidth: '65ch',
                    lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    {p.outcome}
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {p.artifacts?.map(a => (
                      <a key={a.label} href={a.link} target="_blank" rel="noopener noreferrer"
                        className="btn btn-ink" style={{ fontSize: 'var(--fs-xs)', padding: '0.4rem 1rem' }}>
                        {a.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Cursor-following image */}
        <div className={`project-img-reveal ${activeIdx >= 0 ? 'visible' : ''}`}
          style={{ left: imgPos.x, top: imgPos.y }}>
          {activeIdx >= 0 && projectImages[activeIdx] ? (
            <img src={projectImages[activeIdx]} alt={projects[activeIdx]?.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#2563eb' }} />
          )}
        </div>
      </div>
    </section>
  );
}

/* ── PHOTO MARQUEE ────────────────────────────────────── */
function PhotoMarquee() {
  const doubled = [...PHOTOS, ...PHOTOS];
  return (
    <section id="photos" style={{ padding: 'var(--sp-8) 0', overflow: 'hidden' }}>
      <p style={{
        fontFamily: 'var(--f-mono)', fontSize: 'var(--fs-xs)', color: 'var(--c-faint)',
        textTransform: 'uppercase', letterSpacing: '0.15em',
        maxWidth: 'var(--max-w)', margin: '0 auto var(--sp-4)', padding: '0 var(--pad-x)',
      }}>Behind the desk</p>
      <div className="marquee-track">
        {doubled.map((p, i) => (
          <div key={i} style={{
            width: '280px', height: '180px', borderRadius: 'var(--radius)',
            overflow: 'hidden', flexShrink: 0,
          }}>
            <img src={p.src} alt={p.alt} loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── EXPERIENCE — horizontal scroll cards ─────────────── */
function ExperienceScroll() {
  return (
    <section id="experience" className="section reveal">
      <div className="section-inner">
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'var(--fs-h1)',
          marginBottom: 'var(--sp-8)' }}>
          Experience
        </h2>
        <div className="hscroll">
          {experiences.map((exp, i) => (
            <div key={i} style={{
              width: '340px', padding: '2rem', borderRadius: 'var(--radius)',
              border: '1px solid var(--c-paper-3)', background: 'var(--c-paper)',
              transition: 'transform 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out)',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}>
              <p style={{ fontFamily: 'var(--f-mono)', fontSize: 'var(--fs-xs)',
                color: 'var(--c-gold)', marginBottom: '0.75rem' }}>{exp.dates}</p>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.35rem' }}>{exp.role}</h3>
              <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-faint)', marginBottom: '1rem' }}>
                {exp.company}
              </p>
              <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)', lineHeight: 1.65 }}>
                {exp.impactSummary}
              </p>
            </div>
          ))}
          <div style={{
            width: '340px', padding: '2rem', borderRadius: 'var(--radius)',
            border: '1.5px dashed var(--c-gold)', background: 'transparent',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '1rem', textAlign: 'center',
          }}>
            <p style={{ fontFamily: 'var(--f-mono)', fontSize: 'var(--fs-sm)', color: 'var(--c-gold)' }}>
              Want the full story?
            </p>
            <a href={profile.resumeUrl} className="btn btn-gold" download>Download CV</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── STATUS BOARD ─────────────────────────────────────── */
function StatusBoard() {
  return (
    <section id="status" className="section reveal">
      <div className="section-inner">
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'var(--fs-h1)',
          marginBottom: 'var(--sp-8)' }}>
          Currently building
        </h2>
        <div className="status-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {building.map((b, i) => {
            const Tag = b.repo && b.repo !== '#' ? 'a' : 'div';
            const linkProps = Tag === 'a' ? { href: b.repo, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
            <Tag key={i} {...linkProps}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--c-paper-3)', background: 'var(--c-paper)',
                textDecoration: 'none', color: 'inherit',
                transition: 'transform 0.2s var(--ease-out), border-color 0.2s var(--ease-out)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.borderColor = 'var(--c-gold)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'var(--c-paper-3)';
              }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                background: b.status === 'shipped' ? 'var(--c-green)' : 'var(--c-amber)',
                animation: b.status !== 'shipped' ? 'pulse 2s ease-in-out infinite' : 'none',
              }} />
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 'var(--fs-sm)', fontWeight: 500 }}>{b.title}</p>
                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-faint)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {b.description.substring(0, 80)}
                </p>
              </div>
            </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── WRITING — rotating pull quotes ───────────────────── */
function WritingQuotes() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(prev => (prev + 1) % writing.length), 5000);
    return () => clearInterval(timer);
  }, []);
  const pair = [writing[idx], writing[(idx + 1) % writing.length]];
  return (
    <section id="writing" className="section reveal">
      <div className="section-inner">
        <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'var(--fs-h1)',
          marginBottom: 'var(--sp-8)' }}>
          Things I write
        </h2>
        <div className="writing-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {pair.map((w, i) => {
            const Tag = w.url && w.url !== '#' ? 'a' : 'div';
            const linkProps = Tag === 'a' ? { href: w.url, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Tag key={`${idx}-${i}`} {...linkProps}
                style={{
                  padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--c-paper-3)',
                  textDecoration: 'none', color: 'inherit',
                  animation: 'fadeUp 0.4s var(--ease-out) both',
                  transition: 'border-color 0.2s var(--ease-out)',
                  cursor: Tag === 'a' ? 'pointer' : 'default',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--c-gold)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--c-paper-3)'}>
                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-faint)',
                  fontFamily: 'var(--f-mono)', marginBottom: '0.75rem' }}>
                  {w.source} · {w.date}
                </p>
                <blockquote style={{ fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.5,
                  marginBottom: '0.75rem', color: 'var(--c-ink)' }}>
                  "{w.excerpt}"
                </blockquote>
                <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-gold)' }}>{w.title}{Tag === 'a' ? ' →' : ''}</p>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── HUMAN — bouncing sticker scatter ────────────────── */
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
          {HUMAN_ITEMS.map((item, i) => (
            <div key={i} className="bounce-sticker"
              style={{ transform: `rotate(${item.rot}deg)` }}>
              <div dangerouslySetInnerHTML={{ __html: item.svg }} />
              <span className="sticker-tooltip">{item.label}</span>
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
            <p><span className="comment">{'// '} open to freelance, consulting, full-time</span></p>
            <p>{'{'}</p>
            <p>  <span className="key">"name"</span>: <span className="str">"Dhruv Kumar"</span>,</p>
            <p>  <span className="key">"location"</span>: <span className="str">"Berlin, Germany"</span>,</p>
            <p>  <span className="key">"email"</span>: <a href={`mailto:${profile.links.email}`}>
              <span className="str">"{profile.links.email}"</span></a>,</p>
            <p>  <span className="key">"linkedin"</span>: <a href={profile.links.linkedin}
              target="_blank" rel="noopener noreferrer">
              <span className="str">"/in/dhruv-kumar"</span></a>,</p>
            <p>  <span className="key">"github"</span>: <a href={profile.links.github}
              target="_blank" rel="noopener noreferrer">
              <span className="str">"DhruvvKumar98"</span></a>,</p>
            <p>  <span className="key">"resume"</span>: <a href={profile.resumeUrl} download>
              <span className="str">"download_cv.pdf"</span></a>,</p>
            <p>  <span className="key">"status"</span>: <span className="str">"open to work"</span></p>
            <p>{'}'}<span className="typing-cursor"></span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
