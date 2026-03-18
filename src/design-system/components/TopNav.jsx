import React from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection.js';

/**
 * TopNav — Fixed top navigation bar with scroll hide/reveal.
 * 
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.darkMode=false] - Current dark mode state
 * @param {Function} [props.onToggleTheme] - Theme toggle callback
 */
export function TopNav({
  className = '',
  darkMode = false,
  onToggleTheme,
  ...rest
}) {
  const scrollDirection = useScrollDirection(10);

  const navStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 'var(--nav-height)',
    zIndex: 50,
    backgroundColor: darkMode ? 'var(--surface-0)' : 'var(--surface-0)',
    backdropFilter: darkMode ? 'none' : 'blur(12px)',
    WebkitBackdropFilter: darkMode ? 'none' : 'blur(12px)',
    borderBottom: '1px solid var(--surface-3)',
    transform: scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)',
    transition: 'transform 300ms ease-in-out',
  };

  const innerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    maxWidth: 'var(--content-max-width)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
  };

  const brandStyles = {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-h4)',
    fontWeight: 500,
    color: 'var(--text-primary)',
    textDecoration: 'none',
  };

  const linksContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-6)',
  };

  const linkStyles = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-small)',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'color var(--transition-micro) ease',
    cursor: 'pointer',
  };

  const toggleBtnStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: 'var(--radius-button)',
    border: 'none',
    background: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'color var(--transition-micro) ease',
    padding: 0,
  };

  const sunIcon = React.createElement('svg', {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
    React.createElement('circle', { cx: 12, cy: 12, r: 5 }),
    React.createElement('path', { d: 'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' }),
  );

  const moonIcon = React.createElement('svg', {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
    React.createElement('path', { d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' }),
  );

  const navLinks = ['Work', 'About', 'Contact'];

  return React.createElement('header', {
    style: navStyles,
    className,
    role: 'banner',
    ...rest,
  },
    React.createElement('div', { style: innerStyles },
      React.createElement('a', {
        href: '#',
        style: brandStyles,
        'aria-label': 'Sean Winslow — Home',
      }, 'Sean Winslow'),
      React.createElement('nav', {
        style: linksContainerStyles,
        'aria-label': 'Main navigation',
      },
        navLinks.map((link) =>
          React.createElement('a', {
            key: link,
            href: `#${link.toLowerCase()}`,
            style: linkStyles,
            onMouseEnter: (e) => { e.currentTarget.style.color = 'var(--text-primary)'; },
            onMouseLeave: (e) => { e.currentTarget.style.color = 'var(--text-secondary)'; },
          }, link)
        ),
        onToggleTheme && React.createElement('button', {
          style: toggleBtnStyles,
          onClick: onToggleTheme,
          'aria-label': darkMode ? 'Switch to light mode' : 'Switch to dark mode',
          onMouseEnter: (e) => { e.currentTarget.style.color = 'var(--text-primary)'; },
          onMouseLeave: (e) => { e.currentTarget.style.color = 'var(--text-secondary)'; },
        }, darkMode ? sunIcon : moonIcon),
      ),
    ),
  );
}

export default TopNav;
