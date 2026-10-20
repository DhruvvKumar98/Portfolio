import skills from '../data/skills.js';
import languages from '../data/languages.js';
import SkillGroup from '../components/SkillGroup.jsx';
export default function Skills() {
  return (
    <div className="page" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="sec-header">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <span className="sec-num">04</span>
          <h1 className="sec-title">Skills</h1>
        </div>
      </div>
      <div className="mac-chrome reveal" style={{ marginBottom: '4rem' }}>
        <div className="g-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)', border: 'none' }}>
          {skills.map(g => <SkillGroup key={g.group} group={g} />)}
        </div>
      </div>
      <div style={{ borderTop: 'var(--b-light)', paddingTop: '3rem' }} className="reveal d1">
        <div className="label" style={{ marginBottom: '1.5rem' }}>Languages</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
          {languages.map(l => (
            <div key={l.name}>
              <div className="font-display font-semibold text-ink" style={{ fontSize: 'var(--fs-h2)' }}>{l.name}</div>
              <div className="font-mono text-muted" style={{ fontSize: 'var(--fs-xs)', marginTop: '0.3rem' }}>{l.level}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
