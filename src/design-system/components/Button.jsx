import React from 'react';

export function Button({ variant = 'primary', size = 'default', children, onClick, disabled = false, className = '', ...rest }) {
  const baseStyles = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 'var(--space-2)', borderRadius: 'var(--radius-button)',
    fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)',
    fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1, border: 'none', textDecoration: 'none', whiteSpace: 'nowrap',
    transition: 'background-color var(--transition-micro) ease, color var(--transition-micro) ease',
  };
  const sizeStyles = size === 'compact' ? { padding: '6px 12px' } : { padding: '8px 16px' };
  const variantMap = {
    primary: { backgroundColor: 'var(--color-primary)', color: '#FFFFFF' },
    accent: { backgroundColor: 'var(--color-accent)', color: '#FFFFFF' },
    secondary: { backgroundColor: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--surface-3)' },
    ghost: { backgroundColor: 'transparent', color: 'var(--text-secondary)' },
  };
  return React.createElement('button', {
    style: { ...baseStyles, ...sizeStyles, ...(variantMap[variant] || variantMap.primary) },
    onClick: disabled ? undefined : onClick, disabled, className, ...rest,
  }, children);
}
export default Button;
