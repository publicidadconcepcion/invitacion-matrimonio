const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`
const names = 'Lucía & Gerald'
const photo = publicAsset('images/Matrimonio.jpeg')

export const invitationData = {
  editorial: {
    cover: publicAsset('images/imagen portada.png'),
    breaking: publicAsset('images/breaking.png'),
    coverWidth: 941,
    coverHeight: 1672,
    seal: { x: 49.8, y: 55.8 },
    openHint: 'Toca el sello para abrir',
    edition: 'THE WEDDING EDITION',
    issue: 'VOL. 01',
    label: 'EDICIÓN ESPECIAL',
    tagline: 'Una historia que merece una nueva edición.',
    newsLabel: 'THE WEDDING NEWS',
    scrollLabel: 'Nuestra próxima edición comienza aquí',
  },
  couple: {
    names,
    initials: 'L · G',
    shortPhrase: 'El amor nos trajo hasta aquí',
    heroImage: photo,
  },
  event: {
    date: '2027-01-08T20:00:00-03:00',
    endDate: '2027-01-09T04:00:00-03:00',
    locale: 'es-CL',
    timeZone: 'America/Santiago',
    venue: 'La Estancia Andalué',
    address: 'Camino El Venado 235, San Pedro de la Paz, Chile.',
    locationText: 'Celebraremos rodeados de las personas que más queremos.',
    mapsUrl: 'https://maps.app.goo.gl/Necme5XvjwhbfbA66?g_st=awb',
  },

  music: {
    title: 'You Make Me Feel Brand New',
    artist: 'Simply Red',
    file: publicAsset('music/You Make Me Feel Brand New.mp3'),
    available: true,
    pendingMessage: 'Pronto podrás escuchar nuestra canción.',
    cover: photo,
    coverAlt: 'Lucía y Gerald, portada de nuestra canción',
  },

  loveMessage: [
    'La vida quiso que, después de tantos años y tantos caminos, volviéramos a encontrarnos.',
    'Hoy queremos decirnos que sí, y seguir eligiéndonos, una y otra vez.',
  ],
  gallery: {
    title: 'Retratos de nuestro amor',
    subtitle: 'Cada momento nos trajo hasta aquí.',
    caption: 'Para siempre comienza aquí.',
    photos: Array.from({ length: 3 }, () => ({ src: photo, alt: 'Lucía y Gerald celebrando su historia' })),
  },
  itinerary: [
    { time: '20:00 hrs', title: 'Ceremonia', description: 'El momento en que diremos que sí.', icon: 'rings' },
    { time: '20:45 a 23:00 hrs', title: 'Cóctel extendido', description: 'Un espacio para compartir, conversar y comenzar la celebración.', icon: 'glass' },
    { time: '23:00 a 04:00 hrs', title: 'Fiesta', description: '¡A disfrutar, bailar y celebrar juntos! Finalizamos a las 04:00 del sábado 9 de enero.', icon: 'music' },
  ],
  dressCode: {
    name: 'Semiformal y con tu sello personal.',
    description: 'La celebración tendrá espacios al aire libre.',
  },
  spotify: {
    title: '¡Ponle música a nuestra celebración!',
    text: 'Recomienda tu canción favorita y ayúdanos a crear la playlist de nuestro matrimonio.',
    buttonLabel: 'Recomendar una canción',
    url: '',
    pendingMessage: 'Pronto compartiremos nuestra playlist colaborativa.',
  },
  gifts: {
    title: 'El mejor regalo es compartir este día con nosotros',
    text: 'Si además deseas hacernos un regalo, hemos preparado estas alternativas.',
    options: [
      { icon: 'fa-utensils', amount: '$70.000', title: 'Cena romántica', detail: 'Porque después de casarnos, alguien tendrá que alimentarnos. 😂' },
      { icon: 'fa-bed', amount: '$100.000', title: 'Una noche de hotel', detail: 'Para dormir juntitos, felices y sin pensar en la cuenta.' },
      { icon: 'fa-sun', amount: '$120.000', title: 'Día de paseo', detail: 'Sol, aventura y cero preocupaciones.' },
      { icon: 'fa-martini-glass-citrus', amount: '$150.000', title: 'Día de playa + traguitos', detail: 'Porque la luna de miel también necesita hidratación. 😎' },
      { icon: 'fa-plane', amount: '$200.000', title: 'Kilómetros de amor', detail: 'Una ayudita para acercarnos a nuestro destino soñado.' },
      { icon: 'fa-camera', amount: '$250.000', title: 'Recuerdos para toda la vida', detail: 'Fotos, experiencias y alguna que otra anécdota imprudente. 😂' },
      { icon: 'fa-champagne-glasses', amount: '$300.000', title: 'Cena y noche especial', detail: 'Para celebrar que sobrevivimos a la organización del matrimonio.' },
      { icon: 'fa-earth-americas', amount: '$$$$$$$', title: 'Una gran aventura', detail: 'Contribuyes oficialmente a nuestro "¿y si hacemos esto?" ❤️' },
      { icon: 'fa-gem', amount: '$$$$$$$$$$$$$', title: 'Patrocinador oficial de la luna de miel', detail: 'Prometemos brindar por ti... varias veces. 🥂😂' },
    ],
  },
  guestInstructions: [
    { title: 'Llega con anticipación:', text: 'Te recomendamos llegar 30 minutos antes de la ceremonia.' },
    { title: 'Estacionamientos:', text: 'Habrá estacionamientos disponibles dentro del recinto.' },
    { title: 'Prepárate para la noche:', text: 'Lleva algo abrigado para disfrutar la celebración, ya que habrá espacios al aire libre.' },
  ],
  personalization: {
    enabled: true,
    endpoint: 'https://script.google.com/macros/s/AKfycbwHAwfP2T4ubdnf32flxOrtRVS0IdR6fIZdzuIOy2HCGSnJrrsd0ZWukgfSYvNeamG7Mg/exec',
    prefix: 'UNA INVITACIÓN ESPECIAL PARA',
  },
  rsvp: {
    endpoint: 'https://script.google.com/macros/s/AKfycbwHAwfP2T4ubdnf32flxOrtRVS0IdR6fIZdzuIOy2HCGSnJrrsd0ZWukgfSYvNeamG7Mg/exec',
  },
  sharedPhotos: {
    // Regenerate src/assets/shared-album-qr.svg whenever this URL changes.
    url: 'https://photos.app.goo.gl/EtKzFJ39VLXDR3Lv9',
  },
  whatsapp: {
    phone: '',
    message: 'Hola Lucía y Gerald, tengo una consulta sobre su matrimonio.',
  },
}
