const express = require('express');
const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        connection.query('SELECT * FROM news ', (error, result) => {
            if (error) {
                res.status(500).send({error: 'Database error'})
            }
            res.send(result)
        })
    });
    return router;
};

module.exports = createRouter;