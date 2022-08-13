const mongoose = require('mongoose');
const db = process.env.database;

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connected to db")
}).catch((e)=>{
    console.log(e)
});