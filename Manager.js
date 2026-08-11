import {Tool} from './Tools/Tool.js';
import {ToolBar} from './Tools/ToolBar.js';
import * as Strategies from './Tools/Strategies/Strategies.js';
const {Modes} = Strategies;

export class Manager {
    constructor() {
        this.toolbar = new ToolBar(Manager.getDefaultTools());
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
