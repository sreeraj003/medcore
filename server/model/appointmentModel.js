const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
  issues:{
    type:String
  },
  amount: {
    type: Number,
  },
  isAttended: {
    type: Boolean,
    default: false,
  },
  isCancelled:{
    type:Boolean,
    default:false
  },
  medicines:{
    type:Object
  }

});

module.exports = mongoose.model("appointment", appointmentSchema);
