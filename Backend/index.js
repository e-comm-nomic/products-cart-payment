const express = require('express');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.KEY);
const { v4: uuidv4 } = require('uuid');
const productRoute = require('./Routes/product');
const cartRoute = require('./Routes/cart');
const hotelRoute = require('./Routes/hotel');
const paymentRoute = require('./Routes/payment');
const app = express();

const port = 3001 || process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/payment', paymentRoute);
app.use('/hotels', hotelRoute);
app.use('/', (req, res) => {
  res.send('Online Food Ordering System');
});
app.listen(port, () => console.log(`Server running on port ${port}`));
