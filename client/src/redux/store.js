import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userData";
import doctorReducer from "./doctorData";
import adminReducer from "./adminData";
import scheduleReducer from "./doctorSchedule"
export default configureStore({
  reducer: {
    user: userReducer,
    doctor: doctorReducer,
    admin: adminReducer,
    docSchedule: scheduleReducer,
  },
});
