"use strict";
// Nova-Engine@1.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JMathHelpers_1 = __importDefault(require("../classes/JMathHelpers"));
class NovaParser {
    constructor() {
        this.helpers = new JMathHelpers_1.default();
    }
    parse(equation) {
        let stack = '';
        let tree = [];
        let newEquation = [...equation];
        if (equation) {
            // only run if equation is not null
            for (let index = 0; index <= equation.length; index++) {
                // get current letter each iteration
                let currentLetter = equation[index];
                stack += currentLetter;
                // Remove first letter from the new equation
                newEquation.shift();
                if (currentLetter == '(') {
                    tree.push({
                        type: 'BlockStart',
                        children: []
                    });
                    stack = '';
                }
                if (currentLetter == ')') {
                    tree.push({
                        type: 'BlockEnd',
                        children: []
                    });
                    stack = '';
                }
                if (this.helpers.isString(currentLetter)) {
                    if (currentLetter == 'x') {
                        tree.push({
                            type: 'Variable',
                            content: currentLetter
                        });
                    }
                }
                if (['+', '-', '/', '^', '*'].includes(currentLetter)) {
                    tree.push({
                        type: 'Operator',
                        variant: currentLetter
                    });
                }
                if (this.helpers.isNumber(currentLetter)) {
                    let skips = -2;
                    let numberStack = '';
                    for (let j = index; j <= equation.length; j++) {
                        let current = equation[j];
                        skips++;
                        if (this.helpers.isNumber(current) || current == '.') {
                            numberStack += current;
                        }
                        else {
                            tree.push({
                                type: 'Number',
                                content: Number.parseFloat(numberStack)
                            });
                            break;
                        }
                    }
                    index += skips;
                }
                if (['ln', 'sin', 'cos', 'tan', 'cot'].includes(stack)) {
                    // let children: any = this.parse(newEquation.join(''))
                    // console.log(children);
                    tree.push({
                        type: 'Function',
                        variant: stack,
                        content: '',
                        // children: children
                    });
                    stack = '';
                }
            }
            return tree;
        }
    }
    readTree(tree, varValues) {
        var _a;
        let eq = '';
        for (let index = 0; index <= tree.length; index++) {
            let current = tree[index];
            switch (current === null || current === void 0 ? void 0 : current.type) {
                case 'Function':
                    let translated = {
                        'ln': 'Math.log',
                        'sin': 'Math.sin',
                        'cos': 'Math.cos',
                        'tan': 'Math.tan',
                        'cot': 'this.helpers.cot',
                        'sqrt': 'Math.sqrt'
                    };
                    Math.atan;
                    eq += translated[current.variant];
                    break;
                case 'BlockStart':
                    eq += '(';
                    break;
                case 'BlockEnd':
                    eq += ')';
                    break;
                case 'Variable':
                    if (((_a = tree[index - 1]) === null || _a === void 0 ? void 0 : _a.type) == 'Number')
                        eq += `*${varValues[current.content]}`;
                    else
                        eq += `${varValues[current.content]}`;
                    break;
                case 'Operator':
                    if (current.variant == '^')
                        eq += '**';
                    else
                        eq += current.variant;
                    break;
                case 'Number':
                    eq += current.content;
                    break;
            }
        }
        return eq;
    }
    functionValues(expression, range) {
        const [start, end] = range;
        const values = [];
        for (let i = start; i <= end; i++) {
            const parsed = this.parse(expression);
            const read = this.readTree(parsed, { x: i });
            values.push({
                x: i,
                y: eval(read)
            });
        }
        return values;
    }
}
exports.default = NovaParser;
