import express from 'express';
import mongoose from 'mongoose';
import getAll from './controllers/announceController.js';
import { User } from './models/user.js';
import { Lab } from './models/lab.js';
import { Type } from './models/type.js';
import { Lab_Type } from './models/lab_type.js';
import Announce from './models/announce.js';

import cookieParser from "cookie-parser";
import cors from 'cors'


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/hackathon?retryWrites=true&w=majority')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const user = new User({
  firstname: 'John',
  lastname: 'Doe',
  phone_number: '01 23 45 67 89',
  email: 'john.doe@notascam.fr',
  password: 'password'
})
await user.save()

const type = new Type({
  name: 'Meth'
})

const labo = new Lab({
  owner: user._id,
  description: 'Labo de meth',
  price: 50,
  region: "Nouvelle Aquitaine, France",
  adress: "1 rue de la Grande Cour, 666, Darkweb",
  mobile: true
})

const type_labo = new Lab_Type({
  labo: labo._id,
  type: type._id
})
await type_labo.save()

type.labo = type_labo._id
await type.save()

labo.type = type_labo._id
await labo.save()

const annonounce = new Announce({
  title: 'Annonce test',
  description: 'Annonce pour un labo de meth tout équipé',
  publisher: user._id,
  labo: labo._id
})
await annonounce.save()

// Route GET /
app.get('/', (req, res) => {
  res.send('Hello');
});

app.get("/announces", (req, res) => {
  getAll(req, res)
})

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
