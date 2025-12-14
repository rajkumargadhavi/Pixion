import { Assets } from "pixi.js";

type LoadConfig = {
  images?: { name: string; url: string }[];
  json?: { name: string; url: string }[];
};

export class AssetManager {
  static async load(configUrl: string) {
    const config: LoadConfig = await fetch(configUrl).then(r => r.json());

    const manifest: Record<string, string> = {};

    // 🔹 IMAGES
    config.images?.forEach(img => {
      manifest[img.name] = img.url;
    });

    // 🔹 JSON
    config.json?.forEach(js => {
      manifest[js.name] = js.url;
    });

    // 🔥 THIS IS THE KEY FIX
    await Assets.load(manifest);
  }

  static get<T = any>(key: string): T {
    return Assets.get(key);
  }
}
