import { escapeHtml } from './shared.js'

export function dressCode(data) {
  const swatches = (colors, label) => `<div class="swatches" aria-label="${label}">${colors.map((color) => `<span style="--swatch:${color}" title="${color}"></span>`).join('')}</div>`
  return `<section class="dress-code invitation-section section-shell" aria-labelledby="dress-title" data-reveal-section>
    <div class="section-heading"><span>Para celebrar con estilo</span><h2 id="dress-title">Código de vestimenta</h2></div>
    <strong class="dress-code__name">${escapeHtml(data.name)}</strong><p>${escapeHtml(data.description)}</p><small>${escapeHtml(data.suggestions)}</small>
    <div class="dress-code__palettes"><div><span>Sugeridos</span>${swatches(data.recommendedColors, 'Colores sugeridos')}</div><div><span>Reservados</span>${swatches(data.avoidColors, 'Colores que deben evitarse')}</div></div>
  </section>`
}
