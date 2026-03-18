import React from 'react';

/**
 * XPBar — Gamification progress bar with level display.
 * 
 * @param {Object} props
 * @param {number} props.currentXP - Current experience points
 * @param {number} props.maxXP - Maximum experience points for current level
 * @param {number} props.level - Current level number
 * @param {string} [props.className] - Additional CSS classes
 */
export function XPBar({
  currentXP = 0,
  maxXP = 100,
  level = 1,
  className = '',
  ...rest
}) {
  const percentage = Math.min(Math.max((currentXP / maxXP) * 100, 0), 100);

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
    fontFamily: 'var(--font-body)',
    width: '100%',
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  };

  const levelStyles = {
    fontSize: 'var(--text-small)',
    lineHeight: 'var(--text-small-lh)',
    fontWeight: 600,
    color: 'var(--text-primary)',
  };

  const xpCountStyles = {
    fontSize: 'var(--text-caption)',
    lineHeight: 'var(--text-caption-lh)',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-mono)',
  };

  const trackStyles = {
    width: '100%',
    height: '12px',
    backgroundColor: 'var(--surface-2)',
    borderRadius: 'var(--radius-button)',
    overflow: 'hidden',
    position: 'relative',
  };

  const fillStyles = {
    height: '100%',
    width: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: 'var(--radius-button)',
    transform: `scaleX(${percentage / 100})`,
    transformOrigin: 'left',
    transition: 'transform 600ms ease-out',
    position: 'relative',
    boxShadow: percentage > 0 ? '0 0 6px var(--color-primary)' : 'none',
  };

  return React.createElement('div', {
    style: containerStyles,
    className,
    role: 'progressbar',
    'aria-valuenow': currentXP,
    'aria-valuemin': 0,
    'aria-valuemax': maxXP,
    'aria-label': `Level ${level}: ${currentXP} of ${maxXP} XP`,
    ...rest,
  },
    React.createElement('div', { style: headerStyles },
      React.createElement('span', { style: levelStyles }, `Level ${level}`),
      React.createElement('span', { style: xpCountStyles }, `${currentXP} / ${maxXP} XP`),
    ),
    React.createElement('div', { style: trackStyles },
      React.createElement('div', { style: fillStyles }),
    ),
  );
}

export default XPBar;
