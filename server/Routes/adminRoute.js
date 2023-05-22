const express = require('express')
const adminRoute = express()
const adminController = require('../controller/adminController')
const { validateToken } = require('../middlewares/jwt')
require('dotenv').config()

adminRoute.post('/login',adminController.login)
adminRoute.get('/adminData',validateToken,adminController.adminData)

module.exports = adminRoute