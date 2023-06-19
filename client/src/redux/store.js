import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userData";
import doctorReducer from "./doctorData";
import adminReducer from "./adminData";
import scheduleReducer from "./doctorSchedule";
import selectedDocReducer from "./selectedDoc";
import appointmentReducer from "./appointment";
import consultReducer from "./consult";
import prescriptionData from "./prescriptionData";

export default configureStore({
  reducer: {
    user: userReducer,
    doctor: doctorReducer,
    admin: adminReducer,
    docSchedule: scheduleReducer,
    selectedDoc: selectedDocReducer,
    appointment: appointmentReducer,
    consult: consultReducer,
    prescription: prescriptionData,
  },
});
