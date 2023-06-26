import { createSlice } from "@reduxjs/toolkit";

const consultSlice = createSlice({
  name: "consult",
  initialState: {
    slot: "",
  },
  reducers: {
    setSlot: (state, action) => {
      state.slot = action.payload;
    },
  },
});

export const { setSlot } = consultSlice.actions;
export default consultSlice.reducer;
