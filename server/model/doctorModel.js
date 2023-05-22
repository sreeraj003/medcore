const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    fee:{
        type:Number
    },
    Address:{
        type:String
    },
    contact:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    department:{
        type:String,
    },
    qualification:{
        type:String
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    timeStamp:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    documents:{
        type:Array
    },
    otp:{
        type:Number
    },
    token:{
        type:String
    }

})

module.exports = mongoose.model('doctor',doctorSchema)