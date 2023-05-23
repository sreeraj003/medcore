const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Doctor = require("../model/doctorModel");
const { createAdminTokens } = require("../middlewares/jwt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminData = await Admin.findOne({ email: email });
    if (adminData) {
      const passwordMatch = await bcrypt.compare(password, adminData.password);
      if (passwordMatch) {
        if (!adminData.isBlocked) {
          const token = createAdminTokens(adminData._id);

          res.json({ adminData, token });
        } else {
          res.json("blocked");
        }
      } else {
        res.json("unauthorized");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const adminData = async (req, res) => {
  try {
    const data = await Admin.findOne({ _id: req._id.id });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const doctors = async (req, res) => {
  try {
    const doctorData = await Doctor.find({}, { password: 0 });
    res.json(doctorData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  adminData,
  doctors,
};
