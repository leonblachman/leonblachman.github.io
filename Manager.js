import {Tool} from './Tools/Tool.js';
import {ToolBar} from './Tools/ToolBar.js';
import * as Strategies from './Tools/Strategies/Strategies.js';

export class Manager {
    constructor() {
        this.toolbar = new ToolBar(Manager.getDefaultTools());
    }

    static getDefaultTools() {
        return [
            new Tool("🎨", new Strategies.ColorStrategy()),
            new Tool("1", new Strategies.ColorStrategy()),
            new Tool("2", new Strategies.ColorStrategy()),
            new Tool("3", new Strategies.ColorStrategy()),
            new Tool("4", new Strategies.ColorStrategy())];
    }
}
