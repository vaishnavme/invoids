import { createSlice, current } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "AppData",
  initialState: {
    appConfig: null,
    showSettingDialog: false,
  },
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
  },
});

const AppReducer = appSlice.reducer;
const appActions = appSlice.actions;

export { AppReducer, appActions };
