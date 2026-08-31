export function rsvpForm(config) {
  const guestOptions = Array.from({ length: config.maxGuests + 1 }, (_, index) => `<option value="${index}">${index}</option>`).join('')
  return `<form class="rsvp-form" data-rsvp-form novalidate>
    <div class="form-field"><label for="guest-name">Nombre completo</label><input id="guest-name" name="name" type="text" autocomplete="name" required><small data-error-for="name"></small></div>
    <fieldset class="form-field"><legend>¿Asistirás?</legend><div class="radio-group">
      <label><input type="radio" name="attending" value="yes" required><span>Sí, asistiré</span></label>
      <label><input type="radio" name="attending" value="no" required><span>No podré asistir</span></label>
    </div><small data-error-for="attending"></small></fieldset>
    <div class="form-field"><label for="guest-count">Número de acompañantes</label><select id="guest-count" name="guests">${guestOptions}</select></div>
    <div class="form-field"><label for="dietary">Restricciones alimentarias</label><textarea id="dietary" name="dietary" rows="2" placeholder="Opcional"></textarea></div>
    <div class="form-field"><label for="guest-message">Mensaje para los novios</label><textarea id="guest-message" name="message" rows="3" placeholder="Opcional"></textarea></div>
    <button class="primary-button" type="submit" data-rsvp-submit>Enviar confirmación</button>
    <p class="form-status" data-rsvp-status role="status" aria-live="polite"></p>
  </form>`
}
