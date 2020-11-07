const Pop = require('../models/Pop');
const fs = require('fs');

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
            const reqPop = await Pop.findByLabel(req.body.label);
            if (reqPop) {
                throw new Error("Ce pop existe déjà");
            }
            if (req.file && req.file.filename.substring(req.file.filename.length - 9, req.file.filename.length) === 'undefined') {
                throw new Error("Seul les formats suivants sont acceptés: JPEG, JPG, PNG, SVG");;
            }
            const newPop = new Pop(req.body);
            if (req.file) {
                newPop.image = `/images/${req.file.filename}`
            } else {
                newPop.image = '/images/default.png'
            }
            await newPop.save();
            if (!newPop.id) {
                throw new Error("L'insertion du pop a échouée");
            }
            res.json({
                message: "Insertion du pop effectuée avec succès",
                success: true,
                data: newPop
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
            if (req.file && req.file.filename.substring(req.file.filename.length - 9, req.file.filename.length) === 'undefined') {
                throw new Error("Seul les formats suivants sont acceptés: JPEG, JPG, PNG, SVG");
            }
            const toUpdate = new Pop(pop);
            if (req.file) {
                fs.unlink('public' + toUpdate.image, function(err) {
                    if (err) throw err;
                    console.log('file deleted');
                });
                toUpdate.image = `/images/${req.file.filename}`
            }
            for(const prop in req.body) {
                if (req.body[prop] !== "") {
                    if (typeof toUpdate[prop] === "number") {
                        toUpdate[prop] = parseInt(req.body[prop]);
                    } else {
                        toUpdate[prop] = req.body[prop];
                    } 
                }       
            }          
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
            const pop = await Pop.findOne(req.params.id);
            if (!pop) {
                throw new Error("Ce pop n'existe pas");
            }
            const thePop = new Pop(pop);
            fs.unlink('public' + thePop.image, function(err) {
                if (err) throw err;
                console.log('file deleted');
            });
            const toDelete = await thePop.delete();
            if (toDelete === false) {
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