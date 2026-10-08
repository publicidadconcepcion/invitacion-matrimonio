import './styles/variables.css'
import './styles/main.css'
import './styles/envelope.css'
import './styles/music.css'
import './styles/sections.css'
import './styles/timeline.css'
import './styles/forms.css'
import './styles/responsive.css'
import './styles/animations.css'
import './styles/editorial.css'
import './styles/editorial-interior.css'

import { invitationData } from './config/invitationData.js'
import { invitationApp } from './components/app.js'
import { initImageFallbacks } from './components/shared.js'
import { initMusicPlayer } from './components/musicController.js'
import { initCountdown } from './components/countdownController.js'
import { initRsvpForm } from './components/rsvpController.js'
import { initHeroEnvelope } from './animations/heroEnvelope.js'
import { initScrollAnimations } from './animations/scrollAnimations.js'
import { initRsvpEnvelope } from './animations/rsvpEnvelope.js'
import { initFormDialog } from './animations/rsvpEnvelope.js'
import { initSongForm } from './components/songController.js'

import { initGuestPersonalization } from './components/guestPersonalization.js'

import { initGallery } from './components/galleryController.js'

const data = invitationData
const app = document.querySelector('#app')
app.innerHTML = invitationApp(data)

initImageFallbacks(app)
initGallery(app)
initMusicPlayer(app)
initCountdown(app, data.event.date)
initRsvpForm(app, data.rsvp)
initHeroEnvelope(app)
initRsvpEnvelope(app)
initFormDialog(app, 'song')
initSongForm(app, data.rsvp)
initScrollAnimations(app)

initGuestPersonalization(app, data.personalization)
