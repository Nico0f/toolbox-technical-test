# Toolbox Technical Test

Este proyecto es una aplicación full-stack que consta de un backend en Node.js/Express y un frontend en React. La aplicación está diseñada para procesar y mostrar información de archivos.

## Estructura del Proyecto

El proyecto está organizado en dos carpetas principales:

- `/backend`: API REST desarrollada con Node.js y Express
- `/frontend`: Aplicación cliente desarrollada con React y Redux Toolkit

## Backend

### Tecnologías Principales

- Node.js
- Express
- Mocha/Chai (testing)

### Instalación

```bash
cd backend
npm install
```

### Scripts Disponibles

- `npm start`: Inicia el servidor
- `npm test`: Ejecuta las pruebas unitarias
- `npm run lint`: Ejecuta el linter
- `npm run lint:fix`: Corrige automáticamente los problemas de linting

## Frontend

### Tecnologías Principales

- React
- Redux Toolkit
- React Bootstrap
- Webpack
- Jest/Testing Library

### Instalación

```bash
cd frontend
npm install
```

### Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm run build`: Genera la build de producción
- `npm test`: Ejecuta las pruebas unitarias
- `npm run test:watch`: Ejecuta las pruebas en modo watch
- `npm run test:coverage`: Genera el reporte de cobertura de pruebas

## Estructura de Archivos

### Backend
```
backend/
├── src/
│   ├── app.js
│   ├── config.js
│   ├── index.js
│   ├── controllers/
│   │   └── filesController.js
│   ├── services/
│   │   └── filesService.js
│   └── utils/
│       └── csvParser.js
└── tests/
    ├── controllers/
    │   └── filesController.test.js
    ├── services/
    │   └── filesService.test.js
    └── utils/
        └── csvParser.test.js
```

### Frontend
```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── config.js
│   ├── index.js
│   ├── components/
│   │   ├── FileFilter.js
│   │   ├── FileTable.js
│   │   └── Header.js
│   ├── services/
│   │   └── api.js
│   ├── store/
│   │   ├── store.js
│   │   └── slices/
│   │       └── filesSlice.js
│   └── styles/
│       └── custom.css
└── tests/
    ├── setupTests.js
    ├── components/
    │   ├── FileFilter.test.js
    │   └── FileTable.test.js
    ├── services/
    │   └── api.test.js
    └── store/
        └── slices/
            └── filesSlice.test.js
```

## Requisitos del Sistema

- Node.js (versión recomendada: última LTS)
- npm (incluido con Node.js)

## Licencia

ISC