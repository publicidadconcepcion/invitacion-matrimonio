export function countdown() {
  return `<section class="countdown invitation-section section-shell" aria-labelledby="countdown-title" data-reveal-section>
    <div class="section-heading"><span>Cada vez falta menos</span><h2 id="countdown-title">Cuenta regresiva</h2></div>
    <div class="countdown__grid" data-countdown aria-live="polite">
      ${[['days','Días'],['hours','Horas'],['minutes','Minutos'],['seconds','Segundos']].map(([key,label]) => `<div><strong data-countdown-${key}>00</strong><span>${label}</span></div>`).join('')}
    </div>
    <p class="countdown__complete" data-countdown-complete hidden>¡Hoy celebramos nuestro amor!</p>
  </section>`
}
