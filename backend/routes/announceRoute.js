import { Announce } from '../models/announce.js';
import { Lab } from '../models/lab.js';
import { authenticateToken } from '../middlewares/auth.js';

export default function announceRoute(app) {
  app.post('/announce/create', authenticateToken, async (req, res) => {
    try {
      const { title, description, laboId } = req.body;

      if (!title || !description || !laboId) {
        return res.status(400).json({ message: "Tous les champs sont requis." });
      }

      // Vérifie que le labo appartient bien à l'utilisateur connecté
      const lab = await Lab.findById(laboId);
      if (!lab || lab.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: "Accès non autorisé à ce laboratoire." });
      }

      const announce = await Announce.create({
        title,
        description,
        publisher: req.user.id,
        labo: laboId,
        reservation: null // ou une logique pour créer une réservation vide
      });

      res.status(201).json({ announce });
    } catch (err) {
      console.error("Erreur création annonce :", err);
      res.status(500).json({ message: "Erreur interne du serveur." });
    }
  });
}
