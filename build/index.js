"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nova_1 = __importDefault(require("./new_engines/Nova"));
const nova = new Nova_1.default();
const equation = 'x^2';
console.time();
const evaled = nova.functionValues(equation, [0, 1000000]);
console.timeEnd();
