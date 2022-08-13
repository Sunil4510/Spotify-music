const mongoose = require('mongoose');
const db = "mongodb+srv://Sunil45:Sunil4510@cluster0.iwteb4a.mongodb.net/music?retryWrites=true&w=majority"

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connected to db")
}).catch((e)=>{
    console.log(e)
});