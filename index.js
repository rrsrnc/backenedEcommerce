const connectToMongo = require('./db');
const functions = require('firebase-functions');
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

connectToMongo();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/cart', require('./routes/cart'));
app.use('/home', require('./routes/home'));

app.listen(port, () => {
  console.log(`Ecommerce Backend listening on port ${port}`);
});

exports.api = functions.https.onRequest(app);
