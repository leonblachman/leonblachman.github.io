export const Modes = Object.freeze({
    Ellipse: "Ellipse",
    Rectangle: "Rectangle",
    Triangle: "Triangle",
    TriangleRight: "TriangleRight",
  });

export class ShapeStrategy {
    constructor(mode) {
        switch (mode) {
            case Modes.Ellipse:
            case Modes.Rectangle:
            case Modes.Triangle:
            case Modes.TriangleRight:
                this.mode = mode;
                break;
            default:
                throw new RangeError("Invalid shape mode");
        }
    }

    onSelected() {
        alert("Shape tool selected " + this.mode);
    }
}
