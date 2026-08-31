import { escapeHtml } from './shared.js'

export function locationSection(event) {
  return `<section class="location invitation-section section-shell" aria-labelledby="location-title" data-reveal-section>
    <div class="location__ornament" aria-hidden="true">⌖</div>
    <div class="section-heading"><span>Nos encontraremos en</span><h2 id="location-title">${escapeHtml(event.venue)}</h2></div>
    <address>${escapeHtml(event.address)}</address><p>${escapeHtml(event.locationText)}</p>
    <a class="text-link" href="${escapeHtml(event.mapsUrl)}" target="_blank" rel="noopener noreferrer">Cómo llegar <span aria-hidden="true">↗</span></a>
  </section>`
}
