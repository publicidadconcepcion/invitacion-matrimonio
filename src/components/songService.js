// Reuse the proven URL-encoded transport and strict acknowledgement handling.
export { sendRsvp as sendSong } from './rsvpService.js'

export function validateSong(values) {
  const payload = {
    type: 'song',
    name: String(values.name ?? '').trim(),
    song: String(values.song ?? '').trim(),
    link: String(values.link ?? '').trim(),
  }
  const errors = {}
  if (!payload.name || payload.name.length > 120) errors.name = 'Escribe tu nombre (máximo 120 caracteres).'
  if (!payload.song || payload.song.length > 250) errors.song = 'Escribe la canción y artista (máximo 250 caracteres).'
  if (payload.link) {
    try {
      const url = new URL(payload.link)
      const hosts = ['open.spotify.com', 'spotify.com', 'www.spotify.com', 'youtu.be', 'youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com']
      if (payload.link.length > 500 || url.protocol !== 'https:' || !hosts.includes(url.hostname) || url.username || url.password || url.port) throw new Error('Invalid link')
    } catch {
      errors.link = 'Usa un enlace HTTPS de Spotify o YouTube (máximo 500 caracteres), o deja este campo vacío.'
    }
  }
  return { payload, errors }
}
