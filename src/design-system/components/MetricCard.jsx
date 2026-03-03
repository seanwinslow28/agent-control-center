import React from 'react';

export function MetricCard({ label, value, delta, deltaLabel, className = '', ...rest }) {
  const hasDelta = delta !== undefined && delta !== null;
  const isPositive = hasDelta && delta >= 0;
  return React.createElement('div', {
    style: { backgroundColor: 'var(--surface-1)', border: '1px solid var(--surface-3)', borderRadius: 'var(--radius-dashboard-card)', padding: 'var(--space-5)', fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' },
    className, ...rest,
  },
    React.createElement('span', { style: { fontSize: 'var(--text-small)', color: 'var(--text-secondary)', fontWeight: 500 } }, label),
    React.createElement('span', { style: { fontSize: '28px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2, fontVariantNumeric: 'tabular-nums lining-nums' } }, value),
    hasDelta && React.createElement('span', { style: { fontSize: 'var(--text-small)', color: isPositive ? 'var(--color-success)' : 'var(--color-error)', fontWeight: 500 } },
      `${isPositive ? '+' : ''}${delta}${deltaLabel ? ' ' + deltaLabel : ''}`
    )
  );
}
export default MetricCard;
