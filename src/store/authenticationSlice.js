import { createSlice } from "@reduxjs/toolkit";
import { saveAuthInfo, loadAuthInfo } from "./LocalStorage";

const initialState = loadAuthInfo() || {
  id: "",
  username: "",
  identifier: "",
  isAuthenticated: false,
  authToken: "",
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.identifier = action.payload.identifier;
      state.authToken = action.payload.authToken;
      state.isAuthenticated = action.payload.isAuthenticated;
      saveAuthInfo(state);
    },

    logout: (state) => {
      state.id = "";
      state.username = "";
      state.authToken = "";
      state.identifier = "";
      state.isAuthenticated = false;
      saveAuthInfo(state);
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
