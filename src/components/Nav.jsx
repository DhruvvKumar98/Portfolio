import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import profile from '../data/profile.js';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/Portfolio/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollItems = [
    { id: 'projects',   label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'status',     label: 'Building' },
    { id: 'writing',    label: 'Writing' },
    { id: 'human',      label: 'Human' },
    { id: 'contact',    label: 'Contact' },
  ];

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const linkStyle = {
    fontFamily: 'var(--f-body)', fontSize: 'var(--fs-xs)', fontWeight: 500,
    letterSpacing: '0.04em', textTransform: 'uppercase',
    color: 'var(--c-muted)', textDecoration: 'none', cursor: 'pointer',
    transition: 'color 0.15s var(--ease)',
    background: 'none', border: 'none', padding: 0,
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all 0.3s var(--ease)',
      background: scrolled ? 'rgba(250,250,250,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--c-paper-3)' : '1px solid transparent',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto',
        padding: '1rem var(--pad-x)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <NavLink to="/" style={{
          fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: '0.7rem',
          color: 'var(--c-ink)', textDecoration: 'none',
          transition: 'color 0.15s var(--ease)',
        }}>
          {profile.name.split(' ').slice(0, 2).join(' ')}
        </NavLink>

        <div className="hidden md:flex" style={{ gap: '2rem', alignItems: 'center' }}>
          {isHome ? (
            scrollItems.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                style={linkStyle}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--c-gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--c-muted)'; }}>
                {label}
              </button>
            ))
          ) : (
            <NavLink to="/" style={linkStyle}>Home</NavLink>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}
          style={{ ...linkStyle, color: 'var(--c-muted)' }}>
          {open ? 'close' : 'menu'}
        </button>
      </div>

      {open && (
        <div className="md:hidden" style={{
          background: 'rgba(250,250,250,0.96)', backdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--c-paper-3)', padding: '0 var(--pad-x) 1rem',
        }}>
          {isHome ? (
            scrollItems.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                style={{ ...linkStyle, display: 'block', padding: '0.75rem 0',
                  borderBottom: '1px solid var(--c-paper-3)', width: '100%', textAlign: 'left' }}>
                {label}
              </button>
            ))
          ) : (
            <NavLink to="/" onClick={() => setOpen(false)}
              style={{ ...linkStyle, display: 'block', padding: '0.75rem 0' }}>
              Home
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}
