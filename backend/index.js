import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'

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

mongoose
  .connect("mongodb://localhost:27017/api-hackaton?retryWrites=true&w=majority")
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

userRoute(app);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
