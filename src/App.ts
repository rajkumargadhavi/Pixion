import { Application } from "pixi.js";
import { Boot } from "./core/Boot";

declare global {
  var __PIXI_APP__: Application;
}

export class App {
  static async start() {
    // 1️⃣ Create app instance
    const app = new Application();

    // 2️⃣ Initialize properly (v8+ style)
    await app.init({
      resizeTo: window,
      backgroundColor: 0x000000,
    });

    // 3️⃣ Append canvas to DOM
    document.body.appendChild(app.canvas); // v8+ uses app.canvas

    // 4️⃣ Store globally
    globalThis.__PIXI_APP__ = app;

    // 5️⃣ Start Boot with app
    await Boot.start(app);
  }
}
