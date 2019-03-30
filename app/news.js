const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `news` ', (error, result) => {
            if (error) {
                res.status(500).send({error: 'Database error'})
            }
            res.send(result)
        })
    });

    router.post('/', upload.single('image'), (req,res) => {
        const news = req.body;
        if (req.file) {
            news.image = req.file.filename
        }

        connection.query('INSERT INTO `news` (`title`, `connect_news`, `image`, `date`) VALUES (?,?,?,?)',
            [news.title, news.connect_news, news.image, new Date()],
            (err , result) => {
                if (err) {
                    res.status(500).send({error: 'Database error'})
                }
                res.send({message: 'OK'});
            });
    });
    return router;
};

module.exports = createRouter;