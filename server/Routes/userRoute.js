const express = require("express");
const userRoute = express();
const upload = require("../middlewares/multer.js");
const userController = require("../controller/userController");
const { validateToken } = require("../middlewares/jwt");
require("dotenv").config();

userRoute.post("/signup", userController.signup);
userRoute.post("/verify/:token", userController.verify);
userRoute.post("/login", userController.login);
userRoute.get("/userData", validateToken, userController.userData);
userRoute.get("/findDoctors", userController.findDoctors);
userRoute.get("/departments", userController.departments);
userRoute.put("/setProfile",upload.single("images"),validateToken,userController.setProfile);
userRoute.get("/docSchedule/:docId", validateToken, userController.docSchedule);
userRoute.post("/bookSlot", validateToken, userController.bookSlot);
userRoute.get("/appointments",validateToken,userController.loadAppointments)
userRoute.post("/cancelAppoint/:id",validateToken,userController.cancelAppoint)
userRoute.get("/searchDoc/:searchKey",validateToken,userController.searchDoc)
userRoute.get("/prescriptions",validateToken,userController.prescriptions)

module.exports = userRoute;
