import { escapeHtml } from './shared.js'
import { COMPANION_TYPES } from './rsvpService.js'

export function rsvpForm() {
  return `<form class="rsvp-form" data-rsvp-form novalidate>
    <fieldset class="form-field" aria-describedby="rsvp-error-attending"><legend>¿Asistes a la celebración?</legend><div class="radio-group">
      <label><input type="radio" name="attending" value="yes" required aria-describedby="rsvp-error-attending"><span>Sí, confirmo.</span></label>
      <label><input type="radio" name="attending" value="no" required aria-describedby="rsvp-error-attending"><span>No puedo asistir.</span></label>
    </div><small id="rsvp-error-attending" data-error-for="attending"></small></fieldset>
    <div class="form-field"><label for="guest-name">Nombre completo</label><input id="guest-name" name="name" type="text" autocomplete="name" required minlength="2" maxlength="120" placeholder="Escribe tu nombre y apellido" aria-describedby="rsvp-error-name"><small id="rsvp-error-name" data-error-for="name"></small></div>
    <div class="form-field"><label for="companion-type">¿Cuál es tu relación con los novios?</label><select id="companion-type" name="companionType" required aria-describedby="rsvp-error-companionType"><option value="">Selecciona una opción</option>${COMPANION_TYPES.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`).join('')}</select><small id="rsvp-error-companionType" data-error-for="companionType"></small></div>
    <div class="form-field"><label for="important-message">Mensaje importante (opcional)</label><textarea id="important-message" name="message" rows="3" maxlength="1000" placeholder="Ej.: Soy vegetariano, tengo alguna alergia o necesito comunicar algo importante" aria-describedby="rsvp-error-message"></textarea><small id="rsvp-error-message" data-error-for="message"></small></div>
    <button class="primary-button" type="submit" data-rsvp-submit>Enviar confirmación</button>
    <div class="form-status" data-rsvp-status role="status" aria-live="polite" aria-atomic="true"></div>
  </form>`
}
