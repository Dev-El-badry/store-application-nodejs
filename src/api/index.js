const express = require('express');

const states = require('./states/states.routes');

const router = express.Router();

//root
router.get('/', (req, res) => {
    res.json({
        message: 'Store Inventory API'
    });
});

//states
router.use('/states', states);


module.exports = router;