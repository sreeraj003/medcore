const mongoose = require('mongoose')
const objectid = mongoose.Types.ObjectId
const scheduleSchema = new mongoose.Schema({
    doctor:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:Array,
        required:true
    }
})


module.exports = mongoose.model('schedule',scheduleSchema)