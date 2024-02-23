import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export enum GuestActionNames {
  GetLanding = "getLanding",
  GetMediaNews= "getMediaNews",
  GetNewsCategory="getNewsCategory",
}

export const getLandingDispatch = createAsyncThunk(GuestActionNames.GetLanding, async () => {
  try {
    const response = await axios.get("https://api.npoint.io/fee177346e7875554413");

    return response.data;
  } catch (e) {
    console.log("getLanding", e);
  }
});

export const getMediaNewsDispatch = createAsyncThunk(GuestActionNames.GetMediaNews, async () => {
  try {
    const response = await axios.get("https://api.npoint.io/d275425a434e02acf2f7");

    return response.data;
  } catch (e) {
    console.log("getNews", e);
  }
});

export const getNewsCategoryDispatch = createAsyncThunk(GuestActionNames.GetNewsCategory, async () => {
  try {
    const response = await axios.get("https://api.npoint.io/91298d970c27e9a06518");

    return response.data;
  } catch (e) {
    console.log("getNewsCategory", e);
  }
});
