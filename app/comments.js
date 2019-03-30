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
    router.post('/', (req,res) => {
        const comment = req.body;
        connection.query('INSERT INTO `comments` (`author`, `comment`, `news_id`) VALUES (?,?,?)',
            [comment.title, comment.comment, comment.news_id],
            (err , result) => {
                if (err) {
                    res.status(500).send({error: 'comments error'})
                }
                res.send({message: 'OK'});
            });
    });
    router.delete('/:id', (req,res) => {
        connection.query('DELETE FROM `comments` WHERE `id` = ?', req.params.id, (err, results) => {
            if (err) {
                res.status(500).send({error: 'Database  error'})
            }
            res.send(results[0])
        })
    });
    return router;
};

module.exports = createRouter;