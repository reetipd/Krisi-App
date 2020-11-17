const mongoose = require('mongoose');

const OrdersSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

    product : {
        type : mongoose.Schema.Types.ObjectId, ref : 'Products'
    },
    amount : {
        type : Number
    },
    price : {
        type : Number,
    },
    notDelivered: {
        type : Boolean,
    }

}) 
module.exports = mongoose.model('Orders', OrdersSchema);

// user
// product --Reference
// amount ---------- 
// price 
// flag:default : false (Add to cart)
//     true : (order) (checkout garisake paxi)