import express from 'express';
import * as filesController from'./controllers/filesController.js';

const app = express();

app.use((req, res, next) => {
  const allowedOrigin = 'http://localhost:3000';
  const origin = req.headers.origin;

  if (origin === allowedOrigin) {
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(origin === allowedOrigin ? 200 : 403);
  }

  next();
});


app.use(express.json());


app.get('/files/data', filesController.getFilesData);
app.get('/files/list', filesController.getFilesList)


app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

export default app;