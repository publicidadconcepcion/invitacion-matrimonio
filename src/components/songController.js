import { validateSong, sendSong } from './songService.js'

export function initSongForm(root, config) {
  const form = root.querySelector('[data-song-form]')
  if (!form) return () => {}
  const submit = form.querySelector('[data-song-submit]')
  const status = form.querySelector('[data-song-status]')
  const fields = [...form.querySelectorAll('input, select, textarea')]
  let state = 'idle'
  const showStatus = (title, message) => {
    const heading = document.createElement('strong')
    const text = document.createElement('p')
    heading.textContent = title
    text.textContent = message
    status.replaceChildren(heading, text)
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    if (['sending', 'success', 'unknown'].includes(state)) return
    const { payload, errors } = validateSong(Object.fromEntries(new FormData(form)))
    form.querySelectorAll('[data-error-for]').forEach((element) => { element.textContent = errors[element.dataset.errorFor] || '' })
    fields.forEach((field) => field.setAttribute('aria-invalid', String(Boolean(errors[field.name]))))
    if (Object.keys(errors).length) {
      showStatus('Revisa los campos indicados.', 'Completa la información antes de enviar.')
      fields.find((field) => errors[field.name])?.focus()
      return
    }
    if (!config.endpoint) {
      showStatus('Sugerencias no disponibles.', 'El envío aún no está habilitado. Tus datos no se han enviado.')
      return
    }
    state = 'sending'; form.dataset.state = state
    form.setAttribute('aria-busy', 'true')
    submit.disabled = true; submit.textContent = 'Enviando...'
    fields.forEach((field) => { field.disabled = true })
    status.replaceChildren()
    state = await sendSong(config.endpoint, payload)
    form.dataset.state = state
    form.removeAttribute('aria-busy')
    fields.forEach((field) => { field.disabled = state === 'success' })
    if (state === 'success') {
      submit.textContent = 'Canción sugerida'
      showStatus('¡Canción sugerida!', 'Gracias por ayudarnos a crear la música de nuestro matrimonio.')
    } else if (state === 'error') {
      submit.disabled = false; submit.textContent = 'Enviar sugerencia'
      showStatus('No pudimos enviar tu sugerencia.', 'Por favor, inténtalo nuevamente.')
    } else {
      submit.textContent = 'Recepción por verificar'
      showStatus('No fue posible comprobar la recepción.', 'Tu sugerencia podría haberse guardado. Conservamos lo escrito; consulta con los novios antes de volver a enviarla para evitar duplicados.')
    }
  }
  form.addEventListener('submit', onSubmit)
  return () => form.removeEventListener('submit', onSubmit)
}
