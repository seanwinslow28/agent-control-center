# Agent Control Center — Design Specification

> **Version:** 2.0
> **Date:** March 12, 2026
> **Scope:** This spec governs all design decisions for the Agent Control Center (`agent-control-center/`). It is self-contained — read this file and nothing else before building.

---

## 1. Design Philosophy

**"Mission control meets terminal."**

The Agent Control Center has two visual modes that coexist — they're two sides of the same command center:

- **The clean engineering dashboard** (Zone 1): Linear-grade, data-dense, professional. This is where you monitor agent status, review run history, analyze costs. It feels like sitting at a modern mission control desk.
- **The retro terminal playground** (Zone 2): Pixel art, 8-bit, CRT aesthetic. This is where the pixel agents office lives — characters walking around in a pixel art command center. It's the "fun room" of the control center.

The signature is **neon green** — the color of terminals, status indicators, and operational readiness. Green means "systems nominal." It glows subtly on dark surfaces, giving the dashboard an instrument-panel warmth that raw data lacks.

**Soul:** The *feeling* of sitting at a 1960s command console (deliberate, calm, in control) expressed through modern UI. Kubrick corridor meets Linear dashboard. Nobody's life is in danger — these are helpful Claude agents running tasks. Calm operator energy.

**Mode:** Dark mode only. Always.

---

## 2. Shared Foundations

These fundamentals are consistent across all Sean Winslow projects.

### Spacing System

**4px base unit.** All spacing derives from multiples of 4px.

| Token | Value | Common Use |
|-------|-------|------------|
| `--space-1` | 4px | Tight internal padding (badge padding) |
| `--space-2` | 8px | Icon gaps, compact element spacing |
| `--space-3` | 12px | Default internal padding |
| `--space-4` | 16px | Standard element spacing |
| `--space-5` | 20px | Card internal padding |
| `--space-6` | 24px | Section padding, card gaps |
| `--space-8` | 32px | Major section gaps |
| `--space-10` | 40px | Large section dividers |
| `--space-12` | 48px | Page section spacing |
| `--space-16` | 64px | Hero spacing, major section breaks |

### Breakpoints

| Token | Value | Target |
|-------|-------|--------|
| `--bp-mobile` | 640px | Mobile devices |
| `--bp-tablet` | 768px | Tablets |
| `--bp-desktop` | 1024px | Desktop |
| `--bp-wide` | 1280px | Wide screens |

### Accessibility (Non-Negotiable)

- WCAG AA contrast ratios minimum on all text.
- All interactive elements have visible focus indicators: `2px solid var(--color-primary)` with `2px offset`.
- Keyboard navigation support on all interactive elements.
- Minimum `44x44px` touch targets on mobile.
- **Mandatory reduced-motion kill switch:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Motion Principles

- **Max transition duration:** 400ms. Nothing longer.
- **Micro-interactions (hover, focus):** 150–200ms.
- **Easing:** `ease-out` for entrances, `ease-in` for exits, `ease-in-out` for state changes.
- **GPU-only properties:** Only animate `transform` and `opacity`. Never animate `height`, `width`, or `margin`.
- **Exception:** Zone 2 retro animations (CRT scanlines, pixel transitions) may use additional properties within that contained page.

### Icon Library: Lucide

