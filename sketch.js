import {Tool} from './Tools/Tool.js';
import {ToolController} from './Tools/ToolController.js';
import {ToolBarView} from './View/ToolBarView.js';
import {CanvasView} from './View/CanvasView.js';
import * as Strategies from './Strategies/Strategies.js';
const {Modes} = Strategies;

export class Sketch {
    constructor(p5) {
        let toolController = new ToolController(Sketch.getDefaultTools());
        let toolBarView = new ToolBarView(p5, toolController);
        let canvasView = new CanvasView(p5, toolController);
    }

    static main(p5) {
        let sketch

        p5.setup = function () {
            sketch = new Sketch(p5);
            p5.createCanvas(p5.windowWidth, p5.windowHeight);
        };

        p5.draw = function () {
            p5.background(255);
        };

        p5.windowResized = function () {
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        }
    }

    static getDefaultTools() {
        return [
            new Tool("✥", new Strategies.CursorStrategy()),
            new Tool("✎", new Strategies.DrawStrategy()),
            // new Tool("▩", new Strategies.FillStrategy()),
            // new Tool("A", new Strategies.TextStrategy()),
            new Tool("─", new Strategies.ShapeStrategy(Modes.Line)),
            new Tool("●", new Strategies.ShapeStrategy(Modes.Ellipse)),
            new Tool("∎", new Strategies.ShapeStrategy(Modes.Rectangle)),
            new Tool("▲", new Strategies.ShapeStrategy(Modes.Triangle)),
            new Tool("◣", new Strategies.ShapeStrategy(Modes.TriangleRight)),
        ];
    }
}
