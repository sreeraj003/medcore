const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
};

module.exports = cors(corsOptions);
