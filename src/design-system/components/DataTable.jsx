import React, { useState, useMemo } from 'react';

export function DataTable({ columns = [], data = [], className = '', compact = false, ...rest }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key], bVal = b[sortConfig.key];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key) => setSortConfig((prev) => ({
    key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
  }));

  return React.createElement('div', { style: { width: '100%', overflow: 'auto', fontFamily: 'var(--font-body)' }, className, ...rest },
    React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse' } },
      React.createElement('thead', null,
        React.createElement('tr', null,
          columns.map((col) => React.createElement('th', {
            key: col.key,
            style: { textAlign: 'left', padding: compact ? '8px 12px' : '12px 16px', fontSize: 'var(--text-small)', fontWeight: 600, color: sortConfig.key === col.key ? 'var(--text-primary)' : 'var(--text-secondary)', borderBottom: '1px solid var(--surface-3)', cursor: col.sortable ? 'pointer' : 'default', position: 'sticky', top: 0, backgroundColor: 'var(--surface-0)', zIndex: 1 },
            onClick: col.sortable ? () => handleSort(col.key) : undefined,
          }, col.label))
        )
      ),
      React.createElement('tbody', null,
        sortedData.map((row, rowIdx) => React.createElement('tr', {
          key: rowIdx,
          onMouseEnter: (e) => { e.currentTarget.style.backgroundColor = 'var(--surface-1)'; },
          onMouseLeave: (e) => { e.currentTarget.style.backgroundColor = 'transparent'; },
        },
          columns.map((col) => React.createElement('td', {
            key: col.key,
            style: { padding: compact ? '8px 12px' : '12px 16px', borderBottom: '1px solid var(--surface-3)', color: 'var(--text-primary)', fontFamily: col.mono ? 'var(--font-mono)' : 'var(--font-body)', fontSize: col.mono ? 'var(--text-mono)' : 'var(--text-body)' },
          }, row[col.key] ?? '—'))
        ))
      )
    )
  );
}
export default DataTable;
