import {Type} from "../models/type.js";

export default async function getAllTypes(req, res) {
    try {
        const type = await Type.find();
        res.setHeader("Cache-Control", "no-cache")
        res.status(200).json(type)
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erreur lors de la récupération des données." })
    }
}

export async function getOneType(req, res) {
    try {
        const type = await Type.find({ name: req.params.type})
        res.setHeader("Cache-Control", "no-cache")
        res.status(200).json(type)
    } catch (err) {
        console.log(err)
        res.status(500).send({message: "Erreur lors de la récupération des données."})
    }
}