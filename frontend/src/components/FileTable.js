import React from 'react';
import { Table } from 'react-bootstrap';

function FileTable({ files }) {

  const columnFields = ["text", "number", "hex"]
  if (!files) {
    return <></>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th scope="col">File Name</th>
          <th scope="col">Text</th>
          <th scope="col">Number</th>
          <th scope="col">Hex</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => file.lines.map((line) => <tr>
          <td key={file.hex}>{file.file}</td>
          {columnFields.map(field => <td>{line[field] || ""}</td>)}
        </tr>))}
      </tbody>
    </Table>
  );
}

export default FileTable;