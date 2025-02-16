import { createSlice } from "@reduxjs/toolkit";
import { loadThemeState, saveThemeState } from "./LocalStorage";

const initialState = loadThemeState() || {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    light: (state) => {
      state.theme = "light";
      saveThemeState(state);
    },

    dark: (state) => {
      state.theme = "dark";
      saveThemeState(state);
    },
  },
});

export const { light, dark } = themeSlice.actions;
export default themeSlice.reducer;
