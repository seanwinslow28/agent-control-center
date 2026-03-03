import React from 'react';

export function StatusBadge({ status = 'running', label, className = '', ...rest }) {
  const statusConfig = {
    running: { color: 'var(--color-info)', bgColor: 'color-mix(in srgb, var(--color-info) 10%, transparent)' },
    completed: { color: 'var(--color-success)', bgColor: 'color-mix(in srgb, var(--color-success) 10%, transparent)' },
    attention: { color: 'var(--color-warning)', bgColor: 'color-mix(in srgb, var(--color-warning) 10%, transparent)' },
    failed: { color: 'var(--color-error)', bgColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)' },
  };
  const config = statusConfig[status] || statusConfig.running;
  return React.createElement('span', {
    style: { display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', padding: '4px 10px', borderRadius: 'var(--radius-button)', backgroundColor: config.bgColor, fontFamily: 'var(--font-body)', fontSize: 'var(--text-caption)', fontWeight: 500, color: config.color, whiteSpace: 'nowrap' },
    className, role: 'status', 'aria-label': `${label || status}: ${status}`, ...rest,
  },
    React.createElement('span', { style: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: config.color, flexShrink: 0, animation: status === 'running' ? 'sw-pulse-dot 2s ease-in-out infinite' : 'none' }, 'aria-hidden': 'true' }),
    label || status.charAt(0).toUpperCase() + status.slice(1)
  );
}
export default StatusBadge;
