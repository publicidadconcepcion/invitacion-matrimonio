import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Memory only; current RSVP never sends this value.
export const invitationContext = { guestId: null }
export function invitationId(search) {
  const ids = new URLSearchParams(search).getAll('invitado')
  return ids.length === 1 && /^[0-9a-f]{48}$/.test(ids[0]) ? ids[0] : null
}
export async function lookupGuest(endpoint, id, fetcher = fetch) {
  if (!endpoint || !/^[0-9a-f]{48}$/.test(id || '')) return null
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)
  try {
    const url = new URL(endpoint)
    url.searchParams.set('action', 'guest'); url.searchParams.set('id', id)
    const response = await fetcher(url.href, { mode: 'cors', credentials: 'omit', redirect: 'follow', cache: 'no-store', referrerPolicy: 'no-referrer', signal: controller.signal })
    const data = await response.json()
    const name = data?.guest?.displayName
    if (!response.ok || data.success !== true || data.guest?.id !== id || typeof name !== 'string' || !name.trim() || name.length > 120) return null
    return { id, displayName: name.trim() }
  } catch { return null } finally { clearTimeout(timer) }
}
export async function initGuestPersonalization(root, config) {
  invitationContext.guestId = null
  const id = invitationId(window.location.search)
  if (!config.enabled || !id) return
  const guest = await lookupGuest(config.endpoint, id)
  if (!guest) return
  const name = root.querySelector('[data-guest-name]')
  if (!name) return
  invitationContext.guestId = guest.id
  name.textContent = guest.displayName
  root.querySelector('[data-guest-prefix]').textContent = config.prefix
  if (root.querySelector('[data-hero]')?.hidden && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.fromTo(name, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .45, ease: 'power2.out' })
  }
  ScrollTrigger.refresh()
}
