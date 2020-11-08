var mongoose = require('mongoose');

//define the product model schema
const ProductsSchema = mongoose.Schema({
    
    title : 
    {
        type : String,
    },
    description : {
        type : String,
        min : 40,
        max : 300,
    },
    stock : {
        type : Number,
    },
    price : {
        type : Number,
    },
    is_available :{
        type : Boolean,
    },
    img: {
        data: Buffer, 
        contentType: String 
    },
    farmer_name:{
        type : String,
    },
    farmer_id : {
        type : Number,
    },
    createdAt: {
        type : Date,
        default : Date.now(),
    }

});

module.exports = mongoose.model('Products',ProductsSchema);
