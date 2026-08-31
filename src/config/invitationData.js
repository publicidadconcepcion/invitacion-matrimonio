const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`

export const invitationData = {
  couple: {
    names: 'Sofía & Mateo',
    shortPhrase: 'El amor nos trajo hasta aquí',
    heroImage: publicAsset('images/lovely-couple-have-warm-cuddle.jpg'),
  },
  event: {
    date: '2027-03-20T17:00:00-03:00',
    locale: 'es-CL',
    venue: 'Casa del Lago',
    address: 'Camino del Bosque 2450, Santiago, Chile',
    locationText: 'Celebraremos rodeados de naturaleza, luces cálidas y las personas que más queremos.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Casa+del+Lago+Santiago+Chile',
  },
  music: {
    title: 'Nuestra canción',
    artist: 'Sofía & Mateo',
    file: publicAsset('music/Hoja en Blanco - Monchy y Alexandra.mp3'),
    cover: publicAsset('images/lovely-couple-have-warm-cuddle.jpg'),
  },
  loveMessage: [
    'Hay encuentros que cambian el rumbo de una vida.',
    'El nuestro se convirtió en hogar, aventura y promesa.',
    'Queremos celebrar este nuevo comienzo contigo.',
  ],
  photos: {
    first: { src: publicAsset('images/lovely-couple-have-warm-cuddle.jpg'), alt: 'Sofía y Mateo compartiendo un momento juntos' },
    second: { src: publicAsset('images/lovely-couple-have-warm-cuddle.jpg'), alt: 'Sofía y Mateo celebrando su historia', caption: 'Para siempre comienza aquí.' },
  },
  itinerary: [
    { time: '17:00', title: 'Ceremonia', description: 'El momento de decir sí.', icon: 'rings' },
    { time: '18:30', title: 'Cóctel', description: 'Brindis, abrazos y buena compañía.', icon: 'glass' },
    { time: '20:00', title: 'Cena', description: 'Una mesa para compartir y celebrar.', icon: 'plate' },
    { time: '22:00', title: 'Fiesta', description: 'Bailaremos hasta que se apaguen las luces.', icon: 'music' },
  ],
  dressCode: {
    name: 'Elegante',
    description: 'Queremos verte sentirte increíble. Elige un look formal, cómodo y con tu sello personal.',
    suggestions: 'Traje o vestido de cóctel. La celebración tendrá espacios al aire libre.',
    recommendedColors: ['#9a765d', '#b9a98d', '#7e8b72', '#c99a91'],
    avoidColors: ['#ffffff', '#f5efe4'],
  },
  gifts: {
    title: 'El mejor regalo es compartir este día con nosotros',
    text: 'Si además deseas hacernos un regalo, hemos preparado estas alternativas.',
    options: [
      { title: 'Mesa de regalos', detail: 'Enlace disponible próximamente' },
      { title: 'Lluvia de sobres', detail: 'Encontrarás un buzón durante la celebración' },
    ],
  },
  guestInstructions: [
    'Te recomendamos llegar 20 minutos antes de la ceremonia.',
    'Habrá estacionamiento disponible dentro del recinto.',
    'Esta celebración está pensada solo para adultos.',
    'Lleva algo de abrigo para disfrutar la noche al aire libre.',
  ],
  rsvp: {
    deadline: 'Confirma antes del 20 de febrero de 2027',
    endpoint: '',
    maxGuests: 4,
  },
  whatsapp: {
    phone: '56912345678',
    message: 'Hola Sofía y Mateo, tengo una consulta sobre su matrimonio.',
  },
}
