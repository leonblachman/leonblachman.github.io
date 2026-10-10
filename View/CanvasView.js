export class CanvasView {
    #p5;
    constructor(p5) {
        this.#p5 = p5;
        this.#p5.createCanvas(this.#p5.windowWidth, this.#p5.windowHeight);
    }

    clear() {
        this.#p5.background(255);
    }

    draw(element, color) {
        this.#p5.stroke(color);
        this.#p5.noFill();
        this.#p5.beginShape();
        for (let i = 0; i < element.length; i++) {
            this.#p5.vertex(element[i].x, element[i].y);
        }
        this.#p5.endShape();
    }

    onWindowResized() {
        this.#p5.resizeCanvas(this.#p5.windowWidth, this.#p5.windowHeight);
    }
}
