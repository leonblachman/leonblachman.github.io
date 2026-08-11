export class Tool {
    constructor(icon, strategy) {
        this.icon = icon;
        
        this.Activate = () => strategy.Activate?.();
        this.Deactivate = () => strategy.Deactivate?.();
        this.onMousePressed = () => strategy.onMousePressed?.();
        this.onMouseReleased = () => strategy.onMouseReleased?.();
        this.onMouseMoved = () => strategy.onMousePressed?.();
    }
}
