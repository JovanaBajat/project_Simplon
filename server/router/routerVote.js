const express = require('express');
const { insertLike, getLikes  } = require('../controller/ctrlVote');
const router = express.Router();


router.post('/insertLike', async (req, res) => {
    const paramsLike = {
        usr_id: req.session.userId,
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
    let likes = null;
    try {
        likes = await getLikes(res.session)
    } catch (error) {
        return res.status(500).send(new Error("Erreur fetching likes", error))
    }

    return res.status(200).send(likes);
})

module.exports = router;
