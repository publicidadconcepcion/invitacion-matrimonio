import { escapeHtml } from './shared.js'
import albumQr from '../assets/shared-album-qr.svg'

export function sharedPhotos(data) {
  return `<section class="shared-photos invitation-section section-shell" aria-labelledby="shared-photos-title" data-shared-photos>
    <div class="section-heading" data-photo-reveal>
      <h2 id="shared-photos-title">Compartimos este día junto a ti</h2>
      <p>Comparte tus fotos y videos de este hermoso día.</p>
    </div>
    <a class="shared-photos__qr" href="${escapeHtml(data.url)}" target="_blank" rel="noopener noreferrer" aria-label="Abrir el álbum compartido en Google Fotos (nueva pestaña)" data-photo-reveal>
      <img src="${albumQr}" width="280" height="280" loading="lazy" alt="Código QR del álbum compartido de Lucía y Gerald">
    </a>
    <p class="shared-photos__caption" data-photo-reveal>Escanea el código QR y comparte tus recuerdos</p>
    <a class="primary-button" href="${escapeHtml(data.url)}" target="_blank" rel="noopener noreferrer" aria-describedby="shared-photos-note" data-photo-reveal>Subir fotos<span class="sr-only"> (abre Google Fotos en una nueva pestaña)</span></a>
    <p class="shared-photos__note" id="shared-photos-note" data-photo-reveal>Google Fotos puede solicitar que inicies sesión con una cuenta de Google para subir fotografías.</p>
  </section>`
}
