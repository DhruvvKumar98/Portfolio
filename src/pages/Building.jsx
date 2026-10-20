import building from '../data/building.js';

const STATUS = {
  'shipped': { label: 'Shipped', color: 'var(--c-gold)' },
  'in-progress': { label: 'Building', color: 'var(--c-muted)' },
  'exploring': { label: 'Exploring', color: 'var(--c-faint)' },
};

export default function Building() {
  return (
    <div className="page" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="sec-header">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <span className="sec-num">09</span>
          <h1 className="sec-title">What I'm Building</h1>
        </div>
        <span className="font-mono text-muted" style={{ fontSize: 'var(--fs-xs)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Active side projects
        </span>
      </div>

      <p className="text-muted leading-relaxed" style={{ maxWidth: '60ch', marginBottom: '2.5rem', fontWeight: 300 }}>
        These are the things I work on outside of client work — tools I actually want to exist.
        Some are shipped, some are half-built, all are real.
      </p>

      <div className="mac-chrome">
        <div className="g-grid" style={{ gridTemplateColumns: '1fr 1fr', border: 'none' }}>
          {building.map((proj, i) => {
            const s = STATUS[proj.status] || STATUS['exploring'];
            return (
              <div key={i} style={{
                padding: '2rem', transition: 'background var(--t-base)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-paper-2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-paper)'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="label">{proj.title}</span>
                  <span className="font-mono" style={{ fontSize: 'var(--fs-tag)', color: s.color, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', background: s.color, display: 'inline-block' }} />
                    {s.label}
                  </span>
                </div>
                <p className="text-muted leading-relaxed" style={{ fontSize: 'var(--fs-sm)', fontWeight: 300, marginBottom: '1rem' }}>
                  {proj.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '1rem' }}>
                  {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                {proj.repo && proj.repo !== '#' && (
                  <a href={proj.repo} target="_blank" rel="noopener noreferrer"
                     className="font-mono text-muted hover:text-gold transition-colors"
                     style={{ fontSize: 'var(--fs-xs)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    View code ↗
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
