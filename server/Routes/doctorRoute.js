const express = require("express");
const doctorRoute = express();
const doctorController = require("../controller/doctorController");
require("dotenv").config();
const { validateDoctorToken } = require("../middlewares/jwt");
const upload = require("../middlewares/multer");

doctorRoute.post("/signup", doctorController.signup);
doctorRoute.post("/verify/:token", doctorController.verify);
doctorRoute.post("/login", doctorController.login);
doctorRoute.get("/doctorData",validateDoctorToken,doctorController.doctorData);
doctorRoute.post("/setprofile",upload.array("images"),validateDoctorToken,doctorController.setProfile);
doctorRoute.get("/departments",validateDoctorToken,doctorController.departments)
doctorRoute.delete("/deleteImage/:deleteData",validateDoctorToken,doctorController.deleteImage)
doctorRoute.get('/schedule',validateDoctorToken,doctorController.schedule)
doctorRoute.post('/setSchedule',validateDoctorToken,doctorController.manageSchedule)
doctorRoute.get('/appointments',validateDoctorToken,doctorController.appointments)
doctorRoute.get('/consult',validateDoctorToken,doctorController.consult)
doctorRoute.get('/payments',validateDoctorToken,doctorController.payments)
doctorRoute.get('/prescriptions',validateDoctorToken,doctorController.prescriptions)
doctorRoute.get('/medicines',validateDoctorToken,doctorController.medicines)
doctorRoute.patch('/endAppointment/:appId',validateDoctorToken,doctorController.endAppointment)
doctorRoute.patch('/addPrescription',validateDoctorToken,doctorController.addPrescription)
doctorRoute.get('/patients',validateDoctorToken,doctorController.patients)
doctorRoute.get('/dash',validateDoctorToken,doctorController.dash)
doctorRoute.get("/forgotPassword/:email",doctorController.forgotPassword)
doctorRoute.patch("/verifyOtp",doctorController.verifyOtp)
doctorRoute.patch("/resetPassword",doctorController.resetPassword)

module.exports = doctorRoute;
