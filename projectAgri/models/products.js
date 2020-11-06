var mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
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
    img: {
        data: Buffer, 
        contentType: String 
    },
    createdAt: {
        type : Date,
        default : Date.now(),
    }

})