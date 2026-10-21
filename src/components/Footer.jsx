import profile from '../data/profile.js';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--c-paper-3)',
      padding: '2rem var(--pad-x)',
      marginTop: '2rem',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: 'var(--fs-xs)', color: 'var(--c-faint)' }}>
          Berlin, {new Date().getFullYear()}
        </span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[
            { label: 'GitHub', href: profile.links.github },
            { label: 'LinkedIn', href: profile.links.linkedin },
            { label: 'Email', href: `mailto:${profile.links.email}` },
          ].map(l => (
            <a key={l.label} href={l.href}
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel={l.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              style={{
                fontFamily: 'var(--f-mono)', fontSize: 'var(--fs-xs)',
                color: 'var(--c-muted)', textDecoration: 'none',
                transition: 'color 0.15s var(--ease)',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--c-gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--c-muted)'; }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
