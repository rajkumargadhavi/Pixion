import { Container, Sprite, Graphics, Text, Application } from "pixi.js";

// Helper type for JSON data
interface EntityData {
    type: string;
    name: string;
    x?: number;
    y?: number;
    v_x?: number;
    v_y?: number;
    scale?: number;
    scaleX?: number;
    scaleY?: number;
    v_scale?: number;
    v_scaleX?: number;
    v_scaleY?: number;
    rotate?: number;
    width?: number;
    height?: number;
    color?: string;
    alpha?: number;
    texture?: string;
    text?: string;
    style?: any;
    active?: boolean;
    deepPosition?: boolean;
    entities?: EntityData[];
}

export class UIBuilder {
    private static rootData: EntityData;
    private static rootUI: Container;

    // --- Build UI from JSON ---
    static build(layout: { entities: EntityData[] }, app?: Application): Container {
        this.rootData = layout.entities[0]; // top-level container
        this.rootUI = this.createEntity(this.rootData, app) as Container;
        return this.rootUI;
    }

    // --- Recursive entity creation ---
    private static createEntity(data: EntityData, app?: Application): Container | Sprite | Graphics | Text {
        let obj: Container | Sprite | Graphics | Text;

        switch (data.type) {
            case "container":
                obj = new Container();
                break;

            case "sprite":
                obj = Sprite.from(data.texture ?? "");
                break;

            case "rect":
                obj = new Graphics();
                (obj as Graphics).rect(0, 0, data.width ?? 100, data.height ?? 100);
                (obj as Graphics).fill({ color: Number(data.color || 0xffffff), alpha: data.alpha ?? 1 });
                break;

            case "text":
                obj = new Text(data.text ?? "", data.style ?? {});
                break;

            default:
                throw new Error(`Unknown type: ${data.type}`);
        }

        // set Pixi v8 label
        (obj as any).label = data.name;

        obj.visible = data.active !== false;

        // rotation
        if (data.rotate) obj.rotation = (data.rotate * Math.PI) / 180;

        // --- Position & scale ---
        this.updateEntity(obj, data);

        // --- deepPosition for children ---
        if (obj instanceof Container && data.entities && data.deepPosition !== false) {
            for (const child of data.entities) {
                obj.addChild(this.createEntity(child, app));
            }
        }

        return obj;
    }

    // --- Detect portrait/mobile mode ---
    private static isMobile(): boolean {
        return window.innerHeight > window.innerWidth;
    }

    // --- Update position & scale recursively ---
    static updateEntity(obj: Container | Sprite | Graphics | Text, data: EntityData) {
    const mobile = this.isMobile();

    obj.x = mobile ? (data.v_x ?? data.x ?? 0) : (data.x ?? 0);
    obj.y = mobile ? (data.v_y ?? data.y ?? 0) : (data.y ?? 0);

    const scaleX = mobile ? (data.v_scaleX ?? data.v_scale ?? data.scaleX ?? data.scale ?? 1) : (data.scaleX ?? data.scale ?? 1);
    const scaleY = mobile ? (data.v_scaleY ?? data.v_scale ?? data.scaleY ?? data.scale ?? 1) : (data.scaleY ?? data.scale ?? 1);
    obj.scale.set(scaleX, scaleY);

    // safely update children
    if (obj instanceof Container && data.entities) {
        for (let i = 0; i < data.entities.length; i++) {
            const childObj = obj.children[i];
            if (childObj) {
                this.updateEntity(childObj as any, data.entities[i]);
            }
        }
    }
}


    // --- Call this on window resize ---
    static handleResize() {
        if (this.rootUI && this.rootData) {
            this.updateEntity(this.rootUI, this.rootData);
        }
    }
}
