import Announce from "../models/announce.js";

export default async function getAllAnnounces(req, res) {
    try {
        const announces = await Announce.find();
        res.setHeader("Cache-Control", "no-cache")
        res.status(200).json(announces)
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erreur lors de la récupération des données." })
    }
}

export async function getAnnouncesByTypes(req, res) {
    try {
        const announces = await Announce.find({type: req.params.type});
        res.setHeader("Cache-Control", "no-cache")
        res.status(200).json(announces)
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erreur lors de la récupération des données." })
    }
}