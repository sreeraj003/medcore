const mongoose = require("mongoose")

const prescriptionSchema = new mongoose.Schema({
    patient:{
        type:String,
        required:true
    },
    doctor:{
        type:String,
        requiered:true
    },
    disease:{
        type:String,
        requried:true
    },
    medicines:{
        type:Array
    },
    labTest:{
        type:Array
    }
})

module.exports = mongoose.model('prescription',prescriptionSchema)