import { Assets } from "pixi.js";

type LoadConfig = {
  images?: { name: string; url: string }[];
  json?: { name: string; url: string }[];
};

export class AssetManager {
  static async load(configUrl: string) {
    const text = await fetch(configUrl).then(r => r.text());

    const config: LoadConfig = JSON.parse(text);

    const assetsToAdd: Array<{ src: string; alias: string }> = [];

    const addAsset = (name: string, url: string) => {
      if (!url || typeof url !== "string") {
        console.error(`❌ Invalid URL for asset "${name}":`, url);
        return;
      }
      assetsToAdd.push({ src: url, alias: name });
    };

    config.images?.forEach(img => addAsset(img.name, img.url));
    config.json?.forEach(js => addAsset(js.name, js.url));

    console.log("Adding assets to PIXI:", assetsToAdd);
    Assets.add(assetsToAdd);

    const keys = assetsToAdd.map(a => a.alias);

    try {
      await Assets.load(keys);
      console.log("Assets loaded:", keys);
    } catch (err) {
      console.error("Error loading assets:", err);
    }
  }

  static get<T = any>(key: string): T {
    const asset = Assets.get(key);
    if (!asset) console.error(`Asset with key "${key}" not found!`);
    return asset;
  }
}
