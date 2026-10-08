import { escapeHtml, imageWithFallback } from './shared.js'

export function gallery(data) {
  return `<section class="gallery invitation-section" data-gallery aria-labelledby="gallery-title" aria-roledescription="carrusel">
    <div class="gallery__heading"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 9h7l2-4h8l2 4h7v18H3Z"/><circle cx="16" cy="17" r="6"/></svg><h2 id="gallery-title">${escapeHtml(data.title)}</h2><p>${escapeHtml(data.subtitle)}</p></div>
    <div class="gallery__track" data-gallery-track tabindex="0" aria-label="Fotografías. Usa las flechas izquierda y derecha para navegar.">${data.photos.map((photo, i) => `<figure class="gallery__slide" data-gallery-slide role="group" aria-roledescription="diapositiva" aria-label="${i + 1} de ${data.photos.length}">${imageWithFallback({ ...photo, className: 'gallery__photo' })}<figcaption>${escapeHtml(data.caption)}</figcaption></figure>`).join('')}</div>
    <div class="gallery__controls"><button type="button" data-gallery-prev aria-label="Fotografía anterior">←</button><div class="gallery__dots">${data.photos.map((_, i) => `<button type="button" data-gallery-dot="${i}" aria-label="Ver fotografía ${i + 1}" ${i === 0 ? 'aria-current="true"' : ''}><span></span></button>`).join('')}</div><button type="button" data-gallery-next aria-label="Fotografía siguiente">→</button></div>
    <p class="sr-only" data-gallery-status aria-live="polite">Fotografía 1 de ${data.photos.length}</p>
  </section>`
}
