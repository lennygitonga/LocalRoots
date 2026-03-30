import { createSlice } from "@reduxjs/toolkit";

const helpSlice = createSlice({
  name: "help",
  initialState: [],
  reducers: {
    addRequest: (state, action) => {
      state.push(action.payload);
    },
    claimRequest: (state, action) => {
      const request = state.find((r) => r.id === action.payload.id);
      if (request) {
        request.claimed = true;
        request.status = "Claimed";
        request.claimedBy = action.payload.claimedBy;
      }
    },
    deleteRequest: (state, action) => {
      return state.filter((r) => r.id !== action.payload);
    },
  },
});

export const { addRequest, claimRequest, deleteRequest } = helpSlice.actions;
export default helpSlice.reducer;