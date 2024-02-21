import { createSlice } from "@reduxjs/toolkit";
import { getLandingDispatch } from "../Thunk/GuestThunk";

interface GuestState {
  landing?: any | undefined;
  selectedLanding: object | undefined;
}

const initialState: GuestState = {
  landing: undefined,
  selectedLanding: undefined,
};

const guestSlice = createSlice({
  name: "guest",
  reducers: {
    setSelectedLanding: (state, action) => {
      state.selectedLanding = action.payload;
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getLandingDispatch.fulfilled, (state, action) => {
      state.landing = action.payload;
      state.selectedLanding = action.payload.slides[0];
    });
  },
});

export const GuestActions = guestSlice.actions;

export default guestSlice;
