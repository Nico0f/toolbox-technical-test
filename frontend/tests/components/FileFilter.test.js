import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FileFilter from '../../src/components/FileFilter';
import filesReducer from '../../src/store/slices/filesSlice';

const createMockStore = () => {
  return configureStore({
    reducer: {
      files: filesReducer
    }
  });
};

export function mockFetch(data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    }),
  );
}

describe('FileFilter', () => {
  it('muestra el campo de entrada del filtro y los botones', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <FileFilter />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Ej: test3.csv/i)).toBeInTheDocument();
    expect(screen.getByText('Buscar')).toBeInTheDocument();
    expect(screen.getByText('Limpiar')).toBeInTheDocument();
  });

  it('el valor de entrada debe actualizarse al escribir', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <FileFilter />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Ej: test3.csv/i);
    fireEvent.change(input, { target: { value: 'test3' } });

    expect(input.value).toBe('test3');
  });

  it('borra el contenido del campo de entrada al hacer clic en el botón Limpiar', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <FileFilter />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Ej: test3.csv/i);
    const clearButton = screen.getByText('Limpiar');

    fireEvent.change(input, { target: { value: 'test3' } });
    expect(input.value).toBe('test3');

    fireEvent.click(clearButton);
    expect(input.value).toBe('');
  });

  it('ejecuta la función fetchFiles al enviar el formulario', () => {
    const store = createMockStore();
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <FileFilter />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Ej: test3.csv/i);
    const searchButton = screen.getByText('Buscar');

    fireEvent.change(input, { target: { value: 'test3' } });
    fireEvent.click(searchButton);

    expect(dispatchSpy).toHaveBeenCalled();
  });


  it('elimina el espacio vacio del valor de entrada', () => {
    const store = createMockStore();
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <FileFilter />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Ej: test3.csv/i);
    fireEvent.change(input, { target: { value: '  test3.csv  ' } });
    fireEvent.click(screen.getByText('Buscar'));

    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function));
  });

  it('debe manejar el envío de filtro vacio', () => {
    const store = createMockStore();
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <FileFilter />
      </Provider>
    );

    fireEvent.click(screen.getByText('Buscar'));
    expect(dispatchSpy).toHaveBeenCalled();
  });
});