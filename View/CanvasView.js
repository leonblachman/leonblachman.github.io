export class CanvasView {
    #p5;
    constructor(p5, toolController) {
        this.#p5 = p5;
        this.#p5.createCanvas(this.#p5.windowWidth, this.#p5.windowHeight);
        // ToDo: wire p5 and toolController
    }

    windowResized() {
        this.#p5.resizeCanvas(this.#p5.windowWidth, this.#p5.windowHeight);
    }
}
