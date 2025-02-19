import { createSlice } from "@reduxjs/toolkit";
import { saveAuthInfo, loadAuthInfo } from "./LocalStorage";

const initialState = loadAuthInfo() || {
  id: "",
  username: "",
  authToken: "",
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducer: {
    login: (state, action) => {
      state.id = action.playload.id;
      state.username = action.playload.username;
      state.authToken = action.playload.authToken;
      saveAuthInfo(state);
    },

    logout: (state) => {
      state.id = "";
      state.username = "";
      state.authToken = "";
      saveAuthInfo(state);
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
