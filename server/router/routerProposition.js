const express = require('express');
const { getPropositions, addProposition, deleteProposition, editProp, editPropStatus } = require('../controller/ctrlProposition');
const router = express.Router();

//get all propositions 

router.get('/all', async (req, res) => {

    let propositions = null
    try {
        propositions = await getPropositions(req.session.userId)
    } catch (error) {
        return res.status(500).send(error.message)
    }

    return res.status(200).send(propositions)
})

// add proposition 

router.post('/add', async (req, res) => {
    const proposition = null;
    try {
        await addProposition({
            usr_id: req.session.userId,
            title: req.body.title, 
            description: req.body.description,
            timestamp: req.body.timestamp, 
            status: req.body.status
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(new Error("Erreur", error))
    }

    return res.status(200).send(proposition)

})

// edit proposition

router.post('/edit', async (req, res) => {
    let propInfos = null; 
    try {
        propInfos = await editProp(req.body.id, {
            title: req.body.title,
            description: req.body.description,
            // id: req.body.pro_id,
            usr_id: req.body.usr_id
        });
    } catch (error) {
        return res.status(500).send(error);
    }
    return res.status(200).send(propInfos.rows[0]);

})
// delete proposition 

router.delete('/delete/:id', async (req, res) => {
    try {
        await deleteProposition(req.params.id);
    } catch (error) {
        console.log(error)
        return res.status(500).send(new Error("Erreur", error))
    }

    return res.status(200).send("it worked, proposition deleted")
})

// change prop status 

router.post('/changeStatus', async (req, res) => {
    try {
        propStatus = await editPropStatus(req.body.id, {
            status: req.body.status,
            pro_id: req.body.id
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send(new Error("Erreur", error))
    }

    return res.status(200).send()

})

module.exports = router;
