import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export enum GuestActionNames {
  GetLanding = "getLanding",
}

export const getLandingDispatch = createAsyncThunk(GuestActionNames.GetLanding, async () => {
  try {
    const response = await axios.get("https://api.npoint.io/fee177346e7875554413");

    return response.data;
  } catch (e) {
    console.log("getLanding", e);
  }
});
