require("dotenv").config();
const Doctor = require("../model/doctorModel");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const { dateTime } = require("../config/dateAndTime");
const mailSender = require("../config/nodeMailer");
const { createDoctorTokens } = require("../middlewares/jwt");
const Departments = require("../model/departmentModel");
const mongoose = require("mongoose");

async function securePassword(password) {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    console.log(error);
  }
}

const signup = async (req, res) => {
  try {
    const { Name, Email, Age, Mobile, Password } = req.body;
    const exist = await Doctor.findOne({ email: Email });
    if (exist) {
      res.json("Email already exist...!");
    } else {
      const hashedPassword = await securePassword(Password);
      const Otp = Math.floor(1000 + Math.random() * 9000);
      const token = randomString.generate();
      const doctor = new Doctor({
        name: Name,
        email: Email,
        age: Age,
        contact: Mobile,
        password: hashedPassword,
        otp: Otp,
        token: token,
        timeStamp: dateTime,
      });
      const docData = await doctor.save();
      if (docData) {
        await mailSender(Email, Otp);
        const data = {
          message: "Check mail",
          string: token,
        };
        res.json(data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const verify = async (req, res) => {
  try {
    const { token } = req.params;
    const doctor = await Doctor.findOne({ token: token });
    if (!doctor) {
      res.json("Invalid");
    } else {
      if (doctor.otp != req.body.otp) {
        res.json("Invalid");
      } else {
        await Doctor.findOneAndUpdate(
          { token: token },
          { $set: { token: "", otp: "", isVerified: true } }
        );
        res.json("verified");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctorData = await Doctor.findOne({ email: email });
    if (doctorData) {
      const passwordMatch = await bcrypt.compare(password, doctorData.password);
      if (passwordMatch) {
        if (doctorData.isVerified === true) {
          if (!doctorData.isBlocked) {
            const token = createDoctorTokens(doctorData._id);
            res.json({ doctorData, token });
          } else {
            res.json("blocked");
          }
        } else {
          res.json("unverified");
        }
      } else {
        res.json("unauthorized");
      }
    } else {
      res.json("unauthorized");
    }
  } catch (error) {
    console.log(error);
  }
};

const doctorData = async (req, res) => {
  try {
    const data = await Doctor.findOne({ _id: req._id.id });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const setProfile = async (req, res) => {
  try {
    let profileData;
    const {
      name,
      age,
      gender,
      fee,
      contact,
      qualification,
      department,
      address,
      prChange,
    } = req.body;
    const fileName = req.files.map((el) => el.filename);
    if (fileName != "") {
      if (prChange === "true") {
        const profile = fileName.shift();
        if (fileName == "") {
          profileData = await Doctor.findByIdAndUpdate(
            { _id: req._id.id },
            {
              $set: {
                name: name,
                age: age,
                contact: contact,
                qualification: qualification,
                department: department,
                gender: gender,
                fee: fee,
                address: address,
                image: profile,
              },
            }
          );
        } else {
          profileData = await Doctor.findByIdAndUpdate(
            { _id: req._id.id },
            {
              $set: {
                name: name,
                age: age,
                contact: contact,
                qualification: qualification,
                department: department,
                gender: gender,
                fee: fee,
                address: address,
                image: profile,
              },
              $addToSet: { documents: { $each: fileName } },
            }
          );
        }
      } else {
        profileData = await Doctor.findByIdAndUpdate(
          { _id: req._id.id },
          {
            $set: {
              name: name,
              age: age,
              contact: contact,
              qualification: qualification,
              department: department,
              gender: gender,
              fee: fee,
              address: address,
            },
            $addToSet: { documents: { $each: fileName } },
          }
        );
      }
    } else {
      profileData = await Doctor.findByIdAndUpdate(
        { _id: req._id.id },
        {
          $set: {
            name: name,
            age: age,
            contact: contact,
            qualification: qualification,
            department: department,
            gender: gender,
            fee: fee,
            address: address,
          },
        }
      );
    }
    const ProfileData = await Doctor.findById(
      { _id: req._id.id },
      { password: 0 }
    );
    res.json(ProfileData);
  } catch (error) {
    console.log(error);
  }
};

const departments = async (req, res) => {
  try {
    const data = await Departments.find({ isBlocked: false });
    res.json(data);
  } catch (error) {
    res.json("error");
  }
};

const deleteImage = async (req, res) => {
  try {
    const deleteData = req.params.deleteData;
    const doc = await Doctor.findOneAndUpdate(
      { _id: req._id.id },
      { $pull: { documents: deleteData } }
    );
    const docData = await Doctor.find({ _id: req._id.id }, { password: 0 });
    res.json(docData);
  } catch (error) {
    res.json("error");
  }
};

module.exports = {
  signup,
  verify,
  login,
  doctorData,
  setProfile,
  departments,
  deleteImage,
};
