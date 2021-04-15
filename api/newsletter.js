import express from 'express';
import Mailchimp from 'mailchimp-api-v3';

// const API_KEY = process.env.MAILCHIMP_API_KEY || '9ba7ce783e44487981514f4451130e54-us1'
// const AUDIENCE_ID = process.env.MAILCHIMP_LIST_ID || 'dc65cb4bf2';
const API_KEY = 'f9547aae9fb7cff22e92779ebe0d3463-us1'
const AUDIENCE_ID = 'dc65cb4bf2';
const mailchimp = new Mailchimp(API_KEY);

const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    const { email: email_address } = req.body

    mailchimp.request({
        method: 'post',
        path: `/lists/${AUDIENCE_ID}/members`,
        body: {
            email_address,
            status: "subscribed"
        }
    }).then((response) => {
        console.log(response);
        res.status(response.statusCode).json(response.status);
    }).catch(error => {
        res.status(error.status).send(error)
    });
})

module.exports = {
    path: "api/subscribe",
    handler: app
}