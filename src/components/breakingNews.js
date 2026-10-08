import { escapeHtml } from './shared.js'

export function breakingNews(src) {
  return `<div class="breaking-news" data-breaking aria-hidden="true"><div class="breaking-news__strip">${Array.from({ length: 8 }, () => `<span><img src="${escapeHtml(src)}" alt="" loading="lazy" decoding="async"></span>`).join('')}</div></div>`
}
