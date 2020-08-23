const express = require('express');

const states = require('./states/states.routes');
const users = require('./users/users.routes');
const auth = require('./auth/auth.routes');

const router = express.Router();

//root
router.get('/', (req, res) => {
    res.json({
        message: 'Store Inventory API'
    });
});

//states
router.use('/states', states);
router.use('/users', users);
router.use('/auth', auth);


module.exports = router;