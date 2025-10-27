import { expect } from 'chai'
import { parseCSVLine, parseCSVContent } from '../../src/utils/csvParser.js'

describe('csvParser', () => {
  describe('parseCSVLine', () => {
    it('debería parsear una línea CSV válida correctamente', () => {
      const line = 'test1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765'
      const result = parseCSVLine(line)

      expect(result).to.not.be.null
      expect(result).to.deep.equal({
        text: 'RgTya',
        number: 64075909,
        hex: '70ad29aacf0b690b0467fe2b2767f765'
      })
    })

    it('debería retornar null si faltan campos', () => {
      const line = 'test1.csv,RgTya,64075909'
      const result = parseCSVLine(line)

      expect(result).to.be.null
    })

    it('debería retornar null si hay campos vacíos', () => {
      const line = 'test1.csv,,64075909,70ad29aacf0b690b0467fe2b2767f765'
      const result = parseCSVLine(line)

      expect(result).to.be.null
    })

    it('debería retornar null si el número no es válido', () => {
      const line = 'test1.csv,RgTya,notanumber,70ad29aacf0b690b0467fe2b2767f765'
      const result = parseCSVLine(line)

      expect(result).to.be.null
    })

    it('debería retornar null si el hex no tiene 32 caracteres', () => {
      const line = 'test1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f76'
      const result = parseCSVLine(line)

      expect(result).to.be.null
    })

    it('debería retornar null si el hex contiene caracteres inválidos', () => {
      const line = 'test1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f76g'
      const result = parseCSVLine(line)

      expect(result).to.be.null
    })

    it('debería aceptar hex con letras mayúsculas', () => {
      const line = 'test1.csv,RgTya,64075909,70AD29AACF0B690B0467FE2B2767F765'
      const result = parseCSVLine(line)

      expect(result).to.not.be.null
      expect(result.hex).to.equal('70AD29AACF0B690B0467FE2B2767F765')
    })

  })

  describe('parseCSVContent', () => {
    it('debería parsear un CSV completo correctamente', () => {
      const content = `file,text,number,hex
test1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
test1.csv,PNzRt,1222,f88f842f95682b2950db5a62907c4eff`

      const result = parseCSVContent(content)

      expect(result).to.be.an('array')
      expect(result).to.have.lengthOf(2)
      expect(result[0]).to.deep.equal({
        text: 'RgTya',
        number: 64075909,
        hex: '70ad29aacf0b690b0467fe2b2767f765'
      })
      expect(result[1]).to.deep.equal({
        text: 'PNzRt',
        number: 1222,
        hex: 'f88f842f95682b2950db5a62907c4eff'
      })
    })

    it('debería omitir líneas inválidas', () => {
      const content = `file,text,number,hex
test1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
test1.csv,InvalidLine,notanumber,70ad29aacf0b690b0467fe2b2767f765
test1.csv,PNzRt,1222,f88f842f95682b2950db5a62907c4eff`

      const result = parseCSVContent(content)

      expect(result).to.have.lengthOf(2)
      expect(result[0].text).to.equal('RgTya')
      expect(result[1].text).to.equal('PNzRt')
    })

    it('debería omitir líneas vacías', () => {
      const content = `file,text,number,hex
test1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765

test1.csv,PNzRt,1222,f88f842f95682b2950db5a62907c4eff`

      const result = parseCSVContent(content)

      expect(result).to.have.lengthOf(2)
    })

    it('debería retornar array vacío si el contenido está vacío', () => {
      const result = parseCSVContent('')

      expect(result).to.be.an('array')
      expect(result).to.have.lengthOf(0)
    })

    it('debería retornar array vacío si el contenido es null', () => {
      const result = parseCSVContent(null)

      expect(result).to.be.an('array')
      expect(result).to.have.lengthOf(0)
    })

    it('debería retornar array vacío si solo hay header', () => {
      const content = 'file,text,number,hex'
      const result = parseCSVContent(content)

      expect(result).to.be.an('array')
      expect(result).to.have.lengthOf(0)
    })

    it('debería manejar saltos de línea al final del archivo', () => {
      const content = `file,text,number,hex
test1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
`

      const result = parseCSVContent(content)

      expect(result).to.have.lengthOf(1)
    })
  })
})