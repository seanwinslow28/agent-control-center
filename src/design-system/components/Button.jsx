import React from 'react';

/**
 * Button — Primary interactive element.
 * 
 * @param {Object} props
 * @param {'primary'|'accent'|'secondary'|'ghost'} [props.variant='primary'] - Visual variant
 * @param {'default'|'compact'} [props.size='default'] - Size variant
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} [props.onClick] - Click handler
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.className] - Additional CSS classes
 */
export function Button({
  variant = 'primary',
  size = 'default',
  children,
  onClick,
  disabled = false,
  className = '',
  ...rest
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    borderRadius: 'var(--radius-button)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-small)',
    lineHeight: 'var(--text-small-lh)',
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color var(--transition-micro) ease, border-color var(--transition-micro) ease, color var(--transition-micro) ease',
    outline: 'none',
    border: 'none',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  };

  const sizeStyles = size === 'compact'
    ? { padding: '6px 12px' }
    : { padding: '8px 16px' };

  const variantMap = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: '#FFFFFF',
      border: 'none',
    },
    accent: {
      backgroundColor: 'var(--color-accent)',
      color: '#FFFFFF',
      border: 'none',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--surface-3)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-secondary)',
      border: 'none',
    },
  };

  const variantStyles = variantMap[variant] || variantMap.primary;

  const handleMouseEnter = (e) => {
    if (disabled) return;
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = 'var(--color-primary-muted)';
    } else if (variant === 'accent') {
      e.currentTarget.style.backgroundColor = 'var(--color-accent-muted)';
    } else if (variant === 'secondary') {
      e.currentTarget.style.borderColor = 'var(--text-tertiary)';
    } else if (variant === 'ghost') {
      e.currentTarget.style.color = 'var(--text-primary)';
    }
  };

  const handleMouseLeave = (e) => {
    if (disabled) return;
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = 'var(--color-primary)';
    } else if (variant === 'accent') {
      e.currentTarget.style.backgroundColor = 'var(--color-accent)';
    } else if (variant === 'secondary') {
      e.currentTarget.style.borderColor = 'var(--surface-3)';
    } else if (variant === 'ghost') {
      e.currentTarget.style.color = 'var(--text-secondary)';
    }
  };

  return React.createElement('button', {
    style: { ...baseStyles, ...sizeStyles, ...variantStyles },
    onClick: disabled ? undefined : onClick,
    disabled,
    className,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ...rest,
  }, children);
}

export default Button;
