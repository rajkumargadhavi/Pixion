// used for v adaptive responsive
export class Adaptive {
  static isVertical(): boolean {
    return window.innerHeight > window.innerWidth;
  }

  static apply(obj: any, d: any) {
    if (!this.isVertical()) return;

    if (d.v_x !== undefined) obj.x = d.v_x;
    if (d.v_y !== undefined) obj.y = d.v_y;

    if (d.v_scale !== undefined) obj.scale.set(d.v_scale);
    if (d.v_scaleX !== undefined) obj.scale.x = d.v_scaleX;
    if (d.v_scaleY !== undefined) obj.scale.y = d.v_scaleY;
  }
}
