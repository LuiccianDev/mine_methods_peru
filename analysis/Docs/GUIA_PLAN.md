# Patrones territoriales del método de extracción minera en el Perú según tipo de mineral, escala productiva y estado de desarrollo

## Pregunta principal

**¿Qué método de extracción domina en el Perú según el tipo de mineral y la región, y cómo se relaciona con la escala productiva y el estado de desarrollo del proyecto?**

---

## Estructura general del análisis

El estudio se organiza en 5 grandes bloques analíticos:

1. Diagnóstico nacional del método de extracción
2. Relación método–mineral
3. Distribución territorial (regional)
4. Método y escala productiva
5. Método y madurez del proyecto

---

## BLOQUE 1 — Diagnóstico Nacional

**Subpregunta:** ¿Cuál es el método de extracción predominante en el Perú?

- **Variables:** `work_type`
- **Procedimiento:**
  - Limpiar valores nulos o vacíos
  - Estandarizar categorías: Surface, Underground, Surface/Underground, Unknown
  - Calcular frecuencia absoluta y porcentaje
- **Resultado esperado:**
  - Identificación del método dominante
  - Nivel de ambigüedad en el dataset

---

## BLOQUE 2 — Método según tipo de mineral

**Subpregunta:** ¿La minería subterránea se concentra en minerales específicos?

- **Variables:** `commod1`, `work_type`
- **Procedimiento:**
  - Seleccionar minerales principales (Top 10)
  - Tabla cruzada: Mineral × Método
  - Calcular porcentajes por mineral
- **Resultado esperado:**
  - Oro → Underground
  - Cobre → Surface
  - Zinc/Plomo → Underground

---

## BLOQUE 3 — Análisis Territorial

**Subpregunta:** ¿Existen regiones donde un método domina claramente?

- **Variables:** `state`, `work_type`, `latitude`, `longitude`
- **Procedimiento:**
  - Tabla cruzada estado × método
  - Calcular proporciones por región
  - Identificar regiones con >60% de un método
- **Visualización:**
  - Mapa coroplético o de puntos
- **Resultado esperado:**
  - Identificación de clústeres territoriales

---

## BLOQUE 4 — Método y Escala Productiva

**Subpregunta:** ¿El método de extracción se asocia con el tamaño de producción?

- **Variables:** `work_type`, `prod_size`
- **Procedimiento:**
  - Tabla cruzada método × tamaño
  - Calcular proporciones
- **Resultado esperado:**
  - Surface → más "Large"
  - Underground → más "Small" o "Medium"

---

## BLOQUE 5 — Método y Estado de Desarrollo

**Subpregunta:** ¿Los proyectos en producción presentan menor ambigüedad en el método de extracción?

- **Variables:** `dev_stat`, `work_type`
- **Procedimiento:**
  - Clasificar estados: Producer, Past Producer, Prospect, Occurrence, Others
  - Analizar proporción de "Unknown" en cada categoría
- **Resultado esperado:**
  - Producer → método definido
  - Prospect/Occurrence → mayor ambigüedad

---

## Estructura del informe final

1. Introducción
   - Contextualización de la minería peruana
2. Metodología
   - Fuente: df_peru_cleaned.csv
   - Total registros: 3057
   - Variables clave
3. Resultados
   - 3.1 Diagnóstico nacional
   - 3.2 Método y mineral
   - 3.3 Distribución regional
   - 3.4 Método y escala
   - 3.5 Método y desarrollo
4. Discusión
   - Implicancias técnicas, económicas y territoriales
5. Conclusiones
   - Respuesta directa a la pregunta principal

---

## Respuesta esperada a la pregunta principal

- El método dominante en el Perú es X.
- Determinados minerales condicionan el método.
- Existen patrones territoriales claros.
- El tamaño de producción influye en la elección del método.
- La madurez del proyecto reduce la ambigüedad técnica.

---

## Valor agregado del proyecto

✔ Relaciona geología con técnica extractiva
✔ Integra dimensión territorial
✔ Introduce escala productiva
✔ Evalúa madurez operativa
✔ Detecta incertidumbre informativa

---
