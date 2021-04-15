const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require("@sendgrid/mail");

const app = express();
app.use(bodyParser.json());

sgMail.setApiKey(
    process.env.SENDGRID_API_KEY
);

app.post('/', (req, res) => {
    let msg = {
        to: req.body.to,
        from: {
            email: "miradofitiavana@gmail.com",
            name: "Mirado RAMANOELISON"
        },
        subject: "Votre commande sur Electro.",
        text: "Votre commande a été enregistrée."
    };
    sgMail.send(msg)
        .then(() => {
            return res.status(200).json({ 'message': 'email send' });
        }).catch(err => {
            return res.status(400).json({ "err": err });
        });
})

module.exports = {
    path: "api/send-email",
    handler: app
}