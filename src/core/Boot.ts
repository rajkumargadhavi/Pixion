import { AssetManager } from "./AssetManager";
import { UIBuilder } from "../ui/UIBuilder";

export class Boot {
  static async start(app: any) {

    // ✅ CENTRAL LOAD
    await AssetManager.load("/assets/loadConfig.json");

    // ✅ JSON CACHE SE
    const layout = AssetManager.get("ui");

    const ui = UIBuilder.build(layout);
    app.stage.addChild(ui);
  }
}
