const express = require('express');
const router = express.Router();
const artists = require('../model/Artists');
const songs = require('../model/Songs');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,Date.now()+'-'+fileName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
        } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}); 

router.post("/addsong",upload.single("img"),async(req,res)=>{
    // const url = req.protocol + '://' + req.get('host')
    const {name,release,artists} = req.body;
    const check = await songs.findOne({ name: name})
    if(check){
       return res.status(422).json({error:"alredy exists"});
    }else{
    const song = new songs({
        name,
        release,
        artists,
        img: {
            data:fs.readFileSync(path.join('./uploads/'+ req.file.filename)),
            contentType:'image/png'
        }
    });

    song.save().then(()=>{
        console.log("success")
        res.status(201).json({message: 'Success'})
    }).catch((err)=>console.log(err,"wrong"))
}})

router.post("/addartist",async(req,res)=>{
    const {name,dob,bio,songs} = req.body
    console.log(name,dob,bio,songs)
    if(!name || !dob || !bio || !songs){
        return res.status(422).json({error:"Enter all fields"});
    }
    try{
        const singer = await artists.findOne({name:name});
        if(singer){ 
            return res.status(422).json({error:"alredy exists"});
        }else{
            const art = new artists({name,dob,bio,songs});
            const result = await art.save();
            if(result){
                return res.status(201).json({message:"success"});
            }else{
                return res.status(500).json({message:"server problem"});
            }
        }
    }catch(err){
        console.log(err)
    }
})

router.get("/topsong", async(req, res) => {
    const data = await songs.find({});
    if(data){
        res.send(data);
    }else{
        res.status(500).json({message:"server problem"})
    }
})
router.get("/topartist", async(req, res) => {
    const data = await artists.find({});
    if(data){
        res.send(data);
    }else{
        res.status(500).json({message:"server problem"})
    }
})


module.exports = router