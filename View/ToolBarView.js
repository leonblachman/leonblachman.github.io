import {applyStyle} from './ViewHelper.js';

const toolSize = 35;
const toolPad = 5;
const toolGap = 3;

export class ToolBarView {
    #toolBar;
    #color;

    isActive() {
        return this.#toolBar.elt.matches(':hover');
    }

    getColor() {
        return this.#color.value();
    }

    constructor(p5, toolController) {
        let tools = toolController.getTools();

        let isHorizontal = false;
        this.#toolBar = p5.createDiv();
        this.#toolBar.position(20, 20);
        applyStyle(this.#toolBar, `
display: flex
align-items: center
flex-direction: ${isHorizontal ? 'row' : 'column'}
${isHorizontal ? 'height' : 'width'}: ${toolSize + toolPad * 2}px
padding: ${isHorizontal ? `0 ${toolPad - toolGap}px` : `${toolPad - toolGap}px 0`}
background: lightgray
border-width: 4px
border-style: ridge
border-color: aliceblue `);
        this.#toolBar.draggable();
        
        this.#color = p5.createColorPicker('deeppink');
        applyToolStyle(this.#color);
        applyStyle(this.#color, `
padding: 2px 4px
background: silver `);
        this.#color.parent(this.#toolBar);

        let toolsMap = new Map();
        tools.forEach(tool =>
        {
            let button = p5.createButton(tool.getIcon());
            applyToolStyle(button);
            applyStyle(button, `
display: inline-flex
justify-content: center
align-items: center
color: ${this.#color.value()} `);
            button.mouseClicked(() => {
                let previousTool = toolController.getSelectedTool();
                if (previousTool === tool)
                    return;
                if (previousTool !== null)
                    toolsMap.get(previousTool).style('background', 'buttonface');
                toolController.setSelectedTool(tool);
                toolsMap.get(tool).style('background', 'radial-gradient(buttonface 55%, darkgrey 80%, grey)');
            });
            button.parent(this.#toolBar);
            toolsMap.set(tool, button);
        });

        this.#toolBar.doubleClicked(() => {
            isHorizontal = !isHorizontal;

            applyStyle(this.#toolBar, `
flex-direction: ${isHorizontal ? 'row' : 'column'}
${isHorizontal ? 'width' : 'height'}: AUTO
${isHorizontal ? 'height' : 'width'}: ${toolSize + toolPad * 2}px
padding: ${isHorizontal ? `0 ${toolPad - toolGap}px` : `${toolPad - toolGap}px 0`}`);
            updateToolMargin(this.#color);
            toolsMap.forEach((button) => updateToolMargin(button));

            let size = this.#toolBar.size();
            let oldPos = this.#toolBar.position();
            let offX = p5.mouseX - oldPos.x;
            let offY = p5.mouseY - oldPos.y;
            if (isHorizontal)
                this.#toolBar.position(p5.mouseX - offY, p5.mouseY + offX - size.height); // inverts offsets, shifts y origin
            else
                this.#toolBar.position(p5.mouseX + offY - size.width, p5.mouseY - offX); // inverts offsets, shifts x origin
        });

        this.#color.changed(() => {
            this.#toolBar.elt.querySelectorAll('button').forEach(button => {
                button.style.color = this.#color.value();
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
}
