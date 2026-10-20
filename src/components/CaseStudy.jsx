// To change how the case study panel looks: edit this file only.
// Content comes from src/data/projects.js — never edit content here.
// To add a new case study section: add a new { label, key } to the SECTIONS array.
const SECTIONS = [
  { label: '1. Context',           key: 'context'           },
  { label: '2. Business question', key: 'business_question' },
  { label: '3. Data',              key: 'data'              },
  { label: '4. Approach',          key: 'approach'          },
  { label: '6. Recommendation',    key: 'recommendation'    },
  { label: '7. Validation',        key: 'validation'        },
];
export default function CaseStudy({ project, onClose }) {
  if (!project) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50,
                  display: 'flex', background: 'rgba(10,10,10,0.85)' }}
         onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ marginLeft: 'auto', background: 'var(--c-paper)',
                    width: '100%', maxWidth: '42rem',
                    height: '100%', overflowY: 'auto', padding: '2.5rem',
                    borderLeft: 'var(--b-light)' }}>
        <button onClick={onClose}
          className="font-mono text-muted hover:text-gold transition-colors"
          style={{ fontSize: 'var(--fs-xs)', letterSpacing: '0.12em',
                   textTransform: 'uppercase', display: 'block', marginBottom: '2.5rem' }}>
          ← close
        </button>
        <span className="label">{project.category}</span>
        <h2 className="font-display font-bold text-ink leading-tight"
            style={{ fontSize: 'var(--fs-h1)', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          {project.title}
        </h2>
        {/* Pixel underline */}
        <div style={{ width: '12rem', height: '3px', background: 'var(--c-gold)', marginBottom: '2rem' }} />
        {/* Live link if available */}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
             className="btn btn-gold" style={{ display: 'inline-block', marginBottom: '2rem' }}>
            Open live tool ↗
          </a>
        )}
        {/* Standard sections */}
        {SECTIONS.map(({ label, key }) => project[key] && (
          <div key={key} style={{ marginBottom: '2rem' }}>
            <div className="label" style={{ marginBottom: '0.75rem' }}>{label}</div>
            <p className="text-muted leading-relaxed"
               style={{ fontSize: 'var(--fs-sm)', fontWeight: 300 }}>{project[key]}</p>
          </div>
        ))}
        {/* Insights list */}
        {project.insights && (
          <div style={{ marginBottom: '2rem' }}>
            <div className="label" style={{ marginBottom: '0.75rem' }}>5. Key insights</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {project.insights.map((ins, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.75rem',
                                     fontSize: 'var(--fs-sm)', fontWeight: 300,
                                     color: 'var(--c-muted)', lineHeight: 1.65 }}>
                  <span className="text-gold" style={{ flexShrink: 0, marginTop: '0.125rem' }}>—</span>
                  <span>{ins}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Artifact links */}
        {project.artifacts && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
                        paddingTop: '2rem', borderTop: 'var(--b-light)' }}>
            {project.artifacts.map((art, i) => (
              <a key={i} href={art.link} target="_blank" rel="noopener noreferrer"
                 className="btn btn-gold">{art.label} ↗</a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
