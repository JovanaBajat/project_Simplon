const express = require('express');
const { getUserFromEmail, encryptPassword, insertNewUser, verifyUser, editUser, getUsers, getUserById, generatePassword, deleteUser } = require('../controller/ctrlUser');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { generateToken } = require('./../authentication'); 
const transporter = require('../email');

router.post('/addUser', async (req, res) => {

    const newUser = {
        ...req.body
    }
    const randomGeneratedPassword = generatePassword();
    try {

        const accountAlreadyExists = await getUserFromEmail(newUser.email)
        if (accountAlreadyExists) {
            return res.status(403).send('user email already exists');
        }
        const encryptedPassword = encryptPassword(randomGeneratedPassword);
        newUser.encryptedPassword = encryptedPassword;
        await insertNewUser(newUser);
    } catch(error) {
        return res.status(500).json(error.message);
    }


    const mailOptions = {
        from: 'cae_prisme_elias@yahoo.com', // sender address
        to: newUser.email, // list of receivers
        subject: 'Votre compte est .......', // Subject line
        html: `<p>your password is ${randomGeneratedPassword}</p>`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {            
            console.log(err)
            return res.status(500).json(error.message);
        }
        else {
            console.log(info);
            return res.status(200).send(newUser);
        }
    });
})

//get all users 

router.get('/all', async (req, res) => {

    let queryResults = null
    try {
        queryResults = await getUsers()
    } catch (error) {
        console.log(error)
        return res.status(500).send(new Error("Erreur fetching users", error))
    }

    return res.status(200).send(queryResults.rows)
})

router.post('/login', async (req, res) => {
    const credentials = {
        email: req.body.email,
        password: req.body.password
    }
    //we check if user (username and password) exists and match
    try {
        if (await verifyUser(credentials)) {
            const user = await getUserFromEmail(credentials.email);
            const newToken = generateToken(user.usr_id);

            res.cookie('token', newToken);
            return res.status(200).json({  user });
        }
        else {
            // if user infos are not correct
            return res.status(403).send('incorrect credentials');
        }
    } catch(error) {
        return res.status(500).send(error);
    }
})

// logout route

router.get('/logout', function(req, res, next) {
    try {
        if (req.session) {
            // delete session object
            req.session = null;
            return res.redirect('/');     
        }
    } catch(error) {
        return res.status(500).send(error);
    }
});

//add profile photo user
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/edit', upload.single('uploadImg'), async (req, res) => {
    let userInfos = null; 
    // const writePath = path.join(__dirname, '../uploadedFiles', req.file.originalname)

    try {
        // await fs.promises.writeFile(writePath, req.file.buffer)
        userInfos = await editUser(req.body.id, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            job: req.body.job,
            email: req.body.email,
            // photo: req.file.originalname,
            infos: req.body.infos
        });
    } catch (error) {
        return res.status(500).send(error);
    }
    return res.status(200).send(userInfos.rows[0]);

})

router.get('/user', async (req, res) => {
    let infos = null;

    try {
        infos = await getUserById(req.query.id) 
        //const writePath = path.join(__dirname, '../uploadedFiles', infos.usr_photo)
        //const file = await fs.promises.readFile(writePath)
        //infos.file = file
    } catch (error) {
        return res.status(500).send(error);
    }
    return res.status(200).send(infos);
})

// delete user 

router.delete('/delete/:id', async (req, res) => {
    try {
        await deleteUser(req.params.id);
    } catch (error) {
        console.log(error)
        return res.status(500).send(new Error("Erreur", error))
    }

    return res.status(200).send("it worked, proposition deleted")
})

module.exports = router;
