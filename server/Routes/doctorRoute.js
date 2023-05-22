const express = require('express')
const doctorRoute = express()
const doctorController = require('../controller/doctorController')
require('dotenv').config()
const { validateToken } = require('../middlewares/jwt')
const upload = require('../middlewares/multer')


doctorRoute.post('/signup',doctorController.signup)
doctorRoute.post('/verify/:token',doctorController.verify)
doctorRoute.post('/login',doctorController.login)
doctorRoute.get('/doctorData',validateToken,doctorController.doctorData)
doctorRoute.post('/setprofile',upload.array('images'),validateToken,doctorController.setProfile)
module.exports = doctorRoute