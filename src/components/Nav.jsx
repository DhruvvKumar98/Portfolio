// To add a nav item: add one object to the items array below.
// To change nav colours/fonts: edit src/design/tokens.css only.
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import profile from '../data/profile.js';
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const items = [
    { to: '/',           label: 'Home'       },
    { to: '/experience', label: 'Experience' },
    { to: '/projects',   label: 'Projects'   },
    { to: '/skills',     label: 'Skills'     },
    { to: '/hobbies',    label: 'Human'      },
    { to: '/writing',    label: 'Writing'    },
    { to: '/building',   label: 'Building'   },
    { to: '/contact',    label: 'Contact'    },
  ];
  const linkBase = 'font-mono text-xs tracking-widest uppercase transition-colors';
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-paper border-b border-paper-3' : 'bg-transparent'
    }`}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto',
                    padding: '1.25rem var(--pad-x)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <NavLink to="/"
          className="font-display font-bold text-base tracking-tight text-ink hover:text-gold transition-colors">
          {profile.name.split(' ').slice(0, 2).join(' ')}
        </NavLink>
        <ul className="hidden md:flex gap-8 list-none">
          {items.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? 'text-gold' : 'text-muted hover:text-ink'}`
                }>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button className={`md:hidden ${linkBase} text-muted`} onClick={() => setOpen(!open)}>
          {open ? 'close' : 'menu'}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-paper border-t border-paper-3"
             style={{ padding: '0 var(--pad-x) 1rem' }}>
          {items.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-3 border-b border-paper-3 ${linkBase} ${isActive ? 'text-gold' : 'text-muted'}`
              }>
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
