const Admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
require('dotenv').config()
const {dateTime} = require('../config/dateAndTime');
const { createTokens } = require("../middlewares/jwt");

const login =async(req,res)=>{
    try {
        const {email,password} = req.body
        const adminData = await Admin.findOne({email:email})
        if(adminData){
            const passwordMatch = await bcrypt.compare(password,adminData.password)
            if(passwordMatch){
                if(!adminData.isBlocked){
                    const token = createTokens(adminData._id)

                    res.json({adminData,token})
                }else{
                    res.json('blocked')
                }
            }else{
                res.json("unauthorized")
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const adminData = async(req,res)=>{
    try {
        const data = await Admin.findOne({_id:req._id.id})
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    login,
    adminData   
}