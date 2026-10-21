export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:      'var(--c-ink)',
        'ink-2':  'var(--c-ink-2)',
        'ink-3':  'var(--c-ink-3)',
        paper:    'var(--c-paper)',
        'paper-2':'var(--c-paper-2)',
        'paper-3':'var(--c-paper-3)',
        gold:     'var(--c-gold)',
        'gold-2': 'var(--c-gold-2)',
        muted:    'var(--c-muted)',
        faint:    'var(--c-faint)',
      },
      fontFamily: {
        sans:    ['var(--f-body)'],
        display: ['var(--f-display)'],
        mono:    ['var(--f-mono)'],
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
        lg: 'var(--radius-lg)',
      },
    },
  },
  plugins: [],
};
