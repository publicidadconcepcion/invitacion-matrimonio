import { escapeHtml } from './shared.js'
import { songForm } from './songForm.js'

export function spotifyPlaylistUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && url.hostname === 'open.spotify.com'
      && !url.username && !url.password && !url.port
      && /^\/(?:intl-[a-z-]+\/)?playlist\/[A-Za-z0-9]+\/?$/.test(url.pathname)
      ? url.href : ''
  } catch { return '' }
}

export function spotifySection(data) {
  const url = spotifyPlaylistUrl(data.url)
  return `<section class="spotify invitation-section section-shell" aria-labelledby="spotify-title" data-reveal-section>
    <div class="section-heading"><h2 id="spotify-title">${escapeHtml(data.title)}</h2><p>${escapeHtml(data.text)}</p></div>
    ${songForm()}
    ${url ? `<a class="primary-button" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(data.buttonLabel)} <span aria-hidden="true">↗</span></a>` : ''}
  </section>`
}
