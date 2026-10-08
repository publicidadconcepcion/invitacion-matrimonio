import { invitationData } from '../config/invitationData.js'

export const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
}[character]))

export function imageWithFallback({ src, alt, className = '', eager = false }) {
  return `<div class="image-frame ${className}" data-image-frame>
    <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-fallback-image>
    <div class="image-fallback" aria-hidden="true"><span>${escapeHtml(invitationData.couple.initials)}</span><small>Tu fotografía aquí</small></div>
  </div>`
}

export function initImageFallbacks(root = document) {
  root.querySelectorAll('[data-fallback-image]').forEach((image) => {
    const showFallback = () => image.closest('[data-image-frame]')?.classList.add('has-error')
    image.addEventListener('error', showFallback, { once: true })
    if (image.complete && image.naturalWidth === 0) showFallback()
  })
}
