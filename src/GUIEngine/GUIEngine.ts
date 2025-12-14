import { Application, Container } from "pixi.js";
import { GUIFactory } from "./GUIFactory";
import { GUIUpdater } from "./GUIUpdater";

export class GUIEngine {
  app: Application;
  root!: Container;
  json: any;

  constructor(app: Application, json: any) {
    this.app = app;
    this.json = json;
  }

  build() {
    this.root = new Container();
    this.app.stage.addChild(this.root);

    this.json.entities.forEach((e: any) => {
      const obj = GUIFactory.create(e);
      if (obj) this.root.addChild(obj);
    });

    GUIUpdater.update(this.root, this.json.entities);

    window.addEventListener("resize", () => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
      GUIUpdater.update(this.root, this.json.entities);
    });
  }
}
