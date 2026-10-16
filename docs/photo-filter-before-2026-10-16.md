# Referencia anterior al último ajuste de color

Estado registrado antes de intensificar el filtro el 16 de octubre de 2026.

Valor exacto anterior en `src/styles/variables.css`:

```css
--editorial-photo-filter: grayscale(85%) sepia(42%) saturate(75%) contrast(103%) brightness(104%);
```

Ambas fotografías utilizan `filter: var(--editorial-photo-filter)` exclusivamente sobre las imágenes:

- `.photo-backdrop img` en `src/styles/editorial.css`.
- `.music-player__cover img` en `src/styles/music.css`.

La superposición existente del fondo se conserva sin cambios:

```css
.photo-backdrop::after {
  position: absolute; inset: 0; content: '';
  background: linear-gradient(180deg, rgba(13,16,14,.3), rgba(13,16,14,.06) 35%, rgba(13,16,14,.45) 65%, rgba(13,16,14,.88));
}
```

Para recuperar exactamente el tratamiento anterior, reemplazar únicamente el valor de `--editorial-photo-filter` en `src/styles/variables.css` por la línea guardada arriba. No restaurar archivos completos ni usar comandos de Git para revertir. No es necesario modificar los selectores, las imágenes originales, la portada ni los estilos de regalos.
