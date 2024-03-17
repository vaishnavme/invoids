/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice, current } from "@reduxjs/toolkit";
import { RootState } from "./store";

type File = {
  name: string;
  path: string;
};

const appAdapter = createEntityAdapter({
  selectId: (file: File) => file.name,
});

const initialState = appAdapter.getInitialState({
  appConfig: null,
  showSettingDialog: false,
});

const appSlice = createSlice({
  name: "AppData",
  initialState,
  reducers: {
    init: (state, action) => {
      state.appConfig = action.payload;
    },
    updateAppConfig: (state, action) => {
      const currentState = current(state);

      const currentAppConfig = currentState?.appConfig || {};

      const updateAppConfig = {
        ...currentAppConfig,
        ...action.payload,
      };

      state.appConfig = updateAppConfig;
    },

    toggleSettingsDialog: (state, action) => {
      state.showSettingDialog = action.payload;
    },

    addNewFile: (state, action) => appAdapter.upsertOne(state, action),
    upsertFiles: (state, action) =>
      appAdapter.upsertMany(state, action.payload),

    // logRedux: (state) => {
    //   const currentState = current(state);
    //   console.log("state=> ", currentState);
    // },
  },
});

export const { selectAll: getAllFiles } = appAdapter.getSelectors(
  (state: RootState) => state.AppData
);

export const getAppConfig = (state: RootState) =>
  state?.AppData?.appConfig || null;

const AppReducer = appSlice.reducer;
const appActions = appSlice.actions;

export { AppReducer, appActions };
