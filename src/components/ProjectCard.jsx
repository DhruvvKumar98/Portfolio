// To change how ALL project cards look: edit this file only.
// Content comes from src/data/projects.js — never edit content here.
export default function ProjectCard({ project, onClick }) {
  return (
    <div
      className="bg-paper p-8 flex flex-col cursor-pointer group"
      style={{ transition: 'background var(--t-base)' }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--c-paper-2)'}
      onMouseLeave={e => e.currentTarget.style.background = 'var(--c-paper)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span className="label">{project.category}</span>
        <span className="font-mono text-xs text-muted"
              style={{ transition: 'color var(--t-base)' }}
              onMouseEnter={e => e.target.style.color = 'var(--c-gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--c-muted)'}>↗</span>
      </div>
      <h3 className="font-display font-bold text-ink mb-3 leading-tight"
          style={{ fontSize: 'var(--fs-h2)', transition: 'color var(--t-base)' }}>
        {project.title}
      </h3>
      {/* Problem statement — the hook */}
      {project.problem && (
        <p className="text-muted leading-relaxed mb-4"
           style={{ fontSize: 'var(--fs-sm)', fontWeight: 300, fontStyle: 'italic' }}>
          {project.problem.length > 160 ? project.problem.substring(0, 160) + '...' : project.problem}
        </p>
      )}
      {/* Outcome — what was built */}
      <p className="text-muted leading-relaxed flex-1 mb-6"
         style={{ fontSize: 'var(--fs-sm)', fontWeight: 300 }}>
        {project.outcome.length > 140 ? project.outcome.substring(0, 140) + '...' : project.outcome}
      </p>
      {/* Skill breakdown bars — values from skillsUsage in projects.js */}
      {project.skillsUsage && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {project.skillsUsage.map(skill => (
            <div key={skill.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span className="font-mono text-muted" style={{ fontSize: 'var(--fs-tag)' }}>{skill.name}</span>
                <span className="font-mono text-faint" style={{ fontSize: 'var(--fs-tag)' }}>{skill.value}%</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${skill.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Action buttons — Try It + View Code */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
             onClick={e => e.stopPropagation()}
             className="btn btn-gold"
             style={{ fontSize: 'var(--fs-tag)', padding: '0.5rem 1rem', letterSpacing: '0.1em' }}>
            Try it ↗
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
             onClick={e => e.stopPropagation()}
             className="btn btn-ink"
             style={{ fontSize: 'var(--fs-tag)', padding: '0.5rem 1rem', letterSpacing: '0.1em' }}>
            View code ↗
          </a>
        )}
      </div>
      {/* Tech tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
        {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  );
}
