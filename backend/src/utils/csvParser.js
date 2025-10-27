/**
 * Parsea una línea CSV y valida su formato
 * @param {string} line - Línea del CSV
 * @returns {object|null} - Objeto parseado o null si hay error
 */
export function parseCSVLine (line) {

  const parts = line.split(',')

  if (parts.length !== 4) {
    return null
  }

  const [file, text, number, hex] = parts

  if (!file || !text || !number || !hex) {
    return null
  }

  const parsedNumber = parseInt(number, 10)
  if (isNaN(parsedNumber)) {
    return null
  }

  const hexRegex = /^[0-9a-fA-F]{32}$/
  if (!hexRegex.test(hex)) {
    return null
  }

  return {
    text: text.trim(),
    number: parsedNumber,
    hex: hex.trim()
  }
}

/**
 * Parsea el contenido completo de un archivo CSV
 * @param {string} content - Contenido del archivo CSV
 * @returns {array} - Array de objetos parseados (sin las líneas con error)
 */
export function parseCSVContent (content) {
  if (!content || content.trim() === '') {
    return []
  }

  const lines = content.split('\n')
  const parsedLines = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()

    if (line === '') {
      continue
    }

    const parsed = parseCSVLine(line)

    if (parsed !== null) {
      parsedLines.push(parsed)
    }
  }

  return parsedLines
}