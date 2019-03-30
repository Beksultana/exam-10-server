const express = require('express');
const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `comments` ', (error, result) => {
            if (error) {
                res.status(500).send({error: 'Database error'})
            }
            res.send(result)
        })
    });
    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `comments` WHERE `news_id` = ? ',req.params.id, (error, result) => {
            if (error) {
                res.status(500).send({error: 'Database error'})
            }
            res.send(result)
        })
    });
    return router;
};

module.exports = createRouter;