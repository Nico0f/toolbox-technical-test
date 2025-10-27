import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { fetchFiles } from '../store/slices/filesSlice';

function FileFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchFiles(searchTerm));
  };

  const handleClear = () => {
    setSearchTerm('');
    dispatch(fetchFiles(''));
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit} data-testid="file-filter-form">
      <Row className="align-items-end">
        <Col xs={12} md={8}>
          <Form.Group>
            <Form.Label>Filtrar por nombre de archivo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: test3.csv"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col xs={12} md={4} className="mt-2 mt-md-0">
          <div className="d-grid gap-2 d-md-flex">
            <Button type="submit" variant="primary" className="me-md-2">
              Buscar
            </Button>
            <Button type="button" variant="secondary" onClick={handleClear}>
              Limpiar
            </Button>
          </div>
        </Col>
      </Row>
    </form>
  );
}

export default FileFilter;