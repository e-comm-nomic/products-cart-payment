const express = require('express');
const { default: Stripe } = require('stripe');
const config = require('../Config/DB_Config');
const router = express.Router();

const con = config.con;

router.post('/', (req, res) => {
  const { product, token } = req.body;
  console.log('PRODUCT', product);
  console.log('PRICE', product.price);
  const idempotencyKey = uuid();

  return Stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempotencyKey }
      );
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
