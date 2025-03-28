import express from 'express';
import mongoose from 'mongoose';
import { User } from './models/user.js';
import { Lab } from './models/lab.js';
import { Type } from './models/type.js';
import { Lab_Type } from './models/lab_type.js';
import Announce from './models/announce.js';

import cookieParser from "cookie-parser";
import cors from 'cors'
import getAllAnnounces, { getAnnouncesByTypes } from './controllers/announceController.js';
import getOneLab from './controllers/labControllers.js';
import getAllTypes from './controllers/typeController.js';

import userRoute from "./routes/userRoute.js";
import dotenv from "dotenv";

dotenv.config();
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

// const user = new User({
//   firstname: 'John',
//   lastname: 'Doe',
//   phone_number: '01 23 45 67 89',
//   email: 'john.doe@notascam.fr',
//   password: 'password'
// })

// const type = new Type({
//   name: 'Meth'
// })
// await type.save()
// const type2 = new Type({
//   name: 'LSD'
// })
// await type2.save()

// const labo = new Lab({
//   owner: user._id,
//   description: 'Labo de meth',
//   price: 50,
//   location: "1 rue de la Grande Cour, 666, Darkweb",
//   mobile: true
// })
// const labo2 = new Lab({
//   owner: user._id,
//   description: 'Labo de meth',
//   price: 50,
//   location: "1 rue de la Grande Cour, 666, Darkweb",
//   mobile: true
// })

// const type_labo = new Lab_Type({
//   labo: labo._id,
//   type: type._id
// })
// await type_labo.save()
// const type_labo2 = new Lab_Type({
//   labo: labo2._id,
//   type: type2._id
// })
// await type_labo2.save()

// labo.type = type_labo._id
// await labo.save()
// labo2.type = type_labo2._id
// await labo2.save()

// user.labo = labo._id
// await user.save()

// const annonounce = new Announce({
//   title: 'Annonce test',
//   description: 'Annonce pour un labo de meth tout équipé',
//   publisher: user._id,
//   labo: labo._id,
//   type: type.name
// })
// await annonounce.save()
// const annonounce2 = new Announce({
//   title: 'Annonce test',
//   description: 'Annonce pour un labo de meth tout équipé',
//   publisher: user._id,
//   labo: labo2._id,
//   type: type2.name
// })
// await annonounce2.save()

// Route GET /
app.get('/', (req, res) => {
  res.send('Hello');
});

app.get("/announces", (req, res) => {getAllAnnounces(req, res)})
app.get("/announces/:type", (req, res) => {getAnnouncesByTypes(req,res)})

app.get("/types", (req, res) => {getAllTypes(req, res)})
app.get("/types/:type", (req, res) => {getOneTypes(req, res)})

app.get("/labos/:id", (req, res) => {
  getOneLab(req, res)
})

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
