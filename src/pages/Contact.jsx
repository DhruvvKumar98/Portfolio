import { useState } from 'react';
import profile from '../data/profile.js';
import Btn from '../components/Btn.jsx';
const LINKS = [
  { label: 'Email',     value: 'dhruvvkumar98@gmail.com',             href: `mailto:${profile.links?.email}`, copy: true },
  { label: 'LinkedIn',  value: 'linkedin.com/in/dhruv-kumar-a54a2916b', href: profile.links?.linkedin },
  { label: 'GitHub',    value: 'github.com/DhruvvKumar98',               href: profile.links?.github },
  { label: 'Portfolio', value: 'dhruvvkumar98.github.io/Portfolio',      href: 'https://dhruvvkumar98.github.io/Portfolio' },
];
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = v => navigator.clipboard.writeText(v)
    .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  return (
    <div className="page" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="sec-header">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <span className="sec-num">06</span>
          <h1 className="sec-title">Contact</h1>
        </div>
      </div>
      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '3rem' }}>
        <div>
          <p className="font-display font-semibold text-ink leading-tight"
             style={{ fontSize: 'var(--fs-h1)', marginBottom: '1rem' }}>
            Open to BA and DA roles at Berlin companies.
          </p>
          <p className="text-muted leading-relaxed" style={{ fontSize: 'var(--fs-sm)', fontWeight: 300, marginBottom: '2rem' }}>
            Available immediately. German B1 → B2.
            Job Seeker Visa (§20 AufenthG). Let's talk.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Btn href={profile.resumeUrl} variant="gold" download>Download CV</Btn>
            <Btn href="/resume">View Resume</Btn>
          </div>
        </div>
        <div className="mac-chrome">
          <div className="g-grid" style={{ border: 'none' }}>
          {LINKS.map(link => (
            <div key={link.label} style={{ display: 'flex', justifyContent: 'space-between',
                                           alignItems: 'center', padding: '1.1rem 1.25rem' }}>
              <div>
                <div className="label" style={{ marginBottom: '0.25rem' }}>{link.label}</div>
                <div className="text-ink" style={{ fontSize: 'var(--fs-sm)', fontWeight: 300 }}>{link.value}</div>
              </div>
              {link.copy ? (
                <button onClick={() => copy(profile.links?.email)}
                  className="font-mono text-muted hover:text-gold transition-colors"
                  style={{ fontSize: 'var(--fs-xs)', letterSpacing: '0.1em', textTransform: 'uppercase',
                           background: 'none', border: 'none', cursor: 'pointer' }}>
                  {copied ? 'copied ✓' : 'copy'}
                </button>
              ) : (
                <a href={link.href} target="_blank" rel="noopener noreferrer"
                   className="font-mono text-muted hover:text-gold transition-colors"
                   style={{ fontSize: 'var(--fs-xs)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  open ↗
                </a>
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
