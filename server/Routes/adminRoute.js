const express = require("express");
const adminRoute = express();
const adminController = require("../controller/adminController");
const { validateAdminToken } = require("../middlewares/jwt");
require("dotenv").config();

adminRoute.post("/login", adminController.login);
adminRoute.get("/adminData", validateAdminToken, adminController.adminData);
adminRoute.get("/doctors", validateAdminToken, adminController.doctors);

module.exports = adminRoute;
