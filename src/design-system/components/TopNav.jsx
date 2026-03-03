import React from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection.js';

export function TopNav({ className = '', darkMode = false, onToggleTheme, ...rest }) {
  const scrollDirection = useScrollDirection(10);
  const navStyles = {
    position: 'fixed', top: 0, left: 0, right: 0, height: 'var(--nav-height)', zIndex: 50,
    backgroundColor: 'var(--surface-0)', borderBottom: '1px solid var(--surface-3)',
    transform: scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)',
    transition: 'transform 300ms ease-in-out',
  };
  const navLinks = ['Work', 'About', 'Contact'];
  return React.createElement('header', { style: navStyles, className, role: 'banner', ...rest },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', maxWidth: 'var(--content-max-width)', margin: '0 auto', padding: '0 var(--space-6)' } },
      React.createElement('a', { href: '#', style: { fontFamily: 'var(--font-display)', fontSize: 'var(--text-h4)', fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none' }, 'aria-label': 'Sean Winslow - Home' }, 'Sean Winslow'),
      React.createElement('nav', { style: { display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }, 'aria-label': 'Main navigation' },
        navLinks.map((link) => React.createElement('a', { key: link, href: `#${link.toLowerCase()}`, style: { fontFamily: 'var(--font-body)', fontSize: 'var(--text-small)', fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-micro) ease' } }, link))
      )
    )
  );
}
export default TopNav;
