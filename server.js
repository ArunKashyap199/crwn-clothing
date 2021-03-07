const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


// dotenv is an file that containing
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// stripe library
// now this function returning us a function so we just passing the secret key to that stripe
// STRIPE_SECRET_KEY accessing file from .env
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}
app.listen(port, error => {
    if (error) throw error;
    console.log("Server is running on port " + port);
});

// req containing our data and information related to the req we made from front end
// res is response obj is actually how we  respond to this request 'it send back our stuff based on whatever req we got'

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'inr',
        description: 'Software development services',
    };
    // stripeErr should be like that syntax
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    });
});