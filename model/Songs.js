const mongoose = require('mongoose');

const Songs = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    release:{
        type:String,
        required:true
    },
    artists:{
        type:String,
        required:true
    },
    img:{
         data:Buffer,
         contentType:String
        }
});

const songs = mongoose.model('songs',Songs);
module.exports = songs;