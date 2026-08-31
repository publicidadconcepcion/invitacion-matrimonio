import { escapeHtml, imageWithFallback } from './shared.js'

export function heroEnvelope(data) {
  return `<header class="hero invitation-section" data-hero>
    <div class="hero__ambient" aria-hidden="true"></div>
    <p class="hero__eyebrow">Tenemos algo que celebrar</p>
    <div class="hero__scene">
      <div class="hero-envelope" data-hero-envelope>
        <div class="hero-envelope__back" aria-hidden="true"></div>
        <article class="hero-letter" data-hero-letter>
          ${imageWithFallback({ src: data.couple.heroImage, alt: `Fotografía de ${data.couple.names}`, className: 'hero-letter__photo', eager: true })}
          <div class="hero-letter__caption"><span>Nuestra boda</span><strong>${escapeHtml(data.couple.names)}</strong></div>
        </article>
        <div class="hero-envelope__flap" data-hero-flap aria-hidden="true"></div>
        <div class="hero-envelope__front" aria-hidden="true"><i></i><b></b><em></em></div>
        <div class="hero-envelope__address">
          <strong>${escapeHtml(data.couple.names)}</strong>
          <span>${escapeHtml(data.couple.shortPhrase)}</span>
        </div>
        <div class="wax-seal" data-hero-seal aria-hidden="true"><span>S·M</span></div>
      </div>
    </div>
    <button class="hero__open" type="button" data-open-hero aria-label="Abrir invitación de ${escapeHtml(data.couple.names)}">
      <span>Abrir invitación</span><i aria-hidden="true"></i>
    </button>
    <div class="scroll-cue" data-scroll-cue aria-hidden="true"><span>Desliza para continuar</span><i></i></div>
  </header>`
}
