import { escapeHtml } from './shared.js'
import { giftIcon } from './giftIcons.js'

export function gifts(data) {
  return `<section class="gifts invitation-section section-shell" aria-labelledby="gifts-title" data-reveal-section>
    <div class="section-heading"><span class="gift-icon" aria-hidden="true">◇</span><h2 id="gifts-title">${escapeHtml(data.title)}</h2><p>${escapeHtml(data.text)}</p></div>
    <div class="gift-options">${data.options.map((option) => `<article class="gift-option" data-gift-option>
      <span class="gift-option__icon" aria-hidden="true">${giftIcon(option.icon)}</span>
      <strong class="gift-option__amount">${escapeHtml(option.amount)}</strong>
      <h3>${escapeHtml(option.title)}</h3><p>${escapeHtml(option.detail)}</p>
    </article>`).join('')}</div>
  </section>`
}
