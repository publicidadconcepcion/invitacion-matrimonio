export function countdown() {
  return `<section class="countdown invitation-section section-shell" aria-labelledby="countdown-title" data-reveal-section>
    <div class="section-heading"><h2 id="countdown-title">Faltan</h2></div>
    <div class="countdown__grid" data-countdown>
      ${[['days','Días'],['hours','Horas'],['minutes','Minutos'],['seconds','Segundos']].map(([key,label]) => `<div><strong data-countdown-${key}>00</strong><span>${label}</span></div>`).join('')}
    </div>
    <span class="countdown__heart" aria-hidden="true">♥</span>
    <p class="countdown__complete" data-countdown-complete hidden>¡Hoy celebramos nuestro amor!</p>
  </section>`
}
