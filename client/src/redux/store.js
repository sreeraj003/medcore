import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userData'
import doctorReducer from './doctorData'
import adminReducer from './adminData'
export default configureStore({
    reducer : {
        user: userReducer,
        doctor:doctorReducer,
        admin:adminReducer
    }
})