# AGENTS.md - Coding Agent Guidelines

## Project Overview

Data visualization dashboard for Peruvian mining methods. Pipeline: Python analysis -> JSON export -> Astro/React frontend with ECharts and Leaflet maps.

Monorepo with two workspaces:

- **`frontend/`** - Astro 5 + React 19 + Tailwind CSS v4 + TypeScript (strict)
- **`analysis/`** - Python 3.12 data analysis (pandas, Jupyter notebooks, uv)

## Build / Dev / Format Commands

All frontend commands run from the `frontend/` directory using **pnpm**:

```bash
# Install dependencies
cd frontend && pnpm install

# Development server
pnpm dev

# Production build (static output)
pnpm build

# Preview production build
pnpm preview

# Format all files with Prettier
pnpm format

# Check formatting without writing
pnpm format:check
```

Python analysis uses **uv** from the `analysis/` directory:

```bash
cd analysis && uv sync
uv run python script/export_json.py
```

There is **no linter** (no ESLint, no Biome) and **no test framework** configured. Formatting is enforced via Prettier only.

## Tech Stack Details

| Layer         | Technology                                          |
|---------------|-----------------------------------------------------|
| Framework     | Astro v5 (static site generation, `astro/strict` TS)|
| UI            | React 19 via `@astrojs/react`                       |
| Styling       | Tailwind CSS v4 (`@tailwindcss/vite` plugin)        |
| Charts        | ECharts v6 (direct `echarts` API, not echarts-for-react wrapper) |
| Maps          | Leaflet + React-Leaflet v5                          |
| Formatting    | Prettier (plugins: `prettier-plugin-astro`, `prettier-plugin-tailwindcss`) |
| Package mgr   | pnpm v10                                            |
| Data pipeline | Python 3.12, pandas, uv                             |

## Code Style Guidelines

### TypeScript / React (.tsx)

- **Strict TypeScript** - `tsconfig.json` extends `astro/tsconfigs/strict`.
- **React JSX** - configured via `jsxImportSource: "react"` (not Preact).
- **No default React import** - use named imports: `import React, { useEffect, useRef } from 'react'`.
- **ECharts pattern** - import `* as echarts from 'echarts'`, use `useRef<HTMLDivElement>` + `useEffect` with `echarts.init()`. Always dispose and remove resize listeners in cleanup.
- **Props interfaces** - define inline above the component (e.g., `interface DepartmentChartProps { ... }`). Do not use `type` aliases for props.
- **Default exports** - all components use `export default function ComponentName`.
- **No React.FC** - use plain function declarations with typed props.
- **Color constants** - define as module-level `Record<string, string>` objects (e.g., `OCEAN_METHOD_COLORS`).
- **Storytelling maps** - domain descriptions stored as `Record<string, string>` constants at module top.

### Astro Components (.astro)

- **Frontmatter** - imports and data processing go in the `---` fence at the top.
- **Client directives** - React components use `client:only="react"` (not `client:load` or `client:visible`) because they depend on browser APIs (ECharts, Leaflet).
- **Scoped styles** - use `<style>` blocks in `.astro` files. Use `<style is:global>` sparingly (only for CSS custom properties and resets).
- **Layout pattern** - pages wrap content in `<Layout>` which provides `<html>`, `<head>`, `<body>`, and global CSS via `<slot />`.

### Formatting (Prettier)

Enforced rules (see `frontend/.prettierrc`):

- `printWidth: 100`
- `semi: false` (no semicolons)
- `singleQuote: true`
- `tabWidth: 2` (spaces, not tabs)
- `trailingComma: "all"`
- Astro files use the `astro` parser override
- Tailwind class sorting is automatic via `prettier-plugin-tailwindcss`

### Naming Conventions

- **Files**: PascalCase for components (`DepartmentBarChart.tsx`, `Layout.astro`), lowercase for pages (`index.astro`), camelCase for utilities.
- **Components**: PascalCase function names matching file names.
- **Interfaces**: PascalCase, descriptive suffixes like `Props` (e.g., `DepartmentChartProps`).
- **Constants**: UPPER_SNAKE_CASE for lookup maps (`REGION_STORIES`, `OCEAN_METHOD_COLORS`).
- **Variables**: camelCase.
- **CSS custom properties**: `--kebab-case` (e.g., `--bg-primary`, `--accent-cyan`).

### Imports

- Group order: (1) external packages, (2) local components, (3) local data/assets.
- Use relative paths from the importing file (e.g., `../components/charts/...`).
- CSS imports (like `leaflet/dist/leaflet.css`) go at the very top of the file.
- Astro frontmatter uses bare imports without file extensions for `.astro` layouts but includes extensions for data files (`.json`).

### Error Handling

- No explicit try/catch in components; ECharts/Leaflet initialization relies on the `useRef` null check (`if (!chartRef.current) return`).
- No error boundaries are configured. If adding new features that can fail, add a null/guard check early in `useEffect`.

### CSS / Styling

- **Dark theme only** - background `#0f172a` / `#1e293b`, text `#f1f5f9` / `#94a3b8`.
- **Glassmorphism** - cards use `backdrop-filter: blur()` with semi-transparent backgrounds.
- **CSS custom properties** defined in `:root` inside `<style is:global>` on the index page.
- **Tailwind v4** - imported via `@import "tailwindcss"` in `globals.css`. No `tailwind.config.*` file; config is CSS-native.
- **Inline styles** are acceptable in React components for chart containers (`style={{ width: '100%', height: '420px' }}`).
- **ECharts tooltip styles** use inline HTML strings with consistent color tokens.

## Project Structure

```
frontend/src/
  components/
    charts/          # ECharts React components (one chart per file)
    maps/            # Leaflet map components
  data/              # Static JSON data consumed by components
  layouts/           # Astro layout wrappers
  pages/             # Astro page routes (file-based routing)
  styles/            # Global CSS (Tailwind entry point)
  assets/            # Static images/SVGs
```

## Data Flow

1. Raw CSV data lives in `analysis/Data/` (gitignored).
2. Python scripts in `analysis/script/` clean and export to JSON.
3. `frontend/src/data/peru_mining_data.json` is the single data source for all frontend components.
4. Components receive data as props from `index.astro` frontmatter destructuring.

## Key Patterns for New Features

- **New chart**: Create a `.tsx` file in `frontend/src/components/charts/`, follow the ECharts `useRef` + `useEffect` + cleanup pattern from existing charts. Use the dark theme colors.
- **New page**: Create a `.astro` file in `frontend/src/pages/`. Wrap in `<Layout>`.
- **New data**: Update `export_json.py` to add fields, then regenerate `peru_mining_data.json`.
- **Hydration**: Always use `client:only="react"` for components that use browser-only APIs (ECharts, Leaflet). Use `client:load` only for components that work in SSR.

## Common Pitfalls

- No ESLint - rely on TypeScript strict mode and Prettier for code quality.
- Tailwind v4 has no JS config file; all customization is in CSS.
- ECharts must be disposed on component unmount to prevent memory leaks.
- Leaflet CSS must be imported at the component level (`import 'leaflet/dist/leaflet.css'`).
- The `astro.config.mjs` uses double quotes (not affected by Prettier since it's in `.prettierignore`).
