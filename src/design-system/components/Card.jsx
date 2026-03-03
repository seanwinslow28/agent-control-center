import React from 'react';

export function Card({ variant = 'dashboard', children, className = '', onClick, ...rest }) {
  const isPortfolio = variant === 'portfolio';
  const baseStyles = {
    backgroundColor: 'var(--surface-1)', border: '1px solid var(--surface-3)',
    fontFamily: 'var(--font-body)', cursor: onClick ? 'pointer' : 'default',
    borderRadius: isPortfolio ? 'var(--radius-portfolio-card)' : 'var(--radius-dashboard-card)',
    padding: isPortfolio ? 'var(--space-6)' : 'var(--space-5)',
    transition: 'border-color var(--transition-micro) var(--ease-out)',
  };
  return React.createElement('div', {
    style: baseStyles, className, onClick,
    role: onClick ? 'button' : undefined,
    tabIndex: onClick ? 0 : undefined, ...rest,
  }, children);
}
export default Card;
