import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import authenticationSlice from "./authenticationSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice,
    authentication: authenticationSlice,
  },
});

export default store;
