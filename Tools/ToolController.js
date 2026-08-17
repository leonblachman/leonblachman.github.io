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
        this.#selectedTool?.Deactivate();
        this.#selectedTool = tool;
        this.#selectedTool.Activate();
    }

    onMousePressed() {
        this.#selectedTool?.onMousePressed();
    };

    onMouseReleased() {
        this.#selectedTool?.onMouseReleased();
    };
    
    onMouseMoved() {
        this.#selectedTool?.onMouseMoved();
    };
}