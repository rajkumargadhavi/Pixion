import {
  Container,
  Sprite,
  Graphics
} from "pixi.js";
import { EntityData } from "../ui/types";

export class GUIFactory {
  static create(data: EntityData): any {
    if (data.active === false) return null;

    let obj: any;

    switch (data.type) {
      case "container":
        obj = new Container();
        break;

      case "sprite":
        obj = Sprite.from(data.texture ?? "");
        break;

      case "rect":
        obj = new Graphics()
          .rect(0, 0, data.width ?? 0, data.height ?? 0)
          .fill({
            color: Number(data.color),
            alpha: data.alpha ?? 1,
          });
        break;

      default:
        console.warn("Unknown type:", data.type);
        return null;
    }

    obj.label = data.name;

    // ✅ CREATE CHILDREN (MOST IMPORTANT)
    if (obj instanceof Container && data.entities) {
      for (const child of data.entities) {
        const childObj = GUIFactory.create(child);
        if (childObj) obj.addChild(childObj);
      }
    }

    return obj;
  }
}
