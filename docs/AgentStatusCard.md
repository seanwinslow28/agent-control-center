# AgentStatusCard — Component Mini-Spec

> **Project:** Agent Control Center
> **Mode:** Dark mode only
> **Spec references:** Sections 2, 3, 4, 5, 6, 7, 12, 13, 16, 18, 19
> **Audit reference:** Practice 2 (component-level spec), Practice 7 ("instrument border" signature detail)

---

## Design Intent

Each agent card is a **station monitor** — a self-contained status readout in a mission-control dashboard. The card answers five questions at a glance: What is this agent? What's its status? When did it last run? How much did it cost? How many turns did it take? The 3px left border in the status color is the signature detail that transforms a generic card into a panel indicator light.

---

## Component Anatomy

Elements are listed top-to-bottom, left-to-right within the card.

```
┌─────────────────────────────────────────────┐
│ ← 3px status-color left border              │
│                                             │
│  [Icon]  Agent Name          [Status Badge] │
│          Schedule text                      │
│                                             │
│  Last run: 3 hours ago                      │
│  Cost: $0.12 · Turns: 14                   │
│                                             │
└─────────────────────────────────────────────┘
```

| # | Element | Required | Description |
|---|---------|----------|-------------|
| 1 | Left border | Yes | 3px solid vertical border in the current status color. Full height of the card. This is the "instrument border" — the signature detail. |
| 2 | Agent icon | Yes | Lucide icon, `--icon-md` (20px). Represents the agent type (e.g., `Activity` for run-based agents, `Mail` for email agents). Color: `--text-secondary`. |
| 3 | Agent name | Yes | The agent's display name. |
| 4 | Status badge | Yes | Rounded status indicator (6px border-radius), right-aligned on the top row. |
| 5 | Schedule text | Yes | Cron-readable schedule (e.g., "Every 6 hours", "Daily at 6:00am"). Falls back to "Manual" if no schedule. |
| 6 | Last run timestamp | Yes | Relative time if <24h ("3 hours ago"), absolute date if ≥24h ("Mar 3, 2026"). Falls back to "Never run" if no history. |
| 7 | Cost value | Yes | Dollar amount of last run or cumulative. Monospace. |
| 8 | Turns count | Yes | Integer count. Monospace. |

---

## Spacing

| Property | Token | Value | Notes |
|----------|-------|-------|-------|
| Card padding (top, right, bottom) | `--space-5` | 20px | Left padding is 20px total (3px border + 17px internal). |
| Left border width | — | 3px | Not a token; hardcoded signature detail. |
| Gap: icon to agent name | `--space-2` | 8px | Horizontal. |
| Gap: agent name row to schedule | `--space-1` | 4px | Vertical, tight relationship. |
| Gap: schedule to metadata section | `--space-4` | 16px | Vertical, separates identity from data. |
| Gap: "Last run" to "Cost · Turns" | `--space-2` | 8px | Vertical, tight within metadata group. |
| Min-height | — | 140px | Prevents card from collapsing when schedule or cost data is missing. |

---

## Typography

| Element | Font | Weight | Size Token | Color Token |
|---------|------|--------|------------|-------------|
| Agent name | Inter | SemiBold 600 | `--text-body` (16px) | `--text-primary` |
| Schedule | Inter | Regular 400 | `--text-small` (14px) | `--text-secondary` |
| "Last run" label | Inter | Regular 400 | `--text-small` (14px) | `--text-secondary` |
| Last run value | Inter | Regular 400 | `--text-small` (14px) | `--text-primary` |
| Cost value | JetBrains Mono | Regular 400 | `--text-mono` (14px) | `--text-primary` |
| Turns value | JetBrains Mono | Regular 400 | `--text-mono` (14px) | `--text-primary` |
| "Cost" / "Turns" labels | Inter | Regular 400 | `--text-small` (14px) | `--text-secondary` |
| Metadata separator (·) | Inter | Regular 400 | `--text-small` (14px) | `--text-tertiary` |

---

## Status Badge

The badge is the only element in this card that uses color semantically.

| Status | Label | Background | Text Color | Left Border Color |
|--------|-------|------------|------------|-------------------|
| Running | "Running" | `--color-primary` at 12% opacity | `--color-primary` | `--color-primary` (`#3B82F6`) |
| Completed | "Completed" | `--color-success` at 12% opacity | `--color-success` | `--color-success` (`#22C55E`) |
| Needs Attention | "Needs Attention" | `--color-accent` at 12% opacity | `--color-accent` | `--color-accent` (`#F97316`) |
| Failed | "Failed" | `--color-error` at 12% opacity | `--color-error` | `--color-error` (`#EF4444`) |
| Disabled | "Disabled" | `--surface-2` | `--text-tertiary` | `--text-tertiary` (`#71717A`) |
| Scheduled | "Scheduled" | `--surface-2` | `--text-secondary` | `--text-secondary` (`#A1A1AA`) |
| Idle | "Idle" | `--surface-2` | `--text-tertiary` | `--text-tertiary` (`#71717A`) |

**Badge styling:**

