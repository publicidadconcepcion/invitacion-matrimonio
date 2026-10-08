export function initGallery(root) {
  const gallery = root.querySelector('[data-gallery]')
  if (!gallery) return () => {}
  const track = gallery.querySelector('[data-gallery-track]')
  const slides = [...gallery.querySelectorAll('[data-gallery-slide]')]
  const dots = [...gallery.querySelectorAll('[data-gallery-dot]')]
  const previous = gallery.querySelector('[data-gallery-prev]')
  const next = gallery.querySelector('[data-gallery-next]')
  const status = gallery.querySelector('[data-gallery-status]')
  const events = new AbortController()
  let active = 0
  let timer
  const sync = () => {
    const middle = track.getBoundingClientRect().left + track.clientWidth / 2
    active = slides.reduce((best, slide, i) => {
      const distance = (item) => Math.abs(item.getBoundingClientRect().left + item.clientWidth / 2 - middle)
      return distance(slide) < distance(slides[best]) ? i : best
    }, 0)
    dots.forEach((dot, i) => i === active ? dot.setAttribute('aria-current', 'true') : dot.removeAttribute('aria-current'))
    previous.disabled = active === 0
    next.disabled = active === slides.length - 1
    status.textContent = `Fotografía ${active + 1} de ${slides.length}`
  }
  const go = (index, instant = false) => {
    const slide = slides[Math.max(0, Math.min(slides.length - 1, index))]
    if (!slide) return
    const rect = slide.getBoundingClientRect()
    track.scrollTo({ left: track.scrollLeft + rect.left + rect.width / 2 - track.getBoundingClientRect().left - track.clientWidth / 2, behavior: instant || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  previous.addEventListener('click', () => go(active - 1), { signal: events.signal })
  next.addEventListener('click', () => go(active + 1), { signal: events.signal })
  dots.forEach((dot, i) => dot.addEventListener('click', () => go(i), { signal: events.signal }))
  track.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    go(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : active + (event.key === 'ArrowRight' ? 1 : -1))
  }, { signal: events.signal })
  track.addEventListener('scroll', () => { clearTimeout(timer); timer = setTimeout(sync, 100) }, { passive: true, signal: events.signal })
  const resize = new ResizeObserver(() => { go(active, true); sync() })
  resize.observe(track)
  sync()
  return () => { events.abort(); resize.disconnect(); clearTimeout(timer) }
}
