import { Application, Assets, Sprite } from "pixi.js";
import { Boot } from "./core/Boot";
import { UIBuilder } from "./ui/UIBuilder";


declare global {
  var __PIXI_APP__: Application;
}

export class App {
  static async start() {
    const app = new Application();
    globalThis.__PIXI_APP__ = app;

    await app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x222222,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window
    });

    document.body.appendChild(app.canvas);

    await Boot.start();

    // load json
    const layout = Assets.get("ui");

    // build UI
    const ui = UIBuilder.build(layout);
    app.stage.addChild(ui);


    // --- Background logic here ---
    const bg = Sprite.from("bg");
    bg.anchor.set(0.5);
    app.stage.addChild(bg);

    function resizeBG() {
      const scaleX = app.screen.width / bg.texture.width;
      const scaleY = app.screen.height / bg.texture.height;
      bg.scale.set(Math.max(scaleX, scaleY));
      bg.x = app.screen.width / 2;
      bg.y = app.screen.height / 2;
    }

    resizeBG();
    window.addEventListener("resize", resizeBG);

    // test sprite
    // const sprite = Sprite.from("bg");
    // app.stage.addChild(sprite);
  }
}
