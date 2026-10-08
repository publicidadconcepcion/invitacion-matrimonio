export function songForm() {
  return `<div class="song-suggestion">
    <button class="primary-button" type="button" data-open-song aria-haspopup="dialog" aria-controls="song-dialog">Sugerir canción</button>
    <dialog id="song-dialog" class="rsvp-dialog song-dialog" data-song-dialog aria-labelledby="song-dialog-title">
      <button class="rsvp-dialog__close" type="button" data-close-song aria-label="Cerrar formulario">×</button>
      <header class="rsvp-dialog__heading">
        <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M15 29V10l18-4v19M15 15l18-4"/><ellipse cx="10" cy="30" rx="5" ry="4"/><ellipse cx="28" cy="26" rx="5" ry="4"/></svg>
        <h2 id="song-dialog-title" tabindex="-1">Sugerir canción</h2>
      </header>
      <form class="rsvp-form" data-song-form novalidate>
        <div class="form-field"><label for="song-guest-name">Tu nombre</label><input id="song-guest-name" name="name" autocomplete="name" required maxlength="120" aria-describedby="song-error-name"><small id="song-error-name" data-error-for="name"></small></div>
        <div class="form-field"><label for="song-title">Nombre de la canción y artista</label><input id="song-title" name="song" required maxlength="250" aria-describedby="song-error-song"><small id="song-error-song" data-error-for="song"></small></div>
        <div class="form-field"><label for="song-link">Enlace de Spotify o YouTube (opcional)</label><input id="song-link" name="link" type="url" inputmode="url" maxlength="500" placeholder="https://" aria-describedby="song-error-link"><small id="song-error-link" data-error-for="link"></small></div>
        <button class="primary-button" type="submit" data-song-submit>Enviar sugerencia</button>
        <div class="form-status" data-song-status role="status" aria-live="polite" aria-atomic="true"></div>
      </form>
    </dialog>
  </div>`
}
