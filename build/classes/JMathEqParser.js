"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Ivory engine
class JMathEqParser {
    isNumber(n) {
        return !isNaN(n);
    }
    isString(n) {
        return n.length === 1 && n.match(/[a-z]/i);
    }
    isConstant(str) {
        return ['e', 'pi', 'π'].includes(str);
    }
    isWhitespace(n) {
        return n.trim() === '';
    }
    inArray(arr, el) {
        return arr.includes(el);
    }
    pushToTree(tree, type, content) {
        tree.push({
            type: type,
            content: content
        });
    }
    getBranchByIndex(tree, index) {
        return tree[index];
    }
    isTrigFunction(str) {
        return ['sin', 'cos', 'tan', 'cot', 'sinh', 'cosh', 'tanh', 'coth', 'asin', 'acos', 'atan', 'acot'].includes(str);
    }
    parseConstant(l) {
        switch (l) {
            case 'π':
                return Math.PI;
            case 'e':
                return Math.E;
            case 'γ':
                return 0.57721566490153286060;
            case ('Φ'):
                return 1.61803398874989484820;
            case 'Ω':
                return 0.56714329040978387299;
            case 'K':
                return 0.91596559417721901505;
        }
    }
    parse(expression) {
        const tree = [];
        const variables = [];
        let stack = '';
        let numberStack = '';
        let index = -1;
        for (let l of expression) {
            index++;
            if (this.isWhitespace(l)) {
                continue;
            }
            if (this.isNumber(l)) {
                let skips = -1;
                for (let j = index; j <= expression.length; j++) {
                    let current = expression[j];
                    skips++;
                    if (this.isNumber(current) || current == '.') {
                        numberStack += current;
                    }
                    else {
                        this.pushToTree(tree, 'Number', Number.parseFloat(numberStack));
                        break;
                    }
                }
                index += skips;
            }
            else if (this.isConstant(l)) {
                this.pushToTree(tree, 'Number', this.parseConstant(l));
            }
            else if (this.isString(l) && !this.inArray(variables, l)) {
                // currently only accept x and y as vars
                if (l == 'x' || l == 'y') {
                    this.pushToTree(tree, 'Variable', l);
                }
                else {
                    stack += l;
                }
            }
            else if (['+', '-', '/', '^', '*'].includes(l)) {
                this.pushToTree(tree, 'Operator', l);
            }
            else if (l == '(') {
                this.pushToTree(tree, 'BlockStart', '');
            }
            else if (l == ')') {
                this.pushToTree(tree, 'BlockEnd', '');
            }
            // Stack checks 
            if (stack) {
                switch (stack) {
                    case 'ln':
                        this.pushToTree(tree, 'Function', 'NaturalLog');
                        stack = '';
                        break;
                    case 'sqrt':
                        this.pushToTree(tree, 'Function', 'SquareRoot');
                        stack = '';
                        break;
                    case 'sin':
                        this.pushToTree(tree, 'Function', 'Sine');
                        stack = '';
                        break;
                }
            }
        }
        return tree;
    }
    evalTree(toEvalTree, varValues) {
        var _a, _b, _c, _d, _e, _f;
        let equation = '';
        let tree = toEvalTree;
        for (var index = 0; index <= tree.length; index++) {
            var branch = tree[index];
            switch (branch === null || branch === void 0 ? void 0 : branch.type) {
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
                case 'Constant':
                    const appendableTypes = ['Number', 'Variable', 'Constant'];
                    if (appendableTypes.includes((_c = tree[index - 1]) === null || _c === void 0 ? void 0 : _c.type) && appendableTypes.includes((_d = tree[index + 1]) === null || _d === void 0 ? void 0 : _d.type)) {
                        equation += `*${branch.content}*`;
                    }
                    else if (appendableTypes.includes((_e = tree[index + 1]) === null || _e === void 0 ? void 0 : _e.type)) {
                        equation += `${branch.content}*`;
                    }
                    else if (appendableTypes.includes((_f = tree[index - 1]) === null || _f === void 0 ? void 0 : _f.type)) {
                        equation += `*${branch.content}`;
                    }
                    else {
                        equation += branch.content;
                    }
                    break;
                case 'BlockStart':
                    equation += '(';
                    break;
                case 'BlockEnd':
                    equation += ')';
                    break;
                case 'Function':
                    const translations = {
                        'NaturalLog': Math.log,
                        'SquareRoot': Math.sqrt,
                        'Sine': Math.sin
                    };
                    let eq = '';
                    let skips = -1;
                    for (let i = index; i <= tree.length; i++) {
                        const element = tree[i];
                        if ((element === null || element === void 0 ? void 0 : element.type) == 'BlockEnd') {
                            skips++;
                            break;
                        }
                        else {
                            if (element.type != 'Function') {
                                eq += element === null || element === void 0 ? void 0 : element.content;
                            }
                            skips++;
                        }
                    }
                    index = index + skips;
                    let functionInside = this.evalTree(this.parse(eq), { x: (varValues.x || 0) });
                    let functionValue = translations[branch.content](eval(functionInside));
                    equation += (this.evalTree([{ type: 'Number', content: functionValue }], { x: varValues[branch.content] }));
                    break;
                default:
                    break;
            }
        }
        return eval(equation);
    }
}
exports.default = JMathEqParser;
