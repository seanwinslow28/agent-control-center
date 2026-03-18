# MetricCard — Component Mini-Spec

> **Projects:** Life Systems Hub, Agent Control Center
> **Mode:** Dark mode only
> **Spec references:** Sections 2, 3, 4, 5, 6, 14, 17, 19
> **Audit reference:** Audit Part 1 (equal-weight cards flagged), Practice 7 (hierarchy injection)

---

## Design Intent

MetricCards are **summary readouts** — the first numbers your eye hits on either dashboard. They answer "what's the headline?" before the user drills into detail. The audit flagged that all metric cards being equal weight makes the dashboard feel like a spreadsheet — nothing stands out. This spec defines two variants: **Standard** (the default) and **Hero** (a visually larger card that highlights the most important metric on the page). The hero variant breaks the equal-weight grid and creates a clear visual entry point.

---

## Variants

| Variant | Usage | Visual Weight |
|---------|-------|---------------|
| **Standard** | Secondary metrics (e.g., "Total Cost", "Agents Active", "Quests Done"). | Regular card in the grid. |
| **Hero** | The single most important metric on the page (e.g., "Current Streak" on Life Systems Hub, "Active Today" on Agent Control Center). Max one hero per dashboard view. | Larger value text, optional icon accent, spans 2 columns on wide screens. |

---

## Component Anatomy

### Standard Variant

```
┌────────────────────────────┐
│                            │
│  Label                     │
│  Value          [Trend ↑]  │
│                            │
└────────────────────────────┘
```

| # | Element | Required | Description |
|---|---------|----------|-------------|
| 1 | Label | Yes | What this metric measures (e.g., "Total Cost", "Agents Active"). |
| 2 | Value | Yes | The metric's current value (e.g., "$47.20", "6", "12 days"). |
| 3 | Trend indicator | Optional | An arrow icon + percentage or delta showing change (e.g., "↑ 12%" or "↓ $3.50"). |

### Hero Variant

```
┌──────────────────────────────────────────────┐
│                                              │
│  [Icon]                                      │
│  Label                                       │
│  Value                           [Trend ↑]   │
│  Subtitle context                            │
│                                              │
└──────────────────────────────────────────────┘
```

| # | Element | Required | Description |
|---|---------|----------|-------------|
| 1 | Icon | Optional | A Lucide icon representing the metric category (e.g., `Flame` for streak, `Activity` for active agents). Adds visual weight. |
| 2 | Label | Yes | Same as standard. |
| 3 | Value | Yes | Same data but displayed at a larger size (`--text-h2`). |
| 4 | Trend indicator | Optional | Same as standard. |
| 5 | Subtitle | Optional | Contextual second line (e.g., "Your best yet", "3 running, 3 idle"). Adds narrative per spec section 19. |

---

## Spacing

### Standard Variant

| Property | Token | Value | Notes |
|----------|-------|-------|-------|
| Card padding | `--space-5` | 20px | All sides (dashboard card standard). |
| Label to value gap | `--space-2` | 8px | Vertical. |
| Value to trend gap | `--space-3` | 12px | Horizontal (trend is right-aligned on the value row). |
| Min-height | — | 100px | Prevents card from collapsing when value is short. |
| Min-width | — | 200px | For mobile horizontal scroll snap per spec section 14. |

### Hero Variant

| Property | Token | Value | Notes |
|----------|-------|-------|-------|
| Card padding | `--space-6` | 24px | Slightly more spacious. |
| Icon to label gap | `--space-3` | 12px | Vertical (icon sits above the label). |
| Label to value gap | `--space-2` | 8px | Vertical. |
| Value to subtitle gap | `--space-2` | 8px | Vertical. |
| Min-height | — | 140px | Taller than standard to accommodate the extra elements. |

---

## Typography

### Standard Variant

| Element | Font | Weight | Size Token | Color Token |
|---------|------|--------|------------|-------------|
| Label | Inter | Regular 400 | `--text-small` (14px) | `--text-secondary` |
| Value | Inter | SemiBold 600 | `--text-h3` (22px) | `--text-primary` |
| Trend percentage | Inter | Medium 500 | `--text-caption` (12px) | Semantic (see trend colors) |
| Trend arrow icon | Lucide | — | `--icon-sm` (16px) | Semantic (see trend colors) |

