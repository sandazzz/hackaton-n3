import { User } from "../models/user.js";
import { authenticateToken } from "../middlewares/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default function userRoute(app) {
  app.post("/user/signup", async (req, res) => {
    try {
      const { firstname, lastname, phone_number, email, password } = req.body;

      if (!firstname || !lastname || !phone_number || !email || !password) {
        return res
          .status(400)
          .json({ message: "Tous les champs sont requis." });
      }

      const newUser = User({
        firstname: firstname,
        lastname: lastname,
        phone_number: phone_number,
        email: email,
        password: bcrypt.hashSync(password, 8),
      });

      await newUser.save();

      const user = await User.findOne({ email: newUser.email });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      res.status(200).json({
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        message: "Utilisateur créé avec succès.",
      });
    } catch (err) {
      console.error("Erreur lors de la création l'utilisateur :", err);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  });

  app.post("/user/signin", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Tous les champs sont requis." });
      }

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).json({ message: "Mot de passe incorrect." });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      res.status(200).json({
        firstname: user.firstname,
        lastname: user.lastname,
        message: "Connexion réussie.",
      });
    } catch (err) {
      console.error("Erreur lors de la connexion de l'utilisateur :", err);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  });

  app.get("/user/profile", authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }

      res.status(200).json({ user });
    } catch (err) {
      console.error("Erreur lors de la récupération du profil :", err);
      res.status(500).json({ message: "Erreur interne du serveur." });
    }
  });

  app.put("/user/profile", authenticateToken, async (req, res) => {
    try {
      const { firstname, lastname, email, phone_number } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { firstname, lastname, email, phone_number },
        { new: true }
      ).select("-password");

      res.status(200).json({ user: updatedUser });
    } catch (err) {
      console.error("Erreur MAJ profil :", err);
      res.status(500).json({ message: "Erreur interne du serveur." });
    }
  });
}
