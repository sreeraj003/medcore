const mongoose = require("mongoose");
const objectid = mongoose.Types.ObjectId
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
  },
  address: {
    type: String,
  },
  contact: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type:objectid,
  },
  qualification: {
    type: String,
  },
  isApproved:{
    type:String,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  timeStamp: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  documents: {
    type: Array,
  },
  otp: {
    type: Number,
  },
  token: {
    type: String,
  },
  blockReason:{
    type:String
  }
});

module.exports = mongoose.model("doctor", doctorSchema);
