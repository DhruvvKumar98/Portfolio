import writing from '../data/writing.js';

export default function Writing() {
  return (
    <div className="page" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="sec-header">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <span className="sec-num">08</span>
          <h1 className="sec-title">Things I Write</h1>
        </div>
        <span className="font-mono text-muted" style={{ fontSize: 'var(--fs-xs)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Newsletter · LinkedIn · Thinking out loud
        </span>
      </div>

      <p className="text-muted leading-relaxed" style={{ maxWidth: '60ch', marginBottom: '2.5rem', fontWeight: 300 }}>
        I write about AI strategy, business analysis, building tools for underserved markets,
        and figuring out life in Berlin. Sometimes all in the same post.
      </p>

      <div className="mac-chrome">
        <div className="g-grid" style={{ border: 'none' }}>
          {writing.map((post, i) => (
            <a key={i} href={post.url} target={post.url !== '#' ? '_blank' : undefined}
               rel="noopener noreferrer"
               style={{
                 padding: '2rem', display: 'block', textDecoration: 'none', color: 'inherit',
                 transition: 'background var(--t-base)', cursor: post.url === '#' ? 'default' : 'pointer',
               }}
               onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-paper-2)'; }}
               onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-paper)'; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                <span className="label">{post.source}</span>
                <span className="font-mono text-faint" style={{ fontSize: 'var(--fs-xs)' }}>{post.date}</span>
              </div>
              <h3 className="font-display font-bold text-ink leading-tight"
                  style={{ fontSize: 'var(--fs-h2)', marginBottom: '0.75rem' }}>
                {post.title}
              </h3>
              <p className="text-muted leading-relaxed" style={{ fontSize: 'var(--fs-sm)', fontWeight: 300, marginBottom: '1rem' }}>
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {post.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </a>
          ))}
        </div>
      </div>

      <p className="font-mono text-muted" style={{ fontSize: 'var(--fs-xs)', marginTop: '2rem', letterSpacing: '0.08em' }}>
        More coming. Subscribe links arriving soon.
      </p>
    </div>
  );
}
