import { createSlice } from "@reduxjs/toolkit";

const prescribeData = createSlice({
  name: "prescription",
  initialState: {
    data: {},
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = prescribeData.actions;
export default prescribeData.reducer;
