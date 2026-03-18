import React from 'react';

/**
 * Card — Content container with portfolio (light) and dashboard (dark) variants.
 * 
 * @param {Object} props
 * @param {'portfolio'|'dashboard'} [props.variant='dashboard'] - Visual variant
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler (makes card interactive)
 */
export function Card({
  variant = 'dashboard',
  children,
  className = '',
  onClick,
  ...rest
}) {
  const isPortfolio = variant === 'portfolio';

  const baseStyles = {
    backgroundColor: 'var(--surface-1)',
    border: '1px solid var(--surface-3)',
    fontFamily: 'var(--font-body)',
    cursor: onClick ? 'pointer' : 'default',
    borderRadius: isPortfolio ? 'var(--radius-portfolio-card)' : 'var(--radius-dashboard-card)',
    padding: isPortfolio ? 'var(--space-6)' : 'var(--space-5)',
    boxShadow: isPortfolio ? '0 1px 3px rgba(0,0,0,0.04)' : 'none',
    transition: isPortfolio
      ? 'transform var(--transition-micro) var(--ease-out), box-shadow var(--transition-micro) var(--ease-out)'
      : 'border-color var(--transition-micro) var(--ease-out)',
  };

  const handleMouseEnter = (e) => {
    if (isPortfolio) {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
    } else {
      e.currentTarget.style.borderColor = 'var(--text-tertiary)';
    }
  };

  const handleMouseLeave = (e) => {
    if (isPortfolio) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
    } else {
      e.currentTarget.style.borderColor = 'var(--surface-3)';
    }
  };

  return React.createElement('div', {
    style: baseStyles,
    className,
    onClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    role: onClick ? 'button' : undefined,
    tabIndex: onClick ? 0 : undefined,
    ...rest,
  }, children);
}

export default Card;
