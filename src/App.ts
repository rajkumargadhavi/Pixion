import { Application, Assets, Sprite } from "pixi.js";
import { Boot } from "./core/Boot";
import { UIBuilder } from "./ui/UIBuilder";


declare global {
  var __PIXI_APP__: Application;
}

export class App {
  static async start() {
    const app = new Application();

    await app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      resizeTo: window,
      backgroundColor: 0x222222
    });

    document.body.appendChild(app.canvas);
    globalThis.__PIXI_APP__ = app;

    await Boot.start();

    // load json
    const layout = Assets.get("ui");

    // build UI
    const ui = UIBuilder.build(layout);
    app.stage.addChild(ui);


    // --- Handle resize dynamically ---
    window.addEventListener("resize", () => {
      UIBuilder.handleResize();
    });

    // test sprite
    // const sprite = Sprite.from("bg");
    // app.stage.addChild(sprite);
  }
}
