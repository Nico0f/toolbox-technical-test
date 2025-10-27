import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Alert, Spinner } from 'react-bootstrap';
import FileTable from './components/FileTable';
import FileFilter from './components/FileFilter';
import Header from './components/Header';
import { fetchFiles } from './store/slices/filesSlice';

function App() {

  const dispatch = useDispatch();
  const { data: files, loading, error } = useSelector((state) => state.files);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  
  return (
    <Container className="py-4">
      <Header />
      <Container className="py-0">
      <FileFilter />
      </Container>
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      
      {error && (
        <Alert variant="danger">
          Error: {error}
        </Alert>
      )}
      <Container className="py-4">
      {!loading && !error && files.length > 0 && (
        <FileTable files={files} />
      )}
      {!loading && !error && files.length === 0 && (
        <Alert variant="info">
          No hay archivos para mostrar
        </Alert>
      )}
      </Container>
    </Container>
  );
}

export default App;