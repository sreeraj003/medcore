require("dotenv").config();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const randomstring = require('randomstring')
const {dateTime} = require('../config/dateAndTime')
const mailSender = require("../config/nodeMailer");
const { createTokens,validateToken } = require("../middlewares/jwt") ;

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
        const exist = await User.findOne({ email: Email });
        if (exist) res.json("Email already exist...!");
        else {
            
            const hashedPassword = await securePassword(Password);
            const otp = Math.floor(1000+Math.random()*9000)
            const string = randomstring.generate()
            const user = new User({
                userName: Name,
                email: Email,
                age: Age,
                mobile: Mobile,
                password: hashedPassword,
                otp:otp, 
                token:string,
                timeStamp:dateTime
            });

            const userData = await user.save();
            if (userData) {
                await mailSender(Email,otp);     
                const data = {
                    message:"Check mail",
                    string:string
                }         
                res.json(data)
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const verify = async(req,res)=>{
    try {
        const {token} = req.params
        const user = await User.findOne({token:token})
        if(!user){
            res.json('Invalid')
        }else{
            if(user.otp != req.body.otp){
                res.json("Invalid")
            }else{
                await User.findOneAndUpdate({token:token},{$set:{token:'', otp:'' ,is_verified:true}})
                res.json('verified')
            }
        }  
    } catch (error) {
        console.log(error);
    }
}

const login = async(req,res) => {
    try {
        const {email,password} = req.body
        const userData = await User.findOne({email:email})
        if(userData){
            const passwordMatch = await bcrypt.compare(password,userData.password)
            if(passwordMatch){
                if(userData.isVerified===true){
                    if(!userData.isBlocked){
                        const token = createTokens(userData._id)
                        res.json({userData,token})
                    }else{
                        res.json('blocked')
                    }
                }else{
                    res.json('unverified')
                }
            }else{
                res.json('unauthorized')
            }
        }else{
            res.json('unauthorized')
        }
    } catch (error) {
        console.log(error);
    }
}

const userData = async(req,res)=>{
    try {
        const userData = await User.findOne({_id:req._id.id})
            res.json(userData)

    } catch (error) {
        
    }
}

module.exports = {
  signup,
  verify,
  login,
  userData
};
