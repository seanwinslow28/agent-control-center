import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '../design-system/components/StatusBadge';
import { Activity } from 'lucide-react';
import { agents } from '../data';

// --- Status color map (spec: AgentStatusCard.md) ---
const STATUS_COLORS = {
  running: '#3B82F6',
  completed: '#22C55E',
  attention: '#F97316',
  failed: '#EF4444',
  disabled: '#71717A',
  scheduled: '#A1A1AA',
  idle: '#71717A',
};

const STATUS_LABELS = {
  running: 'Running',
  completed: 'Completed',
  attention: 'Needs Attention',
  failed: 'Failed',
  disabled: 'Disabled',
  scheduled: 'Scheduled',
  idle: 'Idle',
};

// --- Relative time formatter per spec §19 micro-copy rules ---
function formatRelativeTime(lastRun) {
  if (!lastRun || lastRun === 'Never') return 'Never run';
  if (lastRun === 'In progress') return 'In progress';

  // If it contains "Today" or "ago", treat as within 24h
  if (lastRun.includes('Today') || lastRun.includes('ago')) {
    // Already in relative format — extract just the time portion
    return lastRun.replace('Today, ', '');
  }

  // Beyond 24h: show absolute date per spec ("Mar 3, 2026" format)
  // The mock data already has short dates like "Feb 28", "Mar 1"
  return lastRun;
}

// --- AgentStatusCard (implements AgentStatusCard.md mini-spec) ---
function AgentStatusCard({ agent, onClick }) {
  const borderColor = STATUS_COLORS[agent.status] || STATUS_COLORS.idle;
  const isDisabled = agent.status === 'disabled';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      style={{
        backgroundColor: 'var(--surface-1)',
        borderTop: '1px solid var(--surface-3)',
        borderRight: '1px solid var(--surface-3)',
        borderBottom: '1px solid var(--surface-3)',
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '20px 20px 20px 17px', // 3px border + 17px = 20px total left
        minHeight: '140px',
        cursor: 'pointer',
        transition: 'border-color 150ms ease, background-color 50ms ease',
        opacity: isDisabled ? 0.5 : 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
      onMouseEnter={(e) => {
        if (isDisabled) return;
        e.currentTarget.style.borderTopColor = 'var(--text-tertiary)';
        e.currentTarget.style.borderRightColor = 'var(--text-tertiary)';
        e.currentTarget.style.borderBottomColor = 'var(--text-tertiary)';
        // Left border stays status color
      }}
      onMouseLeave={(e) => {
        if (isDisabled) return;
        e.currentTarget.style.borderTopColor = 'var(--surface-3)';
        e.currentTarget.style.borderRightColor = 'var(--surface-3)';
        e.currentTarget.style.borderBottomColor = 'var(--surface-3)';
      }}
      onMouseDown={(e) => {
        if (isDisabled) return;
        e.currentTarget.style.backgroundColor = 'var(--surface-2)';
      }}
      onMouseUp={(e) => {
        if (isDisabled) return;
        e.currentTarget.style.backgroundColor = 'var(--surface-1)';
      }}
    >
      {/* Top row: agent name + status badge */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '12px',
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            fontWeight: 600,
            color: isDisabled ? 'var(--text-tertiary)' : 'var(--text-primary)',
            lineHeight: 1.4,
          }}>
            {agent.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            marginTop: '4px',
          }}>
            {agent.schedule}
          </div>
        </div>
        <StatusBadge
          status={agent.status === 'attention' ? 'attention' : agent.status}
          label={STATUS_LABELS[agent.status] || agent.status}
        />
      </div>

      {/* Metadata row: last run, cost, turns */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--text-secondary)',
        }}>
          Last run:{' '}
          <span style={{ color: isDisabled ? 'var(--text-tertiary)' : 'var(--text-primary)' }}>
            {formatRelativeTime(agent.lastRun)}
          </span>
        </div>
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'baseline',
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--text-secondary)',
            }}>Cost </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              fontVariantNumeric: 'tabular-nums lining-nums',
              color: agent.cost >= agent.maxBudget * 0.8
                ? 'var(--color-warning)'
                : (isDisabled ? 'var(--text-tertiary)' : 'var(--text-primary)'),
            }}>
              ${agent.cost.toFixed(2)}
            </span>
          </div>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--text-tertiary)',
          }}>·</span>
          <div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--text-secondary)',
            }}>Turns </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              fontVariantNumeric: 'tabular-nums lining-nums',
              color: isDisabled ? 'var(--text-tertiary)' : 'var(--text-primary)',
            }}>
              {agent.turns}
            </span>
          </div>
        </div>
      </div>

      {/* Error/Note */}
      {(agent.error || agent.note) && (
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: agent.error ? 'var(--color-error)' : 'var(--color-warning)',
        }}>
          {agent.error || agent.note}
        </div>
      )}
    </div>
  );
}

