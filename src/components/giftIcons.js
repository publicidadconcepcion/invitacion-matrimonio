// Font Awesome Free 6.7.2 Solid, Fonticons, Inc. — CC BY 4.0.
// Original attribution is retained inside each locally bundled SVG.
import utensils from '../assets/gift-icons/utensils.svg?raw'
import bed from '../assets/gift-icons/bed.svg?raw'
import sun from '../assets/gift-icons/sun.svg?raw'
import martini from '../assets/gift-icons/martini-glass-citrus.svg?raw'
import plane from '../assets/gift-icons/plane.svg?raw'
import camera from '../assets/gift-icons/camera.svg?raw'
import champagne from '../assets/gift-icons/champagne-glasses.svg?raw'
import earth from '../assets/gift-icons/earth-americas.svg?raw'
import gem from '../assets/gift-icons/gem.svg?raw'

const icons = {
  'fa-utensils': utensils,
  'fa-bed': bed,
  'fa-sun': sun,
  'fa-martini-glass-citrus': martini,
  'fa-plane': plane,
  'fa-camera': camera,
  'fa-champagne-glasses': champagne,
  'fa-earth-americas': earth,
  'fa-gem': gem,
}

export function giftIcon(name) {
  return (icons[name] || '').replace('<svg ', '<svg aria-hidden="true" focusable="false" ')
}
