import { gsap } from 'gsap'

export const RSVP_TIMINGS = { seal: .4, flap: .9, form: 1.1 }

export function initRsvpEnvelope(root = document) {
  const envelope = root.querySelector('[data-rsvp-envelope]')
  const button = root.querySelector('[data-open-rsvp]')
  const flap = root.querySelector('[data-rsvp-flap]')
  const letter = root.querySelector('[data-rsvp-letter]')
  if (![envelope, button, flap, letter].every(Boolean)) return
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  button.addEventListener('click', () => {
    envelope.classList.add('is-open'); button.disabled = true
    if (reduced) { gsap.set(button, { autoAlpha: 0 }); gsap.set(flap, { rotationX: -180 }); gsap.set(letter, { yPercent: -55, height: 'auto' }); return }
    gsap.timeline()
      .to(button, { autoAlpha: 0, scale: .7, duration: RSVP_TIMINGS.seal })
      .to(flap, { rotationX: -180, duration: RSVP_TIMINGS.flap, ease: 'power3.inOut' }, .2)
      .set(flap, { zIndex: 1 })
      .to(letter, { yPercent: -55, height: 'auto', duration: RSVP_TIMINGS.form, ease: 'power3.inOut' }, .75)
  }, { once: true })
}
