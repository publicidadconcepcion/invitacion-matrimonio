import { escapeHtml } from './shared.js'

export function loveMessage(lines) {
  return `<section class="love-message invitation-section section-shell" aria-labelledby="love-title">
    <span class="section-kicker">Nuestra historia</span>
    <h2 id="love-title" class="sr-only">Un mensaje de amor</h2>
    <div class="love-message__copy">${lines.map((line) => `<p data-love-line>${escapeHtml(line)}</p>`).join('')}</div>
    <span class="flourish" aria-hidden="true">✦</span>
  </section>`
}
