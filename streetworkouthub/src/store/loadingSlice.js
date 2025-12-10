import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: { catalogLoading: false },
  reducers: {
    startCatalogLoading: (s) => { s.catalogLoading = true; },
    stopCatalogLoading: (s) => { s.catalogLoading = false; }
  }
});

export const { startCatalogLoading, stopCatalogLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
