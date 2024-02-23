import { Action, combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkAction } from "redux-thunk";

import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import storage from "redux-persist/lib/storage/session";
import { PersistConfig } from "redux-persist";
// this is intentional import { createWhitelistFilter } from "redux-persist-transform-filter";

import { Config, createStateSyncMiddleware, initMessageListener, initStateWithPrevTab } from "redux-state-sync";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { configureStore } from "@reduxjs/toolkit";

import { createBlacklistFilter } from "redux-persist-transform-filter";

import GuestSlice, { TabSyncGuestActionNames } from "./Slice/GuestSlice";
import { GuestActionNames } from "./Thunk/GuestThunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const rootReducer = combineReducers({
  guest: GuestSlice.reducer,
});

export type rootReducerState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<rootReducerState> = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["guest"],
  // blacklist: ["auth", "loading", "persist/PERSIST", "persist/REHYDRATE"],
  transforms: [createBlacklistFilter("guest", ["landing"])],
};

// action types to sync between open tabs
const syncConfig: Config = {
  whitelist: [GuestActionNames.GetLanding, ...TabSyncGuestActionNames],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  // @ts-expect-error because it can't read array of type never when concats
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat([createStateSyncMiddleware(syncConfig)]);
  },
});

// allow store control from console
// Reflect.set(window, "store", store);

// both of them works comment to disable sync state across the tabs
// initStateWithPrevTab(store);
initMessageListener(store);

export type RootState = rootReducerState;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<rootReducerState> = useSelector;
const presistor = persistStore(store);

export default { store, useAppDispatch, useAppSelector, presistor };
