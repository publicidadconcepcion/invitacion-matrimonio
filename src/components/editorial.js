import { escapeHtml } from './shared.js'

function editorialDate(data, compact = false) {
  return new Intl.DateTimeFormat(data.event.locale, {
    timeZone: data.event.timeZone,
    day: '2-digit', month: compact ? '2-digit' : 'long', year: 'numeric',
  }).format(new Date(data.event.date)).replaceAll('-', compact ? '.' : '-')
}

export function photoBackdrop(data) {
  return `<div class="photo-backdrop" data-photo-backdrop aria-hidden="true">
    <img src="${escapeHtml(data.couple.heroImage)}" alt="" width="1086" height="1448" decoding="async" data-backdrop-image>
  </div>`
}

export function editorialWelcome(data) {
  return `<section class="editorial-welcome" aria-labelledby="welcome-title" data-editorial-welcome>
    <div class="editorial-welcome__masthead" data-welcome-reveal><span>${escapeHtml(data.editorial.edition)}</span><span>${escapeHtml(data.editorial.issue)}</span></div>
    <div class="editorial-welcome__story">
      <p class="editorial-welcome__label" data-welcome-reveal>${escapeHtml(data.editorial.label)} <span aria-hidden="true">✦</span> ${escapeHtml(data.couple.initials)}</p>
      <h1 id="welcome-title" tabindex="-1" data-welcome-reveal>${escapeHtml(data.couple.names)}</h1>
      <p class="editorial-welcome__date" data-welcome-reveal><time datetime="${escapeHtml(data.event.date)}">${escapeHtml(editorialDate(data))}</time></p>
      <p class="editorial-welcome__tagline" data-welcome-reveal>${escapeHtml(data.editorial.tagline)}</p>
      <p class="editorial-welcome__guest" data-welcome-reveal aria-live="polite"><span data-guest-prefix>QUEREMOS COMPARTIR ESTE DÍA CONTIGO</span><strong data-guest-name>¡Te damos la bienvenida!</strong></p>
    </div>
    <div class="editorial-welcome__scroll" data-welcome-reveal><span>${escapeHtml(data.editorial.scrollLabel)}</span><i aria-hidden="true"></i></div>
  </section>`
}

export function editorialSeparator(data) {
  return `<div class="editorial-separator" aria-label="${escapeHtml(data.editorial.newsLabel)}">
    <span>${escapeHtml(data.editorial.newsLabel)}</span><span>${escapeHtml(data.couple.names)}</span><time datetime="${escapeHtml(data.event.date)}">${escapeHtml(editorialDate(data, true))}</time>
  </div>`
}
