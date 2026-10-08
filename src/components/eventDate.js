import { escapeHtml } from './shared.js'

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

export function eventDate(event) {
  const instant = new Date(event.date)
  const dateParts = new Intl.DateTimeFormat('en-US', { timeZone: event.timeZone, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(instant)
  const part = (type) => Number(dateParts.find((item) => item.type === type).value)
  const [year, monthNumber, day] = ['year', 'month', 'day'].map(part)
  const dateLabel = new Intl.DateTimeFormat(event.locale, { timeZone: event.timeZone, dateStyle: 'full' }).format(instant)
  const timeLabel = new Intl.DateTimeFormat(event.locale, { timeZone: event.timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(instant)
  const month = monthNumber - 1
  const date = new Date(Date.UTC(year, month, day))
  const firstDay = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
  const monthName = new Intl.DateTimeFormat(event.locale, { month: 'long', timeZone: 'UTC' }).format(date)
  const cells = Array.from({ length: firstDay }, () => '<span class="calendar__day is-empty" aria-hidden="true"></span>')
  for (let current = 1; current <= days; current += 1) {
    cells.push(`<span class="calendar__day${current === day ? ' is-event' : ''}"${current === day ? ' aria-current="date"' : ''}><b>${current}</b>${current === day ? '<svg viewBox="0 0 32 29" aria-hidden="true"><path d="M16 27S2 18.4 2 9.3C2 1.8 11.3-.7 16 5.2 20.7-.7 30 1.8 30 9.3 30 18.4 16 27 16 27Z"/></svg>' : ''}</span>`)
  }
  return `<section class="date-section invitation-section section-shell" aria-labelledby="date-title" data-date-section>
    <div class="section-heading"><span>Guarda este día</span><h2 id="date-title">Nuestra fecha</h2><p><time datetime="${escapeHtml(event.date)}">${escapeHtml(dateLabel)} · ${escapeHtml(timeLabel)} hrs</time><br>Horario de Chile</p></div>
    <div class="calendar" data-calendar>
      <div class="calendar__header"><span>${monthName}</span><strong>${year}</strong></div>
      <div class="calendar__weekdays">${WEEKDAYS.map((item) => `<span>${item}</span>`).join('')}</div>
      <div class="calendar__grid">${cells.join('')}</div>
    </div>
  </section>`
}
