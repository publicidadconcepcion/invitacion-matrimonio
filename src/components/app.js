import { heroEnvelope } from './heroEnvelope.js'
import { photoBackdrop, editorialWelcome } from './editorial.js'
import { musicPlayer } from './musicPlayer.js'
import { loveMessage } from './loveMessage.js'
import { gallery } from './gallery.js'
import { breakingNews } from './breakingNews.js'
import { eventDate } from './eventDate.js'
import { countdown } from './countdown.js'
import { itinerary } from './itinerary.js'
import { dressCode } from './dressCode.js'
import { spotifySection } from './spotify.js'
import { gifts } from './gifts.js'
import { guestInstructions } from './guestInstructions.js'
import { rsvpEnvelope } from './rsvpEnvelope.js'
import { whatsappContact } from './whatsappContact.js'
import { sharedPhotos } from './sharedPhotos.js'

export function invitationApp(data) {
  return `${photoBackdrop(data)}<main class="invitation invitation--editorial">
    ${heroEnvelope(data)}
    <div class="invitation-content" data-invitation-content aria-hidden="true">
      ${editorialWelcome(data)}
      ${breakingNews(data.editorial.breaking)}
      <div class="editorial-interior">
      ${musicPlayer(data.music)}
      ${loveMessage(data.loveMessage)}
      ${eventDate(data.event)}
      ${breakingNews(data.editorial.breaking)}
      ${countdown()}
      ${breakingNews(data.editorial.breaking)}
      ${itinerary(data.itinerary, data.event)}
      ${gallery(data.gallery)}
      ${breakingNews(data.editorial.breaking)}
      ${dressCode(data.dressCode)}
      ${spotifySection(data.spotify)}
      ${gifts(data.gifts)}
      ${guestInstructions(data.guestInstructions)}
      ${rsvpEnvelope(data.rsvp)}
      ${sharedPhotos(data.sharedPhotos)}
      ${whatsappContact(data.whatsapp, data.couple.names)}
      </div>
    </div>
  </main>`
}
