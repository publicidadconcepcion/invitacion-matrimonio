import { rsvpForm } from './rsvpForm.js'

export function rsvpEnvelope() {
  return `<section class="rsvp invitation-section section-shell" aria-labelledby="rsvp-title">
    <div class="section-heading"><span>Queremos celebrar contigo</span><h2 id="rsvp-title">Confirma tu asistencia</h2></div>
    <button class="primary-button" type="button" data-open-rsvp aria-haspopup="dialog" aria-controls="rsvp-dialog">Confirmar asistencia</button>
    <dialog id="rsvp-dialog" class="rsvp-dialog" data-rsvp-dialog aria-labelledby="rsvp-dialog-title" aria-describedby="rsvp-dialog-subtitle">
      <button class="rsvp-dialog__close" type="button" data-close-rsvp aria-label="Cerrar formulario">×</button>
      <header class="rsvp-dialog__heading">
        <svg viewBox="0 0 40 40" aria-hidden="true"><path d="m9 5 8 3-4 12a5 5 0 0 1-8-3L9 5Zm14 3 8-3 4 12a5 5 0 0 1-8 3L23 8ZM9 22l-3 11m-4-1 9 2m20-12 3 11m-5 1 9-2M18 3l2 4 2-4"/></svg>
        <h2 id="rsvp-dialog-title" tabindex="-1">¿Asistes a la celebración?</h2>
        <p id="rsvp-dialog-subtitle">Confirma tu asistencia a nuestro día especial</p>
      </header>
      ${rsvpForm()}
    </dialog>
  </section>`
}
