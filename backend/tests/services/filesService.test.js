import { expect } from 'chai'
import * as filesService from '../../src/services/filesService.js'

describe('filesService', () => {
  describe('getFilesList', () => {
    it('debería retornar un array de archivos', async () => {
      const files = await filesService.getFilesList()

      expect(files).to.be.an('array')
    })

    it('cada elemento del array debería ser un string', async () => {
      const files = await filesService.getFilesList()

      files.forEach(file => {
        expect(file).to.be.a('string')
      })
    })
  })

  describe('downloadFile', () => {
    it('debería retornar null para un archivo inexistente', async () => {
      const content = await filesService.downloadFile('nonexistent_file.csv')

      expect(content).to.be.null
    })

    it('debería descargar el contenido de un archivo válido', async () => {
      const files = await filesService.getFilesList()
      
      if (files.length > 0) {
        const content = await filesService.downloadFile(files[0])
        
        expect(content).to.be.a('string')
        expect(content.length).to.be.greaterThan(0)
      }
    })

    it('debería retornar contenido con formato CSV', async () => {
      const files = await filesService.getFilesList()
      
      if (files.length > 0) {
        const content = await filesService.downloadFile(files[0])
        
        if (content) {
          const lines = content.split('\n')
          expect(lines.length).to.be.greaterThan(0)
          expect(lines[0]).to.include('file')
        }
      }
    })

    it('debería manejar nombres de archivo con caracteres especiales', async () => {
      const content = await filesService.downloadFile('test@#$.csv')

      expect(content).to.be.null
    })
  })

  describe('integración API', () => {
    it('debería poder obtener lista y luego descargar archivos', async () => {
      const files = await filesService.getFilesList()
      expect(files).to.be.an('array')

      if (files.length > 0) {
        const firstFile = files[0]
        const content = await filesService.downloadFile(firstFile)
        
        expect(content).to.exist
      }
    })
  })
})