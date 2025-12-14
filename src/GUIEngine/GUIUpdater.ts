import { Container } from "pixi.js";
import { Device } from "./Device";
// resize + adaptive update
export class GUIUpdater {
  static update(container: Container, dataList: any[]) {
    dataList.forEach((data, i) => {
      const obj = container.children[i];
      if (!obj) return;

      this.apply(obj, data);

      if (
        obj instanceof Container &&
        data.entities &&
        data.deepPosition
      ) {
        this.update(obj, data.entities);
      }
    });
  }

  static apply(obj: any, data: any) {
    if (data.noCheckSize) return;

    const mobile = Device.isMobile();

    const x = mobile ? data.v_x ?? data.x : data.x;
    const y = mobile ? data.v_y ?? data.y : data.y;

    obj.x = x ?? 0;
    obj.y = y ?? 0;

    const scaleX = mobile
      ? data.v_scaleX ?? data.v_scale ?? data.scaleX ?? data.scale
      : data.scaleX ?? data.scale;

    const scaleY = mobile
      ? data.v_scaleY ?? data.v_scale ?? data.scaleY ?? data.scale
      : data.scaleY ?? data.scale;

    if ((obj as any).scale) {
      (obj as any).scale.set(scaleX ?? 1, scaleY ?? 1);
    }

    if (data.alpha !== undefined) {
      obj.alpha = data.alpha;
    }
  }
}
