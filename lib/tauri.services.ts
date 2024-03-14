interface ModuleCache {
  fs?: Promise<typeof import("@tauri-apps/api/fs")>;
  path?: Promise<typeof import("@tauri-apps/api/path")>;
  dialog?: Promise<typeof import("@tauri-apps/api/dialog")>;
}

const moduleCache: ModuleCache = {};

async function getModule(moduleName: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (!moduleCache[moduleName]) {
    switch (moduleName) {
      case "fs":
        moduleCache.fs = import("@tauri-apps/api/fs");
        break;

      case "path":
        moduleCache.path = import("@tauri-apps/api/path");
        break;

      case "dialog":
        moduleCache.dialog = import("@tauri-apps/api/dialog");
        break;

      default:
        break;
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return await moduleCache[moduleName]!;
}

const tauriService = {
  getFS: async () => await getModule("fs"),
  getPath: async () => await getModule("path"),
  getDialog: async () => await getModule("dialog"),
};

export default tauriService;
