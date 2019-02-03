const express = require('express');
const { getPropositions, addProposition, deleteProposition } = require('../controller/ctrlProposition');
const router = express.Router();

//get all propositions 

router.get('/all', async (req, res) => {

    let queryResults = null
    try {
        queryResults = await getPropositions()
    } catch (error) {
        console.log(error)
        return res.status(500).send(new Error("Erreur fetching propositions", error))
    }

    return res.status(200).send(queryResults.rows)
})

// add proposition 

router.post('/add', async (req, res) => {
    const proposition = null;
    try {
        await addProposition({
            usr_id: req.body.usr_id,
            title: req.body.pro_title, 
            description: req.body.pro_description,
            timestamp: req.body.pro_timestamp, 
            status: req.body.pro_status
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(new Error("Erreur", error))
    }

    return res.status(200).send(proposition)

})
router.delete('/proposition/delete/:id', async (req, res) => {
    try {
        await deleteProposition(req.params.id);
    } catch (error) {
        console.log(error)
        return res.status(500).send(new Error("Erreur", error))
    }

    return res.status(200).send("it worked, proposition deleted")

})
module.exports = router;
