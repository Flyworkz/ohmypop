const Pop = require('../models/Pop');

const popController = {
    findAll: async (req, res) => {
        res.json(await Pop.findAll());
    }
}

module.exports = popController;