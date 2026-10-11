export class CanvasView {
    #p5;
    constructor(p5) {
        this.#p5 = p5;
        this.#p5.createCanvas(this.#p5.windowWidth, this.#p5.windowHeight);
    }

    clear() {
        this.#p5.background(255);
    }

    draw(element, stroke, fill) {
        if (stroke == null)
            this.#p5.noStroke();
        else
            this.#p5.stroke(stroke);
        
        if (fill == null)
            this.#p5.noFill();
        else
            this.#p5.fill(fill);

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
