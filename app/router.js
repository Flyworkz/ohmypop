const { Router } = require('express');
const popController = require('./controllers/popcontroller');

const router = Router();

router.get('/pops', popController.findAll);

module.exports = router;