import { Lab } from "../models/lab.js";

export default async function getOneLab(req, res) {
    try {
        const lab = await Lab.findById(req.params.id);
        if (!lab){
            res.status(404).send("Impossible de trouver le laboratoire.")
        } else {
            res.setHeader("Cache-Control", "no-cache")
            res.status(200).json(lab)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erreur lors de la récupération des données." })
    }
}