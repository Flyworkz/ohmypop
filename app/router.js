const { Router } = require('express');

const router = Router();

router.get('/', (_, res) => {
    res.json('test');
});

module.exports = router;