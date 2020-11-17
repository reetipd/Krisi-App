const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

    product : {
        type : mongoose.Schema.Types.ObjectId, ref : 'Product'
    },
    amount : {
        type : Number
    },
    price : {
        type : Number,
    },
    delivered: {
        type : Boolean,
        default: false,
    }

}) 
module.exports = mongoose.model('Orders', OrderSchema);

// user
// product --Reference
// amount ---------- 
// price 
// flag:default : false (Add to cart)
//     true : (order) (checkout garisake paxi)