import { Assets } from "pixi.js";

export class AssetManager {
  static async loadList(list: any[]) {
    for (const item of list) {
      await Assets.load({
        alias: item.name,
        src: item.url
      });
    }
  }

  static get(name: string) {
    return Assets.get(name);
  }
}
