import { create } from "zustand";
import { BaseDirectory } from "@tauri-apps/api/fs";
import { Store, SettingConfig } from "./store.types";

type Action = {
  init: () => void;
  updateSettingConfig: (payload: SettingConfig) => void;
  toggleSettingsDialog: (booleanValue: boolean) => void;
};

const initialState: Store = {
  settingsConfig: { path: "", folder: "" },
  openSettings: false,
};

const useStore = create<Store & Action>()((set) => ({
  ...initialState,

  init: async () => {
    const fs = await import("@tauri-apps/api/fs");

    try {
      const result = await fs.readTextFile("app.json", {
        dir: BaseDirectory.App,
      });

      set((state) => ({
        ...state,
        settingsConfig: JSON.parse(result),
      }));
    } catch (err) {
      set((state) => ({ ...state, openSettings: true }));
      console.log("appConfig does not exist");
    }
  },

  updateSettingConfig: (payload) => {
    set((state) => ({
      ...state,
      settingsConfig: {
        ...state.settingsConfig,
        ...payload,
      },
    }));
  },

  toggleSettingsDialog: (booleanValue) =>
    set(() => ({ openSettings: booleanValue })),
}));

export default useStore;