### Hero Variant

| Element | Font | Weight | Size Token | Color Token |
|---------|------|--------|------------|-------------|
| Icon | Lucide | — | `--icon-lg` (24px) | `--color-primary` (blue) |
| Label | Inter | Regular 400 | `--text-small` (14px) | `--text-secondary` |
| Value | Inter | SemiBold 600 | `--text-h2` (28px) | `--text-primary` |
| Subtitle | Inter | Regular 400 | `--text-small` (14px) | `--text-secondary` |
| Trend | Same as standard | — | — | — |

### Financial Values

Per spec section 17, financial values follow the headline/detail split:

| Context | Font | Example |
|---------|------|---------|
| MetricCard value (headline) | Inter SemiBold 600 | "$47.20" — this is a summary/headline metric |
| NOT JetBrains Mono | — | Monospace is for detail tables, chart axes, and data rows |

**Number formatting:** Per spec section 19 — "$0.12" format (dollar sign, no space, 2 decimals). Comma separators for thousands ("$1,247.00").

---

## Trend Indicator

| Direction | Icon | Color | Example |
|-----------|------|-------|---------|
| Up (positive) | Lucide `TrendingUp` | `--color-success` (`#22C55E`) | "↑ 12%" |
| Down (negative) | Lucide `TrendingDown` | `--color-error` (`#EF4444`) | "↓ 8%" |
| Neutral / no change | None (hide trend) | — | Trend indicator is simply not rendered. |

**Context-dependent polarity:** "Up" isn't always good. For cost metrics, up is bad (red) and down is good (green). The component should accept a `positiveDirection` prop (`"up"` or `"down"`) to invert the color logic.

| Metric | Up = | Down = |
|--------|------|--------|
| "Active Today" | `--color-success` (green, more active is good) | `--color-error` (red) |
| "Current Streak" | `--color-success` (green) | `--color-error` (red) |
| "Total Cost" | `--color-error` (red, higher cost is bad) | `--color-success` (green) |
| "Avg Cost/Run" | `--color-error` (red) | `--color-success` (green) |

---

## Visual States

### Default

| Property | Value |
|----------|-------|
| Background | `--surface-1` (`#18181B`) |
| Border | `1px solid --surface-3` (`#3F3F46`) |
| Border radius | 8px (dashboard card standard) |
| Shadow | none (dark mode) |

### Hover

