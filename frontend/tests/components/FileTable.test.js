import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FileTable from '../../src/components/FileTable';
import filesReducer from '../../src/store/slices/filesSlice';

const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      files: filesReducer
    },
    preloadedState: {
      files: initialState
    }
  });
};

describe('FileTable', () => {
  it('muestra una tabla vacía cuando no haya archivos', () => {
    const store = createMockStore({
      data: [],
      loading: false,
      error: null,
      filter: ''
    });

    render(
      <Provider store={store}>
        <FileTable files={[]} />
      </Provider>
    );

    // Update selectors to match actual table headers
    expect(screen.getByRole('columnheader', { name: /File Name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Text/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Number/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Hex/i })).toBeInTheDocument();
  });

  it('representa los datos de los archivos correctamente', () => {
    const mockFiles = [
      {
        file: 'test1.csv',
        lines: [
          {
            text: 'Sample text',
            number: 123,
            hex: 'abc123'
          }
        ]
      }
    ];

    const store = createMockStore({
      data: mockFiles,
      loading: false,
      error: null,
      filter: ''
    });

    render(
      <Provider store={store}>
        <FileTable files={mockFiles} />
      </Provider>
    );

    expect(screen.getByText('test1.csv')).toBeInTheDocument();
    expect(screen.getByText('Sample text')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('abc123')).toBeInTheDocument();
  });

  it('renderiza multiples archivos con multiples lineas.', () => {
    const mockFiles = [
      {
        file: 'test1.csv',
        lines: [
          { text: 'Line 1', number: 1, hex: 'hex1' },
          { text: 'Line 2', number: 2, hex: 'hex2' }
        ]
      },
      {
        file: 'test2.csv',
        lines: [
          { text: 'Line 3', number: 3, hex: 'hex3' }
        ]
      }
    ];

    const store = createMockStore({
      data: mockFiles,
      loading: false,
      error: null,
      filter: ''
    });

    render(
      <Provider store={store}>
        <FileTable files={mockFiles} />
      </Provider>
    );

    expect(screen.getAllByText('test1.csv')).toHaveLength(2);
    expect(screen.getByText('test2.csv')).toBeInTheDocument();
    expect(screen.getByText('Line 1')).toBeInTheDocument();
    expect(screen.getByText('Line 2')).toBeInTheDocument();
    expect(screen.getByText('Line 3')).toBeInTheDocument();
  });

  it('maneja un array de líneas vacías', () => {
    const mockFiles = [
      {
        file: 'test1.csv',
        lines: []
      }
    ];

    render(<FileTable files={mockFiles} />);

    expect(screen.queryByText('test1.csv')).not.toBeInTheDocument();
    expect(screen.queryByRole('row')).toBeInTheDocument();
  });

  it('gestiona las propiedades faltantes en los datos de la linea', () => {
    const mockFiles = [
      {
        file: 'test1.csv',
        lines: [
          { text: 'Only text' }
        ]
      }
    ];

    render(<FileTable files={mockFiles} />);

    expect(screen.getByText('Only text')).toBeInTheDocument();
    expect(screen.getByText('test1.csv')).toBeInTheDocument();
  });

  it('gestiona los valores null o undefined', () => {
    const mockFiles = [
      {
        file: 'test1.csv',
        lines: [
          { text: null, number: undefined, hex: '' }
        ]
      }
    ];

    render(<FileTable files={mockFiles} />);

    expect(screen.getByText('test1.csv')).toBeInTheDocument();
  });
});