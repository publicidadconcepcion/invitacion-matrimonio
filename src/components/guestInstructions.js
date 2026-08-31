import { escapeHtml } from './shared.js'

export function guestInstructions(items) {
  return `<section class="guest-info invitation-section section-shell" aria-labelledby="info-title" data-reveal-section>
    <div class="section-heading"><span>Para tener en cuenta</span><h2 id="info-title">Información para invitados</h2></div>
    <ul>${items.map((item, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><p>${escapeHtml(item)}</p></li>`).join('')}</ul>
  </section>`
}
