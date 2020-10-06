const Pop = require('../models/Pop');

const popController = {
    findAll: async (_, res) => {
        res.json(await Pop.findAll());
    },

    addOrUpdatePop: async (req, res) => {
        const newPop = new Pop(req.body);
        await newPop.save();
        res.json(newPop);
    },

    findOne: async (req, res) => {
        res.json(await Pop.findOne(req.params.id));
    },

    findByCollection: async (req, res) => {
        res.json(await Pop.findByCollection(req.params.collection));
    },

    deleteOne: async (req, res) => {
        const popToDelete = new Pop(await Pop.findOne(req.params.id));
        popToDelete.delete();
        res.json(`Pop d'id: ${req.params.id} supprimé`)
    }
}

module.exports = popController;