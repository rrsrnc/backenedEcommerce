const connectToMongo = require('./db');

connectToMongo();

const express = require('express')
const app = express()
const port = 3000;
const authRouter = require('./routes/auth');

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