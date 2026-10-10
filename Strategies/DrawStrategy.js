export class DrawStrategy {
    #points = null;

    getCurrent() {
        return this.#points;
    };

    onMousePressed(x, y) {
        this.#points = [];
        this.#points.push({ x, y });
    };

    onMouseReleased(x, y) {
        this.#points = null;
    };
    
    onMouseDragged(x, y) {
        this.#points.push({ x, y });
    };
}
