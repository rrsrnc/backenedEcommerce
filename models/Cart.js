const mongoose=require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products:[{
        name:{
            type:String,
        },
        price:{
            type:Number,
        },
        quantity:{
            type:Number,
        }
    }]
    

});

module.exports = mongoose.model('Cart',productSchema);