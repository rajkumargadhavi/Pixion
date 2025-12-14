import { AssetManager } from "./AssetManager";
import { UIBuilder } from "../ui/UIBuilder";

export class Boot {
  static async start(app: any) {
console.log("All assets loaded");
    // 🔥 Load all assets from LoadConfig.json
    await AssetManager.load("/assets/LoadConfig.json");
    console.log("All assets loaded");

    // 🔹 Get MainView JSON from cache
    const MainView = AssetManager.get("ui");
    if (!MainView) throw new Error("UI JSON not found in cache!");

    // 🔹 Build UI and add to stage
    const ui = UIBuilder.build(MainView);
    app.stage.addChild(ui);
  }
}
