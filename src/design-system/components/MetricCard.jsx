import React from 'react';

/**
 * MetricCard — KPI display card for dashboards.
 * 
 * @param {Object} props
 * @param {string} props.label - Metric label
 * @param {string|number} props.value - Metric value
 * @param {{direction: 'up'|'down'|'neutral', value: string}} [props.trend] - Trend indicator
 * @param {string} [props.className] - Additional CSS classes
 */
export function MetricCard({
  label,
  value,
  trend,
  className = '',
  ...rest
}) {
  const cardStyles = {
    backgroundColor: 'var(--surface-1)',
    border: '1px solid var(--surface-3)',
    borderRadius: 'var(--radius-dashboard-card)',
    padding: 'var(--space-5)',
    fontFamily: 'var(--font-body)',
    transition: 'border-color var(--transition-micro) var(--ease-out)',
  };

  const labelStyles = {
    fontSize: 'var(--text-small)',
    lineHeight: 'var(--text-small-lh)',
    color: 'var(--text-secondary)',
    fontWeight: 400,
    marginBottom: 'var(--space-2)',
  };

  const valueStyles = {
    fontSize: 'var(--text-h3)',
    lineHeight: 'var(--text-h3-lh)',
    color: 'var(--text-primary)',
    fontWeight: 600,
    fontVariantNumeric: 'tabular-nums lining-nums',
  };

  const trendColors = {
    up: 'var(--color-success)',
    down: 'var(--color-error)',
    neutral: 'var(--text-tertiary)',
  };

  const trendArrows = {
    up: '▲',
    down: '▼',
    neutral: '—',
  };

  const trendStyles = trend ? {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: 'var(--text-caption)',
    lineHeight: 'var(--text-caption-lh)',
    color: trendColors[trend.direction] || trendColors.neutral,
    marginTop: 'var(--space-2)',
    fontWeight: 500,
  } : null;

  return React.createElement('div', {
    style: cardStyles,
    className,
    onMouseEnter: (e) => { e.currentTarget.style.borderColor = 'var(--text-tertiary)'; },
    onMouseLeave: (e) => { e.currentTarget.style.borderColor = 'var(--surface-3)'; },
    ...rest,
  },
    React.createElement('div', { style: labelStyles }, label),
    React.createElement('div', { style: valueStyles }, value),
    trend && React.createElement('div', { style: trendStyles },
      React.createElement('span', { 'aria-hidden': 'true' }, trendArrows[trend.direction]),
      trend.value,
    ),
  );
}

export default MetricCard;
