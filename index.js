const connectToMongo = require('./db');

connectToMongo();
const functions=require('firebase-functions')
const express = require('express')
const app = express()
const port = 5000;
const authRouter = require('./routes/auth');
const cors=require('cors')

app.use(cors({
  origin: '*'
}));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(express.json())

app.use('/auth',authRouter)
app.use('/cart',require('./routes/cart'))
app.use('/home',require('./routes/home'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

exports.api=functions.https.onRequest(app)