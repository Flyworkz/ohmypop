const Pop = require('../models/Pop');

const popController = {
    findAll: async (_, res) => {
        try {
            const pops = await Pop.findAll();
            res.json({
                message: "Liste des pops",
                success: true,
                data: pops
            });
        } catch (err) {
            res.json({
                message: err.message,
                success: false,
                data: false
            });
        }
    },

    addPop: async (req, res) => {
        try {
            const newPop = new Pop(req.body);
            const insertedPop = await newPop.save();
            if (!insertedPop) {
                throw new Error("L'insertion du pop a échouée");
            }
            res.json({
                message: "Insertion du pop effectuée avec succès",
                success: true,
                data: insertedPop
            });
        } catch (err) {
            res.json({
                message: err.message,
                success: false,
                data: false
            });
        }
    },

    updatePop: async (req, res) => {
        try {
            const pop = await Pop.findOne(req.params.id);
            if (!pop) {
                throw new Error("Ce pop n'existe pas");
            }
            for (const prop in req.body) {
                if (!req.body[prop] || req.body[prop] !== "") {
                    pop[prop] = req.body[prop];
                }
            }
            const toUpdate = new Pop(pop);
            await toUpdate.save();
            if (!toUpdate) {
                throw new Error("La modification du pop a échouée");
            }
            res.json({
                message: "Modification du pop effectuée avec succès",
                success: true,
                data: toUpdate
            });
        } catch (err) {
            res.json({
                message: err.message,
                success: false,
                data: false
            });
        }
    },

    findOne: async (req, res) => {
        try {
            const pop = await Pop.findOne(req.params.id);
            if (!pop) {
                throw new Error("Ce pop n'existe pas");
            }
            res.json({
                message: `Pop d'id: ${req.params.id}`,
                success: true,
                data: pop
            });
        } catch (err) {
            res.json({
                message: err.message,
                success: false,
                data: false
            });
        }
    },

    findByCollection: async (req, res) => {
        try {
            const pops = await Pop.findByCollection(req.params.collection);
            if (!pops) {
                throw new Error("Cette collection n'existe pas");
            }
            res.json({
                message: `Liste des pops de la collection: ${req.params.collection}`,
                success: true,
                data: pops
            });
        } catch (err) {
            res.json({
                message: err.message,
                success: false,
                data: false
            });
        }
    },

    deleteOne: async (req, res) => {
        try {
            const pop = new Pop(await Pop.findOne(req.params.id));
            if (!pop) {
                throw new Error("Ce pop n'existe pas");
            }
            const toDelete = await pop.delete();
            if (!toDelete) {
                throw new Error("La suppression du pop a échouée");
            }
            res.json({
                message: `Pop d'id: ${req.params.id} supprimé`,
                success: true,
                data: false
            });
        } catch (err) {
            res.json({
                message: err.message,
                success: false,
                data: false
            });
        }
    }
}

module.exports = popController;