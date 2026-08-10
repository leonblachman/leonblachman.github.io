export class ToolBar {
    constructor(tools) {
        this.tools = tools;
        this.selectedTool = null;
        
        let div = p5.createDiv();
        div.position(10, 10);
        div.size(50, 10 + tools.length * 40);
        div.style('background', 'orchid');
        div.style('padding', '5px 0 0 0');
        div.style('border-style', 'ridge');
        div.draggable();

        this.tools.forEach(tool =>
        {
            let button = p5.createButton(tool.icon);
            button.size(30, 30);
            button.style('margin', '5px 10px 5px 10px');
            button.style('display', 'inline-flex');
            button.style('justify-content', 'center');
            button.style('align-items', 'center');
            button.style('border-radius', '5px');
    
            button.parent(div);
            button.mouseClicked(() => {
                this.selectedTool = tool;
                this.selectedTool.onSelected();
            });
        });
    }

    draw() {
    }
}