| Property | Value |
|----------|-------|
| Font | Inter Medium 500 |
| Size | `--text-caption` (12px) |
| Padding | `--space-1` (4px) vertical, `--space-2` (8px) horizontal |
| Border radius | 6px (matches button radius — NOT pill-shaped) |
| Text transform | None (sentence case as shown in label column) |

---

## Visual States

### Default
- Background: `--surface-1` (`#18181B`)
- Border: `1px solid --surface-3` (`#3F3F46`) on top, right, bottom
- Left border: `3px solid [status-color]`
- Border radius: `8px` (dashboard card standard)
- Shadow: none (dark mode — borders define edges)

### Hover
- Border color (top, right, bottom) transitions to `--text-tertiary` (`#71717A`)
- Left border remains status color (no change)
- Cursor: `pointer`
- Transition: `150ms ease` on `border-color`

### Active (mouse down)
- Background shifts to `--surface-2` (`#27272A`)
- Transition: `50ms ease`

### Focus (keyboard navigation)
- `2px` outline in `--color-primary` at `50%` opacity
- Outline offset: `2px`
- No change to card background

### Disabled
- Opacity: `0.5`
- Cursor: `not-allowed`
- Hover state suppressed
- Left border: `--text-tertiary`

### Loading (data fetching)
> **Note:** This component-level skeleton is for partial data loading within an already-rendered page. Page-level loading (before any data arrives) uses the illustrated loading pattern defined in spec section 12.
- The card shell renders at full size with min-height
- Agent name: skeleton placeholder (rounded rect, `--surface-2`, 60% width)
- Schedule: skeleton placeholder (rounded rect, `--surface-2`, 40% width)
- Badge: skeleton placeholder (rounded rect, `--surface-2`, 80px wide)
- Metadata row: skeleton placeholder (rounded rect, `--surface-2`, 70% width)
- Skeleton pulse: opacity `0.3 → 0.5`, `1.8s`, ease-in-out, infinite
- Left border: `--surface-3` (neutral, no status color during loading)

---

## Data States

### Populated (normal)
All elements visible as specified in anatomy.

### Empty (no agents configured)
This card does not render individually in an empty state. The **page-level** empty state (section 12 of spec) handles the case when no agents exist. See: illustration + "No agents configured" + "Add your first agent" CTA.

### Error (agent data unavailable)
- Card renders with the **Failed** status styling
- Agent name still visible
- Schedule shows "—"
- Last run shows "Error loading data"
- Cost and Turns show "—"
- The card-level error appears inside the card per section 16 of spec: `--text-small`, `--color-error`, within the metadata area

### Partial data (e.g., no cost tracking yet)
- Cost displays "—" in `--text-tertiary`
- Turns displays "—" in `--text-tertiary`
- Card still meets min-height; no layout collapse

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| ≥1024px (`--bp-desktop`) | Cards in CSS Grid: `auto-fill, minmax(320px, 1fr)`. Full layout as specified. |
| 768px–1023px | Grid narrows; cards may stack to single column. No layout changes within the card. |
| <768px (`--bp-tablet`) | Cards stack vertically, full width. Padding reduces to `--space-4` (16px). Cost and Turns move to their own row if card width < 280px. |

---

## Animation Specs

| Animation | Property | Duration | Easing | Trigger |
|-----------|----------|----------|--------|---------|
| Hover border | `border-color` | 150ms | ease | Mouse enter/leave |
| Active press | `background-color` | 50ms | ease | Mouse down/up |
| Status change | `border-left-color`, badge `background-color` | 300ms | ease-in-out | Status data update (e.g., running → completed) |
| Skeleton pulse | `opacity` | 1.8s | ease-in-out | Loading state (infinite loop) |

### Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- Hover border change: instant (no transition)
- Active press: instant
- Status change: instant (color snaps, no transition)
- Skeleton pulse: static at `40%` opacity (no animation)

---

## Do Not List

1. **Do not use pill-shaped badges.** Badge radius is `6px`, matching buttons. The spec explicitly prohibits pill shapes.
2. **Do not animate the left border on hover.** The left border always shows the status color. Only the top/right/bottom borders change on hover.
3. **Do not use `#000000` for the card background.** It's `--surface-1` (`#18181B`).
4. **Do not show a spinner for the loading state.** Use skeleton placeholders with pulse animation.
5. **Do not use emoji for status indication.** Use the colored badge and left border only. Lucide icons are acceptable for the agent type icon.
6. **Do not animate `height` or `width`.** The card has a fixed min-height and no expand/collapse behavior. Only animate `transform`, `opacity`, `border-color`, and `background-color`.
7. **Do not use alternating row colors** if rendering agent cards in a list layout.
8. **Do not make the left border thicker than 3px.** The audit specifies 3px as the "instrument" detail. Thicker would look like an error state.
9. **Do not use orange for the default/running status.** Running is blue (`--color-primary`). Orange is reserved for "Needs Attention" only.
10. **Do not add a glow effect** to the card border. The audit explicitly flagged decorative glow borders as an anti-pattern.
