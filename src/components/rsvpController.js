export function initRsvpForm(root, config) {
  const form = root.querySelector('[data-rsvp-form]')
  if (!form) return () => {}
  const submit = form.querySelector('[data-rsvp-submit]')
  const status = form.querySelector('[data-rsvp-status]')

  const validate = () => {
    form.querySelectorAll('[data-error-for]').forEach((element) => { element.textContent = '' })
    const name = form.elements.name.value.trim()
    const attending = form.elements.attending.value
    if (!name) form.querySelector('[data-error-for="name"]').textContent = 'Escribe tu nombre.'
    if (!attending) form.querySelector('[data-error-for="attending"]').textContent = 'Selecciona una opción.'
    return Boolean(name && attending)
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) { status.textContent = 'Revisa los campos indicados.'; return }
    submit.disabled = true; submit.textContent = 'Enviando…'; status.textContent = ''
    try {
      const payload = Object.fromEntries(new FormData(form))
      if (config.endpoint) {
        const response = await fetch(config.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!response.ok) throw new Error('Submission failed')
      } else {
        // Desarrollo sin endpoint: reemplaza rsvp.endpoint para conectar Formspree, Supabase o tu API.
        await new Promise((resolve) => window.setTimeout(resolve, 700))
      }
      status.textContent = '¡Gracias! Recibimos tu respuesta.'; form.reset()
    } catch { status.textContent = 'No pudimos enviar tu respuesta. Inténtalo nuevamente.' }
    finally { submit.disabled = false; submit.textContent = 'Enviar confirmación' }
  }
  form.addEventListener('submit', onSubmit)
  return () => form.removeEventListener('submit', onSubmit)
}