All icons in Zone 1 use **Lucide** ([lucide.dev](https://lucide.dev)) via the `lucide-react` package. Zone 2 may use pixel art icons.

| Token | Size | Usage |
|-------|------|-------|
| `--icon-sm` | 16px | Inline with text (badges, status indicators, metadata) |
| `--icon-md` | 20px | Default. Sidebar navigation, buttons, card actions |
| `--icon-lg` | 24px | Page headers, standalone icon buttons, metric card icons |

**Rules (Zone 1):**
- Stroke only (Lucide default outline style, 2px stroke weight).
- No decorative icons — every icon serves a functional purpose.
- Consistent metaphors — once an icon is assigned to a concept, that mapping is fixed.

**Icon Assignments:**
| Concept | Icon | Size |
|---------|------|------|
| Dashboard/Home | `LayoutDashboard` | 20px |
| Agents | `Crosshair` | 20px |
| Terminal/Pixel | `Monitor` | 20px |
| Settings | `Settings` | 20px |
| Activity/Runs | `Activity` | 20px |

### Font Loading

Google Fonts — Inter, JetBrains Mono. Use `font-display: swap` and preload critical fonts. Zone 2 may load a pixel font (e.g., Press Start 2P) separately.

### No Emoji

Emoji are never used in UI — not in copy, not in status labels, not in navigation. Use Lucide icons for visual accents (Zone 1) or pixel art icons (Zone 2).

### Micro-Copy Consistency

| Pattern | Rule | Example |
|---------|------|---------|
| Dates | Always ISO-ish: "Mar 3, 2026" | Not "3/3/26" or "March 3rd, 2026" |
| Times | 12-hour with am/pm, no space | "6:00am" not "6:00 AM" or "18:00" |
| Currency | Dollar sign, no space, 2 decimals | "$0.12" not "$ 0.12" or "$0.1" |
| Duration | Compact: "2m 5s" or "45s" | Not "2 minutes and 5 seconds" |
| Relative time | Use within last 24h: "3 hours ago" | Beyond 24h: absolute date |
| Percentages | No space before % | "33%" not "33 %" |

### Form Validation Timing

All form validation triggers **on submit**. No validation on blur, no real-time validation.

| Behavior | Spec |
|---------|------|
| Trigger | Validation runs when submit button is clicked. All errors appear at once. |
| Error display | All invalid fields show errors simultaneously. First invalid field receives focus. |
| Error clearing | Field error clears when user modifies that field's value (on `input` event). |
| Invalid field styling | Border color transitions to `--color-error` at `150ms ease`. Error text beneath field fades in at `150ms`. |
| Submit button | Always enabled. No disabled state based on validation. |

---

## 3. Color System

### Primary Palette — Neon Green Identity

The Agent Control Center's signature is **neon green** — the color of terminals, operational readiness, and "systems nominal." Green replaces blue as the primary accent throughout this project.

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Primary Green | `--color-primary` | `#4ADE80` | Active states, running status, links, primary buttons, sidebar active, data series |
| Primary Green Muted | `--color-primary-muted` | `#22C55E` | Hover states, secondary emphasis |
| Accent Orange | `--color-accent` | `#F97316` | Attention needed, warnings, alerts |
| Accent Orange Muted | `--color-accent-muted` | `#FB923C` | Hover states on accent elements |

### Semantic Colors

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Success / Running | `--color-success` | `#4ADE80` | Maps to primary green — agent running, completed |
| Warning / Attention | `--color-warning` | `#F97316` | Agent needs attention, approaching limits |
| Error / Failed | `--color-error` | `#EF4444` | Agent failed, critical alerts |
| Info | `--color-info` | `#4ADE80` | Maps to primary green |

### Dark Mode Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `--surface-0` | `#09090B` | App background (near-black, NOT pure black) |
| `--surface-1` | `#18181B` | Cards, sidebar background |
| `--surface-2` | `#27272A` | Elevated cards, dropdowns, modals |
| `--surface-3` | `#3F3F46` | Borders, dividers, subtle separators |
| `--text-primary` | `#FAFAFA` | Primary text |
| `--text-secondary` | `#A1A1AA` | Secondary/muted text |
| `--text-tertiary` | `#71717A` | Placeholder text, disabled states |

### Zone 2 Surfaces (Terminal Page)

Zone 2 may use darker surface values for a more immersive terminal feel:

| Token | Hex | Usage |
|-------|-----|-------|
| `--surface-terminal` | `#050505` | Terminal background (near-true-black) |
| `--text-terminal` | `#4ADE80` | Green terminal text |
| `--text-terminal-dim` | `#22C55E` at 60% opacity | Dimmed terminal text |

### The Green Glow — Signature Effect

The neon green should **glow subtly** on dark surfaces. This is the visual signature.

```css
/* Instrument border glow */
box-shadow: 0 0 8px rgba(74, 222, 128, 0.15);

/* Active sidebar item glow */
box-shadow: 0 0 12px rgba(74, 222, 128, 0.1);

/* Status indicator glow (running) */
box-shadow: 0 0 6px rgba(74, 222, 128, 0.25);
```

Apply glow to: instrument borders on agent cards, active sidebar items, running status indicators. Keep it subtle — the glow is atmospheric, not decorative.

### Color Ratio

- **Green: ~70% of accent usage.** Running status, active states, links, data lines, progress.
- **Orange: ~25% of accent usage.** Attention/warning states, alerts, cost anomalies.
- **Red: ~5%.** Failure states only.

---

## 4. Typography

### Font Stack

| Role | Font | Weight Range |
|------|------|--------------|
| UI text | **Inter** | 400 (Regular), 500 (Medium), 600 (SemiBold) |
| Data, logs, code | **JetBrains Mono** | 400 (Regular), 500 (Medium) |
| Zone 2 only | **Press Start 2P** (or similar pixel font) | 400 |

**No Sora.** Sora is the portfolio's signature font. This project uses Inter for headings and JetBrains Mono for data — engineering-grade clarity.

### JetBrains Mono — Extended Usage

JetBrains Mono gets **more usage** here than in other projects. It's the instrument readout font.

| Context | Font |
|---------|------|
| Agent names | JetBrains Mono Medium 500 |
| Log output | JetBrains Mono Regular 400 |
| Cost values | JetBrains Mono Regular 400 |
| Run duration | JetBrains Mono Regular 400 |
| Turn counts | JetBrains Mono Regular 400 |
| Status labels | JetBrains Mono Regular 400 |
| Chart axes | JetBrains Mono Regular 400 |
| Headings and body text | Inter (standard rules) |

### Type Scale

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--text-h1` | 36px / 2.25rem | 1.2 | Page titles |
| `--text-h2` | 28px / 1.75rem | 1.3 | Section headings, hero metric values |
| `--text-h3` | 22px / 1.375rem | 1.4 | Subsection headings |
| `--text-h4` | 18px / 1.125rem | 1.4 | Card titles, labels |
| `--text-body` | 16px / 1rem | 1.6 | Body text |
| `--text-small` | 14px / 0.875rem | 1.5 | Metadata, captions |
| `--text-caption` | 12px / 0.75rem | 1.4 | Labels, badges, timestamps |
| `--text-mono` | 14px / 0.875rem | 1.6 | Agent data, log entries, cost values |

### Font Weight Rules

- **Headings:** Inter SemiBold 600.
- **Body:** Inter Regular 400. Medium 500 for inline emphasis.
- **Monospace:** JetBrains Mono Regular 400. Medium 500 for agent names and highlighted log entries.
- **Never use font weights below 400.**

---

## 5. Layout & Grid

### Dashboard Layout

- **Sidebar width:** 240px (expanded), 64px (collapsed/icon-only)
- **Main content area:** Fluid, fills remaining space
- **Card grid:** CSS Grid, `auto-fill`, `minmax(320px, 1fr)`
- **Max content width:** None (dashboards use full viewport)
- **Background:** Faint grid pattern (Vercel-style) — evokes control room grids without being literal. Implemented as a subtle CSS background pattern on `--surface-0`.

### Information Density

Comfortable-to-compact. Data-dense but never cramped. Think Linear's issue list — readable rows with clear hierarchy.

---

## 6. Two Visual Zones

### Zone 1: Dashboard Pages

**Pages:** Home (`/`), Agent Detail (`/agent/:id`), Settings (`/settings`)

**Aesthetic:** Clean, professional, Linear-grade engineering UI. shadcn/ui components with the green accent. This is where real work happens.

**Rules:**
- Standard component patterns (see §7)
- All typography rules apply (Inter + JetBrains Mono)
- Green glow is subtle and purposeful (instrument borders, status indicators)
- No pixel fonts, no CRT effects, no retro chrome
- Data tables, metric cards, charts — all engineering-grade

### Zone 2: Terminal / Pixel Page

**Page:** `/terminal` or `/pixel-office`

**Aesthetic:** An 8-bit video game running in a terminal. CRT aesthetic, pixel art, retro green-on-black. The pixel agents office lives here — characters walking around in a pixel art command center.

**Rules:**
- Pixel fonts (Press Start 2P or similar) are WELCOME
- CRT scanline overlay encouraged
- Terminal green glow can be more aggressive
- 8-bit sound effects welcome
- Retro chrome (beveled borders, terminal frames) encouraged
- The page is essentially a contained canvas/game view

**Transition between zones:** Navigation between Zone 1 and Zone 2 uses a standard page transition (crossfade 200ms). The visual shift is intentional — you're "entering the fun room."

---

## 7. Component Patterns

### Cards (Zone 1)

```
Dashboard Cards:
- Background: var(--surface-1)
- Border: 1px solid var(--surface-3)
- Border Radius: 8px
- Shadow: none (borders define edges)
- Hover: border color lightens to var(--text-tertiary)
- Padding: var(--space-5)
```

### AgentStatusCard

| Element | Spec |
|---------|------|
| Left border | 3px solid [status-color] — the "instrument indicator" |
| Green glow | `box-shadow: 0 0 8px rgba(74, 222, 128, 0.15)` on running agents |
| Top row | Agent name (JetBrains Mono Medium 500, `--text-h4`) + Status badge (right) |
| Second row | Schedule (Inter Regular 400, `--text-small`, `--text-secondary`) |
| Bottom row | "Last run [relative time] · Cost [JBM] · Turns [JBM]" |
| Hover | Border transitions to `--text-tertiary` at 150ms |

### MetricCard

Two variants:

**Standard:** Label + value + optional icon
**Hero:** Spans 2 grid columns, larger value (`--text-h2`), prominent icon (24px). Used for "Active Today" with Activity icon.

### Sidebar Navigation

| Element | Spec |
|---------|------|
| Position | Fixed left rail |
| Width | 240px expanded, 64px collapsed |
| Background | `--surface-1` |
| Border right | 1px `var(--surface-3)` |
| Items | Icon (20px) + label. Active: `--color-primary` (green) text with subtle green glow background |
| Active glow | `box-shadow: 0 0 12px rgba(74, 222, 128, 0.1)` on active item |

### LogViewer

| Element | Spec |
|---------|------|
| Font | JetBrains Mono Regular 400, `--text-mono` (14px) |
| Background | `--surface-1` or slightly darker |
| Text color | `--text-primary` with optional faint green tint (`rgba(74, 222, 128, 0.05)` background) |
| New entries | Slide in from top with subtle fade, contained scroll area |
| Timestamps | `--text-tertiary` |
| Error lines | `--color-error` text |
| Terminal feel | This component should feel particularly terminal-like |

### Buttons

| Variant | Background | Text | Border | Usage |
|---------|-----------|------|--------|-------|
| Primary | `var(--color-primary)` | `#000000` | none | Main actions (green bg, dark text) |
| Secondary | transparent | `var(--text-primary)` | 1px `var(--surface-3)` | Cancel, secondary |
| Ghost | transparent | `var(--text-secondary)` | none | Tertiary, icon buttons |
| Destructive | `var(--color-error)` | `#FFFFFF` | none | Dangerous actions (rare) |

- Border radius: 6px
- Padding: 6px 12px (compact/dashboard)
- Transition: 150ms ease
- Note: Primary button uses dark text on green bg for contrast.

### Input Fields

- Background: `var(--surface-0)` with 1px border `var(--surface-3)`
- Focus: border color transitions to `var(--color-primary)` (green) with subtle glow
- Border radius: 6px
- Height: 36px (compact/dashboard)

### Data Display

- **Tables:** Clean rows, subtle row dividers, no alternating row colors. JetBrains Mono for all data values. Used for agent run history.
- **Cards:** For entity display (agent profiles, metric summaries).
- **Lists:** For sequential/log data. Monospace font, contained scroll area.

---

## 8. Agent Status System

| Status | Label | Color | Usage |
|--------|-------|-------|-------|
| Running | "Running" | `--color-primary` (`#4ADE80` green) | Agent currently executing |
| Completed | "Completed" | `#22C55E` (green-500, slightly darker) | Successful run |
| Attention | "Needs Attention" | `--color-accent` (`#F97316` orange) | Requires review |
| Failed | "Failed" | `--color-error` (`#EF4444` red) | Run failed |
| Disabled | "Disabled" | `--text-tertiary` (gray) | Agent turned off |
| Scheduled | "Scheduled" | `--text-secondary` (gray) | Future run pending |
| Idle | "Idle" | `--text-tertiary` (gray) | No recent runs, not disabled |

### Status Change Behavior

Agent status changes follow the **inline model** — the status badge on the agent card updates in place with a color transition (300ms). No floating toasts for agent events. The calm operator energy means you notice changes by scanning the dashboard, not by being interrupted.

### Agents

| Agent | Schedule |
|-------|----------|
| Daily Driver (Morning) | daily 6:00am |
| Daily Driver (Evening) | daily 5:00pm |
| Daily Driver (Weekly) | Fridays 4:00pm |
| Spending Analysis | Sundays 9:00am |
| Process Inbox | daily 8:00am (planned) |
| Health Audit | daily 7:00pm (planned) |

---

## 9. Motion & Interaction

### Zone 1: Dashboard Motion

- **Snappy and immediate.** Interactions feel instant. No scroll animations.
- **Hover states:** Border/background transitions at 150ms.
- **Panel/modal opens:** Scale 0.98→1.0 + opacity, 200ms.
- **Tab/view switching:** Crossfade 150ms. No sliding.
- **Status transitions:** Card border/indicator color transitions smoothly at 300ms.
- **No urgent alarms.** A failed agent shifts to orange/red calmly. No flashing, no pulsing.
- **Log streaming:** New entries slide in from top with subtle fade. Contained scroll.

### Zone 2: Retro Motion

- CRT scanline animation (subtle, continuous)
- Pixel character walk cycles (sprite sheet animation)
- Terminal cursor blink
- 8-bit transition effects between states
- These animations are exempt from the GPU-only rule within Zone 2's canvas element
- `prefers-reduced-motion` still applies — disable CRT flicker and reduce animation to minimum viable state

---

## 10. Empty & Loading States

### Empty State Pattern

**Treatment:** Illustrated + Text + CTA

| Element | Spec |
|---------|------|
| Illustration | Geometric/abstract, max 120x120px, `--color-primary` (green) + `--color-accent` (orange). Inline SVGs. |
| Headline | Inter SemiBold 600, `--text-h3` (22px), `--text-primary`. One line. |
| Description | Inter Regular 400, `--text-body` (16px), `--text-secondary`. 1–2 sentences. |
| CTA Button | Primary button variant. |
| Spacing | 24px illustration→headline, 12px headline→description, 24px description→button |

### Empty State Copy

| Screen | Headline | Description | CTA |
|--------|----------|-------------|-----|
| Agent Run History | No runs yet | This agent will log results after its first scheduled run, or test it now. | Run Agent |
| Dashboard (no agents) | No agents configured | Set up your first Claude Code agent to start monitoring. | Add Agent |

### Loading State Pattern

Same page-specific illustration at 40% opacity with gentle pulse (`opacity: 0.3 → 0.5`, 1.8s ease-in-out, infinite). No skeleton placeholders. No spinners.

**Reduced motion:** Static 40% opacity, no pulse.

---

## 11. Responsive & Mobile Layout

### Mobile Navigation: Bottom Tab Bar

Below `--bp-tablet` (768px), the sidebar is replaced by a fixed bottom tab bar.

| Element | Spec |
|---------|------|
| Position | Fixed bottom, full viewport width |
| Height | 56px (includes `env(safe-area-inset-bottom)`) |
| Background | `--surface-1` with `1px solid --surface-3` top border |
| Items | Icon only, no labels. Max 5 tabs. |
| Icon size | 24px |
| Active state | `--color-primary` (green). Inactive: `--text-tertiary`. |
| Tap target | Minimum 44x44px |

**Tab mapping:** Dashboard (home), [agent list shares home view]

### Sidebar Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| >=1024px | Full sidebar: 240px, icons + labels |
| 768px–1023px | Collapsed sidebar: 64px, icons only |
| <768px | Sidebar hidden, bottom tab bar visible |

### Mobile Metric Cards: Horizontal Scroll

Below `--bp-tablet` (768px):

| Element | Spec |
|---------|------|
| Layout | Single horizontal row, `overflow-x: auto`, `scroll-snap-type: x mandatory` |
| Card width | `min-width: 200px`, `scroll-snap-align: start` |
| Gap | 16px |
| Affordance | Last card bleeds to hint at scrollability |

### Zone 2 on Mobile

Zone 2 (Terminal/Pixel page) is **desktop-only**. On viewports below `--bp-desktop` (1024px), show a simplified placeholder: "The pixel office is best experienced on a larger screen." with a monitor icon.

---

## 12. Chart & Data Visualization

### Chart Color Palette

**Primary series:** `--color-primary` (`#4ADE80` green) is always the first/default series. This replaces blue.
**Accent/threshold:** `--color-accent` (orange) for thresholds, cost anomalies, budget limits.

**Multi-series progression:**

| Series | Token | Hex |
|--------|-------|-----|
| Series 1 (default) | `--chart-series-1` | `#4ADE80` (Green) |
| Series 2 | `--chart-series-2` | `#14B8A6` (Teal) |
| Series 3 | `--chart-series-3` | `#8B5CF6` (Violet) |
| Series 4 | `--chart-series-4` | `#64748B` (Slate) |
| Threshold/Anomaly | `--chart-accent` | `#F97316` (Orange) |

### Chart Theme Object (Recharts)

| Element | Spec |
|---------|------|
| Background | Transparent (inherits card `--surface-1`) |
| Grid lines | `--surface-3` at 40% opacity. Horizontal only. |
| Axis labels | JetBrains Mono Regular 400, `--text-caption` (12px), `--text-secondary` |
| Axis lines | `--surface-3` |
| Tooltip background | `--surface-2` with `1px solid --surface-3`. Border radius 6px. |
| Tooltip text | Inter Medium 500, `--text-small`. Values in JetBrains Mono. |
| Tooltip shadow | `0 4px 12px rgba(0, 0, 0, 0.3)` |
| Legend | Inter Regular 400, `--text-small`, `--text-secondary`. Below chart, left-aligned. |
| Data points | 6px circles on hover, hidden by default |
| Line weight | 2px stroke |
| Bar border radius | 4px top corners |

---

## 13. Error Patterns

### Error Voice: Calm & Diagnostic

Factual, unemotional, precise. Mission-control operator reading an instrument. No apologetic language, no humor, no exclamation marks.

```
[Agent Name] [what happened]. [Cause or next step].
```

### Error Copy

| Context | Copy |
|---------|------|
| Agent failure | "[Agent Name] couldn't complete its run. Check the logs for details." |
| CSV parse failure | "This file doesn't match a recognized CSV format. Verify the export source and try again." |
| Network error | "Can't reach the server. Check your connection and try again." |

### Error Display (Three Levels)

| Level | Where | Styling |
|-------|-------|---------|
| Card-level | Within the agent card | Status badge shifts to `--color-error`. Error text in card, `--text-small`. |
| Page-level | Top of main content (rare) | Banner, `--color-error` at 8% opacity background. Dismissible. |
| Log-level | Within LogViewer | Error lines in `--color-error` text against the log background |

---

## 14. Pixel Agents Integration

### What It Is

[pixel-agents](https://github.com/pablodelucca/pixel-agents) is an open-source (MIT) project that visualizes multi-agent AI systems as animated pixel art characters in an isometric office. Each agent becomes a character that walks around, sits at a desk, and reflects real-time status: typing when writing code, reading when searching files, idle when waiting.

### Important: It's a VS Code Extension, Not a Library

Pixel-agents is distributed as a **VS Code extension**. There is no npm package, no exported React components, no public API for embedding in external projects. The rendering engine (Canvas 2D game loop, BFS pathfinding, sprite state machine) lives inside a VS Code webview.

### Integration Paths

**Option A: Fork and Extract** (higher effort, full fidelity)
- Fork the repo and extract the `webview-ui/` canvas layer
- Replace VS Code Webview API communication with your own data source (agent status from your dashboard data)
- Mount the canvas game loop inside a React component via `useRef` + `useEffect` on a `<canvas>` element
- The code is React 19 + TypeScript internally, which aligns with this project's stack

**Option B: Build Inspired Version** (lower effort, custom-tailored)
- Create a minimal HTML5 `<canvas>` component with a game loop
- Use sprite sheets (16x16 pixel art tiles) for agent characters
- Bind character states to your existing agent status data (running → typing animation, completed → idle, failed → alert pose)
- Design a simple isometric office layout
- This approach is lighter and can be tailored exactly to the design system

### Zone 2 Container

The pixel office lives inside Zone 2's terminal page. It should be wrapped in a CRT-style container:

```css
.crt-container {
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.2),
              inset 0 0 60px rgba(74, 222, 128, 0.05);
  overflow: hidden;
  position: relative;
}

/* CRT scanline overlay */
.crt-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    transparent 0px,
    rgba(0, 0, 0, 0.03) 1px,
    transparent 2px
  );
  pointer-events: none;
}
```

### Sprites and Assets

- 16x16 pixel art tileset
- 6 diverse character sprites included in pixel-agents
- Optional paid furniture tileset ("Office Interior Tileset" by Donarg, $2 on itch.io) for full furniture
- Characters can be customized to represent each Claude agent

---

## 15. Anti-Patterns

### Global (Both Zones)

1. **No fire-alarm alerts.** Agent failures are communicated calmly. No flashing red, no pulsing animations, no sound alarms.
2. **No loading spinners.** Use illustrated loading states with pulse animation (Zone 1) or pixel loading animation (Zone 2).
3. **No pure white (#FFFFFF) backgrounds.** Not applicable (dark mode only), but if any light elements exist, use off-whites.
4. **No pure black (#000000) backgrounds.** Surface-0 is `#09090B`. Exception: Zone 2's terminal background (`--surface-terminal: #050505`) may go darker for immersion.
5. **No emoji in UI.** Lucide icons (Zone 1) or pixel art icons (Zone 2).
6. **No gratuitous animation.** Every motion serves a purpose. Zone 2's retro animations serve the immersion purpose.

### Zone 1 Only (Dashboard Pages)

7. **No pixel fonts.** Inter and JetBrains Mono only. The dashboard is clean engineering.
8. **No CRT effects.** No scanlines, no screen flicker, no terminal aesthetic.
9. **No retro chrome.** No beveled borders, no terminal frames, no 8-bit elements. Clean, modern UI only.
10. **No decorative glow borders around the viewport.** The green glow is purposeful — instrument borders and status indicators only, never a full-viewport decoration.

### Zone 2 Only (Terminal/Pixel Page)

**Retro is encouraged:**
- Pixel fonts (Press Start 2P or similar)
- CRT scanline overlay
- Terminal green glow (more aggressive than Zone 1)
- 8-bit sound effects
- Beveled/terminal-style frames
- All contained within the page — no retro elements leak into the sidebar or navigation.

---

## 16. Reference Board

### Engineering UI References

| Reference | What to Draw From |
|-----------|------------------|
| **Linear** | Sidebar nav, data tables, issue list density, dark mode excellence |
| **Vercel** | Grid background pattern, deployment cards, engineering feel |
| **shadcn/ui** | Component patterns, dark mode composition, form elements |
| **Raycast** | Glowing accent colors on dark backgrounds, "mission control" energy |

### Terminal / Retro References (Zone 2)

| Reference | What to Draw From |
|-----------|------------------|
| **pixel-agents** | Isometric pixel office, sprite system, character state machine |
| **cool-retro-term** | CRT shader aesthetic, green-on-black terminal feel |
| **Kubrick's 2001** | Calm, deliberate mission control atmosphere |

---

## 17. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **React + Vite** | Full SPA for real-time agent monitoring |
| Styling | **Tailwind CSS v4** | Shared token system via `@theme` directive |
| Charts | **Recharts** | Agent cost tracking, run history visualization |
| Icons | **lucide-react** | Consistent icon system (Zone 1) |
| Zone 2 Rendering | **HTML5 Canvas** | Pixel art game loop, sprite rendering |
| Hosting | **Netlify** (free tier) | Password-protected deployment |

### Structure

| Page | Route | Zone | Purpose |
|------|-------|------|---------|
| Dashboard Home | `/` | 1 | Agent cards grid, summary metrics, overview |
| Agent Detail | `/agent/:id` | 1 | Tabs: Run History, Logs, Configuration. Cost chart. |
| Settings | `/settings` | 1 | Safety limits, agent configuration display |
| Pixel Office | `/terminal` | 2 | Pixel agents office, CRT terminal aesthetic |

### Data Source

- **Run history:** `agent-run-history.csv` from Obsidian vault. Columns: date, time, agent, mode, status, cost_usd, duration_ms, turns, notes.
- **Log files:** `*.log` from agent logs directory.
- **Parsing:** PapaParse for CSV, client-side.

### "Coming Soon" Pattern

| Element | Spec |
|---------|------|
| Structure | [Feature Name] · [One-sentence description] · "Coming Soon" badge |
| Feel | Roadmap item, not a broken feature |

---

*This specification represents committed design decisions for the Agent Control Center. Every choice was deliberate. The visual identity is neon green on dark surfaces — the instrument glow of a personal command center. Zone 1 is engineering-grade precision. Zone 2 is the pixel playground. "Mission control meets terminal."*
