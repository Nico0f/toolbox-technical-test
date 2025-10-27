import * as filesService from '../services/filesService.js'
import { parseCSVContent } from '../utils/csvParser.js'

/**
 * Controlador para el endpoint GET /files/list
 * Retorna la lista de archivos tal cual la muestra el API Externa
 */
export async function getFilesList(_, res) {
  try {
    const filesList = await filesService.getFilesList()

    res.json({
      files: filesList
    })
  } catch (error) {
    console.error('Error en getFilesList:', error)
    res.status(500).json({
      error: 'Error al obtener la lista de archivos'
    })
  }
}

/**
 * Controlador para el endpoint GET /files/data
 * Soporta filtrado por fileName mediante query parameter
 */
export async function getFilesData(req, res) {
  try {
    const { fileName } = req.query

    if (fileName) {
      const fileData = { file: fileName }
      const fileContent = await filesService.downloadFile(fileName)
      const lines = parseCSVContent(fileContent)
      if (lines.length > 0) {
        fileData.lines = [...lines]
        res.json([fileData])
      } else {
        res.json([])
      }
      return
    }

    let filesList = await filesService.getFilesList()

    if (!filesList || filesList.length === 0) {
      return res.json([])
    }

    const filesData = []

    for (const file of filesList) {
      const fileContent = await filesService.downloadFile(file)

      if (fileContent === null) {
        continue
      }

      const lines = parseCSVContent(fileContent)

      if (lines.length > 0) {
        filesData.push({
          file,
          lines
        })
      }
    }

    res.json(filesData)
  } catch (error) {
    console.error('Error en getFilesData:', error)
    res.status(500).json({
      error: 'Error al procesar los archivos'
    })
  }
}