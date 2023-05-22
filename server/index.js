    require('./config/mongo').connect()
    const express = require('express')
    const app = express()
    const cors = require('./middlewares/cors') 
    const path = require('path')
    const bodyParser = require('body-parser')
    const userRoute = require('./Routes/userRoute')
    const adminRoute = require('./Routes/adminRoute')
    const doctorRoute = require('./Routes/doctorRoute')

    app.use(cors)
  
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use('/',userRoute)
    app.use('/admin',adminRoute)
    app.use('/doctor',doctorRoute)

    app.listen(8080,()=>{
        console.log('connected');
    })