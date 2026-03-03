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
