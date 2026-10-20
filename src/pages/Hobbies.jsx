import { useEffect, useState } from 'react';

export default function Hobbies() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const start = new Date('2023-11-01');
    const diff = Math.floor((new Date() - start) / 86400000);
    setDays(diff);
  }, []);

  return (
    <div className="page" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="sec-header">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <span className="sec-num">07</span>
          <h1 className="sec-title">Human</h1>
        </div>
        <span className="font-mono text-muted" style={{ fontSize: 'var(--fs-xs)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          The person behind the CV
        </span>
      </div>

      <div className="mac-chrome">
      <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', background: 'var(--c-paper-3)' }}>

        {/* Berlin counter — wide */}
        <div style={{
          gridColumn: 'span 2',
          background: 'var(--c-paper)',
          padding: '28px',
          cursor: 'default',
          transition: 'background var(--t-base)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-paper-2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-paper)'; }}
        >
          <div className="label" style={{ marginBottom: '12px' }}>Currently based</div>
          <div className="font-display font-bold" style={{ fontSize: '3rem', color: 'var(--c-gold)', lineHeight: '1', marginBottom: '4px' }}>{days}</div>
          <div className="font-mono" style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-gold)', marginBottom: '14px', letterSpacing: '0.08em' }}>days in Berlin</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '7px', height: '7px', background: 'var(--c-gold)',
              animation: 'pulse 1.5s infinite',
            }} />
            <span className="text-muted" style={{ fontSize: 'var(--fs-xs)' }}>Still exploring. Still finding new corners.</span>
          </div>
        </div>

        {/* Football */}
        <div style={{
          background: 'var(--c-paper)',
          padding: '28px',
          cursor: 'default',
          transition: 'background var(--t-base)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-paper-2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-paper)'; }}
        >
          <div className="label" style={{ marginBottom: '12px' }}>Sport</div>
          <div style={{ fontSize: '28px', marginBottom: '10px' }}>⚽</div>
          <div className="font-display font-semibold text-ink" style={{ fontSize: 'var(--fs-h2)', marginBottom: '6px' }}>Football</div>
          <div className="text-muted" style={{ fontSize: 'var(--fs-sm)', fontWeight: 300 }}>Weak knee. Still playing. No regrets.</div>
          <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{ width: '8px', height: '8px', background: 'var(--c-gold)' }} />
            ))}
          </div>
        </div>

        {/* Chaos / ADHD */}
        <div style={{
          background: 'var(--c-ink-2)',
          padding: '28px',
          cursor: 'default',
          transition: 'background var(--t-base)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-ink-3)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-ink-2)'; }}
        >
          <div className="label" style={{ marginBottom: '12px' }}>Mode</div>
          <div style={{ fontSize: '28px', marginBottom: '10px' }}>⚡</div>
          <div className="font-display font-semibold" style={{ fontSize: 'var(--fs-h2)', color: 'var(--c-ink)', marginBottom: '6px' }}>Thrives in chaos</div>
          <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)', fontWeight: 300, lineHeight: 1.65 }}>Lightly undiagnosed ADHD. Endless energy around people. Needs constant new input.</div>
        </div>

        {/* Manga — tall */}
        <div style={{
          gridRow: 'span 2',
          background: 'var(--c-paper)',
          padding: '28px',
          cursor: 'default',
          transition: 'background var(--t-base)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-paper-2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-paper)'; }}
        >
          <div className="label" style={{ marginBottom: '12px' }}>Reading</div>
          <div style={{ fontSize: '28px', marginBottom: '10px' }}>📖</div>
          <div className="font-display font-semibold text-ink" style={{ fontSize: 'var(--fs-h2)', marginBottom: '6px' }}>Manga & Stories</div>
          <div className="text-muted" style={{ fontSize: 'var(--fs-sm)', fontWeight: 300, lineHeight: 1.65, marginBottom: '14px' }}>Less interested in what's told. More in how it's told.</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
            {['Narrative', 'Structure', 'Perspective'].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <div className="font-mono" style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-gold)', lineHeight: 1.7, fontStyle: 'italic' }}>
            "That instinct bleeds into how I think about data too."
          </div>
        </div>

        {/* Three friend groups — wide dark */}
        <div style={{
          gridColumn: 'span 2',
          background: 'var(--c-ink-2)',
          padding: '28px',
          cursor: 'default',
          transition: 'background var(--t-base)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-ink-3)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-ink-2)'; }}
        >
          <div className="label" style={{ marginBottom: '12px' }}>Social life</div>
          <div className="font-display font-semibold" style={{ fontSize: 'var(--fs-h2)', color: 'var(--c-ink)', marginBottom: '16px' }}>Three friend groups. All different vibes.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { text: 'Expats — international chaos crew' },
              { text: 'Indians — home away from home' },
              { text: 'Germans — book appointments to meet (with love)' },
            ].map(f => (
              <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '6px', height: '6px', background: 'var(--c-gold)', flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)', fontWeight: 300 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Ethics & Enablement */}
        <div style={{
          background: 'var(--c-paper)',
          padding: '28px',
          cursor: 'default',
          transition: 'background var(--t-base)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-paper-2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-paper)'; }}
        >
          <div className="label" style={{ marginBottom: '12px' }}>Conviction</div>
          <div style={{ fontSize: '28px', marginBottom: '10px' }}>🤖</div>
          <div className="font-display font-semibold text-ink" style={{ fontSize: 'var(--fs-h2)', marginBottom: '6px' }}>AI Ethics & Enablement</div>
          <div className="text-muted" style={{ fontSize: 'var(--fs-sm)', fontWeight: 300, lineHeight: 1.65 }}>AI should augment, not replace. Every brief I get is really about process clarity first.</div>
        </div>

        {/* German learning — wide */}
        <div style={{
          gridColumn: 'span 2',
          background: 'var(--c-ink-2)',
          padding: '28px',
          cursor: 'default',
          transition: 'background var(--t-base)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-ink-3)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-ink-2)'; }}
        >
          <div className="label" style={{ marginBottom: '12px' }}>Language</div>
          <div className="font-display font-semibold" style={{ fontSize: 'var(--fs-h2)', color: 'var(--c-ink)', marginBottom: '8px' }}>German B1 → B2</div>
          <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)', fontWeight: 300, lineHeight: 1.65 }}>
            Learning German shapes how you think about directness, bureaucracy, and what "professional" means in a culture that books appointments to have coffee. Advancing to B2, one Anmeldung at a time.
          </div>
          <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
            {['B1','→','B2'].map((s,i) => (
              <span key={i} className="font-display font-bold" style={{ fontSize: '0.65rem', color: i === 2 ? 'var(--c-gold)' : 'var(--c-muted)' }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Semiconductors */}
        <div style={{
          background: 'var(--c-paper)',
          padding: '28px',
          cursor: 'default',
          transition: 'background var(--t-base)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-paper-2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-paper)'; }}
        >
          <div className="label" style={{ marginBottom: '12px' }}>Nerd interest</div>
          <div style={{ fontSize: '28px', marginBottom: '10px' }}>⚡</div>
          <div className="font-display font-semibold text-ink" style={{ fontSize: 'var(--fs-h2)', marginBottom: '6px' }}>Semiconductors</div>
          <div className="text-muted" style={{ fontSize: 'var(--fs-sm)', fontWeight: 300 }}>SME chips, fab economics, the geopolitics of silicon. Endlessly fascinating supply chains.</div>
        </div>

        {/* Cyberdecks */}
        <div style={{
          background: 'var(--c-paper)',
          padding: '28px',
          cursor: 'default',
          transition: 'background var(--t-base)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-paper-2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-paper)'; }}
        >
          <div className="label" style={{ marginBottom: '12px' }}>Aesthetic</div>
          <div style={{ fontSize: '28px', marginBottom: '10px' }}>💻</div>
          <div className="font-display font-semibold text-ink" style={{ fontSize: 'var(--fs-h2)', marginBottom: '6px' }}>Cyberdecks</div>
          <div className="text-muted" style={{ fontSize: 'var(--fs-sm)', fontWeight: 300 }}>Custom portable computers, retro-future design. The intersection of function and personality.</div>
        </div>

        {/* Gratitude — wide */}
        <div style={{
          gridColumn: 'span 2',
          background: 'var(--c-paper)',
          padding: '28px',
          cursor: 'default',
          transition: 'background var(--t-base)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-paper-2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-paper)'; }}
        >
          <div className="label" style={{ marginBottom: '12px' }}>Life in Berlin</div>
          <div className="font-display font-semibold text-ink" style={{ fontSize: 'var(--fs-h2)', marginBottom: '8px' }}>Overwhelmed · Delighted · Exhausted · Excited</div>
          <div className="text-muted" style={{ fontSize: 'var(--fs-sm)', fontWeight: 300, lineHeight: 1.7 }}>
            Sometimes all in the same week. None of it has ever felt like too much. Every step moves toward something. Grateful for all of it.
          </div>
        </div>

        {/* What I'm building toward — full width */}
        <div style={{
          gridColumn: 'span 4',
          background: 'var(--c-ink-2)',
          padding: '28px',
          cursor: 'default',
        }}>
          <div className="label" style={{ marginBottom: '16px' }}>What I'm building toward</div>
          <div className="building-toward" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr 1.8fr', gap: '2.5rem', alignItems: 'start' }}>
            <div>
              <div className="font-display font-semibold" style={{ fontSize: 'var(--fs-h2)', color: 'var(--c-ink)', lineHeight: 1.3, marginBottom: '10px' }}>
                Creator.<br/>Researcher.<br/>Problem finder.
              </div>
              <div className="font-mono" style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-faint)', lineHeight: 1.7, marginTop: '10px' }}>
                The projects are not just portfolio pieces. They're how I think.
              </div>
            </div>
            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)', fontWeight: 300, lineHeight: 1.75 }}>
              Most of the work in this portfolio starts with the same observation: one side of a market has sophisticated tools and the other side has a spreadsheet. Zalando has machine learning models for return rate prediction. Their seller partners have a spreadsheet. That asymmetry is what's interesting — not just as a business problem, but as a design problem. Who builds for the other side?
            </div>
            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-muted)', fontWeight: 300, lineHeight: 1.75 }}>
              Ideation isn't a phase before the real work. It is the real work. Finding the right problem, framing it so a non-technical operator can act on it, understanding what they actually need to see — that's where most of the time goes. The code is just how you ship the answer.
              <div style={{ marginTop: '14px', color: 'var(--c-gold)', fontSize: 'var(--fs-sm)', fontStyle: 'italic' }}>
                "Why doesn't this exist yet?" is the question driving all of it.
              </div>
            </div>
          </div>
        </div>

      </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}
