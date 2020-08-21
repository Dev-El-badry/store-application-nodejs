const express = require('express');
const queries = require('./states.queries');
const router = express.Router();

router.get('/', async (req, res) => {
    const states = await queries.find();
   
    res.json(states);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {

        if (isNaN(id)) {
            const error = new Error('Invalid Id');
            res.status(422);
            throw error;
            
        } else {
            const states = await queries.get(id);
            if (states) {
                return res.json(states);
            }

            return next();
        }
    } catch(error) {
        next(error);
    } 

});

module.exports = router;