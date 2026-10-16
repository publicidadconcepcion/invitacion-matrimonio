import { escapeHtml } from './shared.js'

export const transferDetails = [
  ['Titular', 'Lucia edith Espinoza'],
  ['RUT', '151877826'],
  ['Banco', 'Banco Falabella'],
  ['Tipo de cuenta', 'Cuenta Corriente'],
  ['Número de cuenta', '1-981-299287-5'],
  ['Correo electrónico', 'luciaespinozaurtiza@gmail.com'],
]

const copyIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="8" y="8" width="12" height="13" rx="1.5"/><path d="M16 8V3H3v13h5"/></svg>'

export function giftTransfer() {
  return `<div class="gift-transfer" data-gift-transfer role="region" aria-labelledby="gift-transfer-title">
    <span class="gift-transfer__ornament" aria-hidden="true">◇</span>
    <h3 id="gift-transfer-title">Un detalle con cariño</h3>
    <p class="gift-transfer__intro">Si deseas acompañarnos con alguno de estos regalos, puedes hacerlo mediante transferencia bancaria.</p>
    <dl class="gift-transfer__details">${transferDetails.map(([label, value], index) => `<div class="gift-transfer__row">
      <div class="gift-transfer__text"><dt>${escapeHtml(label)}</dt><dd>${label === 'Correo electrónico' ? `<a href="mailto:${escapeHtml(value)}">${escapeHtml(value)}</a>` : escapeHtml(value)}</dd></div>
      <button type="button" class="gift-transfer__copy" data-copy-transfer="${index}" aria-label="Copiar ${escapeHtml(label.toLowerCase())}">${copyIcon}</button>
    </div>`).join('')}</dl>
    <button type="button" class="gift-transfer__all" data-copy-transfer="all">${copyIcon}<span>Copiar datos de transferencia</span></button>
    <p class="gift-transfer__status" data-transfer-status role="status" aria-live="polite" aria-atomic="true"></p>
    <div class="gift-transfer__closing"><p>Gracias por ser parte de nuestra historia.</p><p>Lucía &amp; Gerald</p><span class="gift-transfer__ornament" aria-hidden="true">◇</span></div>
  </div>`
}

export async function copyTransferText(text) {
  if (navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(text); return } catch { /* Try the compatible fallback. */ }
  }
  const active = document.activeElement
  const selection = document.getSelection()
  const ranges = selection ? Array.from({ length: selection.rangeCount }, (_, i) => selection.getRangeAt(i).cloneRange()) : []
  const field = document.createElement('textarea')
  field.value = text
  field.readOnly = true
  field.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;font-size:16px;pointer-events:none'
  document.body.append(field)
  try {
    field.focus({ preventScroll: true })
    field.select()
    if (!document.execCommand('copy')) throw new Error('Copy unavailable')
  } finally {
    field.remove()
    active?.focus({ preventScroll: true })
    if (selection) { selection.removeAllRanges(); ranges.forEach(range => selection.addRange(range)) }
  }
}

export function initGiftTransfer(root = document) {
  const block = root.querySelector('[data-gift-transfer]')
  if (!block) return
  const status = block.querySelector('[data-transfer-status]')
  let timer
  block.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy-transfer]')
    if (!button || !block.contains(button) || button.hasAttribute('aria-busy')) return
    const key = button.dataset.copyTransfer
    const detail = transferDetails[Number(key)]
    if (key !== 'all' && !detail) return
    const text = key === 'all' ? transferDetails.map(([label, value]) => `${label}: ${value}`).join('\n') : detail[1]
    clearTimeout(timer)
    status.textContent = ''
    button.setAttribute('aria-busy', 'true')
    try {
      await copyTransferText(text)
      status.textContent = key === 'all' ? '¡Datos de transferencia copiados!' : `¡Copiado! ${detail[0]}`
    } catch {
      status.textContent = 'No se pudo copiar. Mantén presionado el dato para copiarlo manualmente.'
    } finally {
      button.removeAttribute('aria-busy')
      timer = setTimeout(() => { status.textContent = '' }, 4000)
    }
  })
}
