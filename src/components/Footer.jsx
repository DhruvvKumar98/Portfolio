import profile from '../data/profile.js';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '2px solid var(--c-paper-3)',
      padding: '2.5rem var(--pad-x)',
      marginTop: '4rem',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="font-display font-bold text-ink" style={{ fontSize: 'var(--fs-h2)' }}>
            {profile.name.split(' ').slice(0, 2).join(' ')}
          </span>
          <span className="font-mono text-faint" style={{ fontSize: 'var(--fs-xs)', marginLeft: '1rem' }}>
            Built with pixels and persistence
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer"
             className="font-mono text-muted hover:text-gold transition-colors"
             style={{ fontSize: 'var(--fs-xs)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            GitHub
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer"
             className="font-mono text-muted hover:text-gold transition-colors"
             style={{ fontSize: 'var(--fs-xs)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            LinkedIn
          </a>
          <a href={`mailto:${profile.links.email}`}
             className="font-mono text-muted hover:text-gold transition-colors"
             style={{ fontSize: 'var(--fs-xs)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
