import experiences from '../data/experience.js';
import kpis from '../data/kpis.js';
import ExperienceRow from '../components/ExperienceRow.jsx';
export default function Experience() {
  return (
    <div className="page" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="sec-header">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <span className="sec-num">02</span>
          <h1 className="sec-title">Experience</h1>
        </div>
      </div>
      {/* Real KPIs — from src/data/kpis.js. No computed fake numbers. */}
      <div className="mac-chrome reveal" style={{ marginBottom: '4rem' }}>
        <div className="g-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', border: 'none' }}>
          {kpis.map((k, i) => (
            <div key={i} style={{ padding: '1.5rem' }}>
              <div className="font-display font-bold text-ink" style={{ fontSize: '1.5rem' }}>{k.value}</div>
              <div className="label" style={{ color: 'var(--c-muted)', marginTop: '0.5rem' }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Full experience list — each entry is an ExperienceRow component */}
      <div>
        {experiences.map((exp, i) => <ExperienceRow key={i} exp={exp} />)}
      </div>
    </div>
  );
}
