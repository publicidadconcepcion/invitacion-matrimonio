import { heroEnvelope } from './heroEnvelope.js'
import { musicPlayer } from './musicPlayer.js'
import { loveMessage } from './loveMessage.js'
import { photoSection } from './photoSection.js'
import { eventDate } from './eventDate.js'
import { countdown } from './countdown.js'
import { itinerary } from './itinerary.js'
import { locationSection } from './location.js'
import { dressCode } from './dressCode.js'
import { gifts } from './gifts.js'
import { guestInstructions } from './guestInstructions.js'
import { rsvpEnvelope } from './rsvpEnvelope.js'
import { whatsappContact } from './whatsappContact.js'

export function invitationApp(data) {
  return `<main class="invitation">
    ${heroEnvelope(data)}
    <div class="invitation-content" data-invitation-content aria-hidden="true">
      ${musicPlayer(data.music)}
      ${loveMessage(data.loveMessage)}
      ${photoSection(data.photos.first, 'first')}
      ${eventDate(data.event)}
      ${countdown()}
      ${itinerary(data.itinerary)}
      ${locationSection(data.event)}
      ${dressCode(data.dressCode)}
      ${gifts(data.gifts)}
      ${guestInstructions(data.guestInstructions)}
      ${photoSection(data.photos.second, 'second')}
      ${rsvpEnvelope(data.rsvp)}
      ${whatsappContact(data.whatsapp, data.couple.names)}
    </div>
  </main>`
}
