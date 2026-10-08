export const COMPANION_TYPES = ['Familiar', 'Amigo/a', 'Compañero/a de trabajo', 'Otro']

export function validateRsvp(values) {
  const payload = {
    name: String(values.name ?? '').trim(),
    attending: String(values.attending ?? ''),
    companionType: String(values.companionType ?? ''),
    message: String(values.message ?? '').trim(),
  }
  const errors = {}
  if (!['yes', 'no'].includes(payload.attending)) errors.attending = 'Selecciona si asistirás a la celebración.'
  if (payload.name.length < 2 || payload.name.length > 120) errors.name = 'Escribe tu nombre completo, entre 2 y 120 caracteres.'
  if (!COMPANION_TYPES.includes(payload.companionType)) errors.companionType = 'Selecciona tu relación con los novios.'
  if (String(values.message ?? '').length > 1000) errors.message = 'El mensaje no puede superar los 1000 caracteres.'
  return { payload, errors }
}

export async function sendRsvp(endpoint, payload, { fetcher = fetch, timeoutMs = 30000 } = {}) {
  const abort = new AbortController()
  const timeout = setTimeout(() => abort.abort(), timeoutMs)
  try {
    const response = await fetcher(endpoint, {
      method: 'POST', mode: 'cors', credentials: 'omit', redirect: 'follow',
      // The deployed doPost accepts form parameters; this also avoids a CORS preflight.
      body: new URLSearchParams(payload), signal: abort.signal,
    })
    const result = await response.json()
    if (response.ok && result?.success === true) return 'success'
    if (result?.success === false) return 'error'
    return 'unknown'
  } catch {
    // A failed read, timeout or network error does not prove that the write failed.
    return 'unknown'
  } finally { clearTimeout(timeout) }
}
