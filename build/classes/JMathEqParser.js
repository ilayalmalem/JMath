"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JMathEqParser {
    isNumber(n) {
        return !isNaN(n);
    }
    isString(n) {
        return n.length === 1 && n.match(/[a-z]/i);
    }
    isWhitespace(n) {
        return n.trim() === '';
    }
    inArray(arr, el) {
        return arr.includes(el);
    }
    parse(expression) {
        const tree = [];
        const variables = [];
        for (let l of expression) {
            if (this.isWhitespace(l)) {
                continue;
            }
            if (this.isNumber(l)) {
                tree.push({
                    type: 'Number',
                    content: Number.parseFloat(l)
                });
            }
            else if (this.isString(l) && !this.inArray(variables, l)) {
                tree.push({
                    type: 'Variable',
                    content: l
                });
            }
            else if (['+', '-', '/', '^', '*'].includes(l)) {
                tree.push({
                    type: 'Operator',
                    content: l
                });
            }
        }
        return tree;
    }
    evalTree(tree, varValues) {
        let equation = '';
        tree.forEach((branch, index) => {
            var _a, _b;
            switch (branch.type) {
                case 'Number':
                    if (((_a = tree[index + 1]) === null || _a === void 0 ? void 0 : _a.type) == 'Variable') {
                        equation += `${branch.content}`;
                    }
                    else {
                        equation += branch.content;
                    }
                    break;
                case 'Variable':
                    if (((_b = tree[index - 1]) === null || _b === void 0 ? void 0 : _b.type) == 'Number') {
                        equation += `*(${varValues[branch.content]})`;
                    }
                    else {
                        equation += `(${varValues[branch.content]})`;
                    }
                    break;
                case 'Operator':
                    if (branch.content == '^') {
                        equation += '**';
                    }
                    else {
                        equation += branch.content;
                    }
                    break;
                default:
                    break;
            }
        });
        return eval(equation);
    }
}
exports.default = JMathEqParser;
