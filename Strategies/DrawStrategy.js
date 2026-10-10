export class DrawStrategy {
    #points = null;

    getCurrent() {
        return this.#points;
    };

    onMousePressed(x, y) {
        this.#points = [];
        this.#points.push({ x, y });
    };

    onMouseDragged(x, y) {
        this.#points.push({ x, y });
    };
    
    onMouseReleased(x, y) {
        this.#points.push({ x, y });
        let points = this.#points;
        this.#points = null;
        return points;
    };
}
