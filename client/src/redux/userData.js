import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
  },
  reducers: {
    setUserData: (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
