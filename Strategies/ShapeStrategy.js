export const ShapeMode = Object.freeze({
    Line: "Line",
    Ellipse: "Ellipse",
    Rectangle: "Rectangle",
    Triangle: "Triangle",
    TriangleRight: "TriangleRight",
  });

export class ShapeStrategy {
    #mode;

    getMode() {
        return this.#mode;
    }

    constructor(mode) {
        switch (mode) {
            case ShapeMode.Line:
            case ShapeMode.Ellipse:
            case ShapeMode.Rectangle:
            case ShapeMode.Triangle:
            case ShapeMode.TriangleRight:
                this.#mode = mode;
                break;
            default:
                throw new RangeError("Invalid shape mode");
        }
    }
}
