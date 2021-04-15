const stripe = require('stripe')(process.env.STRIPE_PK);
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(express.static('.'));
app.use(bodyParser.json())

app.post('/', (req, res) => {
    console.log(req.body.session_id);
    stripe.checkout.sessions
        .retrieve(req.body.session_id)
        .then(data => {
            return res.status(200).send({ res: data })
        }).catch(err => {
            res.send(err);
        });
});

module.exports = {
    path: '/api/success',
    handler: app
}