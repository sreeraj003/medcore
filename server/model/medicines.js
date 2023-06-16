const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    cost:{
        type:String,
        required:true
    },
    dose:{
        type:Array,
        required:true
    },
    createdAt:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('medicine',medicineSchema)