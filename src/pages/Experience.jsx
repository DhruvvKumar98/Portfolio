import experiences from '../data/experience.js';
import kpis from '../data/kpis.js';
import ExperienceRow from '../components/ExperienceRow.jsx';
export default function Experience() {
  const consulting = experiences[0];
  return (
    <div className="page" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="sec-header">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <span className="sec-num">02</span>
          <h1 className="sec-title">Experience</h1>
        </div>
      </div>
      {/* Consulting highlight */}
      <div className="mac-chrome reveal" style={{ marginBottom: '3rem' }}>
        <div style={{ padding: '2rem', background: 'var(--c-ink-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
            <span className="label">Currently</span>
            <span className="font-mono text-muted" style={{ fontSize: 'var(--fs-xs)' }}>{consulting.dates}</span>
          </div>
          <h2 className="font-display font-bold text-ink" style={{ fontSize: 'var(--fs-h2)', marginBottom: '0.75rem' }}>
            {consulting.role}
          </h2>
          <p className="text-muted" style={{ fontSize: 'var(--fs-sm)', fontWeight: 300, lineHeight: 1.7, marginBottom: '1.25rem' }}>
            {consulting.context} {consulting.responsibilities}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {consulting.impact.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: 'var(--fs-sm)', color: 'var(--c-muted)', fontWeight: 300, lineHeight: 1.65 }}>
                <span style={{ color: 'var(--c-gold)', flexShrink: 0 }}>—</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* KPIs */}
      <div className="mac-chrome reveal d1" style={{ marginBottom: '4rem' }}>
        <div className="g-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', border: 'none' }}>
          {kpis.map((k, i) => (
            <div key={i} style={{ padding: '1.5rem' }}>
              <div className="font-display font-bold text-ink" style={{ fontSize: '1.5rem' }}>{k.value}</div>
              <div className="label" style={{ color: 'var(--c-muted)', marginTop: '0.5rem' }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Full timeline — skips consulting (already shown above) */}
      <div className="label" style={{ marginBottom: '1.5rem' }}>Full Timeline</div>
      <div>
        {experiences.slice(1).map((exp, i) => <ExperienceRow key={i} exp={exp} />)}
      </div>
    </div>
  );
}
