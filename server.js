//We are not using the http server so we don't need it or createServer

require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const es6Renderer = require('express-es6-template-engine');
const { append } = require('vary');

const server = express();

server.get('/heartbeat', (req, res) => {
    res.json({
        "is": "working"
    })
});

server.use('/', express.static(__dirname +  '/public'))

//template rendering
server.engine('html', es6Renderer)
server.set('views', 'views')
server.set('view engine', 'html')

server.get('/', (req, res) => {
    res.render('landing', {
        partials: {
            footer: 'partials/footer',
            header: 'partials/header'
        }
    });
})
const {PORT} = process.env;

server.listen(PORT, () => {
    console.log (`The server is running ${PORT}`);
})

