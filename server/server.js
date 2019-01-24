const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./router/router');
const cors = require('cors');


const server = express()

server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }))
server.use(router);

server.listen( 8888, () => {
    console.log('Server listening on port 8888...')
})
