# CLAUDE.md -- Agent Control Center

## Read First

- **`DESIGN-SPEC.md`** is the single source of truth for all visual decisions. Read it before building any UI.
- **`docs/`** has component mini-specs: `AgentStatusCard.md`, `MetricCard.md`.

## Project Overview

| | |
|---|---|
| **Framework** | React + Vite + Tailwind v4 |
| **Mode** | Dark mode only. Always. |
| **Audience** | Sean only (agent monitoring dashboard) |
| **Philosophy** | "Mission control meets terminal" -- neon green, two visual zones |

### Two Zones

- **Zone 1 (Dashboard):** Clean engineering dashboard. Linear-grade, data-dense, professional. Monitor agent status, review run history, analyze costs.
- **Zone 2 (Retro Terminal):** Pixel art, 8-bit, CRT aesthetic. The pixel agents office -- characters in a pixel art command center. The "fun room."

## Non-Negotiable Rules

1. **No pure black (#000000) as background.** Surface-0 is `#09090B`. *Exception: Zone 2 may use `#050505`.*
2. **No loading spinners.** Use illustrated loading states.
3. **No emoji in UI.** Lucide icons only. *Exception: Zone 2 may use pixel art icons.*
4. **Every animation respects `prefers-reduced-motion`.** No exceptions.
5. **Border radius:** 6px buttons/inputs, 8px dashboard cards. Never pill-shaped.
6. **GPU-only animations.** Only animate `transform` and `opacity`. *Exception: Zone 2 canvas animations (CRT scanlines, pixel transitions) may use additional properties.*
7. **Icon library:** Lucide via `lucide-react`. 16px inline, 20px default, 24px hero.
8. **Spacing:** 4px base unit, shared token scale (space-1 through space-16).
9. **Error voice:** Calm, diagnostic, factual. No apologetic language, no humor.
10. **Form validation:** On submit only. No blur validation, no real-time validation.

## Color

| Role | Value |
|------|-------|
| **Primary (Green)** | `#4ADE80` -- NOT blue. Green = terminals, status indicators, operational readiness. |
| **Secondary (Orange)** | `#F97316` |
| **Tertiary (Red)** | Error/failure indicators |
| **Ratio** | 70% green / 25% orange / 5% red |

## Typography

| Role | Font | Weights | Notes |
|------|------|---------|-------|
| **Headings** | Inter | 600 | |
| **Body** | Inter | 400, 500 | |
| **Monospace** | JetBrains Mono | 400, 500 | Extended usage: costs, turns, log viewer, agent IDs |

## Architecture

- **React + Vite + Tailwind v4** -- uses `@theme` directive in CSS, no `tailwind.config.js`
- **`data-theme="dark"`** set on `<html>` and enforced in `main.jsx`
- **Design tokens** in `tokens.css` (shared) and `app.css` (project-specific)
- **Components** in `src/design-system/components/` use `React.createElement` style (no JSX in component lib)
- **Pages** use JSX syntax
- **Mock data** in `src/data.js`
- **Charts:** Recharts (`AreaChart`, not `LineChart`)
- **Sidebar:** Custom-built in `App.jsx` (needs react-router `<Link>`), `Crosshair` icon for "Agents" nav item
- **StatusBadge** component handles running/completed/attention/failed -- disabled is handled inline
- **lucide-react** installed

## Key Decisions (Completed Work)

These decisions were made during Phase 4 and should be maintained:

- **AgentStatusCards:** 3px left-border (not glow), JetBrains Mono for cost/turns, proper status colors
- **Hero MetricCard:** "Active Today" (h2, span-2 columns, `Activity` icon)
- **Grid background** on dashboard
- **Lucide sidebar icons** at 20px
- **Log viewer** with polished styling
- **Chart:** Themed to green accent
- **Removed "Runs This Week" card** -- hero card takes 2 columns
- **`Crosshair` icon** for "Agents" nav item
- **Removed old status glow** (replaced by 3px left-border per card)

## Before Building Any UI

1. Read `DESIGN-SPEC.md`
2. Check `docs/` for component mini-specs (AgentStatusCard, MetricCard)
3. After building, verify against the spec
