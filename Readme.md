# Métodos de Extracción Minera en el Perú

**Análisis territorial y visualización interactiva de los patrones mineros peruanos**

> _¿Qué método de extracción domina en el Perú según el tipo de mineral y la región, y cómo se relaciona con la escala productiva y el estado de desarrollo?_

[![Astro](https://img.shields.io/badge/Astro-5-ff5d01?logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![ECharts](https://img.shields.io/badge/ECharts-6-aa344d?logo=apacheecharts&logoColor=white)](https://echarts.apache.org)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Python](https://img.shields.io/badge/Python-3.12-3776ab?logo=python&logoColor=white)](https://python.org)
[![Pandas](https://img.shields.io/badge/Pandas-3-150458?logo=pandas&logoColor=white)](https://pandas.pydata.org)

---

## Sobre el Proyecto

Este proyecto aborda una **pregunta central de Data Science** sobre la minería en el Perú, combinando análisis exploratorio de datos con una presentación visual interactiva tipo _scrollytelling_.

A partir de un dataset de **3,057 sitios mineros** peruanos (extraído de [Mineral Ores Around the World — Kaggle](https://www.kaggle.com/datasets/ramjasmaurya/mineral-ores-around-the-world/data)), se construye un pipeline completo:

```
CSV crudo → Limpieza (Python/Pandas) → Análisis exploratorio → Exportación JSON → Dashboard interactivo (Astro + React + ECharts)
```

El resultado es un **dashboard estático de alto rendimiento** con gráficas interactivas, mapas y narrativa visual que responde a la pregunta principal a través de 5 bloques analíticos.

---

## Bloques de Análisis

| Bloque | Pregunta | Visualizaciones |
|--------|----------|-----------------|
| **01 — Diagnóstico Nacional** | ¿Cuál es el método predominante? | Donut chart de métodos + cards de brecha informativa |
| **02 — Mineral × Método** | ¿La minería subterránea se concentra en minerales específicos? | Heatmap de correlación + Stacked bar por mineral |
| **03 — Distribución Territorial** | ¿Existen regiones donde un método domina? | Bar chart regional + Mapa Leaflet interactivo |
| **04 — Escala Productiva** | ¿El método se asocia con el tamaño de producción? | Stacked bar método vs escala |
| **05 — Ciclo de Vida** | ¿Los proyectos en producción tienen menor ambigüedad? | Bar chart estado de desarrollo vs método |

### 🎯 Hallazgos Clave

- **Minería subterránea domina** entre los sitios con método registrado (~tradición andina de vetas polimetálicas)
- **El mineral condiciona el método** — Zn, Pb, Ag, Au → Underground; Cu → Surface (depósitos porfídicos)
- **Patrones territoriales claros** — Andes centrales (Junín, Pasco, Ancash) son predominantemente subterráneos; el sur (Arequipa, Cusco) muestra más diversificación
- **La escala influye** — Surface tiende a mayor escala; Underground a operaciones pequeñas/medianas
- **La madurez reduce ambigüedad** — Producers tienen método definido; Prospects/Occurrences tienen mayor proporción Unknown
- **Brecha informativa crítica** — ~76% de los sitios carecen de método de extracción registrado

---

## 🏗️ Arquitectura del Proyecto

```text
mine_methods_peru/
│
├── analysis/                    # 🐍 Pipeline de Data Science
│   ├── Data/
│   │   └── df_peru_cleaned.csv  # Dataset limpio (3,057 registros)
│   ├── Docs/
│   │   ├── DATASET_INFO.md      # Diccionario de datos
│   │   └── GUIA_PLAN.md         # Plan analítico
│   ├── script/
│   │   ├── clean_data.ipynb     # Notebook de limpieza
│   │   └── analisis_mineria_peru.ipynb  # Análisis exploratorio + exportación
│   └── pyproject.toml           # Dependencias Python (uv)
│
├── frontend/                    # 🚀 Dashboard interactivo
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/          # Componentes ECharts (6 gráficas)
│   │   │   └── maps/            # Componente Leaflet (mapa interactivo)
│   │   ├── sections/            # Secciones narrativas (.astro)
│   │   ├── data/                # JSON exportados desde Python
│   │   ├── layouts/             # Layout principal
│   │   ├── pages/               # Rutas (index.astro)
│   │   └── styles/              # CSS global + Tailwind
│   ├── public/fonts/            # Tipografía Roboto Condensed
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
│
└── Readme.md
```

---

## 🛠️ Tech Stack

### Data Science (analysis/)

| Herramienta | Uso |

| **Python 3.12** | Lenguaje principal del análisis |
| **pandas** | Manipulación y limpieza de datos |
| **NumPy** | Operaciones numéricas |
| **Matplotlib + Seaborn** | Visualización exploratoria |
| **Plotly** | Gráficas interactivas en notebooks |
| **Jupyter Notebook** | Entorno de análisis |
| **uv** | Gestor de paquetes y entornos |

### Frontend (frontend/)

| Herramienta | Uso |

| **Astro 5** | Framework SSG (Static Site Generation) |
| **React 19** | Componentes interactivos (islands architecture) |
| **ECharts 6** | Gráficas interactivas de alto rendimiento |
| **Leaflet + React-Leaflet 5** | Mapa interactivo de sitios mineros |
| **Tailwind CSS 4** | Sistema de diseño utility-first |
| **TypeScript** | Tipado estricto en todo el frontend |
| **pnpm** | Gestor de paquetes |

### Diseño Visual

- **Tema oscuro exclusivo** — fondo `#000000` / `#0a0a0a`, acentos lima `#c1d65b` y marrón `#846248`
- **Glassmorphism** — cards con `backdrop-filter: blur()` y fondos semitransparentes
- **Tipografía** — Roboto Condensed
- **Scrollytelling** — narrativa visual con secciones temáticas secuenciales

---

## 📊 Dataset

| Campo | Descripción |

| `site_name` | Nombre del sitio minero |
| `latitude` / `longitude` | Coordenadas geográficas |
| `state` | Región/departamento del Perú |
| `commod1` | Mineral o grupo de minerales principales |
| `work_type` | Método de extracción (Surface, Underground, Surface/Underground, Unknown) |
| `prod_size` | Escala productiva (S: pequeño, M: mediano, Y: grande, U: desconocido) |
| `dev_stat` | Estado de desarrollo (Producer, Past Producer, Prospect, Occurrence, etc.) |
| `ore` | Mineral principal extraído |

**Fuente:** [Mineral Ores Around the World](https://www.kaggle.com/datasets/ramjasmaurya/mineral-ores-around-the-world/data) — filtrado para Perú (3,057 registros)

---

## 🚀 Inicio Rápido

### Prerrequisitos

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 10
- [Python](https://python.org/) >= 3.12
- [uv](https://docs.astral.sh/uv/) (gestor de paquetes Python)

### 1. Clonar el repositorio

```bash
git clone https://github.com/LuiccianDev/mine_methods_peru.git
cd mine_methods_peru
```

### 2. Análisis de datos (opcional — los JSON ya están generados)

```bash
cd analysis
uv sync                          # Instalar dependencias Python
# Abrir notebooks en Jupyter para explorar el análisis
uv run jupyter notebook
```

### 3. Frontend — Desarrollo

```bash
cd frontend
pnpm install                     # Instalar dependencias
pnpm dev                         # Servidor de desarrollo → http://localhost:4321
```

### 4. Frontend — Producción

```bash
cd frontend
pnpm build                       # Build estático → dist/
pnpm preview                     # Preview local del build
```

---

## 📂 Flujo de Datos

```text
┌─────────────────────┐
│  Kaggle Dataset CSV  │
│  (Mineral Ores)      │
└────────┬────────────┘
         │ Filtro: country == "Peru"
         ▼
┌─────────────────────┐
│  clean_data.ipynb    │  Limpieza y estandarización
│  (Python/Pandas)     │
└────────┬────────────┘
         ▼
┌─────────────────────┐
│df_peru_cleaned.csv   │  3,057 registros limpios
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│analisis_mineria.ipynb│  EDA + Agregaciones por bloque
│  (Python/Pandas)     │
└────────┬────────────┘
         │ Exportación JSON por bloque
         ▼
┌─────────────────────┐
│  frontend/src/data/  │  JSON estáticos (B1–B5 + GeoJSON)
│  ├── B1/             │
│  ├── B2/             │
│  ├── B3/             │
│  ├── B4/             │
│  └── B5/             │
└────────┬────────────┘
         │ Import en frontmatter (.astro)
         ▼
┌─────────────────────┐
│  Astro Pages +       │  Componentes React con ECharts
│  React Islands       │  y Leaflet renderizados como
│  (SSG → HTML)        │  islands interactivos
└─────────────────────┘
```

---

## 🎨 Capturas

> _El dashboard es un sitio estático interactivo. Ejecuta `pnpm dev` para explorarlo en vivo._

### Secciones del Dashboard

1. **Hero** — Presentación visual con mapa de fondo
2. **Contexto** — Descripción del dataset y metodología
3. **Bloque 1** — Brecha informativa + donut de métodos
4. **Bloque 2** — Heatmap mineral-método + composición por barras apiladas
5. **Bloque 3** — Volumen regional + densidad espacial + mapa interactivo Leaflet
6. **Bloque 4** — Relación escala-método (stacked bar)
7. **Bloque 5** — Estado de desarrollo vs método
8. **Conclusiones** — Síntesis de los 5 hallazgos principales

---

## 📝 Scripts Disponibles

### Frontend (desde `frontend/`)

| Comando | Descripción |

| `pnpm dev` | Servidor de desarrollo (hot reload) |
| `pnpm build` | Build de producción (estático) |
| `pnpm preview` | Preview del build de producción |
| `pnpm format` | Formatear código con Prettier |
| `pnpm format:check` | Verificar formato sin escribir |

### Analysis (desde `analysis/`)

| Comando | Descripción |

| `uv sync` | Instalar dependencias Python |
| `uv run jupyter notebook` | Lanzar Jupyter para explorar notebooks |

---

## 🤝 Contribución

1. Fork del repositorio
2. Crear una rama feature (`git checkout -b feature/nueva-visualizacion`)
3. Commit de cambios (`git commit -m 'feat: agregar nueva gráfica'`)
4. Push a la rama (`git push origin feature/nueva-visualizacion`)
5. Abrir un Pull Request

---

## 📄 Licencia

Este proyecto es de uso educativo y fue desarrollado como parte del **Codedex Data Science Challenge 2026**.

---

<p align="center">
  Hecho con 🧪 datos + ⚡ código por <a href="https://github.com/LuiccianDev">LuiccianDev</a>
</p>
