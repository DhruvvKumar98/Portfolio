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
  { label: 'Berlin', icon: '🗼' },
  { label: 'German B1→B2', icon: '🇩🇪' },
  { label: 'ADHD energy', icon: '⚡' },
  { label: 'M.Sc. Data Science', icon: '🎓' },
  { label: 'Manga', icon: '📖' },
  { label: 'Cyberdecks', icon: '🔧' },
  { label: 'AI ethics', icon: '🤖' },
  { label: 'Semiconductors', icon: '💻' },
  { label: 'Coffee addict', icon: '☕' },
  { label: 'Night owl', icon: '🦉' },
];

const PHOTOS = [
  { alt: 'Berlin sunset', src: '/Portfolio/photos/berlin-sunset.jpg' },
  { alt: 'Späti night in Berlin', src: '/Portfolio/photos/spaeti-night.jpg' },
  { alt: 'Train ride through Germany', src: '/Portfolio/photos/train-ride.jpg' },
  { alt: 'Class gathering', src: '/Portfolio/photos/class-gathering.jpg' },
  { alt: 'Berlin canal sunset', src: '/Portfolio/photos/canal-sunset.jpg' },
  { alt: 'Night out', src: '/Portfolio/photos/night-out.jpg' },
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

/* ── HUMAN — bouncing scatter ─────────────────────────── */
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

    itemsRef.current = HUMAN_ITEMS.map(() => ({
      x: Math.random() * (W - 140),
      y: Math.random() * (H - 40),
      vx: (0.3 + Math.random() * 0.6) * (Math.random() > 0.5 ? 1 : -1),
      vy: (0.3 + Math.random() * 0.6) * (Math.random() > 0.5 ? 1 : -1),
    }));

    const animate = () => {
      if (!pausedRef.current) {
        const items = itemsRef.current;
        const els = arena.querySelectorAll('.bounce-item');
        items.forEach((item, i) => {
          item.x += item.vx;
          item.y += item.vy;
          const elW = els[i]?.offsetWidth || 140;
          const elH = els[i]?.offsetHeight || 36;
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
            <div key={i} className="bounce-item">
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              <span>{item.label}</span>
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
