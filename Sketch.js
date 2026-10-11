import {Tool, DrawMode} from './Tools/Tool.js';
import {ToolController} from './Tools/ToolController.js';
import {ToolBarView} from './View/ToolBarView.js';
import {CanvasView} from './View/CanvasView.js';
import * as Strategies from './Strategies/Strategies.js';
const {ShapeMode} = Strategies;

export class Sketch {
    #toolController;
    #toolBarView;
    #canvasView;
    #items = [];
    constructor(p5) {
        this.#toolController = new ToolController(Sketch.getDefaultTools());
        this.#toolBarView = new ToolBarView(p5, this.#toolController);
        this.#canvasView = new CanvasView(p5);
    }

    onDraw() {
        this.#canvasView.clear();
        for (let item of this.#items) {
            this.#canvasView.draw(item.data, item.stroke, item.fill);
        }
        let current = this.#toolController.getSelectedTool()?.getCurrent();
        if (current != null) {
            let stroke = this.#toolBarView.getStroke();
            let fill = this.#toolBarView.getFill();
            this.#canvasView.draw(current, stroke, fill);
        }
    }

    onWindowResized() {
        this.#canvasView.onWindowResized();
    }

    onMousePressed(x, y) {
        if (this.#toolBarView.isActive())
            return;
        this.#toolController.onMousePressed(x, y);
    }

    onMouseDragged(x, y) {
        this.#toolController.onMouseDragged(x, y);
    }

    onMouseReleased(x, y) {
        let data = this.#toolController.onMouseReleased(x, y);
        if (data != null)
        {
            let stroke = this.#toolBarView.getStroke();
            let fill = this.#toolBarView.getFill();
            this.#items.push({ data, stroke, fill });
        }
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
            new Tool("✎", new Strategies.DrawStrategy(), DrawMode.Edge),
            new Tool("─", new Strategies.ShapeStrategy(ShapeMode.Line), DrawMode.Edge),
            new Tool("●", new Strategies.ShapeStrategy(ShapeMode.Ellipse), DrawMode.Both),
            new Tool("∎", new Strategies.ShapeStrategy(ShapeMode.Rectangle), DrawMode.Both),
            new Tool("▲", new Strategies.ShapeStrategy(ShapeMode.Triangle), DrawMode.Both),
            new Tool("◣", new Strategies.ShapeStrategy(ShapeMode.TriangleRight), DrawMode.Both),
            new Tool("▩", new Strategies.FillStrategy(), DrawMode.Fill),
        ];
    }
}
