import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/api-todos?retryWrites=true&w=majority')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
// Route GET /
app.get('/', (req, res) => {
  res.send('Hello');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
