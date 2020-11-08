var mongoose = require('mongoose');

//define the farmer model schema
const FarmerSchema = mongoose.Schema({
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    // farm_name : {
    //     type : String,
    // },
    phoneno : {
        type: Number,
    },
    citizeship : {
        type : Number,
    },
    email : {
        type:String
    }, 
    username : {
        type : String
    },
    password : {
        type : String,
    },
    address : {
        type : String,
    },
    information : {
        type : String,
    }
    // products : {
    //     type : Array,
    // },

});

module.exports = mongoose.model('Farmer',FarmerSchema);