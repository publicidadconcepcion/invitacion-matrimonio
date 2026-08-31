export function initCountdown(root, eventDate) {
  const container = root.querySelector('[data-countdown]')
  if (!container) return () => {}
  const target = new Date(eventDate).getTime()
  const complete = root.querySelector('[data-countdown-complete]')
  const fields = Object.fromEntries(['days', 'hours', 'minutes', 'seconds'].map((key) => [key, root.querySelector(`[data-countdown-${key}]`)]))

  const update = () => {
    const remaining = Math.max(0, target - Date.now())
    const values = {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining / 3600000) % 24),
      minutes: Math.floor((remaining / 60000) % 60),
      seconds: Math.floor((remaining / 1000) % 60),
    }
    Object.entries(values).forEach(([key, value]) => { fields[key].textContent = String(value).padStart(2, '0') })
    if (remaining === 0) {
      complete.hidden = false
      container.hidden = true
      return false
    }
    return true
  }
  if (!update()) return () => {}
  const interval = window.setInterval(() => { if (!update()) window.clearInterval(interval) }, 1000)
  return () => window.clearInterval(interval)
}
