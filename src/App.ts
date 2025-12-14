// App.ts
import { Application, VERSION } from "pixi.js";
import { Boot } from "./core/Boot";
declare global {
  var __PIXI_APP__: Application;
}

export class App {
  static async start() {

    // PIXI version
    console.log("PIXI Version:", VERSION);

    // Initialize Pixi Application
    const app = new Application();
    await app.init({
      resizeTo: window,
      backgroundColor: 0x000000,
    });

    // Append canvas to DOM
    document.body.appendChild(app.canvas);

    globalThis.__PIXI_APP__ = app;

    // Start Boot process to load assets and build UI
    await Boot.start(app);

    // Handle window resize
    window.addEventListener("resize", () => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
    });
  }
}
