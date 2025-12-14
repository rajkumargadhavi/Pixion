import { Container, Sprite } from "pixi.js";

export class UIBuilder {
  static build(layout: any): Container {
    const root = new Container();

    for (const entity of layout.entities) {
      root.addChild(this.createEntity(entity));
    }

    return root;
  }

  private static createEntity(data: any): Container | Sprite {
    let obj: Container | Sprite;

    switch (data.type) {
      case "container":
        obj = new Container();
        break;

      case "sprite":
        obj = Sprite.from(data.texture);
        break;

      default:
        throw new Error(`Unknown type: ${data.type}`);
    }

    obj.label = data.name;

    this.applyCommonProps(obj, data);

    if (data.entities && obj instanceof Container) {
      for (const child of data.entities) {
        obj.addChild(this.createEntity(child));
      }
    }

    return obj;
  }

  private static applyCommonProps(obj: Container | Sprite, d: any) {
    if (d.x !== undefined) obj.x = d.x;
    if (d.y !== undefined) obj.y = d.y;

    if (d.scale !== undefined) obj.scale.set(d.scale);
    if (d.alpha !== undefined) obj.alpha = d.alpha;

    if (d.active === false) obj.visible = false;

    if ("tint" in obj && d.tint !== undefined) {
      (obj as Sprite).tint = d.tint;
    }
  }
}
