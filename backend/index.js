import express from 'express';

const app = express();
const PORT = 3000;

// Route GET /
app.get('/', (req, res) => {
  res.send('Hello');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
