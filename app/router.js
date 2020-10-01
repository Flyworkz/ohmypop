const { Router } = require('express');

const router = Router();

// route de test
router.get('/test', (_, res) => {
    res.json('test');
});

module.exports = router;