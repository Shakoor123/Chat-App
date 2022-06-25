const mongoose=require('mongoose')
const User=new mongoose.Schema({
    googleId:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
    }
})
module.exports=mongoose.model("User",User)