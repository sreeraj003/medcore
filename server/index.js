require("./config/mongo").connect();
const express = require("express");
const app = express();
const cors = require("./middlewares/cors");
const userRoute = require("./Routes/userRoute");
const adminRoute = require("./Routes/adminRoute");
const doctorRoute = require("./Routes/doctorRoute");
const { Server } = require("socket.io");
const socketManager = require("./config/socket");

app.use(cors);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/images", express.static("images"));

app.use("/", userRoute);
app.use("/admin", adminRoute);
app.use("/doctor", doctorRoute);

const server = app.listen(8080, () => {
  console.log("connected");
});
const io = new Server(server, { cors: true });
socketManager(io);
