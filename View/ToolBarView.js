import {applyStyle} from './ViewHelper.js';
import {DrawMode} from '../Tools/Tool.js';

const toolSize = 35;
const toolPad = 5;
const toolGap = 3;

export class ToolBarView {
    #isHorizontal = false;
    #toolMap = new Map();
    #toolBar;
    #stroke;
    #fill;

    isActive() {
        return this.#toolBar.elt.matches(':hover');
    }

    getStroke() {
        if (!this.#stroke.checkbox.elt.checked)
            return null;
        return this.#stroke.picker.value();
    }

    getFill() {
        if (!this.#fill.checkbox.elt.checked)
            return null;
        return this.#fill.picker.value();
    }

    constructor(p5, toolController) {
        this.#createToolBar(p5);
        this.#createColors(p5);
        this.#createTools(p5, toolController);
    }

    #createToolBar(p5) {
        this.#toolBar = p5.createDiv();
        this.#toolBar.position(20, 20);
        applyStyle(this.#toolBar, `
display: flex
align-items: center
flex-direction: ${this.#isHorizontal ? 'row' : 'column'}
${this.#isHorizontal ? 'height' : 'width'}: ${toolSize + toolPad * 2}px
padding: ${this.#isHorizontal ? `0 ${toolPad - toolGap}px` : `${toolPad - toolGap}px 0`}
background: lightgray
border-width: 4px
border-style: ridge
border-color: aliceblue `);
        this.#toolBar.draggable();

        this.#toolBar.doubleClicked(() => {
            this.#isHorizontal = !this.#isHorizontal;

            applyStyle(this.#toolBar, `
flex-direction: ${this.#isHorizontal ? 'row' : 'column'}
${this.#isHorizontal ? 'width' : 'height'}: AUTO
${this.#isHorizontal ? 'height' : 'width'}: ${toolSize + toolPad * 2}px
padding: ${this.#isHorizontal ? `0 ${toolPad - toolGap}px` : `${toolPad - toolGap}px 0`}`);

            this.#updateToolMargin(this.#stroke.container);
            this.#updateToolMargin(this.#fill.container);
            this.#toolMap.forEach((button) => this.#updateToolMargin(button));

            let size = this.#toolBar.size();
            let oldPos = this.#toolBar.position();
            let offX = p5.mouseX - oldPos.x;
            let offY = p5.mouseY - oldPos.y;
            if (this.#isHorizontal)
                this.#toolBar.position(p5.mouseX - offY, p5.mouseY + offX - size.height); // inverts offsets, shifts y origin
            else
                this.#toolBar.position(p5.mouseX + offY - size.width, p5.mouseY - offX); // inverts offsets, shifts x origin
        });
    }

    #createColors(p5) {
        this.#stroke = this.#createColorPicker(p5, 'black');
        this.#fill = this.#createColorPicker(p5, 'white');

        this.#stroke.checkbox.changed(() => {
            if (!this.#stroke.checkbox.elt.checked)
                this.#fill.checkbox.elt.checked = true;
        });

        this.#fill.checkbox.changed(() => {
            if (!this.#fill.checkbox.elt.checked)
                this.#stroke.checkbox.elt.checked = true;
        });
    }
    
    #createTools(p5, toolController) {
        let tools = toolController.getTools();
        tools.forEach(tool =>
        {
            let button = p5.createButton(tool.getIcon());
            this.#applyToolStyle(button);
            button.style('color', '#555');

            button.mouseClicked(() => {
                let previousTool = toolController.getSelectedTool();
                if (previousTool == tool)
                    return;
                if (previousTool != null)
                    this.#toolMap.get(previousTool).style('background', 'buttonface');
                toolController.setSelectedTool(tool);
                this.#toolMap.get(tool).style('background', 'radial-gradient(buttonface 55%, darkgrey 80%, grey)');
            
                let mode = tool.getDrawMode();
                let both = mode == DrawMode.Both;
                let strokeCheckbox = this.#stroke.checkbox;
                let fillCheckbox = this.#fill.checkbox;

                strokeCheckbox.style('opacity', both ? '1.0' : '0.7');
                fillCheckbox.style('opacity', both ? '1.0' : '0.7');

                if (mode == DrawMode.Both) {
                    strokeCheckbox.removeAttribute('inert');
                    fillCheckbox.removeAttribute('inert');
                    if (!strokeCheckbox.elt.checked && !fillCheckbox.elt.checked)
                        strokeCheckbox.elt.checked = true;
                } else 
                {
                    strokeCheckbox.attribute('inert', '');
                    fillCheckbox.attribute('inert', '');
                    strokeCheckbox.elt.checked = mode == DrawMode.Edge;
                    fillCheckbox.elt.checked = mode == DrawMode.Fill;
                }
            });
            
            button.parent(this.#toolBar);
            this.#toolMap.set(tool, button);
        });
    }

    #createColorPicker(p5, color) {
        let container = p5.createDiv();
        this.#applyToolStyle(container);
        applyStyle(container, `
position: relative
box-sizing: border-box
overflow: hidden `);

        let picker = p5.createColorPicker(color);
        applyStyle(picker, `
width: 100%
height: 100%
padding: 2px 4px
background: silver
border: none `);

        let checkbox = p5.createInput();
        checkbox.removeAttribute('value');
        checkbox.attribute('type', 'checkbox');
        checkbox.attribute('inert', '');
        checkbox.style('opacity', '0.7');
        checkbox.elt.checked = false;
        applyStyle(checkbox, `
position: absolute
right: 0
bottom: 0
margin: 0
accent-color: white`);

        picker.parent(container);
        checkbox.parent(container);
        container.parent(this.#toolBar);
        return {container, picker, checkbox};
    }

    #applyToolStyle(element) {
        element.size(toolSize, toolSize);
        this.#updateToolMargin(element);
        applyStyle(element,`
border-width: 2px
border-radius: 15px
border-style: outset
border-color: aliceblue
font-size: 20px
text-shadow: 0 -1px darkgray, 1px 0 gray, 0 1px darkgray, -1px 0 darkgray`);
    }
    
    #updateToolMargin(element) {
        const marginVer = `${toolGap}px ${toolPad}px`;
        const marginHor = `${toolPad}px ${toolGap}px`;
        element.style('margin', this.#isHorizontal ? marginHor : marginVer);
    }
}
