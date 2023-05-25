const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  image:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("department", departmentSchema);
