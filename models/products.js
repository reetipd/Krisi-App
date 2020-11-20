const mongoose = require('mongoose');

//define the product model schema
const ProductSchema = mongoose.Schema({

    name: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
        min: 40,
        max: 300,
    },
    stock: {
        type: Number,
    },
    price: {
        type: Number,
    },
    is_available: {
        type: Boolean,
    },
    img: {
        type: String,
    },
    farmer_name: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }

});

module.exports = mongoose.model('Products', ProductSchema);