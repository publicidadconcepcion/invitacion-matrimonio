import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const HERO_TIMINGS = { zoom: 1.65, fade: 1, reveal: .85, total: 2.8 }

export function initHeroEnvelope(root = document) {
  const cover = root.querySelector('[data-hero]')
  const frame = root.querySelector('[data-cover-frame]')
  const button = root.querySelector('[data-open-hero]')
  const hint = root.querySelector('[data-cover-hint]')
  const vignette = root.querySelector('[data-cover-vignette]')
  const content = root.querySelector('[data-invitation-content]')
  const backdrop = root.querySelector('[data-photo-backdrop]')
  const heading = root.querySelector('#welcome-title')
  const items = root.querySelectorAll('[data-welcome-reveal]')
  if (![cover, frame, button, content, backdrop].every(Boolean)) return

  document.body.classList.add('is-locked')
  content.inert = true
  let opened = false
  const finish = () => {
    cover.hidden = true
    cover.inert = true
    content.inert = false
    content.removeAttribute('aria-hidden')
    // Explicit visibility avoids inherited hidden state during instant opening.
    content.style.visibility = 'visible'
    document.body.classList.remove('is-locked')
    frame.style.willChange = ''
    ScrollTrigger.refresh()
    // Wait for a painted frame after refresh, especially for instant opening.
    requestAnimationFrame(() => requestAnimationFrame(() => heading?.focus({ preventScroll: true })))
  }

  button.addEventListener('click', () => {
    if (opened) return
    opened = true
    button.disabled = true
    cover.classList.add('is-opening')
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([content, backdrop, ...items], { autoAlpha: 1 })
      finish()
      return
    }
    frame.style.willChange = 'transform'
    gsap.timeline({ onComplete: finish })
      .to(hint, { autoAlpha: 0, duration: .3 }, 0)
      .to(frame, { scale: 1.13, duration: HERO_TIMINGS.zoom, ease: 'power2.inOut' }, 0)
      .to(vignette, { opacity: .75, duration: 1.25, ease: 'sine.inOut' }, .15)
      .to(backdrop, { autoAlpha: 1, duration: 1.1, ease: 'sine.inOut' }, .65)
      .to(cover, { autoAlpha: 0, duration: HERO_TIMINGS.fade, ease: 'power2.inOut' }, 1.05)
      .to(content, { autoAlpha: 1, duration: .7 }, 1.3)
      .fromTo(items, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: HERO_TIMINGS.reveal, stagger: { amount: .4 }, ease: 'power2.out' }, HERO_TIMINGS.total - HERO_TIMINGS.reveal - .4)
  }, { once: true })
}
