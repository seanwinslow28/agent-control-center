import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card } from '../design-system/components/Card';
import { Button } from '../design-system/components/Button';
import { StatusBadge } from '../design-system/components/StatusBadge';
import { DataTable } from '../design-system/components/DataTable';
import { agents, runHistory, agentLogs, costHistory } from '../data';

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

function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  const secs = Math.round(ms / 1000);
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(secs / 60);
  const remSecs = secs % 60;
  return `${mins}m ${remSecs}s`;
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const cost = payload[0].value;
    const overBudget = cost >= 0.40;
    return (
      <div style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--surface-3)', borderRadius: '6px', padding: '8px 12px', fontFamily: 'var(--font-body)', fontSize: '12px' }}>
        <div style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 500, color: overBudget ? 'var(--color-warning)' : 'var(--color-primary)', fontVariantNumeric: 'tabular-nums lining-nums' }}>
          ${cost.toFixed(2)}
        </div>
      </div>
    );
  }
  return null;
}

function CustomDot(props) {
  const { cx, cy, payload } = props;
  if (payload.cost >= 0.40) {
    return <circle cx={cx} cy={cy} r={4} fill="#F97316" stroke="#F97316" strokeWidth={1} />;
  }
  return null;
}

export default function AgentDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('runs');
  const agent = agents.find(a => a.id === id);

  const agentRuns = useMemo(() => {
    return runHistory
      .filter(r => r.agentId === id)
      .map(r => ({ ...r, costDisplay: `$${r.costUsd.toFixed(2)}`, durationDisplay: formatDuration(r.durationMs), statusBadge: r.status }));
  }, [id]);

  const logs = agentLogs[id] || [];

  if (!agent) {
    return (
      <div>
        <Link to="/" className="back-link">Back to Dashboard</Link>
        <div style={{ marginTop: '32px', color: 'var(--text-secondary)' }}>Agent not found.</div>
      </div>
    );
  }

  const tableColumns = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'time', label: 'Time', sortable: true, mono: true },
    { key: 'statusBadge', label: 'Status', sortable: true },
    { key: 'costDisplay', label: 'Cost', sortable: true, mono: true },
    { key: 'turns', label: 'Turns', sortable: true, mono: true },
    { key: 'durationDisplay', label: 'Duration', sortable: true, mono: true },
    { key: 'notes', label: 'Notes', sortable: false },
  ];

  const tableData = agentRuns.map(r => ({
    ...r,
    statusBadge: React.createElement(StatusBadge, {
      status: r.status === 'completed' ? 'completed' : r.status === 'failed' ? 'failed' : 'attention',
      label: r.status.charAt(0).toUpperCase() + r.status.slice(1),
    }),
  }));

  return (
    <div>
      <Link to="/" className="back-link" style={{ marginBottom: '24px', display: 'inline-flex' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 12L6 8l4-4" />
        </svg>
        Dashboard
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>{agent.name}</h1>
          {renderStatusBadge(agent.status)}
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)' }}>{agent.schedule}</span>
        </div>
        <Button variant="secondary" size="compact">Dry Run</Button>
      </div>

      <div className="chart-container" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '16px' }}>Cost per Run (30 days)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={costHistory} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fill: '#71717A', fontSize: 12, fontFamily: 'Inter' }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
            <YAxis tick={{ fill: '#71717A', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v.toFixed(2)}`} width={50} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="cost" stroke="#3B82F6" strokeWidth={1.5} fill="url(#costGradient)" dot={<CustomDot />} activeDot={{ r: 4, fill: '#3B82F6', stroke: '#3B82F6' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--surface-3)', marginBottom: '20px' }}>
        {['runs', 'logs', 'config'].map((tab) => (
          <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="tab-content" key={activeTab}>
        {activeTab === 'runs' && (
          <Card variant="dashboard" style={{ padding: 0, overflow: 'hidden' }}>
            <DataTable columns={tableColumns} data={tableData} compact />
            {tableData.length === 0 && (<div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '14px' }}>No runs recorded</div>)}
          </Card>
        )}

        {activeTab === 'logs' && (
          <Card variant="dashboard" style={{ padding: '16px' }}>
            <div className="log-container">
              {logs.map((line, i) => {
                let levelClass = 'log-info';
                if (line.includes('[WARN]')) levelClass = 'log-warn';
                else if (line.includes('[ERROR]')) levelClass = 'log-error';
                else if (line.includes('[DEBUG]')) levelClass = 'log-debug';
                const showSeparator = i > 0 && line.includes('Agent started');
                return (
                  <React.Fragment key={i}>
                    {showSeparator && <div className="log-separator" />}
                    <div className={`log-line ${levelClass}`}>{line}</div>
                  </React.Fragment>
                );
              })}
              {logs.length === 0 && (<div className="log-line log-debug">No log entries available</div>)}
            </div>
          </Card>
        )}

        {activeTab === 'config' && (
          <Card variant="dashboard">
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '12px' }}>Skills</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {agent.skills.map((skill) => (<span key={skill} className="skill-tag">{skill}</span>))}
              </div>
            </div>
            <div>
              <div className="config-row"><span className="config-label">Max Turns</span><span className="config-value">{agent.maxTurns}</span></div>
              <div className="config-row"><span className="config-label">Max Budget</span><span className="config-value">${agent.maxBudget.toFixed(2)}</span></div>
              <div className="config-row"><span className="config-label">Permission Mode</span><span className="config-value">{agent.permissionMode}</span></div>
              <div className="config-row"><span className="config-label">Cron Expression</span><span className="config-value">{agent.cron}</span></div>
              <div className="config-row"><span className="config-label">Schedule</span><span className="config-value">{agent.schedule}</span></div>
              {agent.error && (<div className="config-row"><span className="config-label">Error</span><span className="config-value" style={{ color: 'var(--color-error)' }}>{agent.error}</span></div>)}
              {agent.note && (<div className="config-row"><span className="config-label">Note</span><span className="config-value" style={{ color: 'var(--color-warning)' }}>{agent.note}</span></div>)}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
