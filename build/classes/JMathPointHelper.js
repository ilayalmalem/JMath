"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JMathPointHelper {
    constructor(point) {
        this.point = point;
    }
    getX() {
        return this.point.x;
    }
    getY() {
        return this.point.y;
    }
    isDefined() {
        return this.point.y ? true : false;
    }
}
exports.default = JMathPointHelper;
