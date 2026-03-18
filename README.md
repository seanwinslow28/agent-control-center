# Agent Control Center

A mission-control-style dashboard for monitoring autonomous AI agents. Built with React, Vite, Tailwind CSS v4, and the SW Design System.

## Design

Dark mode only. Retro-futuristic mission control aesthetic translated into clean, modern UI. Inspired by the feeling of sitting at a 1960s NASA command console — deliberate, calm, in control — expressed through Linear/Vercel-grade design.

- **Surface colors:** `#09090B` → `#18181B` → `#27272A` → `#3F3F46`
- **Primary:** `#3B82F6` | **Accent/Warning:** `#F97316`
- **Fonts:** Inter (UI) + JetBrains Mono (data/logs)
- Faint grid background pattern on the base surface
- Softly glowing status indicators via box-shadow

## Pages

1. **Dashboard** (`/`) — Summary metrics, agent cards in a responsive grid
2. **Agent Detail** (`/agent/:id`) — Cost chart, run history table, logs viewer, configuration
3. **Settings** (`/settings`) — Read-only global configuration display

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS v4 (with `@tailwindcss/vite` plugin)
- React Router (HashRouter for static deployment)
- Recharts (cost line chart)
- SW Design System (local copy in `src/design-system/`)

## Setup

```bash
# Install dependencies
npm install

# Dev server
npm run dev

# Production build
npm run build
```

The production build outputs to `dist/`.

## Project Structure

```
agent-control-center/
├── index.html                  # Entry point with Google Fonts, dark theme
├── vite.config.js             # Vite + Tailwind + React config
├── package.json
├── src/
│   ├── main.jsx               # App bootstrap, router, tokens import
│   ├── App.jsx                # Layout (sidebar + routing)
│   ├── app.css                # Tailwind + custom styles
│   ├── data.js                # All mock data (agents, runs, logs, costs)
│   ├── design-system/         # SW Design System (local copy)
│   │   ├── tokens.css
│   │   ├── index.js
│   │   ├── components/
│   │   └── hooks/
│   └── pages/
│       ├── Dashboard.jsx
│       ├── AgentDetail.jsx
│       └── Settings.jsx
└── dist/                      # Production build output
```

## Design System Components Used

- `Button` — Primary actions (Dry Run)
- `Card` — Agent cards, content containers (dashboard variant)
- `DataTable` — Run history with sortable columns
- `MetricCard` — KPI summary cards
- `Sidebar` — (reference; custom implementation with React Router Links)
- `StatusBadge` — Status indicators (running, completed, attention, failed, disabled)
- `SkeletonLoader` — Loading states (available, not rendered in static demo)
- `Input` — Form inputs (available, not used in read-only dashboard)

## Mock Data

All data is in `src/data.js`:
- 6 agents with different statuses
- 25 run history entries
- 30+ log lines per agent
- 30 days of cost history for the chart
