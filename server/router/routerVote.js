const express = require('express');
const { insertLike, getLikes  } = require('../controller/ctrlVote');
const router = express.Router();


router.post('/insertLike', async (req, res) => {
    const paramsLike = {
        usr_id: req.body.usr_id,
        vot_value: req.body.vot_value,
        pro_id: req.body.pro_id
    }
    try {
        await insertLike(paramsLike)
    } catch(error) {
        return res.status(500).json(error.message);
    }
    res.status(200).send();
})

router.get('/allLikes', async (req, res) => {
    try {
        queryResults = await getLikes(res.session)
    } catch (error) {
        return res.status(500).send(new Error("Erreur fetching likes", error))
    }

    return res.status(200).send(queryResults.rows)
})

module.exports = router;
