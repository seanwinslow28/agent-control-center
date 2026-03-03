import React from 'react';

export function SkeletonLoader({ variant = 'text', lines = 3, className = '', ...rest }) {
  const pulseStyle = { backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius-button)', animation: 'sw-skeleton-pulse 1.5s ease-in-out infinite' };
  if (variant === 'text') {
    const widths = ['100%', '80%', '60%', '90%', '70%', '50%'];
    return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: '100%' }, className, role: 'status', 'aria-label': 'Loading content', ...rest },
      Array.from({ length: lines }, (_, i) => React.createElement('div', { key: i, style: { ...pulseStyle, height: '16px', width: widths[i % widths.length] } }))
    );
  }
  if (variant === 'card') return React.createElement('div', { style: { ...pulseStyle, borderRadius: 'var(--radius-dashboard-card)', height: '160px', width: '100%' }, className, role: 'status', 'aria-label': 'Loading card', ...rest });
  if (variant === 'avatar') return React.createElement('div', { style: { ...pulseStyle, width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0 }, className, role: 'status', 'aria-label': 'Loading avatar', ...rest });
  if (variant === 'table-row') return React.createElement('div', { style: { display: 'flex', gap: 'var(--space-4)', padding: '12px 0', borderBottom: '1px solid var(--surface-3)', width: '100%' }, className, role: 'status', 'aria-label': 'Loading table row', ...rest },
    React.createElement('div', { style: { ...pulseStyle, height: '16px', width: '25%' } }),
    React.createElement('div', { style: { ...pulseStyle, height: '16px', width: '35%' } }),
    React.createElement('div', { style: { ...pulseStyle, height: '16px', width: '20%' } }),
    React.createElement('div', { style: { ...pulseStyle, height: '16px', width: '20%' } })
  );
  return null;
}
export default SkeletonLoader;
