const { Router } = require('express');
const popController = require('./controllers/popcontroller');

const router = Router();

const popSchema = require('./schemas/pop');
const { validateBody } = require('./services/validator');

router.get('/pops', popController.findAll);

router.post('/pops', validateBody(popSchema), popController.addPop);

module.exports = router;