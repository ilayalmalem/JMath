"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JMathBasic_1 = __importDefault(require("./JMathBasic"));
const JMathEqParser_1 = __importDefault(require("./JMathEqParser"));
class JMathFunctions {
    // private angleMode: AngleMode
    constructor() {
        this.jmb = new JMathBasic_1.default(0);
        this.jmp = new JMathEqParser_1.default();
        // this.angleMode = 'rad'
    }
    // public setAngleMode(mode: AngleMode) {
    //     this.angleMode = mode
    // }
    slope(point1, point2) {
        return (point2.y - point1.y) / (point2.x - point1.x);
    }
    getValues(func, range) {
        const [start, end] = range;
        const points = [];
        for (let i = start; i < end; i++) {
            const parsed = this.jmp.parse(func);
            const evaled = this.jmp.evalTree(parsed, { x: i }, this.angleMode);
            points.push({ x: i, y: evaled });
        }
        return points;
    }
}
exports.default = JMathFunctions;
