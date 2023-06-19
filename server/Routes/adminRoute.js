const express = require("express");
const adminRoute = express();
const adminController = require("../controller/adminController");
const { validateAdminToken } = require("../middlewares/jwt");
const upload = require("../middlewares/multer");
require("dotenv").config();

adminRoute.post("/login", adminController.login);
adminRoute.get("/adminData", validateAdminToken, adminController.adminData);
adminRoute.get("/doctors", validateAdminToken, adminController.doctors);
adminRoute.get("/departments", validateAdminToken, adminController.departments);
adminRoute.post(
  "/createDepartment",
  upload.single("image"),
  validateAdminToken,
  adminController.createDepartment
);
adminRoute.patch(
  "/manageDepartment",
  validateAdminToken,
  adminController.manageDepartment
);
adminRoute.patch(
  "/manageDoctor/:docId",
  validateAdminToken,
  adminController.manageDoctor
);
adminRoute.get("/patients", validateAdminToken, adminController.patients);
adminRoute.patch(
  "/managePatient/:patientId",
  validateAdminToken,
  adminController.managePatient
);
adminRoute.get("/medicines", validateAdminToken, adminController.medicines);
adminRoute.post(
  "/addMedicine",
  validateAdminToken,
  adminController.addMedicine
);
adminRoute.patch(
  "/deleteMedicine",
  validateAdminToken,
  adminController.deleteMedicine
);
adminRoute.get("/income", validateAdminToken, adminController.appoints);
adminRoute.get("/payments", validateAdminToken, adminController.payments);

module.exports = adminRoute;
