import { createSlice } from "@reduxjs/toolkit";

const helpSlice = createSlice({
  name: "help",
  initialState: [],
  reducers: {
    setRequests: (state, action) => {
      return action.payload;
    },
    addRequest: (state, action) => {
      state.push(action.payload);
    },
    claimRequest: (state, action) => {
      const request = state.find(
        (r) => r._id === action.payload.id || r.id === action.payload.id
      );
      if (request) {
        request.claimed = true;
        request.status = "Claimed";
        request.claimedBy = action.payload.claimedBy;
      }
    },
    deleteRequest: (state, action) => {
      return state.filter(
        (r) => r._id !== action.payload && r.id !== action.payload
      );
    },
  },
});

export const { setRequests, addRequest, claimRequest, deleteRequest } = helpSlice.actions;
export default helpSlice.reducer;