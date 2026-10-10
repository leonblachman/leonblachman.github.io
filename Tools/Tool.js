export class Tool {
    #icon;
    #strategy;
    #isActive = false;

    getIcon() {
        return this.#icon;
    }

    constructor(icon, strategy) {
        this.#icon = icon;
        this.#strategy = strategy;
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
