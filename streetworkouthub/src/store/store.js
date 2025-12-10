import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import loadingReducer from "./loadingSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    loading: loadingReducer,
  },
});

export default store;