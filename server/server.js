const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./router/router');
const cors = require('cors');
const { validateToken } = require('./authentication');
const jwt = require("jsonwebtoken");
const email = require('./email');
const server = express()

server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }))

server.use(express.static(__dirname + './../dist'))
server.use(validateToken);
server.use(router);

server.get('/authenticate', (req, res) => {
    if (!req.cookies.token) {
        res.status(500).send("Vous n'êtes pas authentifié");
    } else {
        const { token } = req.cookies;
        const secret = process.env.JWT_SECRET;
        jwt.verify(token, secret, (err, decoded) => {
            // Si le token n'est pas authentifié
            if (err) {
                console.log("JWT invalide", req.path, err);
                res.clearCookie();
                return res.status(500).send();
            }
            res.status(200).send();
        });
    }
});
server.listen( 8888, () => {
    console.log('Server listening on port 8888...')
})
