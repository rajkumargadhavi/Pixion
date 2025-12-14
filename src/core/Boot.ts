// Boot.ts
import { AssetManager } from "./AssetManager";
import { UIBuilder } from "../ui/UIBuilder";
import { Application } from "pixi.js";

export class Boot {
  static async start(app: Application) {
    // 🔹 Load all assets from LoadConfig.json
    await AssetManager.load("/assets/LoadConfig.json");
    console.log("All assets loaded successfully.");

    // 🔹 Get UI JSON from cache
    const layout = AssetManager.get("ui");

    if (!layout) {
      console.error("UI layout not found in cache!");
      return;
    }

    // 🔹 Build UI and add to stage
    const ui = UIBuilder.build(layout);
    app.stage.addChild(ui);
  }
}
