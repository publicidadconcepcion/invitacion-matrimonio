import { escapeHtml, imageWithFallback } from './shared.js'

export function musicPlayer(music) {
  return `<section class="music-section invitation-section section-shell" aria-labelledby="music-title" data-reveal-section>
    <div class="section-heading"><span>Una melodía para nosotros</span><h2 id="music-title">Escucha nuestra canción de amor</h2></div>
    <div class="music-player" data-music-player>
      ${imageWithFallback({ src: music.cover, alt: `Portada de ${music.title}`, className: 'music-player__cover' })}
      <div class="music-player__content">
        <div class="music-player__info"><strong>${escapeHtml(music.title)}</strong><span>${escapeHtml(music.artist)}</span></div>
        <input class="music-player__track" type="range" min="0" max="1000" value="0" step="1" data-audio-progress aria-label="Posición de la canción">
        <div class="music-player__times"><span data-audio-current>0:00</span><span data-audio-duration>0:00</span></div>
        <div class="music-player__controls">
          <button type="button" class="music-player__toggle" data-audio-toggle aria-label="Reproducir canción">
            <svg class="music-player__icon music-player__icon--play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.25 5.2a1 1 0 0 1 1.52-.85l9.15 6.8a1.06 1.06 0 0 1 0 1.7l-9.15 6.8a1 1 0 0 1-1.52-.85V5.2Z"/></svg>
            <svg class="music-player__icon music-player__icon--pause" viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1"/><rect x="13.5" y="5" width="4" height="14" rx="1"/></svg>
          </button>
          <p class="music-player__status" data-audio-status aria-live="polite">Toca play para escuchar</p>
        </div>
      </div>
      <audio preload="metadata" src="${escapeHtml(music.file)}" data-audio></audio>
    </div>
  </section>`
}
