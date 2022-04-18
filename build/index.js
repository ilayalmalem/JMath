"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JMathFunctions_1 = __importDefault(require("./classes/JMathFunctions"));
const funcs = new JMathFunctions_1.default();
console.log(funcs.getValues('2x+4x^5', [0, 100]));
