const mongoose = require('mongoose');

const password = encodeURIComponent("Rajeev@1996#"); // URL-encode the password

const mongoURI = `mongodb+srv://rajeev7605:${password}@ecommerce.vmgnnoh.mongodb.net/Ecommerce`;

function connectToMongo(){
    mongoose.connect(mongoURI,{
      useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });
}

module.exports = connectToMongo;