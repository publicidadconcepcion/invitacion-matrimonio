import { gsap } from 'gsap'

export const HERO_TIMINGS = { seal: 0.55, flap: 1.25, photo: 1.8, settle: 1.1 }
export const HERO_PHOTO_FINAL_YPERCENT = -80

export function initHeroEnvelope(root = document) {
  const hero = root.querySelector('[data-hero]')
  const envelope = root.querySelector('[data-hero-envelope]')
  const flap = root.querySelector('[data-hero-flap]')
  const letter = root.querySelector('[data-hero-letter]')
  const seal = root.querySelector('[data-hero-seal]')
  const address = envelope?.querySelector('.hero-envelope__address')
  const button = root.querySelector('[data-open-hero]')
  const content = root.querySelector('[data-invitation-content]')
  const cue = root.querySelector('[data-scroll-cue]')
  if (![hero, envelope, flap, letter, seal, button, content].every(Boolean)) return

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  let opened = false
  document.body.classList.add('is-locked')

  const finish = () => {
    document.body.classList.remove('is-locked')
    content.removeAttribute('aria-hidden')
    content.inert = false
  }
  content.inert = true

  button.addEventListener('click', () => {
    if (opened) return
    opened = true; button.disabled = true; hero.classList.add('is-open')
    if (reduced) {
      gsap.set([seal, address, button], { autoAlpha: 0 }); gsap.set(flap, { rotationX: -180 })
      gsap.set(letter, { yPercent: HERO_PHOTO_FINAL_YPERCENT, scale: 1.03 }); gsap.set(cue, { autoAlpha: 1 }); finish(); return
    }
    gsap.timeline({ onComplete: finish })
      .to(button, { autoAlpha: 0, y: 8, duration: .4, ease: 'power2.out' }, 0)
      .to(seal, { scale: 1.08, rotate: 6, duration: .2, ease: 'power2.out' }, 0)
      .to(seal, { autoAlpha: 0, scale: .65, y: 18, duration: HERO_TIMINGS.seal, ease: 'power2.in' }, .2)
      .to(address, { autoAlpha: 0, duration: .35 }, .25)
      .to(flap, { rotationX: -180, duration: HERO_TIMINGS.flap, ease: 'power3.inOut' }, .48)
      .set(flap, { zIndex: 1 }, 1.05)
      .to(letter, { yPercent: HERO_PHOTO_FINAL_YPERCENT, scale: 1.03, duration: HERO_TIMINGS.photo, ease: 'power3.inOut' }, 1.05)
      .to(envelope, { y: 20, duration: HERO_TIMINGS.settle, ease: 'sine.inOut' }, 1.2)
      .fromTo(cue, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .7 }, 2.92)
  }, { once: true })
}
