import React from 'react';

export function Input({ size = 'default', placeholder, value, onChange, label, error, className = '', type = 'text', ...rest }) {
  const inputId = rest.id || `sw-input-${Math.random().toString(36).slice(2)}`;
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', fontFamily: 'var(--font-body)' }, className },
    label && React.createElement('label', { htmlFor: inputId, style: { fontSize: 'var(--text-small)', fontWeight: 500, color: 'var(--text-secondary)' } }, label),
    React.createElement('input', {
      id: inputId, type, placeholder, value, onChange,
      style: { height: size === 'compact' ? '36px' : '40px', padding: '0 var(--space-3)', backgroundColor: 'var(--surface-0)', border: `1px solid ${error ? 'var(--color-error)' : 'var(--surface-3)'}`, borderRadius: 'var(--radius-button)', fontSize: 'var(--text-body)', color: 'var(--text-primary)', outline: 'none', width: '100%' },
      ...rest,
    }),
    error && React.createElement('span', { style: { fontSize: 'var(--text-small)', color: 'var(--color-error)' } }, error)
  );
}
export default Input;
