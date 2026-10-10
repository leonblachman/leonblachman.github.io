import {Tool} from './Tools/Tool.js';
import {ToolController} from './Tools/ToolController.js';
import {ToolBarView} from './View/ToolBarView.js';
import {CanvasView} from './View/CanvasView.js';
import * as Strategies from './Strategies/Strategies.js';
const {Modes} = Strategies;

export class Sketch {
    #toolController;
    #canvasView;
    constructor(p5) {
        this.#toolController = new ToolController(Sketch.getDefaultTools());
        let _ = new ToolBarView(p5, this.#toolController);
        this.#canvasView = new CanvasView(p5);
    }

    onDraw() {
        let current = this.#toolController.getSelectedTool()?.getCurrent();
        if (current != null) {
            this.#canvasView.onDrawPreview(current);
        }
    }

    onWindowResized() {
        this.#canvasView.onWindowResized();
    }

    onMousePressed(x, y) {
        this.#toolController.onMousePressed(x, y);
    }

    onMouseReleased(x, y) {
        this.#toolController.onMouseReleased(x, y);
    }

    onMouseDragged(x, y) {
        this.#toolController.onMouseDragged(x, y);
    }

    static main(p5) {
        let sketch

        p5.setup = function () {
            sketch = new Sketch(p5);
        };

        p5.draw = function () {
            sketch.onDraw();
        }

        p5.windowResized = function () {
            sketch.onWindowResized();
        }

        p5.mousePressed = function () {
            sketch.onMousePressed(p5.mouseX, p5.mouseY);
        }

        p5.mouseReleased = function () {
            sketch.onMouseReleased(p5.mouseX, p5.mouseY);
        }

        p5.mouseDragged = function () {
            sketch.onMouseDragged(p5.mouseX, p5.mouseY);
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
