export class ToolBar {
    constructor(tools) {
        this.tools = tools;
        this.selectedTool = null;
        
        let div = p5.createDiv();
        div.position(20, 20);
        div.style('width', '40px');
        div.style('padding', '3px 0');
        div.style('background', 'lightgray');
        div.style('border-style', 'ridge');
        div.style('border-color', 'aliceblue');
        div.draggable();

        let color = p5.createColorPicker('deeppink')
        applyToolStyle(color);
        color.style('padding', '2px 4px');
        color.style('background', 'darkgray');
        color.changed(() => {
            div.elt.querySelectorAll('button').forEach(button => {
                button.style.color = color.value();
            });
        });
        color.parent(div);
        // this.color = () => color.value();

        this.tools.forEach(tool =>
        {
            let button = p5.createButton(tool.icon);
            applyToolStyle(button);
            button.style('display', 'inline-flex');
            button.style('justify-content', 'center');
            button.style('align-items', 'center');
            button.style('color', color.value());
            button.mouseClicked(() => {
                this.selectedTool = tool;
                this.selectedTool.onSelected();
            });
            button.parent(div);
        });

        function applyToolStyle(element) {
            element.size(30, 30);
            element.style('margin', '2px 5px');
            element.style('border-width', '2px');
            element.style('border-radius', '15px');
            element.style('border-style', 'outset');
            element.style('border-color', 'aliceblue');
        }
    }

    draw() {
    }
}
