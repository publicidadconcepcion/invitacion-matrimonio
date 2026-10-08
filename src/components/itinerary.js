import { escapeHtml } from './shared.js'

const icons = {
  rings: '<circle cx="12" cy="18" r="8"/><circle cx="23" cy="18" r="8"/><path d="m9 9 3-4 3 4m5 0 3-4 3 4"/>',
  glass: '<path d="M7 5h20l-10 13L7 5Zm10 13v12m-6 0h12M10 9h14"/>',
  music: '<path d="M12 25V9l16-4v17M12 25c0 6-9 6-9 1s9-5 9-1Zm16-3c0 6-9 6-9 1s9-5 9-1ZM12 13l16-4"/>',
}

export function itinerary(items, event) {
  const date = new Intl.DateTimeFormat(event.locale, { timeZone: event.timeZone, dateStyle: 'full' }).format(new Date(event.date))
  return `<section class="event-cards invitation-section" aria-label="Ceremonia y celebración">
    ${items.map((item, index) => `<article class="event-card event-card--${index + 1}" data-event-card>
      <span class="event-card__number" aria-hidden="true">0${index + 1}</span>
      <svg class="event-card__icon" viewBox="0 0 36 36" aria-hidden="true">${icons[item.icon] || icons.rings}</svg>
      <h2>${escapeHtml(item.title)}</h2>
      ${index === 0 ? `<p class="event-card__date">${escapeHtml(date)}</p>` : ''}
      <p class="event-card__time">${escapeHtml(item.time.replace(' a ', ' — '))}</p>
      <p class="event-card__description">${escapeHtml(item.description)}</p>
      ${index === 0 ? `<div class="event-card__venue"><h3>${escapeHtml(event.venue)}</h3><address>${escapeHtml(event.address)}</address><p>${escapeHtml(event.locationText)}</p><a class="primary-button" href="${escapeHtml(event.mapsUrl)}" target="_blank" rel="noopener noreferrer">¿Cómo llegar? <span aria-hidden="true">↗</span></a></div>` : ''}
    </article>`).join('')}
  </section>`
}
