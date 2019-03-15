var nodemailer = require('nodemailer');

const senderMail = "cae_prisme_elias@yahoo.com"

var transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    service:'yahoo',
    secure: false,
    auth: {
        user: senderMail,
        pass: 'coffeewithmilk'
    },
    debug: false,
    logger: true 
});

module.exports = transporter;

