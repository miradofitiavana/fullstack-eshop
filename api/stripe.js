const stripe = require('stripe')(process.env.STRIPE_PK);
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(express.static('.'));
app.use(bodyParser.json())

const YOUR_DOMAIN = 'https://fullstack-prime.herokuapp.com';

app.post('/', (req, res) => {
    // stripe.customers.create({
    //     email: 'miradofitiavana@gmail.com',
    //     name: "Miradofitiavana RAMANOELISON",
    //     phone: "0698626419",
    //     address: {
    //         line1: "2 boulevard Henri Chapu",
    //         city: "Melun",
    //         postal_code: "77000",
    //         country: "FR"
    //     },
    //     shipping: {
    //         address: {
    //             line1: "2 boulevard Henri Chapu",
    //             city: "Melun",
    //             postal_code: "77000",
    //             country: "FR"
    //         },
    //         name: "Miradofitiavana RAMANOELISON",
    //         phone: "0698626419",
    //     }
    // }).then(customer => {
    //     console.log(customer);
    //     // return res.status(200).send({ res: customer })
    stripe.checkout.sessions.create({
        customer_email: req.body.email,
        // customer: customer.id,
        // client_reference_id: "212",
        submit_type: 'pay',
        billing_address_collection: 'auto',
        shipping_address_collection: {
            allowed_countries: ['FR', 'US', 'CA'],
        },
        payment_method_types: ['card'],
        line_items: req.body.items,
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${YOUR_DOMAIN}/failed`,
    }).then(data => {
        return res.status(200).send({ res: data })
    }).catch(err => {
        res.send(err);
    });
});

module.exports = {
    path: '/api/paiement',
    handler: app
}