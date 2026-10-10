export class Tool {
    constructor(icon, strategy) {
        this.icon = icon;
        this.getCurrent = () => strategy.getCurrent?.();
        this.onMousePressed = (x, y) => strategy.onMousePressed?.(x, y);
        this.onMouseReleased = (x, y) => strategy.onMouseReleased?.(x, y);
        this.onMouseDragged = (x, y) => strategy.onMouseDragged?.(x, y);
    }
}
