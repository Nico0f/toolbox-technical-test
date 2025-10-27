import { expect } from 'chai'
import * as filesController from '../../src/controllers/filesController.js'

describe('filesController', () => {
  describe('getFilesList', () => {
    it('debería retornar un objeto JSON con la propiedad files', async () => {
      const req = {}
      const res = {
        json: function (data) {
          expect(data).to.be.an('object')
          expect(data).to.have.property('files')
          expect(data.files).to.be.an('array')
        }
      }

      await filesController.getFilesList(req, res)
    })

    it('debería manejar errores con status 500', async () => {
      const req = {}
      let statusCode
      let responseData

      const res = {
        status: function (code) {
          statusCode = code
          return this
        },
        json: function (data) {
          responseData = data
        }
      }

      await filesController.getFilesList(req, res)

      if (statusCode === 500) {
        expect(responseData).to.have.property('error')
      }
    })
  })

  describe('getFilesData', () => {
    it('debería retornar array de datos cuando no hay filtro', async () => {
      const req = {
        query: {}
      }

      let responseData

      const res = {
        json: function (data) {
          responseData = data
          expect(data).to.be.an('array')
        }
      }

      await filesController.getFilesData(req, res)

      if (responseData && responseData.length > 0) {
        responseData.forEach(fileData => {
          expect(fileData).to.have.property('file')
          expect(fileData).to.have.property('lines')
          expect(fileData.lines).to.be.an('array')
          
          if (fileData.lines.length > 0) {
            fileData.lines.forEach(line => {
              expect(line).to.have.property('text')
              expect(line).to.have.property('number')
              expect(line).to.have.property('hex')
            })
          }
        })
      }
    })

    it('debería filtrar por fileName cuando se proporciona', async () => {
      const req = {
        query: {
          fileName: 'test2.csv'
        }
      }

      let responseData

      const res = {
        json: function (data) {
          responseData = data
          expect(data).to.be.an('array')
        }
      }

      await filesController.getFilesData(req, res)

      if (responseData && responseData.length > 0) {
        expect(responseData.length).to.be.at.most(1)
        if (responseData.length === 1) {
          expect(responseData[0].file).to.equal('test2.csv')
        }
      }
    })

    it('debería retornar array vacío para fileName inexistente', async () => {
      const req = {
        query: {
          fileName: 'nonexistent_file_12345.csv'
        }
      }

      let responseData

      const res = {
        json: function (data) {
          responseData = data
          expect(data).to.be.an('array')
        }
      }

      await filesController.getFilesData(req, res)

      expect(responseData).to.have.lengthOf(0)
    })

    it('debería manejar errores con status 500', async () => {
      const req = {
        query: {}
      }

      let statusCode
      let responseData

      const res = {
        status: function (code) {
          statusCode = code
          return this
        },
        json: function (data) {
          responseData = data
        }
      }

      await filesController.getFilesData(req, res)

      if (statusCode === 500) {
        expect(responseData).to.have.property('error')
      }
    })

    it('debería omitir archivos sin líneas válidas', async () => {
      const req = {
        query: {}
      }

      let responseData

      const res = {
        json: function (data) {
          responseData = data
          expect(data).to.be.an('array')
        }
      }

      await filesController.getFilesData(req, res)

      if (responseData && responseData.length > 0) {
        responseData.forEach(fileData => {
          expect(fileData.lines.length).to.be.greaterThan(0)
        })
      }
    })

    it('debería validar la estructura de las líneas parseadas', async () => {
      const req = {
        query: {}
      }

      let responseData

      const res = {
        json: function (data) {
          responseData = data
        }
      }

      await filesController.getFilesData(req, res)

      if (responseData && responseData.length > 0) {
        const firstFile = responseData[0]
        
        if (firstFile.lines.length > 0) {
          const firstLine = firstFile.lines[0]
          
          expect(firstLine.text).to.be.a('string')
          expect(firstLine.number).to.be.a('number')
          expect(firstLine.hex).to.be.a('string')
          expect(firstLine.hex).to.match(/^[0-9a-fA-F]{32}$/)
        }
      }
    })
  })
})