import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initScrollAnimations(root = document) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  const context = gsap.context(() => {
    gsap.utils.toArray('[data-reveal-section]').forEach((section) => {
      const targets = section.querySelectorAll('.section-heading, .countdown__grid, .location__ornament, .dress-code__name, .gift-options, li, .primary-button')
      gsap.from(targets.length ? targets : section, { y: 36, autoAlpha: 0, duration: 1, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 82%', once: true } })
    })
    gsap.timeline({ scrollTrigger: { trigger: '.music-section', start: 'top 78%', once: true } })
      .from('.music-player__cover', { clipPath: 'inset(8% 8% 8% 8%)', scale: .96, autoAlpha: 0, duration: 1.1, ease: 'power3.out' })
      .from('.music-player__info', { y: 20, autoAlpha: 0, duration: .7, ease: 'power2.out' }, '-=.4')
      .from(['.music-player__track', '.music-player__times'], { y: 12, autoAlpha: 0, duration: .55, stagger: .08, ease: 'power2.out' }, '-=.3')
      .from('.music-player__controls', { y: 14, autoAlpha: 0, duration: .6, ease: 'power2.out' }, '-=.2')
    gsap.from('[data-love-line]', { y: 30, autoAlpha: 0, duration: 1.1, stagger: .28, ease: 'power2.out', scrollTrigger: { trigger: '.love-message', start: 'top 72%', once: true } })
    gsap.utils.toArray('[data-photo-section]').forEach((section, index) => {
      const frame = section.querySelector('.photo-story__frame')
      const image = section.querySelector('img')
      gsap.from(frame, { clipPath: index ? 'inset(18% 8% 18% 8%)' : 'inset(0 50% 0 50%)', duration: 1.5, ease: 'power3.inOut', scrollTrigger: { trigger: section, start: 'top 78%', once: true } })
      if (image) gsap.fromTo(image, { scale: 1.1 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: .8 } })
    })
    const heartBeat = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.4 })
      .to('.calendar__day.is-event svg', { scale: 1.1, duration: .18, ease: 'power2.out' })
      .to('.calendar__day.is-event svg', { scale: 1, duration: .18, ease: 'power2.in' })
      .to('.calendar__day.is-event svg', { scale: 1.06, duration: .16, ease: 'power2.out' })
      .to('.calendar__day.is-event svg', { scale: 1, duration: .22, ease: 'power2.inOut' })

    gsap.timeline({ scrollTrigger: { trigger: '[data-date-section]', start: 'top 78%', once: true }, onComplete: () => heartBeat.play() })
      .from('[data-date-section] .section-heading > span', { y: 12, autoAlpha: 0, duration: .5, ease: 'power2.out' })
      .from('[data-date-section] .section-heading h2', { y: 20, autoAlpha: 0, duration: .65, ease: 'power2.out' }, '-=.2')
      .from('.calendar__header', { y: 14, autoAlpha: 0, duration: .6, ease: 'power2.out' }, '-=.2')
      .from('.calendar__weekdays', { autoAlpha: 0, duration: .45, ease: 'power2.out' }, '-=.15')
      .from('.calendar__day:not(.is-empty)', { y: 7, autoAlpha: 0, duration: .35, stagger: .025, ease: 'power2.out' }, '-=.15')
      .from('.calendar__day.is-event svg', { scale: 0, transformOrigin: '50% 55%', duration: .55, ease: 'back.out(1.5)' }, '-=.1')
    gsap.fromTo('[data-timeline-line]', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-timeline]', start: 'top 75%', end: 'bottom 65%', scrub: true } })
    gsap.from('[data-timeline-item]', { x: 24, autoAlpha: 0, stagger: .18, duration: .8, scrollTrigger: { trigger: '[data-timeline]', start: 'top 72%', once: true } })
  }, root)
  return () => context.revert()
}
