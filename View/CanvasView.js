export class CanvasView {
    #p5;
    constructor(p5) {
        this.#p5 = p5;
        this.#p5.createCanvas(this.#p5.windowWidth, this.#p5.windowHeight);
    }

    onWindowResized() {
        this.#p5.resizeCanvas(this.#p5.windowWidth, this.#p5.windowHeight);
    }
}
