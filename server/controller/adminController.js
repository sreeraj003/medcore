const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Doctor = require("../model/doctorModel");
const Departments = require("../model/departmentModel");
const { createAdminTokens } = require("../middlewares/jwt");
const { dateTime } = require("../config/dateAndTime");

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

const departments = async (req, res) => {
  const data = await Departments.find();
  res.json(data);
};

const createDepartment = async (req, res) => {
  try {
    const { newDep } = req.body;
    const filename = req.file.filename;
    const exist = await Departments.find({ name: newDep });
    if (exist != "") res.json("error");
    else {
      const dep = await new Departments({
        name: newDep,
        timeStamp: dateTime,
        image:filename
      });
      const depData = await dep.save();
      if (depData) {
        res.json("success");
      } else {
        res.json("error");
      }
    }
  } catch (error) {
    res.json("error");
  }
};

const manageDepartment = async (req, res) => {
  try {
    const { id, status } = req.body;
    console.log(status);
    let update;
    if (status == false) {
      update = await Departments.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: true } }
      )
        res.json("blocked")
    } else {
      update = await Departments.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: false } }
      );
        res.json("unblocked")
      }
    console.log(update);
   
  } catch (error) {
    res.json("error");
  }
};

module.exports = {
  login,
  adminData,
  doctors,
  departments,
  createDepartment,
  manageDepartment,
};
