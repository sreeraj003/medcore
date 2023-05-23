import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    data: {},
  },
  reducers: {
    setDoctorData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDoctorData } = doctorSlice.actions;

export default doctorSlice.reducer;
