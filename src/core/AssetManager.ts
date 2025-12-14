// AssetManager.ts
import { Assets } from "pixi.js";

type LoadConfig = {
  images?: { name: string; url: string }[];
  json?: { name: string; url: string }[];
};

export class AssetManager {
  static async load(configUrl: string) {
    console.log(configUrl)
    // Fetch JSON
    const config: LoadConfig = await fetch(configUrl).then(r => r.json());
    console.log(config)
    const keys: string[] = [];

    config.images?.forEach(i => {
      if (!i.url) {
        console.error(`Image ${i.name} has no URL!`);
        return;
      }
      Assets.add({
        alias: i.name,
        srcs: Array.isArray(i.url) ? i.url : [i.url], // make sure it's array
      });
      keys.push(i.name);
    });

    config.json?.forEach(j => {
      if (!j.url) {
        console.error(`JSON ${j.name} has no URL!`);
        return;
      }
      Assets.add({
        alias: j.name,
        srcs: Array.isArray(j.url) ? j.url : [j.url], // array
      });
      keys.push(j.name);
    });

    // Load all assets
    await Assets.load(keys);

    console.log("Assets cached:", keys);
  }

  static get<T = any>(key: string): T {
    const asset = Assets.get(key);
    if (!asset) console.error(`Asset with key "${key}" not found!`);
    return asset;
  }
}
