import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { neon: false },
  reducers: {
    toggleTheme: (state) => {
      state.neon = !state.neon;
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
