import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MetricCard } from '../design-system/components/MetricCard';
import { Card } from '../design-system/components/Card';
import { StatusBadge } from '../design-system/components/StatusBadge';
import { agents } from '../data';

function getStatusGlow(status) {
  const map = { running: 'glow-running', completed: 'glow-completed', attention: 'glow-attention', failed: 'glow-failed', disabled: 'glow-disabled' };
  return map[status] || '';
}

function getStatusLabel(status) {
  const map = { running: 'Running', completed: 'Completed', attention: 'Attention', failed: 'Failed', disabled: 'Disabled' };
  return map[status] || status;
}

function renderStatusBadge(status) {
  if (status === 'disabled') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 10px', borderRadius: '6px', backgroundColor: 'color-mix(in srgb, var(--text-tertiary) 10%, transparent)', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--text-tertiary)', flexShrink: 0, opacity: 0.5 }} />
        Disabled
      </span>
    );
  }
  return <StatusBadge status={status} label={getStatusLabel(status)} />;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const activeToday = 3;
  const totalCostMonth = 2.47;
  const runsThisWeek = 12;

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '24px' }}>Dashboard</h1>
      <div className="metric-row" style={{ marginBottom: '32px' }}>
        <MetricCard label="Total Agents" value={agents.length} />
        <MetricCard label="Active Today" value={activeToday} />
        <MetricCard label="Cost This Month" value={`$${totalCostMonth.toFixed(2)}`} />
        <MetricCard label="Runs This Week" value={runsThisWeek} />
      </div>
      <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Agents</h2>
      <div className="agent-grid">
        {agents.map((agent) => (
          <Card key={agent.id} variant="dashboard" onClick={() => navigate(`/agent/${agent.id}`)}>
            <div className={getStatusGlow(agent.status)} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: agent.status === 'disabled' ? 'var(--text-tertiary)' : 'var(--text-primary)', lineHeight: 1.4 }}>{agent.name}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{agent.schedule}</div>
                </div>
                {renderStatusBadge(agent.status)}
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'baseline' }}>
                <div><span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-tertiary)' }}>Last run </span><span className="font-mono-data" style={{ fontSize: '12px', color: agent.status === 'disabled' ? 'var(--text-tertiary)' : 'var(--text-secondary)' }}>{agent.lastRun}</span></div>
                <div><span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-tertiary)' }}>Cost </span><span className="font-mono-data" style={{ fontSize: '12px', color: agent.cost >= agent.maxBudget * 0.8 ? 'var(--color-warning)' : (agent.status === 'disabled' ? 'var(--text-tertiary)' : 'var(--text-secondary)') }}>${agent.cost.toFixed(2)}</span></div>
                <div><span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-tertiary)' }}>Turns </span><span className="font-mono-data" style={{ fontSize: '12px', color: agent.status === 'disabled' ? 'var(--text-tertiary)' : 'var(--text-secondary)' }}>{agent.turns}/{agent.maxTurns}</span></div>
              </div>
              {(agent.note || agent.error) && (<div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: agent.error ? 'var(--color-error)' : 'var(--color-warning)', opacity: 0.9 }}>{agent.error || agent.note}</div>)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
