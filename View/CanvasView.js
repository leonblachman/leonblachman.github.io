export class CanvasView {
    #p5;
    constructor(p5) {
        this.#p5 = p5;
        this.#p5.createCanvas(this.#p5.windowWidth, this.#p5.windowHeight);

        console.log(this.#p5.windowWidth, this.#p5.windowHeight)
    }

    onDrawPreview(current) {
        this.#p5.noFill();
        this.#p5.beginShape();
        for (let i = 0; i < current.length; i++) {
            this.#p5.vertex(current[i].x, current[i].y);
        }
        this.#p5.endShape();
    }

    onWindowResized() {
        this.#p5.resizeCanvas(this.#p5.windowWidth, this.#p5.windowHeight);
        console.log(this.#p5.windowWidth, this.#p5.windowHeight)

    }
}
