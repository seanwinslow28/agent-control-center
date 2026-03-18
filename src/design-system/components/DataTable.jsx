import React, { useState, useMemo } from 'react';

/**
 * DataTable — Clean data table with sorting and sticky headers.
 * 
 * @param {Object} props
 * @param {Array<{key: string, label: string, sortable?: boolean, mono?: boolean}>} props.columns - Column definitions
 * @param {Array<Object>} props.data - Row data objects
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.compact=false] - Compact row spacing
 */
export function DataTable({
  columns = [],
  data = [],
  className = '',
  compact = false,
  ...rest
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const tableWrapperStyles = {
    width: '100%',
    overflow: 'auto',
    fontFamily: 'var(--font-body)',
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 'var(--text-body)',
    lineHeight: 'var(--text-body-lh)',
  };

  const thStyles = (col) => ({
    textAlign: 'left',
    padding: compact ? '8px 12px' : '12px 16px',
    fontSize: 'var(--text-small)',
    lineHeight: 'var(--text-small-lh)',
    fontWeight: 600,
    color: sortConfig.key === col.key ? 'var(--text-primary)' : 'var(--text-secondary)',
    borderBottom: '1px solid var(--surface-3)',
    cursor: col.sortable ? 'pointer' : 'default',
    userSelect: col.sortable ? 'none' : 'auto',
    whiteSpace: 'nowrap',
    position: 'sticky',
    top: 0,
    backgroundColor: 'var(--surface-0)',
    zIndex: 1,
    fontFamily: 'var(--font-body)',
  });

  const tdStyles = (col) => ({
    padding: compact ? '8px 12px' : '12px 16px',
    borderBottom: '1px solid var(--surface-3)',
    color: 'var(--text-primary)',
    fontFamily: col.mono ? 'var(--font-mono)' : 'var(--font-body)',
    fontSize: col.mono ? 'var(--text-mono)' : 'var(--text-body)',
    lineHeight: col.mono ? 'var(--text-mono-lh)' : 'var(--text-body-lh)',
    fontVariantNumeric: 'tabular-nums lining-nums',
  });

  const sortArrow = (col) => {
    if (!col.sortable) return null;
    if (sortConfig.key !== col.key) {
      return React.createElement('span', {
        style: { marginLeft: '4px', opacity: 0.3, fontSize: '10px' },
        'aria-hidden': 'true',
      }, '▲');
    }
    return React.createElement('span', {
      style: { marginLeft: '4px', fontSize: '10px' },
      'aria-hidden': 'true',
    }, sortConfig.direction === 'asc' ? '▲' : '▼');
  };

  return React.createElement('div', {
    style: tableWrapperStyles,
    className,
    role: 'region',
    'aria-label': 'Data table',
    tabIndex: 0,
    ...rest,
  },
    React.createElement('table', { style: tableStyles },
      React.createElement('thead', null,
        React.createElement('tr', null,
          columns.map((col) =>
            React.createElement('th', {
              key: col.key,
              style: thStyles(col),
              onClick: col.sortable ? () => handleSort(col.key) : undefined,
              'aria-sort': sortConfig.key === col.key
                ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending')
                : undefined,
            }, col.label, sortArrow(col))
          )
        )
      ),
      React.createElement('tbody', null,
        sortedData.map((row, rowIdx) =>
          React.createElement('tr', {
            key: rowIdx,
            style: { transition: 'background-color var(--transition-micro) ease' },
            onMouseEnter: (e) => { e.currentTarget.style.backgroundColor = 'var(--surface-1)'; },
            onMouseLeave: (e) => { e.currentTarget.style.backgroundColor = 'transparent'; },
          },
            columns.map((col) =>
              React.createElement('td', {
                key: col.key,
                style: tdStyles(col),
              }, row[col.key] ?? '—')
            )
          )
        )
      ),
    ),
  );
}

export default DataTable;
