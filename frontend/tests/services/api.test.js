import { fetchFiles } from '../../src/services/api';
import CONFIG from '../../src/config';

describe('API Service', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('busca los archivos de forma exitosa sin filtro', async () => {
    const mockData = [{ file: 'test.csv', lines: [] }];
    
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchFiles();

    expect(global.fetch).toHaveBeenCalledWith(`${CONFIG.API_BASE_URL}/files/data`);
    expect(result).toEqual(mockData);
  });

  it('busca archivos con filtro fileName', async () => {
    const mockData = [{ file: 'test3.csv', lines: [] }];
    
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchFiles('test3');

    expect(global.fetch).toHaveBeenCalledWith(`${CONFIG.API_BASE_URL}/files/data?fileName=test3`);
    expect(result).toEqual(mockData);
  });

  it('maneja errores HTTP', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(fetchFiles()).rejects.toThrow('HTTP error! status: 404');
  });

  it('maneja errores de conexion', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchFiles()).rejects.toThrow('Network error');
  });

  it('maneja caracteres especiales en el nombre del archivo en el filtro', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await fetchFiles('test file.csv');

    expect(global.fetch).toHaveBeenCalledWith(
      `${CONFIG.API_BASE_URL}/files/data?fileName=test%20file.csv`
    );
  });

  it('devuelve los mesajes de error del servidor', async () => {
    const errorMessage = 'Internal Server Error';
    
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: errorMessage })
    });

    await expect(fetchFiles()).rejects.toThrow('HTTP error! status: 500');
  });

  it('maneja JSON malformado', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => { throw new Error('Invalid JSON') }
    });

    await expect(fetchFiles()).rejects.toThrow('Invalid JSON');
  });

  it('maneja respuestas vacias', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => null
    });

    const result = await fetchFiles();
    expect(result).toBeNull();
  });
});