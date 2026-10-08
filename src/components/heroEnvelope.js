import { escapeHtml } from './shared.js'

export function heroEnvelope(data) {
  const cover = data.editorial
  return `<header class="editorial-cover" data-hero aria-label="Portada de la invitación de ${escapeHtml(data.couple.names)}" style="--cover-ratio:${cover.coverWidth / cover.coverHeight};--seal-x:${cover.seal.x}%;--seal-y:${cover.seal.y}%">
    <img class="editorial-cover__ambient" src="${escapeHtml(cover.cover)}" alt="" aria-hidden="true" decoding="async">
    <div class="editorial-cover__frame" data-cover-frame>
      <img class="editorial-cover__image" src="${escapeHtml(cover.cover)}" width="${cover.coverWidth}" height="${cover.coverHeight}" alt="Portada de periódico con los nombres de Lucía y Gerald, flores secas y un sobre negro con sello dorado" fetchpriority="high" decoding="async">
      <button class="editorial-cover__seal" type="button" data-open-hero aria-label="Abrir invitación de ${escapeHtml(data.couple.names)}" aria-describedby="cover-hint"></button>
      <p class="editorial-cover__hint" id="cover-hint" data-cover-hint>${escapeHtml(cover.openHint)}</p>
    </div>
    <div class="editorial-cover__vignette" data-cover-vignette aria-hidden="true"></div>
  </header>`
}
