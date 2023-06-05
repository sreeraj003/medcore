import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "appointment",
  initialState: {
    appointment: {},
  },
  reducers: {
    setAppointment: (state, action) => {
      state.appointment = action.payload;
    },
  },
});

export const { setAppointment } = appSlice.actions;
export default appSlice.reducer;
