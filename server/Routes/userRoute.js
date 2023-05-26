const express = require("express");
const userRoute = express();
const upload = require('../middlewares/multer.js')
const userController = require("../controller/userController");
const { validateToken } = require("../middlewares/jwt");
require("dotenv").config();

userRoute.post("/signup", userController.signup);
userRoute.post("/verify/:token", userController.verify);
userRoute.post("/login", userController.login);
userRoute.get("/userData", validateToken, userController.userData);
userRoute.get("/findDoctors", userController.findDoctors);
userRoute.get("/departments", userController.departments);
userRoute.put("/setProfile",upload.single("images") ,validateToken,userController.setProfile)

module.exports = userRoute;
