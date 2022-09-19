const express = require('express');
const server = express();
const mainRouter = require('./routes/main');

server.set('view engine', 'ejs');
server.set('views', './views');

//server.use(express.static('./public'));

server.use('/', mainRouter);

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use((req, res, next) => {
    res.statusCode = 404;
    res.render('404');
 })

server.listen(3000);