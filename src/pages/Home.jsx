import { Link } from 'react-router-dom';
import profile from '../data/profile.js';
import kpis from '../data/kpis.js';
import projects from '../data/projects.js';
import experiences from '../data/experience.js';
import building from '../data/building.js';
import Btn from '../components/Btn.jsx';
const FEATURED = ['Email Command Center', 'Decision Ledger', 'Return Radar'];
export default function Home() {
  const featured = projects.filter(p => FEATURED.includes(p.title));
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ minHeight: '95vh', display: 'flex', alignItems: 'flex-end',
                        padding: '5rem var(--pad-x) 4rem' }}>
        <div className="hero-grid" style={{ maxWidth: 'var(--max-w)', margin: '0 auto', width: '100%',
                      display: 'grid', gridTemplateColumns: '1fr 1fr',
                      gap: '5rem', alignItems: 'end' }}>
          <div className="hero-stagger">
            <p className="label" style={{ color: 'var(--c-muted)', marginBottom: '1.5rem',
                                          display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--c-gold)' }}>—</span>
              Kreuzberg, Berlin · Open to work
            </p>
            {/* Stamp name — pixel blue shadow. Disable in tokens.css: set --stamp-x and --stamp-y to 0px */}
            <h1 className="font-display font-extrabold"
                style={{ fontSize: 'var(--fs-hero)', letterSpacing: '-0.02em',
                         lineHeight: 1.1, marginBottom: '1.5rem' }}>
              {['Dhruv', 'Kumar'].map(word => (
                <div key={word} className="stamp-wrap" style={{ display: 'block' }}>
                  <span className="stamp-front">{word}</span>
                  <span className="stamp-back" aria-hidden="true">{word}</span>
                </div>
              ))}
            </h1>
            {/* Tagline + pixel underline */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p className="font-display font-semibold text-muted typing-cursor" style={{ fontSize: 'var(--fs-h2)' }}>
                {profile.title}
              </p>
              <div style={{ width: '100%', maxWidth: '22rem', height: '3px',
                            background: 'var(--c-gold)', marginTop: '0.5rem' }} />
            </div>
            <p className="text-muted leading-relaxed" style={{ maxWidth: '42ch', marginBottom: '2.5rem' }}>
              {profile.intro}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Btn href="/projects">View Projects</Btn>
              <Btn href={profile.resumeUrl} variant="gold" download>Download CV</Btn>
            </div>
          </div>
          {/* Photo in Mac window + KPIs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="mac-chrome" style={{ maxWidth: '22rem', margin: '0 auto' }}>
              <img src={profile.photo} alt="Dhruv Kumar"
                style={{ width: '100%', display: 'block',
                         aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'top center',
                         filter: 'grayscale(30%) contrast(1.08)' }} />
            </div>
            {/* KPIs — values from src/data/kpis.js */}
            <div className="mac-chrome">
              <div className="g-grid" style={{ gridTemplateColumns: '1fr 1fr', border: 'none' }}>
                {kpis.map((k, i) => (
                  <div key={i} style={{ padding: '1.25rem' }}>
                    <div className="font-display font-bold text-ink" style={{ fontSize: '1.5rem' }}>{k.value}</div>
                    <div className="label" style={{ color: 'var(--c-muted)', marginTop: '0.3rem' }}>{k.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── FEATURED PROJECTS ─────────────────────────────── */}
      <section className="section reveal">
        <div className="section-inner">
          <div className="sec-header">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <span className="sec-num">01</span>
              <h2 className="sec-title">Featured Work</h2>
            </div>
            <Link to="/projects" className="font-mono text-muted hover:text-gold transition-colors"
                  style={{ fontSize: 'var(--fs-xs)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              All projects →
            </Link>
          </div>
          <div className="mac-chrome">
            <div className="g-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', border: 'none' }}>
              {featured.map(p => (
                <Link key={p.title} to="/projects"
                  style={{ padding: '2rem', display: 'flex', flexDirection: 'column',
                           textDecoration: 'none', color: 'inherit',
                           transition: 'background var(--t-base)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--c-paper-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--c-paper)'}>
                  <span className="label" style={{ marginBottom: '1rem' }}>{p.category}</span>
                  <h3 className="font-display font-bold text-ink leading-tight"
                      style={{ fontSize: 'var(--fs-h2)', marginBottom: '0.75rem' }}>
                    {p.title}
                  </h3>
                  <p className="text-muted leading-relaxed flex-1"
                     style={{ fontSize: 'var(--fs-sm)', marginBottom: '1.5rem' }}>
                    {p.outcome.substring(0, 120)}...
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {p.tags.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── EXPERIENCE STRIP (blue) ───────────────────────── */}
      <section className="section reveal" style={{ background: 'var(--c-ink-2)' }}>
        <div className="section-inner">
          <div className="sec-header dark">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <span className="sec-num">02</span>
              <h2 className="sec-title dark">Experience</h2>
            </div>
            <Link to="/experience" className="font-mono hover:text-gold transition-colors"
                  style={{ fontSize: 'var(--fs-xs)', letterSpacing: '0.1em',
                           textTransform: 'uppercase', color: 'var(--c-muted)' }}>
              Full timeline →
            </Link>
          </div>
          <div className="mac-chrome-blue">
            <div className="g-grid-dark" style={{ gridTemplateColumns: '1fr 1fr', border: 'none' }}>
              {experiences.slice(0, 4).map((exp, i) => (
                <div key={i} style={{ padding: '2rem' }}>
                  <div className="label" style={{ marginBottom: '0.5rem' }}>{exp.dates}</div>
                  <div className="font-display font-semibold" style={{ color: 'var(--c-ink)',
                       fontSize: 'var(--fs-h2)', marginBottom: '0.35rem' }}>{exp.role}</div>
                  <div className="font-mono text-muted" style={{ fontSize: 'var(--fs-xs)', marginBottom: '1rem' }}>
                    {exp.company}
                  </div>
                  <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)', lineHeight: 1.65 }}>
                    {exp.impactSummary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── CURRENTLY BUILDING ──────────────────────────────── */}
      <section className="section reveal">
        <div className="section-inner">
          <div className="sec-header">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <span className="sec-num">03</span>
              <h2 className="sec-title">Currently Building</h2>
            </div>
            <Link to="/building" className="font-mono text-muted hover:text-gold transition-colors"
                  style={{ fontSize: 'var(--fs-xs)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              All projects →
            </Link>
          </div>
          <div className="mac-chrome">
            <div className="g-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', border: 'none' }}>
              {building.slice(0, 2).map((proj, i) => (
                <div key={i} style={{ padding: '2rem', transition: 'background var(--t-base)' }}
                     onMouseEnter={e => e.currentTarget.style.background = 'var(--c-paper-2)'}
                     onMouseLeave={e => e.currentTarget.style.background = 'var(--c-paper)'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="label">{proj.title}</span>
                    <span className="font-mono" style={{ fontSize: 'var(--fs-tag)', color: proj.status === 'shipped' ? 'var(--c-gold)' : 'var(--c-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '5px', height: '5px', background: proj.status === 'shipped' ? 'var(--c-gold)' : 'var(--c-muted)', display: 'inline-block' }} />
                      {proj.status === 'shipped' ? 'Shipped' : 'Building'}
                    </span>
                  </div>
                  <p className="text-muted leading-relaxed" style={{ fontSize: 'var(--fs-sm)', fontWeight: 300 }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── QUOTE ─────────────────────────────────────────── */}
      <section className="section reveal">
        <div className="section-inner">
          <blockquote style={{ maxWidth: '48rem' }}>
            <p className="font-display font-semibold text-ink leading-tight"
               style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.25rem)', marginBottom: '1.5rem' }}>
              "{profile.valueStatement}"
            </p>
            <footer className="font-mono text-muted"
                    style={{ fontSize: 'var(--fs-xs)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              — {profile.name.split(' ').slice(0, 2).join(' ')}, Berlin 2026
            </footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
