# Análisis Territorial de la Minería en el Perú

Este proyecto explora y visualiza patrones territoriales y productivos de la minería peruana a partir de un dataset nacional de yacimientos, minas y prospectos. El análisis abarca métodos de extracción, tipos de mineral, escala productiva y estado de desarrollo, con visualizaciones interactivas listas para web.

---

## Dataset principal

- **Archivo fuente:** `Data/df_peru_cleaned.csv`
- **Total de registros:** 3057
- **Formato:** CSV (valores separados por coma)
- **Fecha de análisis:** 26 de febrero de 2026

### Diccionario de variables

| Columna         | Descripción                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| site_name       | Nombre del sitio minero (mina, prospecto, concesión, cantera, etc.)         |
| latitude        | Latitud geográfica del sitio (decimal)                                       |
| longitude       | Longitud geográfica del sitio (decimal)                                      |
| state           | Región o departamento del Perú donde se ubica el sitio                       |
| com_type        | Tipo de operación (M: metálica, N: no metálica)                              |
| commod1         | Mineral o grupo de minerales principales presentes                           |
| dep_type        | Tipo de depósito (puede estar vacío)                                         |
| prod_size       | Tamaño de la producción (U: desconocido, S: pequeño, M: mediano, Y: grande)  |
| dev_stat        | Estado de desarrollo (Producer, Past Producer, Occurrence, Prospect, etc.)   |
| ore             | Mineral principal extraído (puede estar vacío)                               |
| work_type       | Tipo de trabajo minero (Surface, Underground, ambos o vacío)                 |
| hrock_type      | Roca hospedante principal (puede estar vacío)                                |
| arock_type      | Roca asociada o secundaria (puede estar vacío)                               |

---

## Observaciones clave

- Cobertura nacional: incluye todas las regiones mineras del Perú.
- Variedad de minerales: oro, plata, cobre, zinc, plomo, hierro, tungsteno, entre otros.
- Métodos de trabajo: superficie (open pit), subterráneo, ambos o no especificado.
- Estados de desarrollo: desde ocurrencias y prospectos hasta minas en producción o abandonadas.
- Información geológica: tipos de roca hospedante y asociada, útil para análisis geológico-minero.

---

## Potencial analítico

Este dataset permite:

- Mapear la distribución de métodos de extracción por región y mineral.
- Analizar la relación entre tipo de mineral y método de extracción.
- Explorar la huella territorial de la minería peruana.
- Identificar patrones geológicos y productivos.

---

## Dependencias principales

- Python >= 3.12
- pandas, numpy, matplotlib, seaborn, plotly, notebook

---

## Estructura del proyecto

```
├── Data/
│   └── df_peru_cleaned.csv
├── Docs/
│   └── DATASET_INFO.md
├── script/
│   ├── analisis_mineria_peru.ipynb
│   └── clean_data.ipynb
├── pyproject.toml
└── README.md
```

---

## Autoría

Codedex Data Science Challenge — LuiccianDev — 2026
