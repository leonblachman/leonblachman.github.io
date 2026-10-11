export const DrawMode = Object.freeze({
    None: "None",
    Edge: "Edge",
    Fill: "Fill",
    Both: "Both",
  });

export class Tool {
    #icon;
    #strategy;
    #drawMode;
    #isActive = false;

    constructor(icon, strategy, drawMode) {
        this.#icon = icon;
        this.#strategy = strategy;
        this.#drawMode = drawMode;
    }

    getIcon() {
        return this.#icon;
    }

    getDrawMode() {
        return this.#drawMode;
    }

    getCurrent() {
        return this.#strategy.getCurrent?.();
    }

    onMousePressed(x, y) {
        this.#isActive = true;
        this.#strategy.onMousePressed?.(x, y);
    }

    onMouseDragged(x, y) {
        if (!this.#isActive)
            return;
        this.#strategy.onMouseDragged?.(x, y);
    }

    onMouseReleased(x, y) {
        if (!this.#isActive)
            return;
        try {
            return this.#strategy.onMouseReleased?.(x, y);
        }
        finally {
            this.#isActive = false;
        }
    }
}
