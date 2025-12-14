import { Container } from "pixi.js";
import { GUIFactory } from "../GUIEngine/GUIFactory";
import { GUIUpdater } from "../GUIEngine/GUIUpdater";
import { EntityData } from "./types";

export class UIBuilder {
  private static rootData: EntityData[] | null = null;
  private static rootContainer: Container | null = null;

  static build(layout: { entities: EntityData[] }) {
    this.rootData = layout.entities;
    this.rootContainer = new Container();

    for (const entity of layout.entities) {
      const obj = GUIFactory.create(entity);
      if (obj) this.rootContainer.addChild(obj);
    }

    GUIUpdater.update(this.rootContainer, layout.entities);
    return this.rootContainer;
  }

  static refresh() {
    if (!this.rootContainer || !this.rootData) return;
    GUIUpdater.update(this.rootContainer, this.rootData);
  }
}
