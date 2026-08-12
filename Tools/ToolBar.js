import {applyStyle} from '../ViewHelper.js';

const toolSize = 35;
const toolPad = 5;
const toolGap = 3;

export class ToolBar {
    #selectedTool = null;

    constructor(tools) {
        let isHorizontal = false;
        let toolBar = p5.createDiv();
        toolBar.position(20, 20);
        applyStyle(toolBar, `
display: flex
align-items: center
flex-direction: ${isHorizontal ? 'row' : 'column'}
${isHorizontal ? 'height' : 'width'}: ${toolSize + toolPad * 2}px
padding: ${isHorizontal ? `0 ${toolPad - toolGap}px` : `${toolPad - toolGap}px 0`}
background: lightgray
border-width: 4px
border-style: ridge
border-color: aliceblue `);
        toolBar.draggable();
        
        let color = p5.createColorPicker('deeppink');
        applyToolStyle(color);
        applyStyle(color, `
padding: 2px 4px
background: silver `);
        color.parent(toolBar);

        let toolsMap = new Map();
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
                if (this.#selectedTool === tool)
                    return;
                if (this.#selectedTool !== null)
                toolsMap.get(this.#selectedTool).style('background', 'buttonface');
                this.#selectedTool?.Deactivate();
                this.#selectedTool = tool;
                this.#selectedTool.Activate();
                toolsMap.get(this.#selectedTool).style('background', 'radial-gradient(buttonface 55%, darkgrey 80%, grey)');
            });
            button.parent(toolBar);
            toolsMap.set(tool, button);
        });

        toolBar.doubleClicked(() => {
            isHorizontal = !isHorizontal;

            applyStyle(toolBar, `
flex-direction: ${isHorizontal ? 'row' : 'column'}
${isHorizontal ? 'width' : 'height'}: AUTO
${isHorizontal ? 'height' : 'width'}: ${toolSize + toolPad * 2}px
padding: ${isHorizontal ? `0 ${toolPad - toolGap}px` : `${toolPad - toolGap}px 0`}`);
            updateToolMargin(color);
            toolsMap.forEach((button) => updateToolMargin(button));

            let size = toolBar.size();
            let oldPos = toolBar.position();
            let offX = p5.mouseX - oldPos.x;
            let offY = p5.mouseY - oldPos.y;
            if (isHorizontal)
                toolBar.position(p5.mouseX - offY, p5.mouseY + offX - size.height); // inverts offsets, shifts y origin
            else
                toolBar.position(p5.mouseX + offY - size.width, p5.mouseY - offX); // inverts offsets, shifts x origin
        });

        color.changed(() => {
            toolBar.elt.querySelectorAll('button').forEach(button => {
                button.style.color = color.value();
            });
        });

        function updateToolMargin(element) {
            const marginVer = `${toolGap}px ${toolPad}px`;
            const marginHor = `${toolPad}px ${toolGap}px`;
            element.style('margin', isHorizontal ? marginHor : marginVer);
        }

        function applyToolStyle(element) {
            element.size(toolSize, toolSize);
            updateToolMargin(element);
            applyStyle(element,`
border-width: 2px
border-radius: 15px
border-style: outset
border-color: aliceblue
font-size: 20px;
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
