# Referencia antes de suavizar el filtro cálido

Valor exacto guardado antes de reducir la saturación y el sepia:

```css
--editorial-photo-filter: grayscale(85%) sepia(80%) saturate(115%) contrast(105%) brightness(104%);
```

Para revertir únicamente esta suavización, reemplazar la declaración de `--editorial-photo-filter` en `src/styles/variables.css` por la línea anterior. Esto restaura el tratamiento cálido intenso en ambas fotografías sin tocar otros cambios.

El nuevo punto intermedio utiliza `sepia(72%) saturate(100%)`, una reducción relativa de saturación de aproximadamente 13 %. Conserva `grayscale(85%) contrast(105%) brightness(104%)`.

La referencia del filtro suave inicial se mantiene por separado en `photo-filter-before-2026-10-16.md`.
