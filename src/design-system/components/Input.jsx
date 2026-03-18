import React from 'react';

/**
 * Input — Form input field with label and error support.
 * 
 * @param {Object} props
 * @param {'default'|'compact'} [props.size='default'] - Size variant
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.value] - Input value
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.label] - Label text
 * @param {string} [props.error] - Error message
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.type='text'] - Input type
 */
export function Input({
  size = 'default',
  placeholder,
  value,
  onChange,
  label,
  error,
  className = '',
  type = 'text',
  ...rest
}) {
  const inputId = rest.id || `sw-input-${label?.replace(/\s+/g, '-').toLowerCase() || Math.random().toString(36).slice(2)}`;

  const wrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)',
    fontFamily: 'var(--font-body)',
  };

  const labelStyles = {
    fontSize: 'var(--text-small)',
    lineHeight: 'var(--text-small-lh)',
    fontWeight: 500,
    color: 'var(--text-secondary)',
  };

  const inputStyles = {
    height: size === 'compact' ? '36px' : '40px',
    padding: '0 var(--space-3)',
    backgroundColor: 'var(--surface-0)',
    border: `1px solid ${error ? 'var(--color-error)' : 'var(--surface-3)'}`,
    borderRadius: 'var(--radius-button)',
    fontSize: 'var(--text-body)',
    lineHeight: 'var(--text-body-lh)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    transition: `border-color var(--transition-micro) ease`,
    outline: 'none',
    width: '100%',
  };

  const errorStyles = {
    fontSize: 'var(--text-small)',
    lineHeight: 'var(--text-small-lh)',
    color: 'var(--color-error)',
  };

  const handleFocus = (e) => {
    if (!error) {
      e.currentTarget.style.borderColor = 'var(--color-primary)';
      e.currentTarget.style.outline = '2px solid var(--color-primary)';
      e.currentTarget.style.outlineOffset = '2px';
    }
  };

  const handleBlur = (e) => {
    e.currentTarget.style.borderColor = error ? 'var(--color-error)' : 'var(--surface-3)';
    e.currentTarget.style.outline = 'none';
  };

  return React.createElement('div', { style: wrapperStyles, className },
    label && React.createElement('label', {
      htmlFor: inputId,
      style: labelStyles,
    }, label),
    React.createElement('input', {
      id: inputId,
      type,
      placeholder,
      value,
      onChange,
      style: inputStyles,
      onFocus: handleFocus,
      onBlur: handleBlur,
      'aria-invalid': error ? 'true' : undefined,
      'aria-describedby': error ? `${inputId}-error` : undefined,
      ...rest,
    }),
    error && React.createElement('span', {
      id: `${inputId}-error`,
      role: 'alert',
      style: errorStyles,
    }, error),
  );
}

export default Input;
