import React from 'react';

/**
 * Sidebar — Fixed left rail navigation for dashboard layouts.
 * 
 * @param {Object} props
 * @param {Array<{icon?: React.ReactNode, label: string, href?: string, active?: boolean}>} props.items - Nav items
 * @param {boolean} [props.collapsed=false] - Whether sidebar is collapsed to icon-only mode
 * @param {Function} [props.onToggle] - Collapse toggle callback
 * @param {string} [props.className] - Additional CSS classes
 */
export function Sidebar({
  items = [],
  collapsed = false,
  onToggle,
  className = '',
  ...rest
}) {
  const sidebarStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100dvh',
    width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
    backgroundColor: 'var(--surface-1)',
    borderRight: '1px solid var(--surface-3)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'var(--font-body)',
    /* width change is instant — GPU-only rule: never animate width */
    zIndex: 40,
    overflow: 'hidden',
  };

  const navStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)',
    padding: 'var(--space-3)',
    paddingTop: 'var(--space-4)',
    overflowY: 'auto',
    overflowX: 'hidden',
    overscrollBehavior: 'contain',
  };

  const itemStyles = (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    padding: '8px 12px',
    borderRadius: 'var(--radius-button)',
    fontSize: 'var(--text-small)',
    lineHeight: 'var(--text-small-lh)',
    fontWeight: active ? 500 : 400,
    color: active ? 'var(--color-primary)' : 'var(--text-secondary)',
    backgroundColor: active ? 'color-mix(in srgb, var(--color-primary) 10%, transparent)' : 'transparent',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color var(--transition-micro) ease, background-color var(--transition-micro) ease',
    whiteSpace: 'nowrap',
    minHeight: '40px',
  });

  const iconPlaceholderStyles = {
    width: '20px',
    height: '20px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const toggleStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-3)',
    cursor: 'pointer',
    color: 'var(--text-tertiary)',
    transition: 'color var(--transition-micro) ease',
    minHeight: '48px',
    background: 'none',
    border: 'none',
    borderTop: '1px solid var(--surface-3)',
    width: '100%',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-small)',
  };

  const defaultIcon = React.createElement('svg', {
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
  }, React.createElement('rect', { x: 3, y: 3, width: 14, height: 14, rx: 3 }));

  const collapseIcon = React.createElement('svg', {
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
  }, collapsed
    ? React.createElement('path', { d: 'M7 4l6 6-6 6' })
    : React.createElement('path', { d: 'M13 4l-6 6 6 6' })
  );

  return React.createElement('aside', {
    style: sidebarStyles,
    className,
    role: 'navigation',
    'aria-label': 'Sidebar navigation',
    ...rest,
  },
    React.createElement('nav', { style: navStyles },
      items.map((item, index) =>
        React.createElement('a', {
          key: index,
          href: item.href || '#',
          style: itemStyles(item.active),
          onMouseEnter: (e) => {
            if (!item.active) {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--surface-2) 50%, transparent)';
            }
          },
          onMouseLeave: (e) => {
            if (!item.active) {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          },
          'aria-current': item.active ? 'page' : undefined,
        },
          React.createElement('span', { style: iconPlaceholderStyles },
            item.icon || defaultIcon
          ),
          !collapsed && React.createElement('span', null, item.label),
        )
      )
    ),
    onToggle && React.createElement('button', {
      style: toggleStyles,
      onClick: onToggle,
      'aria-label': collapsed ? 'Expand sidebar' : 'Collapse sidebar',
      onMouseEnter: (e) => { e.currentTarget.style.color = 'var(--text-primary)'; },
      onMouseLeave: (e) => { e.currentTarget.style.color = 'var(--text-tertiary)'; },
    }, collapseIcon),
  );
}

export default Sidebar;
