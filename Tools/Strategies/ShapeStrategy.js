export const Modes = Object.freeze({
    Line: "Line",
    Ellipse: "Ellipse",
    Rectangle: "Rectangle",
    Triangle: "Triangle",
    TriangleRight: "TriangleRight",
  });

export class ShapeStrategy {
    constructor(mode) {
        switch (mode) {
            case Modes.Line:
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

    Activate() {
        console.log("Shape tool (" + this.mode + ") activated");
    }
}
