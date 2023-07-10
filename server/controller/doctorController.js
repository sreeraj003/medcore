require("dotenv").config();
const Doctor = require("../model/doctorModel");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const { dateTime } = require("../config/dateAndTime");
const mailSender = require("../config/nodeMailer");
const { createDoctorTokens } = require("../middlewares/jwt");
const Departments = require("../model/departmentModel");
const Schedule = require("../model/scheduleModel");
const Appointment = require("../model/appointmentModel");
// const Users = require("../model/userModel");
const Medicines = require("../model/medicines");

async function securePassword(password) {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    res.json("error");
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
        await mailSender(Email, Otp,'signup');
        const data = {
          message: "Check mail",
          string: token,
        };
        res.json(data);
      }
    }
  } catch (error) {
    res.json("error");
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
    res.json("error");
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
          if(doctorData.isApproved){
            if (!doctorData.isBlocked) {
              const token = createDoctorTokens(doctorData._id);
              res.json({ doctorData, token });
            } else {
              res.json("blocked");
            }
          }else{
            res.json('notApproved')
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
    res.json("error");
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await Doctor.findOne({ email: email });
    if (user.otp != otp) {
      res.json("invalid");
    }else{
      await Doctor.findOneAndUpdate(
        { email:email },
        { $set: { otp: "" } }
      );
      res.json('valid')
    }

  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.params.email;
    const emailData = await Doctor.findOne({ email: email }, { email: 1 });
    if (emailData) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      await Doctor.findOneAndUpdate({ email: email }, { $set: { otp: otp } });
      await mailSender(emailData.email, otp, "forgotPassword");
      res.json("success");
    }else{
      res.json('not found')
    }
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async(req,res)=>{
  try {
    let {email,password} = req.body 
    const pass = await securePassword(password)
    await Doctor.findOneAndUpdate({email:email},{$set:{password:pass}}).then(
      res.json('success'))
  } catch (error) {
    res.json("error")
  }
}

const doctorData = async (req, res) => {
  try {
    const data = await Doctor.findOne({ _id: req._id.id });
    res.json(data);
  } catch (error) {
    res.json("error");
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
    res.json("error");
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


const schedule = async (req, res) => {
  try {
    const data = await Schedule.find({ doctor: req._id.id }).sort({date:1});
    res.json(data);
  } catch (error) {
    res.json("error");
  }
};


const manageSchedule = async (req, res) => {
  try {
    const { date, time, action } = req.body;
    const docId = req._id.id;
    const DocData = await Schedule.find({ doctor: docId });

    if (action == "add") {
      const exist = DocData.filter((el) => el.date == date);

      if (exist != "") {
        const ind = exist[0].time.indexOf(time);
        if (ind == -1) {
          let timeData = [...time];
          const datas = await Schedule.findOneAndUpdate(
            { doctor: docId, date: date },
            { $set: { time: timeData } }
          );
        }
      } else {
        const schedule = new Schedule({
          doctor: docId,
          date: date,
          time: time,
        });
        await schedule.save();
      }
    } else {
      const exist = DocData.filter((el) => el.date == date);
      if (exist != "") {
        if (exist[0].time.length == 1) {
          const updated = await Schedule.deleteOne({
            doctor: docId,
            date: date,
          });
        } else {
          const updated = await Schedule.findOneAndUpdate(
            { doctor: docId, date: date },
            { $pull: { time: time } }
          );
        }
      }

      const data = await Schedule.find({ doctor: docId });
    }

    const scheduleData = await Schedule.find({ doctor: docId });
    res.json(scheduleData);
  } catch (error) {
    res.json("error");
  }
};

// const manageSchedule = async (req, res) => {
//   try {
//     const { date, time, action } = req.body;
//     const docId = req._id.id;
//     const DocData = await Schedule.find({ doctor: docId });

//     if (action == "add") {
//       const exist = DocData.filter((el) => el.date == date);

//       if (exist != "") {
//         const ind = exist[0].time.indexOf(time);
//         if (ind == -1) {
//           let timeData = [...exist[0].time, ...time];
//           const datas = await Schedule.findOneAndUpdate(
//             { doctor: docId, date: date },
//             { $set: { time: timeData } }
//           );
//         }
//       } else {
//         const schedule = new Schedule({
//           doctor: docId,
//           date: date,
//           time: time,
//         });
//         await schedule.save();
//       }
//     } else {
//       const exist = DocData.filter((el) => el.date == date);
//       if (exist != "") {
//         if (exist[0].time.length == 1) {
//           const updated = await Schedule.deleteOne({
//             doctor: docId,
//             date: date,
//           });
//         } else {
//           const updated = await Schedule.findOneAndUpdate(
//             { doctor: docId, date: date },
//             { $pull: { time: time } }
//           );
//         }
//       }

//       const data = await Schedule.find({ doctor: docId });
//     }

//     const scheduleData = await Schedule.find({ doctor: docId });
//     res.json(scheduleData);
//   } catch (error) {
//     res.json("error");
//   }
// };

const appointments = async (req, res) => {
  try {
    const appointment = await Appointment.aggregate([
      {
        $match: { doctor: req._id.id },
      },
      {
        $lookup: {
          from: "users",
          let: { searchId: { $toObjectId: "$user" } },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$searchId"] } } }],
          as: "userData",
        },
      },
      {
        $sort: { date: -1, time: 1 },
      },
    ]);
    res.json(appointment);
  } catch (error) {
    res.json(error);
  }
};

const consult = async (req, res) => {
  try {
    const appointment = await Appointment.aggregate([
      {
        $match: { doctor: req._id.id },
      },
      {
        $lookup: {
          from: "users",
          let: { searchId: { $toObjectId: "$user" } },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$searchId"] } } }],
          as: "userData",
        },
      },
      {
        $sort: { date: -1, time: 1 },
      },
    ]);
    const data = appointment.filter((app) => new Date(app.date) != new Date());
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const payments = async (req, res) => {
  try {
    const pay = await Appointment.aggregate([
      {
        $match: { doctor: req._id.id },
      },
      {
        $lookup: {
          from: "users",
          let: { searchId: { $toObjectId: "$user" } },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$searchId"] } } }],
          as: "userData",
        },
      },
      {
        $sort: { date: -1, time: 1 },
      },
    ]);
    res.json(pay);
  } catch (error) {
    console.log(error);
  }
};

const endAppointment = async (req, res) => {
  try {
    const appId = req.params.appId;
    const deleteAppoint = await Appointment.findOneAndUpdate(
      { _id: appId },
      { isAttended: true }
    );
    res.json("success");
  } catch (error) {
    console.log(error);
  }
};

const prescriptions = async (req, res) => {
  try {
    const data = await Appointment.aggregate([
      {
        $match: { doctor: req._id.id },
      },
      {
        $lookup: {
          from: "users",
          let: { searchId: { $toObjectId: "$user" } },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$searchId"] } } }],
          as: "userData",
        },
      },
    ]);
    res.json(data)
  } catch (error) {
    console.log(error);
  }
};

const medicines = async (req, res) => {
  try {
    const medData = await Medicines.find();
    res.json(medData);
  } catch (error) {
    console.log(error);
  }
};

const addPrescription = async (req, res) => {
  try {
    const data = req.body
    const med = new Map();
    for (let i = 0; i < data.length; i++) {
      med.set(data[i].medicine, data[i].selectedDose);
    }
    const update = await Appointment.findOneAndUpdate({_id:data[0].id},{$set:{medicines:med}})
    res.json('done')
  } catch (error) {
    console.log(error);
  }
};

const patients = async(req,res)=>{
  try {
    const data = await Appointment.aggregate([
      {
        $match: { doctor: req._id.id },
      },
      {
        $lookup: {
          from: "users",
          let: { searchId: { $toObjectId: "$user" } },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$searchId"] } } }],
          as: "userData",
        },
      },
    ]);
    res.json(data)
  } catch (error) {
    console.log(error);
  }
}

const dash = async(req,res)=>{
  try {
    const data = await Appointment.find({doctor:req._id.id})
    res.json(data)
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  signup,
  verify,
  login,
  doctorData,
  setProfile,
  departments,
  deleteImage,
  schedule,
  manageSchedule,
  appointments,
  consult,
  payments,
  endAppointment,
  prescriptions,
  medicines,
  addPrescription,
  patients,
  dash,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
