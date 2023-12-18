import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    identification: '',
    userInfo: {},
    loginLoading: false
  },
  reducers: {
    setIdentification(state, action) {
      state.identification = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setLoginLoading(state, action) {
      state.loginLoading = action.payload;
    },
  },
});

export const { setIdentification,setUserInfo,setLoginLoading } = commonSlice.actions;

export default commonSlice.reducer;
