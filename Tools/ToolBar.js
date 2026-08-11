import {applyStyle} from '../ViewHelper.js';

const toolWidth = 35;
const toolPad = 5;
const toolGap = 3;

export class ToolBar {
    #selectedTool = null

    constructor(tools) {
        let div = p5.createDiv();
        div.position(20, 20);
        applyStyle(div, `
width: ${toolWidth + toolPad * 2}px
padding: ${toolPad - toolGap}px 0
background: lightgray
border-style: ridge
border-color: aliceblue `);
        div.draggable();

        let color = p5.createColorPicker('deeppink');
        applyToolStyle(color);
        applyStyle(color, `
padding: 2px 4px
background: darkgray `);
        color.changed(() => {
            div.elt.querySelectorAll('button').forEach(button => {
                button.style.color = color.value();
            });
        });
        color.parent(div);

        tools.forEach(tool =>
        {
            let button = p5.createButton(tool.icon);
            applyToolStyle(button);
            applyStyle(button, `
display: inline-flex
justify-content: center
align-items: center
color: ${color.value()} `);
            button.mouseClicked(() => {
                this.#selectedTool?.Deactivate();
                this.#selectedTool = tool;
                this.#selectedTool.Activate();
            });
            button.parent(div);
        });

        function applyToolStyle(element) {
            element.size(toolWidth, toolWidth);
            applyStyle(element,`
margin: ${toolGap}px ${toolPad}px
border-width: 2px
border-radius: 15px
border-style: outset
border-color: aliceblue
text-shadow: 0 -1px darkgray, 1px 0 gray, 0 1px darkgray, -1px 0 darkgray `);
        }
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
