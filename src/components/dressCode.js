import { escapeHtml } from './shared.js'

export function dressCode(data) {
  return `<section class="dress-code invitation-section section-shell" aria-labelledby="dress-title" data-reveal-section>
    <div class="section-heading"><span>Para celebrar con estilo</span><h2 id="dress-title">Código de vestimenta</h2></div>
    <strong class="dress-code__name">${escapeHtml(data.name)}</strong><p>${escapeHtml(data.description)}</p>
  </section>`
}
