const express = require("express");
const userRoute = express();
const userController = require("../controller/userController");
const { validateToken } = require("../middlewares/jwt");
require("dotenv").config();

userRoute.post("/signup", userController.signup);
userRoute.post("/verify/:token", userController.verify);
userRoute.post("/login", userController.login);
userRoute.get("/userData", validateToken, userController.userData);
userRoute.get("/findDoctors",userController.findDoctors)
module.exports = userRoute;
