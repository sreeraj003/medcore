const express = require("express");
const userRoute = express();
const upload = require("../middlewares/multer.js");
const userController = require("../controller/userController");
const { validateToken } = require("../middlewares/jwt");
const { authUser } = require("../middlewares/auth.js");
require("dotenv").config();

userRoute.post("/signup", userController.signup);
userRoute.post("/verify/:token", userController.verify);
userRoute.post("/login", userController.login);
userRoute.get("/userData", validateToken,authUser, userController.userData);
userRoute.get("/findDoctors", userController.findDoctors);
userRoute.get("/departments", userController.departments);
userRoute.put("/setProfile",upload.single("images"),validateToken,authUser,userController.setProfile);
userRoute.get("/docSchedule/:docId", validateToken,authUser, userController.docSchedule);
userRoute.post("/bookSlot", validateToken,authUser, userController.bookSlot);
userRoute.get("/appointments",validateToken,authUser,userController.loadAppointments)
userRoute.post("/cancelAppoint/:id",validateToken,authUser,userController.cancelAppoint)
userRoute.get("/searchDoc/:searchKey",userController.searchDoc)
userRoute.get("/prescriptions",validateToken,authUser,userController.prescriptions)
userRoute.get("/forgotPassword/:email",userController.forgotPassword)
userRoute.patch("/verifyOtp",userController.verifyOtp)
userRoute.patch("/resetPassword",userController.resetPassword)
userRoute.post("/checkSlot",validateToken,userController.checkSlot)

module.exports = userRoute;
