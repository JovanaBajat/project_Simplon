const express = require('express');
const routerPro = require('./routerProposition');
const routerUsr = require('./routerUser');

const router = express.Router();

router.use(routerPro);
router.use('/usr',routerUsr);

module.exports = router;
