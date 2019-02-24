const express = require('express');
const routerPro = require('./routerProposition');
const routerUsr = require('./routerUser');
const routerVot = require('./routerVote');

const router = express.Router();

router.use('/pro', routerPro);
router.use('/usr',routerUsr);
router.use('/vot',routerVot);

router.get('/', (req, res) => {
    res.sendFile('index.html')
})

module.exports = router;
