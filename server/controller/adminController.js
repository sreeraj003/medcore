const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Doctor = require("../model/doctorModel");
const Departments = require("../model/departmentModel");
const Patients = require("../model/userModel");
const { createAdminTokens } = require("../middlewares/jwt");
const { dateTime } = require("../config/dateAndTime");
const User = require("../model/userModel");
const Medicine = require("../model/medicines");
const Appointments = require("../model/appointmentModel");
const mailSender = require("../config/nodeMailer");
const fs = require('fs');
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const login = async (req, res) => {
  try {
    console.log(1);
    const { email, password } = req.body;
    const adminData = await Admin.findOne({ email: email });
    console.log(adminData);
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
    }else {
      res.json("unauthorized");
  }
} catch (error) {
  res.json("error");
}
}

const adminData = async (req, res) => {
  try {
    const data = await Admin.findOne({ _id: req._id.id });
    res.json(data);
  } catch (error) {
    res.json("error");
  }
};

const doctors = async (req, res) => {
  try {
    const doctorData = await Doctor.aggregate([
      {
        $lookup: {
          from: "departments",
          localField: "department",
          foreignField: "_id",
          as: "dept",
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ]);
    res.json(doctorData);
  } catch (error) {
    res.json("error");
  }
};

const departments = async (req, res) => {
  const data = await Departments.find();
  res.json(data);
};
const deleteImageFromDisk = (imagePath) => {
  fs.unlink(imagePath, (error) => {
   if (error) {
     console.error('Failed to delete image from disk:', error);
   } else {
     console.log('Image deleted from disk:', imagePath);
   }
 });
};

const createDepartment = async (req, res) => {
  try {
    const { newDep } = req.body;
    console.log(req.file);
    const filename = req.file.filename;
    const result = await cloudinary.uploader.upload(req.file.path)
    const imagePath = req.file.path
    await deleteImageFromDisk(imagePath)
    const exist = await Departments.find({ name: newDep });
    if (exist != "") res.json("error");
    else {
      const dep = await new Departments({
        name: newDep,
        timeStamp: dateTime,
        image: result.url,
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
    let update;
    if (status == false) {
      update = await Departments.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: true } }
      );
      res.json("blocked");
    } else {
      update = await Departments.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: false } }
      );
      res.json("unblocked");
    }
  } catch (error) {
    res.json("error");
  }
};

const manageDoctor = async (req, res) => {
  try {
    const id = req.params.docId;
    const type = req.body.action;
    const Data = await Doctor.find({ _id: id });
    const Email = Data[0].email
    console.log(type); 
    if (type == "reject") {
        const verification = await Doctor.findOneAndUpdate(
          { _id: id },
          { $set: { isApproved: 'rejected' } }
        );
        await mailSender(Email, "Otp",'reject');
        res.json("disapproved");
      }
      else if(type == "approve"){
        const verification = await Doctor.findOneAndUpdate(
          { _id: id },
          { $set: { isApproved: 'approved' } }
          );
          console.log(1);
        await mailSender(Email, "Otp",'approve');
        res.json("approved");
    } else {
      if (Data[0].isBlocked == false) {
        const reason = req.body.reason
        const block = await Doctor.findOneAndUpdate(
          { _id: id },
          { $set: { isBlocked: true,blockReason:reason } },
        );
        res.json("blocked");
      } else {
        const block = await Doctor.findOneAndUpdate(
          { _id: id },
          { $set: { isBlocked: false , blockReason:''} }
        );
        res.json("unblocked");
      }
    }
  } catch (error) {
    res.json("error");
  }
};

const patients = async (req, res) => {
  try {
    const patients = await Patients.find({}, { password: 0 });
    res.json(patients);
  } catch (error) {
    res.json("error");
  }
};

const managePatient = async (req, res) => {
  try {
    const { isuserBlocked } = req.body;
    const id = req.params.patientId;
    if (isuserBlocked == false) {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: true } }
      );
      res.json("blocked");
    } else {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: false } }
      );
      res.json("unblocked");
    }
  } catch (error) {
    res.json("error");
  }
};

const medicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ isDeleted: false });
    res.json(medicines);
  } catch (error) {
    console.log(error);
  }
};

const addMedicine = async (req, res) => {
  try {
    const { newMed, cost, doseData } = req.body;
    const exist = await Medicine.findOne({ name: newMed });
    if (exist) {
      res.json("exist");
    } else {
      const med = new Medicine({
        name: newMed,
        dose: doseData,
        cost: cost,
        createdAt: dateTime,
      });
      med.save();
      res.json("success");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const update = await Medicine.findByIdAndUpdate(
      { _id: req.body.id },
      { $set: { isDeleted: true } }
    );
    res.json("done");
  } catch (error) {
    res.json("error");
  }
};

const appoints = async (req, res) => {
  try {
    const data = await Appointments.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const payments = async (req, res) => {
  try {
    const data = await Appointments.aggregate([
      {
        $lookup: {
          from: "users",
          let: { searchId: { $toObjectId: "$user" } },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$searchId"] } } }],
          as: "userData",
        },
      },
      {
        $lookup: {
          from: "doctors",
          let: { searchId: { $toObjectId: "$doctor" } },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$searchId"] } } }],
          as: "docData",
        },
      },
    ]);
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  login,
  adminData,
  doctors,
  departments,
  createDepartment,
  manageDepartment,
  manageDoctor,
  patients,
  managePatient,
  medicines,
  addMedicine,
  deleteMedicine,
  appoints,
  payments,
}
