import { Container } from "pixi.js";
import { Device } from "./Device";
import { EntityData } from "../ui/types";

export class GUIUpdater {
  static update(container: Container, data: EntityData[]) {
    const portrait = Device.isPortrait();

    data.forEach((d, i) => {
      const obj: any = container.children[i];
      if (!obj) return;

      if (!d.noCheckSize) {
        obj.x = portrait ? (d.v_x ?? d.x ?? 0) : (d.x ?? 0);
        obj.y = portrait ? (d.v_y ?? d.y ?? 0) : (d.y ?? 0);

        const sx = portrait
          ? (d.v_scaleX ?? d.v_scale ?? d.scaleX ?? d.scale ?? 1)
          : (d.scaleX ?? d.scale ?? 1);

        const sy = portrait
          ? (d.v_scaleY ?? d.v_scale ?? d.scaleY ?? d.scale ?? 1)
          : (d.scaleY ?? d.scale ?? 1);

        obj.scale.set(sx, sy);
      }

      // ✅ RECURSIVE UPDATE
      if (
        obj instanceof Container &&
        d.entities &&
        d.deepPosition !== false
      ) {
        this.update(obj, d.entities);
      }
    });
  }
}
