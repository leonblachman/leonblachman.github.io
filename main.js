// created with p5.js @ https://p5js.org/copyright.html

import {Sketch} from './Sketch.js';

function main(p) {
    let sketch

    p.setup = function () {
        sketch = new Sketch(p);
        p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = function () {
        p.background(255);
    };

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}

new p5(main);
