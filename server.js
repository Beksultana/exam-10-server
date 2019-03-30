const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const news = require('./app/news');
const comments = require('./app/comments');

const app = express();
app.use(express.json());
app.use(cors());

const port = 8800;

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'user2',
    password : '1qaz@WSX29',
    database : 'news'
});

app.use('/news', news(connection));
app.use('/comments', comments(connection));

connection.connect(error => {
    if (error) {
        console.error('error connecting: ' + error.stack)
    }
    console.log('connected as id ' + connection.threadId);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`)
    });
});