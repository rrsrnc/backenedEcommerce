const mongoose = require('mongoose') ;
const { Schema } = mongoose;

const userSchema = new Schema({
    categories:[{
        category:{
            type:String
        }

    }],
    products:[{
        name:{
            type:String,
        },
        price:{
            type:Number,
        },
        categoryId:{
            type:Number,
        }

    }]
});

module.exports = mongoose.model('Product',userSchema);