// --- HeroMetricCard (implements MetricCard.md hero variant) ---
function HeroMetricCard({ icon, label, value, subtitle }) {
  return (
    <div style={{
      backgroundColor: 'var(--surface-1)',
      border: '1px solid var(--surface-3)',
      borderRadius: '8px',
      padding: '24px',
      minHeight: '140px',
      gridColumn: 'span 2',
      transition: 'border-color 150ms ease',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-tertiary)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--surface-3)'; }}
    >
      {icon && (
        <div style={{ color: 'var(--color-primary)', marginBottom: '12px' }}>
          {icon}
        </div>
      )}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        color: 'var(--text-secondary)',
        fontWeight: 400,
        marginBottom: '8px',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '28px',
        lineHeight: 1.3,
        color: 'var(--text-primary)',
        fontWeight: 600,
        fontVariantNumeric: 'tabular-nums lining-nums',
      }}>
        {value}
      </div>
      {subtitle && (
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--text-secondary)',
          fontWeight: 400,
          marginTop: '8px',
        }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

// --- StandardMetricCard (MetricCard.md standard variant) ---
function StandardMetricCard({ label, value }) {
  return (
    <div style={{
      backgroundColor: 'var(--surface-1)',
      border: '1px solid var(--surface-3)',
      borderRadius: '8px',
      padding: '20px',
      minHeight: '100px',
      transition: 'border-color 150ms ease',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-tertiary)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--surface-3)'; }}
    >
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        color: 'var(--text-secondary)',
        fontWeight: 400,
        marginBottom: '8px',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '22px',
        lineHeight: 1.4,
        color: 'var(--text-primary)',
        fontWeight: 600,
        fontVariantNumeric: 'tabular-nums lining-nums',
      }}>
        {value}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  // Compute metrics from agents data
  const activeToday = agents.filter(a => a.status === 'running' || a.status === 'completed').length;
  const totalCostMonth = agents.reduce((sum, a) => sum + a.cost, 0);
  const runningCount = agents.filter(a => a.status === 'running').length;
  const scheduledCount = agents.filter(a => a.status !== 'running' && a.status !== 'disabled').length;

  return (
    <div>
      {/* Page title */}
      <h1 style={{
        fontFamily: 'var(--font-body)',
        fontSize: '18px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '24px',
      }}>
        Dashboard
      </h1>

      {/* Metric Cards — Hero + Standard per MetricCard.md */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <HeroMetricCard
          icon={<Activity size={24} />}
          label="Active Today"
          value={activeToday}
          subtitle={`${runningCount} running, ${scheduledCount} scheduled`}
        />
        <StandardMetricCard label="Total Agents" value={agents.length} />
        <StandardMetricCard
          label="Cost This Month"
          value={`$${totalCostMonth.toFixed(2)}`}
        />
      </div>

      {/* Section label */}
      <h2 style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '16px',
      }}>
        Agents
      </h2>

      {/* Agent Cards Grid */}
      <div className="agent-grid">
        {agents.map((agent) => (
          <AgentStatusCard
            key={agent.id}
            agent={agent}
            onClick={() => navigate(`/agent/${agent.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
