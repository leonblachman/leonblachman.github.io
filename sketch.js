// created with p5.js @ https://p5js.org/copyright.html

import {Manager} from './Manager.js';

function sketch(p) {
    let manager

    p.setup = function () {
        manager = new Manager();
        p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = function () {
        p.background(255);
    };

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}

window.p5 = new p5(sketch);
