import { escapeHtml } from './shared.js'

export function whatsappContact(data, names) {
  const url = `https://wa.me/${String(data.phone).replace(/\D/g, '')}?text=${encodeURIComponent(data.message)}`
  return `<footer class="contact invitation-section section-shell" aria-labelledby="contact-title" data-reveal-section>
    <span class="section-kicker">Estamos para ayudarte</span><h2 id="contact-title">¿Tienes alguna duda?</h2>
    ${data.phone ? `<a class="primary-button" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp <span aria-hidden="true">↗</span></a>` : ''}
    <div class="contact__signature"><span>Con amor,</span><strong>${escapeHtml(names)}</strong></div>
  </footer>`
}
