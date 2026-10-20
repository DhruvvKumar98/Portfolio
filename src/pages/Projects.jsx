import { useState } from 'react';
import projects from '../data/projects.js';
import ProjectCard from '../components/ProjectCard.jsx';
import CaseStudy from '../components/CaseStudy.jsx';
const CATS = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
export default function Projects() {
  const [active, setActive]     = useState('All');
  const [selected, setSelected] = useState(null);
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);
  return (
    <div className="page" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="sec-header">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <span className="sec-num">03</span>
          <h1 className="sec-title">Projects</h1>
        </div>
      </div>
      {/* Category filter — auto-populated from projects.js category field */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
        {CATS.map(cat => (
          <button key={cat} onClick={() => setActive(cat)}
            className="font-mono" style={{
              fontSize: 'var(--fs-xs)', letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '0.5rem 1rem', border: `1px solid ${active === cat ? 'var(--c-gold)' : 'var(--c-paper-3)'}`,
              color: active === cat ? 'var(--c-gold)' : 'var(--c-muted)',
              background: 'transparent', cursor: 'pointer',
              transition: 'all var(--t-fast)',
            }}>
            {cat}
          </button>
        ))}
      </div>
      {/* Project grid — 2 columns, Mac window chrome */}
      <div className="mac-chrome">
        <div className="g-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', border: 'none' }}>
          {filtered.map(p => (
            <ProjectCard key={p.title} project={p} onClick={() => setSelected(p)} />
          ))}
        </div>
      </div>
      {/* Case study drawer — rendered by CaseStudy component */}
      <CaseStudy project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
