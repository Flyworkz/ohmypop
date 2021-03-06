const { Router } = require('express');
const popController = require('./controllers/popcontroller');
const { validateBody } = require('./services/validator');
const { flush, cache } = require('./cache/cacheStrategy');
const mainController = require('./controllers/maincontroller');
const { insertPopSchema, updatePopSchema } = require('./schemas/pop');
const { uploadSchema } = require('./schemas/image');
const upload = require('./services/upload');

const router = Router();

/**
 * Cette route permet de récupérer tous les pops
 * @route GET /pops
 * @group pops - Les routes concernant les pops
 * @returns {JSON} 200 - Un tableau de pops
 */
router.get('/pops', cache, popController.findAll);

/**
 * Cette route permet de récupérer un pop par son ID
 * @route GET /pops/pop/:id
 * @group pops - Les routes concernant les pops
 * @returns {JSON} 200 - Un pop
 */
router.get('/pops/:id', cache, popController.findOne);

/**
 * Cette route permet de récupérer tous les pops d'une collection
 * @route GET /pops/collections/collection/:collection
 * @group pops - Les routes concernant les pops
 * @returns {JSON} 200 - Un tableau de pops
 */
router.get('/pops/collections/:id', cache, popController.findByCollection);

/**
 * Cette route permet d'ajouter un pop
 * @route POST /pops
 * @group pops - Les routes concernant les pops
 * @param {integer} figurine_number.body.required - Numéro du pop
 * @param {string} collection.body.required - Nom de la collection à laquelle appartient le pop
 * @param {string} label.body.required - Nom du pop
 * @param {boolean} status.body.required - Etat du pop
 * @param {file} image.body.required - Image du pop
 * @returns {JSON} 200 - Un pop
 */
router.post('/pops', upload, validateBody(insertPopSchema, uploadSchema), flush, popController.addPop);

/**
 * Cette route permet de modifier un pop
 * @route PATCH /pops
 * @group pops - Les routes concernant les pops
 * @param {integer} id.body - ID du pop
 * @param {integer} figurine_number.body.required - Numéro du pop
 * @param {string} collection.body.required - Nom de la collection à laquelle appartient le pop
 * @param {string} label.body.required - Nom du pop
 * @param {boolean} status.body.required - Etat du pop
 * @param {file} image.body.required - Image du pop
 * @returns {JSON} 200 - Un pop
 */
router.patch('/pops/:id', upload, validateBody(updatePopSchema, uploadSchema), flush, popController.updatePop);

/**
 * Cette route permet de supprimer un pop par son ID
 * @route DELETE /pops/pop/:id
 * @group pops - Les routes concernant les pops
 * @returns {JSON} 200 - Validation de la suppression avec l'ID du pop supprimé
 */
router.delete('/pops/:id', flush, popController.deleteOne);

router.use(mainController.notFound);

module.exports = router;