require("dotenv").config();
const mongoose = require("mongoose");

const connect = () => {
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_URL + process.env.MONGO_COLLECTION, {
    useNewUrlParser: true,
  });
};

module.exports = { connect };
