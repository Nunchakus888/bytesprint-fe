import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    identification: ''
  },
  reducers: {
    setIdentification(state, action) {
      state.identification = action.payload;
    }
  },
});

export const { setIdentification } = commonSlice.actions;

export default commonSlice.reducer;
