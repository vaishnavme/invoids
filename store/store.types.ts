export type SettingConfig = {
  path: string;
  folder: string;
};

export type Store = {
  openSettings: boolean;
  settingsConfig: SettingConfig;
};
