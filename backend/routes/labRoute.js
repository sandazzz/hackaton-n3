import { Type } from "../models/type.js";
import { Lab } from "../models/lab.js";
import { User } from "../models/user.js";

import { authenticateToken } from "../middlewares/auth.js";

export default function labRoutes(app) {
  app.get("/lab/types", async (req, res) => {
    try {
      const types = await Type.find().select("_id name");
      res.json({ types });
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

  app.post("/lab/create", authenticateToken, async (req, res) => {
    try {
      const { description, price, location, mobile, type } = req.body;

      const newLab = await Lab.create({
        owner: req.user.id,
        description,
        price,
        location,
        mobile,
        type,
      });

      await User.findByIdAndUpdate(req.user.id, {
        $push: { labo: newLab._id },
      });

      console.log(newLab);
      res.status(201).json({ lab: newLab });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur création labo" });
    }
  });
}