| Property | Value |
|----------|-------|
| Border | color transitions to `--text-tertiary` (`#71717A`) |
| Cursor | `default` (metric cards are read-only; they don't link anywhere) |
| Transition | 150ms ease |

**Note:** If a MetricCard is clickable (links to a detail view), change cursor to `pointer` and add the full hover behavior (border + subtle `translateY(-1px)`).

### Focus (keyboard, only if clickable)

| Property | Value |
|----------|-------|
| Outline | `2px solid --color-primary` at 50% opacity |
| Outline offset | 2px |

### Loading
> **Note:** This component-level skeleton is for partial data loading within an already-rendered page. Page-level loading (before any data arrives) uses the illustrated loading pattern defined in spec section 12.

| Property | Value |
|----------|-------|
| Label | Skeleton placeholder, 40% width, `--surface-2` |
| Value | Skeleton placeholder, 60% width, `--surface-2`, taller (matching `--text-h3` line height) |
| Trend | Hidden during loading |
| Pulse | opacity `0.3 → 0.5`, 1.8s, ease-in-out |

### Error (data unavailable)

| Property | Value |
|----------|-------|
| Label | Displays normally |
| Value | "—" in `--text-tertiary` |
| Trend | Hidden |
| Subtitle (hero) | "Data unavailable" in `--color-error`, `--text-small` |

### Empty (no data yet)

| Property | Value |
|----------|-------|
| Label | Displays normally |
| Value | "0" or "$0.00" (appropriate zero value for the metric type) |
| Trend | Hidden (no comparison data) |

---

## Value Animation (Count-Up)

When a MetricCard first appears or when its value changes significantly, the value counts up from the previous value (or from 0 on first load).

| Property | Value |
|----------|-------|
| Animation type | Numeric interpolation (count from previous value to new value) |
| Duration | Max 2.0 seconds (per spec section 6: "metric count-up: max 2.0s") |
| Easing | ease-out |
| Trigger | Value prop changes, or component enters viewport for first time |
| Number formatting | Maintained throughout animation (commas, decimals, currency symbols stay correct) |
| Reduced motion | Value appears instantly at final number (no count-up) |

---

## Responsive Behavior

### Desktop (≥1024px)

Cards in a CSS Grid: `auto-fill, minmax(320px, 1fr)`. Hero variant spans 2 columns via `grid-column: span 2`.

### Tablet (768px–1023px)

Grid narrows. Hero variant may drop to 1 column if space is insufficient. Standard cards: same grid.

### Mobile (<768px)

Per spec section 14, metric cards switch to **horizontal scroll**:

| Property | Value |
|----------|-------|
| Layout | Single horizontal row, `overflow-x: auto` |
| Scroll snap | `scroll-snap-type: x mandatory` on container. `scroll-snap-align: start` on each card. |
| Card min-width | 200px |
| Gap | `--space-4` (16px) between cards |
| Page padding | `--space-4` (16px) horizontal |
| Scroll indicator | No visible scrollbar. Last card's right edge bleeds past viewport to hint scrollability. |
| Momentum | Native momentum scrolling (`-webkit-overflow-scrolling: touch`) |
| Hero variant | Same min-width as standard on mobile. Loses column span advantage. Distinguished only by larger text size and optional icon. |

---

## Animation Specs

| Animation | Property | Duration | Easing | Trigger |
|-----------|----------|----------|--------|---------|
| Value count-up | Text content (numeric interpolation) | ≤2000ms | ease-out | Value change or viewport entry |
| Hover border | `border-color` | 150ms | ease | Mouse enter/leave |
| Skeleton pulse | `opacity` | 1.8s | ease-in-out | Loading state (infinite) |

### Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- Value count-up: instant (final value shown immediately)
- Hover border: instant (no transition)
- Skeleton pulse: static at 40% opacity

---

## Hero Variant — Per-Dashboard Usage

### Life Systems Hub

| Metric | Icon | Label | Example Value | Subtitle Example |
|--------|------|-------|---------------|------------------|
| Current Streak | Lucide `Flame` | "Current Streak" | "12 days" | "Your best yet." |

### Agent Control Center

| Metric | Icon | Label | Example Value | Subtitle Example |
|--------|------|-------|---------------|------------------|
| Active Today | Lucide `Activity` | "Active Today" | "4" | "3 running, 1 scheduled" |

Only ONE hero metric card per dashboard view. Choose the metric that the user cares about most at a glance.

---

## Do Not List

1. **Do not make all cards equal weight.** The audit explicitly flagged this. Use the hero variant for the most important metric on each dashboard.
2. **Do not use JetBrains Mono for the headline value.** Per spec section 17, summary/headline metrics use Inter. Monospace is for detail tables and chart values.
3. **Do not add a left-border accent** to metric cards. The instrument border is specific to AgentStatusCards.
4. **Do not use orange for trend indicators.** Orange is `--color-accent` reserved for CTAs and celebrations. Trends use `--color-success` (green) and `--color-error` (red).
5. **Do not show a spinner** for loading states. Skeleton placeholders only.
6. **Do not use pill-shaped cards.** Border radius is `8px` (dashboard standard).
7. **Do not animate card height or width.** Cards have fixed min-dimensions. Only animate `border-color`, `opacity`, `transform` (if clickable), and text content.
8. **Do not use pure black (`#000000`)** for the card background. It's `--surface-1` (`#18181B`).
9. **Do not show the trend indicator when there's no comparison data.** If the metric has no previous period to compare against, hide the trend entirely rather than showing "0%".
10. **Do not use the hero variant for more than one card per view.** If everything is a hero, nothing is. The hero is a deliberate hierarchy signal.
