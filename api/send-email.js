const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require("@sendgrid/mail");

const app = express();
app.use(bodyParser.json());

sgMail.setApiKey(
    "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"
);

app.post('/', (req, res) => {
    let msg = {
        to: req.body.to,//"miradofitiavana@gmail.com",
        from: {
            email: req.body.from,
            name: req.body.name
        },//"miradofitiavana@gmail.com",
        subject: req.body.subject,//"aa",
        text: req.body.text,//"test mail",
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