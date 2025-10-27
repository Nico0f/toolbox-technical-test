import filesReducer, { fetchFiles, clearFiles, setFilter } from '../../../src/store/slices/filesSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('filesSlice', () => {
  describe('reducers', () => {
    const initialState = {
      data: [],
      loading: false,
      error: null,
      filter: ''
    };

    it('devuelve el estado inicial', () => {
      expect(filesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('maneja la funcionalidad para borrar filtro', () => {
      const previousState = {
        data: [{ file: 'test.csv' }],
        loading: false,
        error: 'Some error',
        filter: 'test'
      };
      expect(filesReducer(previousState, clearFiles())).toEqual({
        data: [],
        loading: false,
        error: null,
        filter: 'test'
      });
    });

    it('maneja el seteo del filtro', () => {
      expect(filesReducer(initialState, setFilter('test'))).toEqual({
        ...initialState,
        filter: 'test'
      });
    });
  });

  describe('extraReducers', () => {
    const initialState = {
      data: [],
      loading: false,
      error: undefined,
      filter: ''
    };

    it('maneja fetchFiles.pending', () => {
      const action = { type: fetchFiles.pending.type };
      const state = filesReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('maneja fetchFiles.fulfilled', () => {
      const mockData = [
        { file: 'test1.csv', lines: [] },
        { file: 'test2.csv', lines: [] }
      ];
      const action = { type: fetchFiles.fulfilled.type, payload: mockData };
      const state = filesReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        data: mockData
      });
    });

    it('maneja fetchFiles.rejected', () => {
      const action = { 
        type: fetchFiles.rejected.type, 
        payload: 'Error message' 
      };
      const state = filesReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: 'Error message'
      });
    });

    it('maneja fetchFiles.rejected con error de mensaje', () => {
      const action = { 
        type: fetchFiles.rejected.type,
        error: { message: 'Network Error' },
        payload: undefined
      };
      
      const state = filesReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: undefined
      });
    });

    it('maneja fetchFiles.rejected sin payload', () => {
      const action = { 
        type: fetchFiles.rejected.type,
        error: { message: 'Network Error' }
      };
      const state = filesReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: undefined
      });
    });
  });

  describe('async thunk', () => {
    it('recupera archivos de forma exitosa', async () => {
      const mockData = [{ file: 'test.csv', lines: [] }];
      
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        })
      );

      const store = configureStore({
        reducer: { files: filesReducer }
      });

      await store.dispatch(fetchFiles());
      const state = store.getState().files;

      expect(state.loading).toBe(false);
      expect(state.data).toEqual(mockData);
      expect(state.error).toBe(null);
    });

    it('maneja errores de llamada', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        })
      );

      const store = configureStore({
        reducer: { files: filesReducer }
      });

      await store.dispatch(fetchFiles());
      const state = store.getState().files;

      expect(state.loading).toBe(false);
      expect(state.error).toBeDefined();
    });

    it('recupera archivos de forma exitosa con filtro', async () => {
      const mockData = [{ file: 'test.csv', lines: [] }];
      
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        })
      );

      const store = configureStore({
        reducer: { files: filesReducer }
      });

      await store.dispatch(fetchFiles('test.csv'));
      const state = store.getState().files;

      expect(state.loading).toBe(false);
      expect(state.data).toEqual(mockData);
      expect(state.error).toBe(null);
    });
  });
});