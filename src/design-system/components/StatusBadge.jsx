import React from 'react';

/**
 * StatusBadge — Status indicator pill with dot and label.
 * 
 * @param {Object} props
 * @param {'running'|'completed'|'attention'|'failed'|'disabled'|'scheduled'|'idle'} props.status - Status type
 * @param {string} props.label - Badge text label
 * @param {string} [props.className] - Additional CSS classes
 */
export function StatusBadge({
  status = 'running',
  label,
  className = '',
  ...rest
}) {
  const statusConfig = {
    running: {
      color: 'var(--color-info)',
      bgColor: 'color-mix(in srgb, var(--color-info) 12%, transparent)',
    },
    completed: {
      color: 'var(--color-success)',
      bgColor: 'color-mix(in srgb, var(--color-success) 12%, transparent)',
    },
    attention: {
      color: 'var(--color-warning)',
      bgColor: 'color-mix(in srgb, var(--color-warning) 12%, transparent)',
    },
    failed: {
      color: 'var(--color-error)',
      bgColor: 'color-mix(in srgb, var(--color-error) 12%, transparent)',
    },
    disabled: {
      color: 'var(--text-tertiary)',
      bgColor: 'color-mix(in srgb, var(--text-tertiary) 12%, transparent)',
    },
    scheduled: {
      color: 'var(--text-secondary)',
      bgColor: 'color-mix(in srgb, var(--text-secondary) 12%, transparent)',
    },
    idle: {
      color: 'var(--text-tertiary)',
      bgColor: 'color-mix(in srgb, var(--text-tertiary) 12%, transparent)',
    },
  };

  const config = statusConfig[status] || statusConfig.running;

  const badgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: '4px 10px',
    borderRadius: 'var(--radius-button)',
    backgroundColor: config.bgColor,
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-caption)',
    lineHeight: 'var(--text-caption-lh)',
    fontWeight: 500,
    color: config.color,
    whiteSpace: 'nowrap',
  };

  const dotStyles = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: config.color,
    flexShrink: 0,
    animation: status === 'running' ? 'sw-pulse-dot 2s ease-in-out infinite' : 'none',
  };

  return React.createElement('span', {
    style: badgeStyles,
    className,
    role: 'status',
    'aria-label': `${label || status}: ${status}`,
    ...rest,
  },
    React.createElement('span', {
      style: dotStyles,
      'aria-hidden': 'true',
    }),
    label || status.charAt(0).toUpperCase() + status.slice(1),
  );
}

export default StatusBadge;
