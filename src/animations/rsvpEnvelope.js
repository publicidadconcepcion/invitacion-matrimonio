import { gsap } from 'gsap'

// Keep the initializer entry point; the RSVP now opens in a native modal dialog.
export function initRsvpEnvelope(root = document) {
  return initFormDialog(root, 'rsvp')
}

export function initFormDialog(root, kind) {
  const dialog = root.querySelector(`[data-${kind}-dialog]`)
  const button = root.querySelector(`[data-open-${kind}]`)
  const close = root.querySelector(`[data-close-${kind}]`)
  if (![dialog, button, close].every(Boolean)) return () => {}
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches
  const events = new AbortController()
  let returnFocus
  let scrollPosition = 0
  let closing = false
  let previousStyle
  const restore = () => {
    Object.assign(document.body.style, previousStyle)
    document.documentElement.classList.remove('rsvp-modal-open')
    window.scrollTo({ top: scrollPosition, behavior: 'instant' })
    returnFocus?.focus({ preventScroll: true })
    closing = false
  }
  button.addEventListener('click', () => {
    if (dialog.open) return
    returnFocus = document.activeElement
    scrollPosition = window.scrollY
    previousStyle = Object.fromEntries(['position', 'top', 'width', 'overflow'].map((key) => [key, document.body.style[key]]))
    document.documentElement.classList.add('rsvp-modal-open')
    Object.assign(document.body.style, { position: 'fixed', top: `-${scrollPosition}px`, width: '100%', overflow: 'hidden' })
    dialog.showModal()
    dialog.scrollTop = 0
    dialog.querySelector('h2').focus({ preventScroll: true })
    gsap.killTweensOf(dialog)
    if (reduced()) gsap.set(dialog, { opacity: 1, y: 0 })
    else gsap.fromTo(dialog, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .3, ease: 'power2.out' })
  }, { signal: events.signal })
  const dismiss = () => {
    if (!dialog.open || closing) return
    closing = true
    gsap.killTweensOf(dialog)
    if (reduced()) dialog.close()
    else gsap.to(dialog, { opacity: 0, y: 10, duration: .2, ease: 'power2.in', onComplete: () => dialog.close() })
  }
  close.addEventListener('click', dismiss, { signal: events.signal })
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return
    const focusable = [...dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled)')]
      .filter((element) => element.getClientRects().length && (element.type !== 'radio' || element.checked || !dialog.querySelector(`input[name="${element.name}"]:checked`)))
    const first = focusable[0]
    const last = focusable.at(-1)
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.querySelector('h2'))) {
      event.preventDefault(); last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first?.focus()
    }
  }, { signal: events.signal })
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); dismiss() }, { signal: events.signal })
  dialog.addEventListener('close', restore, { signal: events.signal })
  return () => { gsap.killTweensOf(dialog); if (dialog.open) { dialog.close(); restore() } events.abort() }
}
