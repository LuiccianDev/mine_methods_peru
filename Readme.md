
# Mining Extraction Methods in Peru

**Territorial analysis and interactive visualization of Peruvian mining patterns**

> _Which extraction method dominates in Peru according to mineral type and region, and how does it relate to productive scale and development status?_

[![Astro](https://img.shields.io/badge/Astro-5-ff5d01?logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![ECharts](https://img.shields.io/badge/ECharts-6-aa344d?logo=apacheecharts&logoColor=white)](https://echarts.apache.org)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Python](https://img.shields.io/badge/Python-3.12-3776ab?logo=python&logoColor=white)](https://python.org)
[![Pandas](https://img.shields.io/badge/Pandas-3-150458?logo=pandas&logoColor=white)](https://pandas.pydata.org)

---

## About the Project

This project addresses a **central Data Science question** about mining in Peru, combining exploratory data analysis with an interactive, scrollytelling-style visual presentation.

Based on a dataset of **3,057 Peruvian mining sites** (from [Mineral Ores Around the World — Kaggle](https://www.kaggle.com/datasets/ramjasmaurya/mineral-ores-around-the-world/data)), a complete pipeline is built:

```
Raw CSV → Cleaning (Python/Pandas) → Exploratory analysis → JSON export → Interactive dashboard (Astro + React + ECharts)
```

The result is a **high-performance static dashboard** with interactive charts, maps, and visual storytelling that answers the main question through 5 analytical blocks.

---

## Analysis Blocks

| Block | Question | Visualizations |
|-------|----------|----------------|
| **01 — National Diagnosis** | What is the predominant method? | Donut chart of methods + information gap cards |
| **02 — Mineral × Method** | Is underground mining concentrated in specific minerals? | Correlation heatmap + stacked bar by mineral |
| **03 — Territorial Distribution** | Are there regions where one method dominates? | Regional bar chart + interactive Leaflet map |
| **04 — Productive Scale** | Is the method associated with production size? | Stacked bar method vs scale |
| **05 — Life Cycle** | Do projects in production have less ambiguity? | Bar chart development status vs method |

### 🎯 Key Findings

- **Underground mining dominates** among sites with registered method (~Andean tradition of polymetallic veins)
- **Mineral determines method** — Zn, Pb, Ag, Au → Underground; Cu → Surface (porphyry deposits)
- **Clear territorial patterns** — Central Andes (Junín, Pasco, Ancash) are predominantly underground; the south (Arequipa, Cusco) shows more diversification
- **Scale matters** — Surface tends to larger scale; Underground to small/medium operations
- **Maturity reduces ambiguity** — Producers have defined method; Prospects/Occurrences have higher proportion Unknown
- **Critical information gap** — ~76% of sites lack registered extraction method

---

## 🏗️ Project Architecture

```text
mine_methods_peru/
│
├── analysis/                    # 🐍 Data Science pipeline
│   ├── Data/
│   │   └── df_peru_cleaned.csv  # Clean dataset (3,057 records)
│   ├── Docs/
│   │   ├── DATASET_INFO.md      # Data dictionary
│   │   └── GUIA_PLAN.md         # Analytical plan
│   ├── script/
│   │   ├── clean_data.ipynb     # Cleaning notebook
│   │   └── analisis_mineria_peru.ipynb  # Exploratory analysis + export
│   └── pyproject.toml           # Python dependencies (uv)
│
├── frontend/                    # 🚀 Interactive dashboard
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/          # ECharts components (6 charts)
│   │   │   └── maps/            # Leaflet component (interactive map)
│   │   ├── sections/            # Narrative sections (.astro)
│   │   ├── data/                # JSON exported from Python
│   │   ├── layouts/             # Main layout
│   │   ├── pages/               # Routes (index.astro)
│   │   └── styles/              # Global CSS + Tailwind
│   ├── public/fonts/            # Roboto Condensed font
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
│
└── Readme.md
```

---

## 🛠️ Tech Stack

### Data Science (analysis/)

| Tool | Use |
|------|-----|
| **Python 3.12** | Main analysis language |
| **pandas** | Data manipulation and cleaning |
| **NumPy** | Numerical operations |
| **Matplotlib + Seaborn** | Exploratory visualization |
| **Plotly** | Interactive charts in notebooks |
| **Jupyter Notebook** | Analysis environment |
| **uv** | Package and environment manager |

### Frontend (frontend/)

| Tool | Use |
|------|-----|
| **Astro 5** | SSG framework (Static Site Generation) |
| **React 19** | Interactive components (islands architecture) |
| **ECharts 6** | High-performance interactive charts |
| **Leaflet + React-Leaflet 5** | Interactive map of mining sites |
| **Tailwind CSS 4** | Utility-first design system |
| **TypeScript** | Strict typing throughout frontend |
| **pnpm** | Package manager |

### Visual Design

- **Exclusive dark theme** — background `#000000` / `#0a0a0a`, lime accents `#c1d65b` and brown `#846248`
- **Glassmorphism** — cards with `backdrop-filter: blur()` and semi-transparent backgrounds
- **Typography** — Roboto Condensed
- **Scrollytelling** — visual narrative with sequential thematic sections

---

## 📊 Dataset

| Field | Description |
|-------|-------------|
| `site_name` | Mining site name |
| `latitude` / `longitude` | Geographic coordinates |
| `state` | Region/department of Peru |
| `commod1` | Main mineral or group of minerals |
| `work_type` | Extraction method (Surface, Underground, Surface/Underground, Unknown) |
| `prod_size` | Productive scale (S: small, M: medium, Y: large, U: unknown) |
| `dev_stat` | Development status (Producer, Past Producer, Prospect, Occurrence, etc.) |
| `ore` | Main extracted mineral |

**Source:** [Mineral Ores Around the World](https://www.kaggle.com/datasets/ramjasmaurya/mineral-ores-around-the-world/data) — filtered for Peru (3,057 records)

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 10
- [Python](https://python.org/) >= 3.12
- [uv](https://docs.astral.sh/uv/) (Python package manager)

### 1. Clone the repository

```bash
git clone https://github.com/LuiccianDev/mine_methods_peru.git
cd mine_methods_peru
```

### 2. Data analysis (optional — JSONs are already generated)

```bash
cd analysis
uv sync                          # Install Python dependencies
# Open notebooks in Jupyter to explore the analysis
uv run jupyter notebook
```

### 3. Frontend — Development

```bash
cd frontend
pnpm install                     # Install dependencies
pnpm dev                         # Development server → http://localhost:4321
```

### 4. Frontend — Production

```bash
cd frontend
pnpm build                       # Static build → dist/
pnpm preview                     # Local preview of the build
```

---

## 📂 Data Flow

```text
┌─────────────────────┐
│  Kaggle Dataset CSV  │
│  (Mineral Ores)      │
└────────┬────────────┘
         │ Filter: country == "Peru"
         ▼
┌─────────────────────┐
│  clean_data.ipynb    │  Cleaning and standardization
│  (Python/Pandas)     │
└────────┬────────────┘
         ▼
┌─────────────────────┐
│df_peru_cleaned.csv   │  3,057 clean records
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│analisis_mineria.ipynb│  EDA + Aggregations by block
│  (Python/Pandas)     │
└────────┬────────────┘
         │ JSON export by block
         ▼
┌─────────────────────┐
│  frontend/src/data/  │  Static JSONs (B1–B5 + GeoJSON)
│  ├── B1/             │
│  ├── B2/             │
│  ├── B3/             │
│  ├── B4/             │
│  └── B5/             │
└────────┬────────────┘
         │ Import in frontmatter (.astro)
         ▼
┌─────────────────────┐
│  Astro Pages +       │  React components with ECharts
│  React Islands       │  and Leaflet rendered as
│  (SSG → HTML)        │  interactive islands
└─────────────────────┘
```

---

## 🎨 Screenshots

> _The dashboard is a static interactive site. Run `pnpm dev` to explore it live._

### Dashboard Sections

1. **Hero** — Visual presentation with background map
2. **Context** — Dataset and methodology description
3. **Block 1** — Information gap + methods donut
4. **Block 2** — Mineral-method heatmap + stacked bar composition
5. **Block 3** — Regional volume + spatial density + interactive Leaflet map
6. **Block 4** — Scale-method relationship (stacked bar)
7. **Block 5** — Development status vs method
8. **Conclusions** — Synthesis of the 5 main findings

---

## 📝 Available Scripts

### Frontend (from `frontend/`)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server (hot reload) |
| `pnpm build` | Production build (static) |
| `pnpm preview` | Preview production build |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check format without writing |

### Analysis (from `analysis/`)

| Command | Description |
|---------|-------------|
| `uv sync` | Install Python dependencies |
| `uv run jupyter notebook` | Launch Jupyter to explore notebooks |

---

## 🤝 Contribution

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-visualization`)
3. Commit changes (`git commit -m 'feat: add new chart'`)
4. Push to the branch (`git push origin feature/new-visualization`)
5. Open a Pull Request

---

## 📄 License

This project is for educational use and was developed as part of the **Codedex Data Science Challenge 2026**.

---

<p align="center">
  Made with 🧪 data + ⚡ code by <a href="https://github.com/LuiccianDev">LuiccianDev</a>
</p>
