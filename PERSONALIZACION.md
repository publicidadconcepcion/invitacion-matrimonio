# Invitaciones personalizadas: estado y activación

Personalización activada localmente tras la actualización de Apps Script realizada por los organizadores. `personalization.enabled` es `true` y `endpoint` utiliza la misma URL que RSVP. No se modifican el RSVP ni sus cuatro campos enviados. La consulta mantiene la bienvenida genérica ante cualquier fallo. Los pasos de activación siguientes se conservan como referencia para futuras instalaciones.

## Generación privada

Ejecutar desde la raíz (Python 3, sin dependencias adicionales):

```powershell
python scripts/generate-invitations.py
```

Lee la hoja `Invitados` de `data/Plantilla_Invitados_Lucia_Gerald.xlsx`: A = `ID invitado`, B = `Nombre a mostrar`. Ignora el enlace anterior y el tipo de invitación; este último no significa cantidad de acompañantes. Rechaza fórmulas, nombres vacíos y referencias locales duplicadas. Admite celdas de texto compartido, inline y texto normal del XLSX.

Genera `data/invitaciones.csv` (UTF-8 con BOM, columnas `id,displayName,active,link`) y `data/invitation-ids.json`. Los tres registros del Excel son ficticios. Los nombres y enlaces completos permanecen exclusivamente en `data/`, excluido de Git. Ninguno se importa desde `src/` ni se copia a `public/` o `dist/`.

Conservar una copia privada del JSON: contiene la correspondencia entre el ID local del Excel y el token de 48 caracteres hexadecimales (24 bytes aleatorios con `secrets`). Reejecutar conserva enlaces; no reutilizar ni cambiar el ID local de una persona para otra. Borrar ese JSON generaría enlaces diferentes. Al retirar invitados, desactivarlos también en Sheets: el script no sincroniza ni borra registros remotos.

La base predeterminada se deduce del repositorio: `https://publicidadconcepcion.github.io/invitacion-matrimonio/`. Si se usa otro dominio, indicar `--base-url https://DOMINIO/invitacion-matrimonio/`. El parámetro `--excel RUTA` permite usar otra plantilla con las mismas columnas.

## Conectar Google Sheets posteriormente

1. Importar **manualmente** `data/invitaciones.csv` a una pestaña privada llamada `Invitados`, sin reemplazar las pestañas RSVP ni Canciones. Mantener encabezados exactos y las columnas como texto; desactivar la conversión automática de fórmulas/números al importar. `active` debe contener `TRUE`; para revocar un enlace, cambiar a `FALSE`.
2. Respaldar el código actual de Apps Script. Agregar `integrations/apps-script/GuestLookup.gs`. Configurar la propiedad de script `GUEST_SPREADSHEET_ID` con el ID del documento. No colocar este ID ni credenciales en el frontend.
3. Revisar si existe `doGet(e)`. Si existe, añadir al inicio la rama siguiente y conservar sus otras rutas. No crear dos `doGet` ni tocar `doPost`, `guardarConfirmacion` o el registro de canciones:

```javascript
if (e && e.parameter && e.parameter.action === 'guest') return guestLookupResponse(e);
```

Si no existe `doGet`, crear:

```javascript
function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'guest') return guestLookupResponse(e);
  return guestLookupJson_({ success: false });
}
```

4. Cuando se autorice, actualizar la implementación existente de la aplicación web a una nueva versión, manteniendo su URL `/exec` y acceso para invitados sin permisos de edición de Sheets. Debe ejecutarse como propietario. No hacer pública la hoja.
5. En `src/config/invitationData.js`, poner el endpoint existente en `personalization.endpoint` y `enabled: true`. La URL no es un secreto. Verificar desde navegador local y dominio GitHub Pages una respuesta JSON legible tras la redirección de Google; nunca usar `no-cors` ni JSONP como atajo. Si CORS no permite leerla, mantener desactivado y revisar antes de diseñar un intermediario.
6. Abrir los tres enlaces del CSV. Comprobar cada nombre, enlace desconocido, revocado y URL general, apertura rápida/lenta, móvil y movimiento reducido. El frontend aplica `textContent`, sin interpretar HTML. Ante error, timeout de 8 segundos o respuesta inválida conserva la bienvenida genérica y no bloquea el sobre.

Contrato: `GET /exec?action=guest&id=TOKEN` responde solo `{success:true,guest:{id,displayName}}` para una coincidencia activa; en el resto `{success:false}`. Nunca devuelve el listado. Las reglas GET y JSON siguen la documentación de [web apps](https://developers.google.com/apps-script/guides/web) y [Content Service](https://developers.google.com/apps-script/guides/content).

## Privacidad y futura asociación RSVP

El token personaliza, no autentica: quien reciba o reenvíe el enlace puede consultar ese nombre. Puede permanecer en historial y registros de solicitudes. No incluir más datos personales en esta ruta. No hay protección contra abuso ni garantías de identidad añadidas al backend. Para revocar, usar `active=FALSE`; no existe persistencia de nombres en localStorage.

`invitationContext.guestId` conserva en memoria solo el ID de una respuesta válida. Está reservado para una futura asociación RSVP: requerirá acordar y validar un nuevo contrato de servidor. Hoy NO se envía al RSVP, no se rellenan sus campos y no se cambian sus reglas.

`.gitignore` no elimina archivos previamente publicados. Se comprobó que `data/` no estaba rastreado antes de añadir la exclusión. No copiar el CSV/Excel a carpetas públicas ni adjuntarlos a commits.
