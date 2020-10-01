const { Router } = require('express');
const popController = require('./controllers/popcontroller');

const router = Router();

router.get('/pops', popController.findAll);

router.post('/pops', popController.addPop);

module.exports = router;