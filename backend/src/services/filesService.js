import fetch from 'node-fetch'

const API_BASE_URL = 'https://echo-serv.tbxnet.com/v1/secret'
const API_KEY = 'Bearer aSuperSecretKey'

/**
 * Obtiene la lista de archivos disponibles
 * @returns {Promise<array>} - Array con los nombres de los archivos
 */
export async function getFilesList () {
  try {
    const response = await fetch(`${API_BASE_URL}/files`, {
      method: 'GET',
      headers: {
        authorization: API_KEY
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.files || []
  } catch (error) {
    console.error('Error al obtener lista de archivos:', error.message)
    throw new Error('No se pudo obtener la lista de archivos')
  }
}

/**
 * Descarga el contenido de un archivo específico
 * @param {string} fileName - Nombre del archivo a descargar
 * @returns {Promise<string>} - Contenido del archivo
 */
export async function downloadFile (fileName) {
  try {
    const response = await fetch(`${API_BASE_URL}/file/${fileName}`, {
      method: 'GET',
      headers: {
        authorization: API_KEY
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.text()
    return data
  } catch (error) {
    console.error(`Error al descargar archivo ${fileName}:`, error.message)
    return null
  }
}