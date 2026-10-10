export class ToolController {
    #tools;
    #selectedTool = null;

    constructor(tools) {
        this.#tools = tools;
    }

    getTools() {
        return this.#tools;
    }

    getSelectedTool() {
        return this.#selectedTool;
    }
    
    setSelectedTool(tool) {
        this.#selectedTool = tool;
    }

    onMousePressed(x, y) {
        this.#selectedTool?.onMousePressed(x, y);
    };
    
    onMouseDragged(x, y) {
        this.#selectedTool?.onMouseDragged(x, y);
    };

    onMouseReleased(x, y) {
        return this.#selectedTool?.onMouseReleased(x, y);
    };
}