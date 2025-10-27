import app from './app.js';
import CONFIG from'./config.js';

app.listen(CONFIG.PORT, () => {
  console.log(`Servidor corriendo en puerto ${CONFIG.PORT}`);
});