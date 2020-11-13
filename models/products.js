const mongoose = require('mongoose');

//define the product model schema
const ProductsSchema = mongoose.Schema({

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
<<<<<<< HEAD
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
=======
    farmer_id: {
        type: Number,
>>>>>>> 341aecf74df17c8c9e583e96197bab37ff86cbf2
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }

});

module.exports = mongoose.model('Products', ProductsSchema);