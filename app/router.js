const { Router } = require('express');
const popController = require('./controllers/popcontroller');

const router = Router();

const popSchema = require('./schemas/pop');
const { validateBody } = require('./services/validator');

/**
 * Cette route permet de récupérer tous les pops
 * @route GET /pops
 * @group pops - Les routes concernant les pops
 * @returns {JSON} 200 - Un tableau de pops
 */
router.get('/pops', popController.findAll);

/**
 * Cette route permet de récupérer un pop par son ID
 * @route GET /pops/:id
 * @group pops - Les routes concernant les pops
 * @returns {JSON} 200 - Un pop
 */
router.get('/pops/:id', popController.findOne);

/**
 * Cette route permet de récupérer tous les pops d'une collection
 * @route GET /pops/collection/:collection
 * @group pops - Les routes concernant les pops
 * @returns {JSON} 200 - Un tableau de pops
 */
router.get('/pops/collection/:collection', popController.findByCollection);

/**
 * Cette route permet d'ajouter un pop ou de le modifier s'il possède un ID
 * @route PUT /pops
 * @group pops - Les routes concernant les pops
 * @param {integer} id.body - ID du pop dans le cas d'un modification
 * @param {integer} figurine_number.body.required - Numéro du pop
 * @param {string} collection.body.required - Nom de la collection à laquelle appartient le pop
 * @param {string} label.body.required - Nom du pop
 * @param {boolean} status.body.required - Etat du pop
 * @returns {JSON} 200 - Un pop
 */
router.put('/pops', validateBody(popSchema), popController.addOrUpdatePop);

/**
 * Cette route permet de supprimer un pop par son ID
 * @route DELETE /pops/:id
 * @group pops - Les routes concernant les pops
 * @returns {JSON} 200 - Validation de la suppression avec l'ID du pop supprimé
 */
router.delete('/pops/:id', popController.deleteOne);

module.exports = router;