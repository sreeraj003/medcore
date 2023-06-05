import { createSlice } from "@reduxjs/toolkit";

const selectedDocSlice = createSlice({
  name: "selectedDoc",
  initialState: {
    doc: "",
  },
  reducers: {
    setDoc: (state, action) => {
      state.doc = action.payload;
    },
  },
});

export const { setDoc } = selectedDocSlice.actions;
export default selectedDocSlice.reducer;
