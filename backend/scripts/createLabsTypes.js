// scripts/createLabTypes.js
import mongoose from "mongoose";
import { Type } from "../models/type.js";

const types = [
  { name: "Biologie" },
  { name: "Chimie" },
  { name: "Physique" },
  { name: "Génétique" },
];

async function run() {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/api-hackaton?retryWrites=true&w=majority"
    );
    console.log("✅ Connecté à MongoDB");

    for (const t of types) {
      const exists = await Type.findOne({ name: t.name });
      if (!exists) {
        await Type.create(t);
        console.log(`✔️ Type ajouté : ${t.name}`);
      } else {
        console.log(`ℹ️ Type déjà existant : ${t.name}`);
      }
    }

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Erreur insertion types :", err);
  }
}

run();
