"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nova_1 = __importDefault(require("./new_engines/Nova"));
const nova = new Nova_1.default();
const equation = 'cot(x)';
const parse = nova.parse(equation);
const read = nova.readTree(parse, { x: 2 });
const evaled = nova.functionValues(equation, [0, 10]);
console.log([parse, read, evaled]);
