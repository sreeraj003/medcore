require("dotenv").config();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const { dateTime } = require("../config/dateAndTime");
const mailSender = require("../config/nodeMailer");
const { createTokens } = require("../middlewares/jwt");
const Doctor = require("../model/doctorModel");
const Department = require("../model/departmentModel");
const Schedule = require("../model/scheduleModel");
const Appointment = require("../model/appointmentModel");

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
    const exist = await User.findOne({ email: Email });
    if (exist) res.json("Email already exist...!");
    else {
      const hashedPassword = await securePassword(Password);
      const otp = Math.floor(1000 + Math.random() * 9000);
      const string = randomstring.generate();
      const user = new User({
        userName: Name,
        email: Email,
        age: Age,
        mobile: Mobile,
        password: hashedPassword,
        otp: otp,
        token: string,
        timeStamp: dateTime,
      });

      const userData = await user.save();
      if (userData) {
        await mailSender(Email, otp);
        const data = {
          message: "Check mail",
          string: string,
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
    const user = await User.findOne({ token: token });
    if (!user) {
      res.json("Invalid");
    } else {
      if (user.otp != req.body.otp) {
        res.json("Invalid");
      } else {
        await User.findOneAndUpdate(
          { token: token },
          { $set: { token: "", otp: "", is_verified: true } }
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
    const userData = await User.findOne({ email: email });
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        if (userData.isVerified === true) {
          if (!userData.isBlocked) {
            const token = createTokens(userData._id);
            res.json({ userData, token });
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
    res.json("error");
  }
};

const userData = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req._id.id });

    res.json(userData);
  } catch (error) {}
};

const findDoctors = async (req, res) => {
  try {
    const docs = await Doctor.aggregate([
      {
        $match: {
          isApproved: true,
          isBlocked: false,
          isVerified: true,
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "department",
          foreignField: "_id",
          as: "doctorData",
        },
      },
    ]);
    const deps = await Department.find({ isBlocked: false });

    res.json({ docs, deps });
  } catch (error) {
    res.json("error");
  }
};

const departments = async (req, res) => {
  try {
    const dep = await Department.find({});
    res.json(dep);
  } catch (error) {
    res.json("error");
  }
};

const setProfile = async (req, res) => {
  try {
    const { name, age, address, contact, gender } = req.body;
    if (req.file) {
      const fileName = req.file.filename;
      const updatedData = await User.findOneAndUpdate(
        { _id: req._id.id },
        {
          $set: {
            userName: name,
            age: age,
            address: address,
            contact: contact,
            gender: gender,
            image: fileName,
          },
        }
      );
    } else {
      const updatedData = await User.findOneAndUpdate(
        { _id: req._id.id },
        {
          $set: {
            userName: name,
            age: age,
            address: address,
            contact: contact,
            gender: gender,
          },
        }
      );
    }
    const userData = await User.findOne({ _id: req._id.id });
    res.json(userData);
  } catch (error) {
    res.json("error");
  }
};

const docSchedule = async (req, res) => {
  try {
    const docId = req.params.docId;
    const data = await Schedule.find({ doctor: docId }, { _id: 0, doctor: 0 });
    const appoint = await Appointment.find(
      { doctor: docId },
      { date: 1, time: 1 }
    );
    const availableSlots = data.reduce((result, dataItem) => {
      const { date, time } = dataItem;
    
      const existingSlot = result.find((slot) => slot.date === date);
      const appointTimes = appoint
        .filter((appointItem) => appointItem.date === date)
        .map((appointItem) => appointItem.time);
    
      if (!existingSlot) {
        result.push({ date, time: time.filter((slot) => !appointTimes.includes(slot)) });
      } else {
        existingSlot.time = existingSlot.time.filter((slot) => !appointTimes.includes(slot));
      }
    
      return result;
    }, []);

    const slot = availableSlots.filter(async(el)=>{
      if(new Date(el.date)<new Date()){
        await Schedule.deleteOne({date:el.date})
      }
      return new Date(el.date)>=new Date()
    })        
    res.json(slot);
  } catch (error) {
    res.json("error");
  }
};

const bookSlot = async (req, res) => {
  try {
    const { doctor, issues, fee, user, date, time } = req.body;
    console.log(req.body);
    const appointment = new Appointment({
      doctor: doctor,
      user: user,
      date: date,
      time: time,
      issues: issues,
      amount: fee,
      createdAt: dateTime,
      });
    appointment.save();

    res.json("success");
  } catch (error) {
    res.json("error");
  }
};

const loadAppointments = async (req, res) => {
  try {
    const id = req._id.id;
    const appointments = await Appointment.aggregate([
      { $match: { user: id } },
      {
        $lookup: {
          from: 'doctors',
          let: { searchId: { $toObjectId: '$doctor' } },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$searchId'] } } }
          ],
          as: 'docData'
        }
      },{
        $sort:{date:-1,time:1}
      }
    ]);
    res.json(appointments);
  } catch (error) {
    res.json('error');
  }
};




module.exports = {
  signup,
  verify,
  login,
  userData,
  findDoctors,
  departments,
  setProfile,
  docSchedule,
  bookSlot,
  loadAppointments
};
