# Contenido de la invitación

## Etapa 2 — interiores

La paleta está centralizada en `styles/variables.css`: negro, blanco, blanco papel, gris y dorado. `styles/editorial-interior.css` contiene el contador de ancho completo, calendario, tarjetas de celebración y carrusel. La portada y el encuadre del fondo fijo se conservan.

`components/breakingNews.js` reutiliza la imagen de `editorial.breaking` en tiras decorativas, con sus proporciones y transparencia originales. No se modifica el PNG.

El itinerario se representa en tres tarjetas; la primera integra los datos y el enlace de ubicación. `gallery.photos` es la lista editable del carrusel. Sus tres entradas utilizan temporalmente la misma foto; reemplazar sus `src` y `alt` al recibir nuevas fotografías. El carrusel usa scroll nativo con snap, botones, indicadores y teclas izquierda/derecha/Home/End. No tiene autoplay ni requiere librerías nuevas.

La lógica de cuenta regresiva, música, personalización y RSVP se conserva. Los regalos y demás contenidos siguen en secciones, sin modales.

## Portada editorial — primera etapa

`invitationData.editorial` controla la portada, sus dimensiones, las coordenadas del sello y los textos editoriales. La imagen original mide 941 × 1672 px. El botón transparente se posiciona al 49,8 % del ancho y al 55,8 % del alto del marco de la imagen, no de la ventana. Si se sustituye la portada por otra composición, recalibrar estas coordenadas.

La imagen completa se ajusta a la pantalla sin recorte. El espacio restante se cubre con una extensión desenfocada de la misma portada. `heroEnvelope.js` conserva su punto de entrada pero ahora genera y anima esta portada, sin dibujar un segundo sobre o sello. La apertura GSAP dura 2,8 segundos y se omite con movimiento reducido. Al terminar, habilita el scroll y lleva el foco al título de bienvenida.

`components/editorial.js` genera el fondo fijo, la bienvenida y un separador reutilizable. La fecha se deriva del evento en `America/Santiago`. `styles/editorial.css` define la nueva capa visual; el fondo es un hermano del contenido, sin transformaciones ni parallax, y utiliza `100lvh` para permanecer estable ante cambios de las barras del navegador móvil. El encuadre se ajusta adicionalmente en pantallas horizontales de poca altura.

Se prepararon las variables `--editorial-*`, la superficie `.editorial-card` y el separador `editorialSeparator(data)`. Las secciones interiores conservan su estructura, orden, datos y controladores; reciben solamente una superficie clara y separación para que puedan leerse sobre la foto. Su rediseño detallado, la galería, las tarjetas interactivas, los modales y una nueva presentación RSVP pertenecen a etapas posteriores.

La información editable está en `src/config/invitationData.js`. El título y la descripción estáticos para buscadores se editan en `index.html`.

## Música

Incorporar el archivo autorizado `public/music/Simply Red - You Make Me Feel Brand New.mp3` y cambiar `music.available` a `true`. Mientras sea `false`, no se solicita audio y los controles permanecen deshabilitados. El audio anterior no está vinculado al reproductor.

## Spotify y contacto

Asignar a `spotify.url` la URL HTTPS completa de la playlist en `open.spotify.com/playlist/...`, conservando los parámetros de colaboración. Deben habilitar la colaboración en Spotify; la invitación no puede verificar los permisos de la playlist. Sin una URL con formato admitido, solo se muestra el aviso de disponibilidad futura.

Asignar el número real con código de país a `whatsapp.phone`. Sin número no se muestra el enlace de contacto.

## Confirmaciones

`rsvp.endpoint` contiene la URL pública de Apps Script. El modal envía únicamente `name`, `attending` (`yes`/`no`), `companionType` y `message` mediante POST URL-encoded. Sheets agrega la fecha. Solo una respuesta JSON legible con `success: true` y estado HTTP satisfactorio confirma el registro. `success: false` permite corregir y reintentar, conservando los datos. Una respuesta ilegible, un fallo de red o el plazo de 30 segundos dejan la recepción por verificar: no se reintenta automáticamente porque el servidor podría haber guardado la fila.

La relación con los novios es obligatoria para ambas respuestas y no representa un número de acompañantes. El formulario bloquea clics repetidos durante el envío y después de éxito o recepción incierta, dentro de la sesión de página. Esto no sustituye deduplicación, validación, protección contra abuso ni tratamiento de fórmulas de hojas de cálculo en el servidor. No se ha auditado el código de Apps Script. No colocar claves privadas en este proyecto. La prueba real URL-encoded fue confirmada por Apps Script y por los novios en Sheets; no repetirla automáticamente. Verificar CORS desde el dominio publicado antes del lanzamiento, sin usar `no-cors`.

## Invitaciones individuales

El listado se procesa exclusivamente en `data/` mediante `python scripts/generate-invitations.py`. No cargar registros en JavaScript público. La arquitectura consulta un único invitado en Apps Script; permanece desactivada hasta desplegar esa ruta. Ver [PERSONALIZACION.md](PERSONALIZACION.md) para generación, importación privada a Sheets, activación y pruebas. El RSVP actual no cambia.

## Fecha y publicación

Inicio: `2027-01-08T20:00:00-03:00`. Fin: `2027-01-09T04:00:00-03:00`. Zona de presentación: `America/Santiago`. El calendario se deriva de la fecha en esa zona y la cuenta regresiva del instante ISO.

Ejecutar `npm.cmd run build` después de editar. Se conserva la configuración de GitHub Pages y las rutas basadas en `import.meta.env.BASE_URL`.
