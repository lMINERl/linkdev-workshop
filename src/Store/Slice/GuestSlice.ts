import { createSlice } from "@reduxjs/toolkit";
import { getLandingDispatch, getMediaNewsDispatch, getNewsCategoryDispatch } from "../Thunk/GuestThunk";

interface GuestState {
  landing?: any | undefined;
  selectedLanding: object | undefined;
  direction: "rtl" | "ltr";
  media: any | undefined;
  newsCategory: any | undefined;
  selectedCategory: any | undefined;
  original_media: any | undefined;
}

const initialState: GuestState = {
  landing: undefined,
  media: undefined,
  selectedLanding: undefined,
  newsCategory: undefined,
  direction: "ltr",
  selectedCategory: undefined,
  original_media: undefined,
};

const guestSliceName = "guest";
const guestSlice = createSlice({
  name: "guest",
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.media = state.original_media ?? state.media;
      if (action.payload === undefined) {
        state.media = state.original_media ?? state.media;
        return;
      }
      state.original_media = [...state.media];
      state.media = state.media.filter((v) => {
        return v.categoryID == action.payload.id.toString();
      });
    },
    setSelectedLanding: (state, action) => {
      state.selectedLanding = action.payload;
    },
    toggleDirection: (state) => {
      state.direction = state.direction == "ltr" ? "rtl" : "ltr";
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getLandingDispatch.fulfilled, (state, action) => {
      state.landing = action.payload;
      state.selectedLanding = action.payload.slides[0];
    });
    builder.addCase(getMediaNewsDispatch.fulfilled, (state, action) => {
      state.media = action.payload.News;
      state.media = action.payload.News.map((v) => {
        return {
          ...v,
          categoryName: state.newsCategory.find((c) => c.id === Number(v.categoryID))?.name,
        };
      });
    });
    builder.addCase(getNewsCategoryDispatch.fulfilled, (state, action) => {
      state.newsCategory = action.payload.newsCategory;
    });
  },
});

export const GuestActions = guestSlice.actions;
const blackListSyncActions = [GuestActions.setSelectedLanding.name];

export const TabSyncGuestActionNames = Object.keys(GuestActions)
  .filter((v) => {
    return !blackListSyncActions.includes(v);
  })
  .map((v) => `${guestSliceName}/${v}`);

export default guestSlice;
