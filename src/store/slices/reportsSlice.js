import { createSlice } from "@reduxjs/toolkit";

const reportsSlice = createSlice({
  name: "reports",
  initialState: [],
  reducers: {
    addReport: (state, action) => {
      state.push(action.payload);
    },
    resolveReport: (state, action) => {
      const report = state.find((r) => r.id === action.payload);
      if (report) report.status = "Resolved";
    },
  },
});

export const { addReport, resolveReport } = reportsSlice.actions;
export default reportsSlice.reducer;