import React from 'react';

export function XPBar({ currentXP = 0, maxXP = 100, level = 1, className = '', ...rest }) {
  const percentage = Math.min(Math.max((currentXP / maxXP) * 100, 0), 100);
  return React.createElement('div', {
    style: { display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontFamily: 'var(--font-body)', width: '100%' },
    className, role: 'progressbar', 'aria-valuenow': currentXP, 'aria-valuemin': 0, 'aria-valuemax': maxXP, 'aria-label': `Level ${level}: ${currentXP} of ${maxXP} XP`, ...rest,
  },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' } },
      React.createElement('span', { style: { fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--text-primary)' } }, `Level ${level}`),
      React.createElement('span', { style: { fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' } }, `${currentXP} / ${maxXP} XP`)
    ),
    React.createElement('div', { style: { width: '100%', height: '12px', backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius-button)', overflow: 'hidden' } },
      React.createElement('div', { style: { height: '100%', width: `${percentage}%`, backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-button)', transition: 'width 600ms ease-out', boxShadow: percentage > 0 ? '0 0 6px var(--color-primary)' : 'none' } })
    )
  );
}
export default XPBar;
