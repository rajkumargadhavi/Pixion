import { Application } from "pixi.js";
import { UIBuilder } from "./ui/UIBuilder";
declare global {
  var __PIXI_APP__: Application;
}
export class App {
  static async start() {
    const app = new Application();
    await app.init({
      resizeTo: window,
      backgroundColor: 0x000000,
    });

    document.body.appendChild(app.canvas);

    globalThis.__PIXI_APP__ = app;

    const layout = await fetch("/assets/ui/layout.json").then(r => r.json());

    const ui = UIBuilder.build(layout);
    app.stage.addChild(ui);

    window.addEventListener("resize", () => {
      UIBuilder.refresh();
    });
  }
}
