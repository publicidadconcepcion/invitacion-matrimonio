import { escapeHtml } from './shared.js'

export function gifts(data) {
  return `<section class="gifts invitation-section section-shell" aria-labelledby="gifts-title" data-reveal-section>
    <span class="gift-icon" aria-hidden="true">◇</span><h2 id="gifts-title">${escapeHtml(data.title)}</h2><p>${escapeHtml(data.text)}</p>
    <div class="gift-options">${data.options.map((option) => `<div><strong>${escapeHtml(option.title)}</strong><span>${escapeHtml(option.detail)}</span></div>`).join('')}</div>
  </section>`
}
