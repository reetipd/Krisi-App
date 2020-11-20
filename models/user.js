const mongoose = require('mongoose');

//define the farmer model schema
const UserSchema = mongoose.Schema({
    action: {
        type: String
    },
    fname: {
        type: String
    },
    lame: {
        type: String
    },
    // farm_name : {
    //     type : String,
    // },
    mobilenumber: {
        type: Number,
    },
    citizeship: {
        type: Number,
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String,
    },
    password2: {
        type: String,
    },
    address: {
        type: String,
    },
    information: {
        type: String,
    }
});

module.exports = mongoose.model('Users', UserSchema);