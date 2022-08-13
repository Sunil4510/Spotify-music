const mongoose = require('mongoose');

const Artists = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:true
    },
    songs:{
            type:String,
            reuiqred:true
        }
});

const artists = mongoose.model('artists',Artists);
module.exports = artists;