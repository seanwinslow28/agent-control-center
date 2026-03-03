import React from 'react';
import { Card } from '../design-system/components/Card';

export default function Settings() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Settings</h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '32px' }}>Edit these values in config.toml</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
        <Card variant="dashboard">
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '16px' }}>Global Defaults</div>
          <div className="config-row"><span className="config-label">Max Turns</span><span className="config-value">30</span></div>
          <div className="config-row"><span className="config-label">Max Budget</span><span className="config-value">$0.50</span></div>
          <div className="config-row"><span className="config-label">Permission Mode</span><span className="config-value">acceptEdits</span></div>
        </Card>
        <Card variant="dashboard">
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '16px' }}>Execution</div>
          <div className="config-row"><span className="config-label">Scheduler</span><span className="config-value">cron</span></div>
          <div className="config-row"><span className="config-label">Timeout</span><span className="config-value">300s</span></div>
          <div className="config-row"><span className="config-label">Retry Policy</span><span className="config-value">none</span></div>
        </Card>
        <Card variant="dashboard">
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '16px' }}>Notifications</div>
          <div className="config-row"><span className="config-label">Alert on Failure</span><span className="config-value">true</span></div>
          <div className="config-row"><span className="config-label">Alert on Budget &gt; 80%</span><span className="config-value">true</span></div>
          <div className="config-row"><span className="config-label">Digest Frequency</span><span className="config-value">daily</span></div>
        </Card>
      </div>
    </div>
  );
}
