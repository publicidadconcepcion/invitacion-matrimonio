import { escapeHtml } from './shared.js'
import { rsvpForm } from './rsvpForm.js'

export function rsvpEnvelope(config) {
  return `<section class="rsvp invitation-section section-shell" aria-labelledby="rsvp-title">
    <div class="section-heading"><span>Queremos celebrar contigo</span><h2 id="rsvp-title">Confirma tu asistencia</h2><p>${escapeHtml(config.deadline)}</p></div>
    <div class="rsvp-envelope" data-rsvp-envelope>
      <div class="rsvp-envelope__back"></div>
      <div class="rsvp-envelope__letter" data-rsvp-letter>${rsvpForm(config)}</div>
      <div class="rsvp-envelope__flap" data-rsvp-flap></div>
      <div class="rsvp-envelope__front"><i></i><b></b><em></em></div>
      <button class="rsvp-seal" type="button" data-open-rsvp aria-label="Abrir formulario para confirmar asistencia"><span>Confirmar</span></button>
    </div>
  </section>`
}
