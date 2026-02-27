# Análisis Exploratorio del Dataset: df_peru_cleaned.csv

Este documento describe de manera detallada la estructura y el contenido del dataset `df_peru_cleaned.csv`, que constituye la base para el análisis de la minería en el Perú.

---

## 1. Descripción General

El dataset contiene información sobre yacimientos, minas y prospectos mineros en el Perú, incluyendo su localización, tipo de mineral, método de extracción, estado de desarrollo y características geológicas.

- **Total de registros:** 3057
- **Formato:** CSV (valores separados por coma)

---

## 2. Diccionario de Variables

| Columna         | Descripción                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| site_name       | Nombre del sitio minero (mina, prospecto, concesión, cantera, etc.)         |
| latitude        | Latitud geográfica del sitio (decimal)                                      |
| longitude       | Longitud geográfica del sitio (decimal)                                     |
| state           | Región o departamento del Perú donde se ubica el sitio                      |
| com_type        | Tipo de operación (M: metálica, N: no metálica)                             |
| commod1         | Mineral o grupo de minerales principales presentes                          |
| dep_type        | Tipo de depósito (puede estar vacío)                                        |
| prod_size       | Tamaño de la producción (U: desconocido, S: pequeño, M: mediano, Y: grande) |
| dev_stat        | Estado de desarrollo (Producer, Past Producer, Occurrence, Prospect, etc.)  |
| ore             | Mineral principal extraído (puede estar vacío)                              |
| work_type       | Tipo de trabajo minero (Surface, Underground, ambos o vacío)                |
| hrock_type      | Roca hospedante principal (puede estar vacío)                               |
| arock_type      | Roca asociada o secundaria (puede estar vacío)                              |

---

## 3. Ejemplo de Registros

| site_name                | latitude  | longitude  | state   | com_type | commod1                 | dep_type | prod_size | dev_stat      | ore    | work_type           | hrock_type | arock_type |
|--------------------------|-----------|------------|---------|----------|-------------------------|----------|-----------|---------------|--------|---------------------|------------|------------|
| Concesion                | -3.6249   | -77.8031   | Amazonas| M        | Gold                    |          | U         | Occurrence    |        |                     |            |            |
| "Santa Ursula, Mina"     | -9.78129  | -77.64976  | Ancash  | M        | Zinc, Lead, Silver      |          | N         | Occurrence    |        |                     | Andesite   | Tuff,...   |
| "Rosita De Oro, Mina"    | -9.55797  | -77.05307  | Ancash  | M        | Silver, Lead            |          | M         | Producer      |        | Surface/Underground | Limestone  | Dacite     |

---

## 4. Observaciones Relevantes

- **Cobertura geográfica:** Incluye todas las regiones mineras del Perú.
- **Variedad de minerales:** Oro, plata, cobre, zinc, plomo, hierro, tungsteno, entre otros.
- **Métodos de trabajo:** Superficie (open pit), subterráneo, ambos o no especificado.
- **Estados de desarrollo:** Desde ocurrencias y prospectos hasta minas en producción o abandonadas.
- **Información geológica:** Tipos de roca hospedante y asociada, útil para análisis geológico-minero.

---

## 5. Consideraciones para el Análisis

- Algunos campos pueden contener valores vacíos o nulos.
- La columna `work_type` es clave para identificar el método de extracción (open pit/surface vs underground).
- La columna `prod_size` permite clasificar la escala de la operación.
- La combinación de `state`, `commod1` y `work_type` es fundamental para los análisis territoriales y de patrones.

---

## 6. Potencial Analítico

Este dataset permite:

- Mapear la distribución de métodos de extracción por región y mineral.
- Analizar la relación entre tipo de mineral y método de extracción.
- Explorar la huella territorial de la minería peruana.
- Identificar patrones geológicos y productivos.

---

**Archivo fuente:** Data/df_peru_cleaned.csv

**Fecha de análisis:** 26 de febrero de 2026
