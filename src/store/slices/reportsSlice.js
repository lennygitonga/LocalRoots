import { createSlice } from "@reduxjs/toolkit";

const reportsSlice = createSlice({
  name: "reports",
  initialState: [],
  reducers: {
    setReports: (state, action) => {
      return action.payload;
    },
    addReport: (state, action) => {
      state.push(action.payload);
    },
    resolveReport: (state, action) => {
      const report = state.find(
        (r) => r._id === action.payload || r.id === action.payload
      );
      if (report) report.status = "Resolved";
    },
  },
});

export const { setReports, addReport, resolveReport } = reportsSlice.actions;
export default reportsSlice.reducer;