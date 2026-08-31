import { escapeHtml } from './shared.js'

const icons = {
  rings: '<circle cx="10" cy="12" r="6"/><circle cx="18" cy="12" r="6"/>',
  glass: '<path d="M6 3h12l-2 8a5 5 0 0 1-10 0L6 3Zm6 13v5m-4 0h8"/>',
  plate: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/>',
  music: '<path d="M9 18V6l10-2v12M9 18c0 2-5 2-5 0s5-3 5 0Zm10-2c0 2-5 2-5 0s5-3 5 0Z"/>',
}

export function itinerary(items) {
  return `<section class="itinerary invitation-section section-shell" aria-labelledby="itinerary-title">
    <div class="section-heading"><span>Así viviremos el día</span><h2 id="itinerary-title">Itinerario</h2></div>
    <div class="timeline" data-timeline><div class="timeline__line" data-timeline-line></div>
      ${items.map((item) => `<article class="timeline__item" data-timeline-item>
        <div class="timeline__icon"><svg viewBox="0 0 24 24" aria-hidden="true">${icons[item.icon] || icons.rings}</svg></div>
        <time>${escapeHtml(item.time)}</time><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p>
      </article>`).join('')}
    </div>
  </section>`
}
