const Pop = require('../models/Pop');

const popController = {
    findAll: async (_, res) => {
        res.json(await Pop.findAll());
    },

    addPop: async (req, res) => {
        const newPop = new Pop(req.body);
        await newPop.save();
        res.json(newPop);
    },

    findOne: async (req, res) => {
        res.json(await Pop.findOne(req.params.id));
    }
}

module.exports = popController;