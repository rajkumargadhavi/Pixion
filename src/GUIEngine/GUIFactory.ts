import {
  Container,
  Sprite,
  Graphics,
  Assets
} from "pixi.js";
// JSON → Pixi object creation
export class GUIFactory {
  static create(data: any): any {
    if (data.active === false) return null;

    let obj: any;

    switch (data.type) {
      case "container":
        obj = new Container();
        obj.interactiveChildren = data.interactiveChildren ?? true;
        break;

      case "sprite":
        obj = Sprite.from(data.texture);
        obj.anchor?.set(data.anchor ?? 0);
        break;

      case "rect":
        obj = new Graphics();
        obj.rect(0, 0, data.width, data.height);
        obj.fill({
          color: Number(data.color),
          alpha: data.alpha ?? 1
        });
        break;

      default:
        console.warn("Unknown type:", data.type);
        return null;
    }

    obj.name = data.name;

    // children
    if (data.entities && obj instanceof Container) {
      data.entities.forEach((c: any) => {
        const child = GUIFactory.create(c);
        if (child) obj.addChild(child);
      });
    }

    return obj;
  }
}
