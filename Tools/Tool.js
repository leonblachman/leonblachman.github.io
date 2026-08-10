export class Tool {
    constructor(icon, strategy) {
        this.icon = icon;
        this.onSelected = () => strategy.onSelected() ?? function() {};
        this.onMousePressed = () => strategy.onMousePressed() ?? function() {};
        this.onMouseReleased = () => strategy.onMouseReleased() ?? function() {};
        this.onMouseMoved = () => strategy.onMousePressed() ?? function() {};
    }
}
