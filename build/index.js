"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JMathEqParser_1 = __importDefault(require("./classes/JMathEqParser"));
const JMathFunctions_1 = __importDefault(require("./classes/JMathFunctions"));
const funcs = new JMathFunctions_1.default();
const parser = new JMathEqParser_1.default();
// console.log(parser.parse('ln(2.718)'))
let values = funcs.getValues('x^2', [0, 10]);
