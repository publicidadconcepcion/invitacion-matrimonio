const formatTime = (seconds) => Number.isFinite(seconds) ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}` : '0:00'

export function initMusicPlayer(root = document) {
  const player = root.querySelector('[data-music-player]')
  if (!player) return () => {}
  const audio = player.querySelector('[data-audio]')
  const toggle = player.querySelector('[data-audio-toggle]')
  const progress = player.querySelector('[data-audio-progress]')
  const current = player.querySelector('[data-audio-current]')
  const duration = player.querySelector('[data-audio-duration]')
  const status = player.querySelector('[data-audio-status]')

  if (!audio.hasAttribute('src')) return () => {}

  const setUnavailable = () => {
    status.textContent = 'La canción no está disponible en este momento.'
    progress.disabled = true
    toggle.disabled = true
    player.classList.add('is-unavailable')
  }
  const sync = () => {
    current.textContent = formatTime(audio.currentTime)
    const ratio = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.currentTime / audio.duration : 0
    progress.value = String(Math.round(ratio * 1000))
    progress.style.setProperty('--progress', `${ratio * 100}%`)
  }
  const seek = () => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return
    const ratio = Number(progress.value) / Number(progress.max)
    if (!Number.isFinite(ratio)) return
    audio.currentTime = Math.min(audio.duration, Math.max(0, ratio * audio.duration))
    current.textContent = formatTime(audio.currentTime)
    progress.style.setProperty('--progress', `${ratio * 100}%`)
  }
  const onToggle = async () => {
    if (!audio.paused) { audio.pause(); return }
    try { await audio.play() } catch { setUnavailable() }
  }
  const onPlay = () => { toggle.setAttribute('aria-label', 'Pausar canción'); status.textContent = 'Reproduciendo'; player.classList.add('is-playing') }
  const onPause = () => { toggle.setAttribute('aria-label', 'Reproducir canción'); status.textContent = audio.ended ? 'Volver a escuchar' : 'En pausa'; player.classList.remove('is-playing') }
  const onMetadata = () => { duration.textContent = formatTime(audio.duration) }

  toggle.addEventListener('click', onToggle)
  progress.addEventListener('input', seek)
  audio.addEventListener('play', onPlay); audio.addEventListener('pause', onPause)
  audio.addEventListener('timeupdate', sync); audio.addEventListener('loadedmetadata', onMetadata)
  audio.addEventListener('error', setUnavailable, { once: true })
  return () => { audio.pause(); toggle.removeEventListener('click', onToggle); progress.removeEventListener('input', seek); audio.removeEventListener('timeupdate', sync) }
}
