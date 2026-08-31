import { escapeHtml, imageWithFallback } from './shared.js'

export function photoSection(photo, variant = 'first') {
  return `<section class="photo-story photo-story--${variant} invitation-section" data-photo-section>
    ${imageWithFallback({ src: photo.src, alt: photo.alt, className: 'photo-story__frame' })}
    ${photo.caption ? `<p class="photo-story__caption" data-photo-caption>${escapeHtml(photo.caption)}</p>` : ''}
  </section>`
}
