import { AssetManager } from "./AssetManager";

export class Boot {
  static async start() {
    // 1️⃣ BootLoad.json load
    const bootLoad = await fetch("/config/BootLoad.json").then(r => r.json());

    await AssetManager.loadList(bootLoad);

    // 2️⃣ loadConfig.json access
    const loadConfig = AssetManager.get("loadConfig");

    // 3️⃣ Main assets load
    await AssetManager.loadList(loadConfig.images);
    await AssetManager.loadList(loadConfig.json);

    console.log("All assets loaded");
  }
}
