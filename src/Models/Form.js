const mongoose = require("mongoose")

const form = new mongoose.Schema({
    name:{
        type:String,
        requireed:true

    },
    phoneNumber:{
        type:Number,
        requireed:true

    },
    email:{
        type:String,
        requireed:true

    },
    intrest:{
        type:String,
        requireed:true

    },
    message:{
        type:String,
        requireed:true

    }
},{timestamps:true})


module.exports = mongoose.model("Forms",form);