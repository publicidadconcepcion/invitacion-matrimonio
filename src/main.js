import './styles/variables.css'
import './styles/main.css'
import './styles/envelope.css'
import './styles/music.css'
import './styles/sections.css'
import './styles/timeline.css'
import './styles/forms.css'
import './styles/responsive.css'
import './styles/animations.css'

import { invitationData } from './config/invitationData.js'
import { invitationApp } from './components/app.js'
import { initImageFallbacks } from './components/shared.js'
import { initMusicPlayer } from './components/musicController.js'
import { initCountdown } from './components/countdownController.js'
import { initRsvpForm } from './components/rsvpController.js'
import { initHeroEnvelope } from './animations/heroEnvelope.js'
import { initScrollAnimations } from './animations/scrollAnimations.js'
import { initRsvpEnvelope } from './animations/rsvpEnvelope.js'

const app = document.querySelector('#app')
app.innerHTML = invitationApp(invitationData)

initImageFallbacks(app)
initMusicPlayer(app)
initCountdown(app, invitationData.event.date)
initRsvpForm(app, invitationData.rsvp)
initHeroEnvelope(app)
initRsvpEnvelope(app)
initScrollAnimations(app)
