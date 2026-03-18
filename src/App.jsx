import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Crosshair, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import AgentDetail from './pages/AgentDetail';
import SettingsPage from './pages/Settings';

// Logo SVG — geometric mark with radiating lines (Paul Rand inspired)
const Logo = ({ collapsed }) => (
  <div style={{
    padding: collapsed ? '16px 0' : '16px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    justifyContent: collapsed ? 'center' : 'flex-start',
    borderBottom: '1px solid var(--surface-3)',
    marginBottom: '8px',
    minHeight: '56px',
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" fill="var(--color-primary)" />
      <line x1="12" y1="2" x2="12" y2="5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="18.5" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="12" x2="5.5" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.5" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5.1" y1="5.1" x2="7.6" y2="7.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16.4" y1="16.4" x2="18.9" y2="18.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.9" y1="5.1" x2="16.4" y2="7.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7.6" y1="16.4" x2="5.1" y2="18.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    {!collapsed && (
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        whiteSpace: 'nowrap',
        letterSpacing: '-0.01em',
      }}>
        ACC
      </span>
    )}
  </div>
);

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 1024);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const sidebarWidth = sidebarCollapsed ? '64px' : '240px';

  // Lucide icons at 20px per spec §18 --icon-md
  const navItems = [
    { path: '/', icon: <LayoutGrid size={20} />, label: 'Dashboard' },
    { path: '/agents', icon: <Crosshair size={20} />, label: 'Agents' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="dashboard-layout" style={{ gridTemplateColumns: `${sidebarWidth} 1fr` }}>
      {/* Sidebar */}
      <aside style={{
        backgroundColor: 'var(--surface-1)',
        borderRight: '1px solid var(--surface-3)',
        display: 'flex',
        flexDirection: 'column',
        width: sidebarWidth,
        overflow: 'hidden',
        position: 'relative',
        zIndex: 40,
      }}>
        <Logo collapsed={sidebarCollapsed} />

        <nav style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: '12px',
          overflowY: 'auto',
          overflowX: 'hidden',
          overscrollBehavior: 'contain',
        }}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path === '/agents' ? '/' : item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: active ? 500 : 400,
                  color: active ? 'var(--color-primary)' : 'var(--text-secondary)',
                  backgroundColor: active
                    ? 'color-mix(in srgb, var(--color-primary) 10%, transparent)'
                    : 'transparent',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  minHeight: '40px',
                  transition: 'color 150ms ease, background-color 150ms ease',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--surface-2) 50%, transparent)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ width: '20px', height: '20px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </span>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            color: 'var(--text-tertiary)',
            transition: 'color 150ms ease',
            minHeight: '48px',
            background: 'none',
            border: 'none',
            borderTop: '1px solid var(--surface-3)',
            width: '100%',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-tertiary)'; }}
        >
          {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content grid-bg" style={{ padding: '32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agent/:id" element={<AgentDetail />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
