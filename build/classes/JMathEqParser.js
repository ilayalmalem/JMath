"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    parseConstant(l) {
        switch (l) {
            case 'π':
                return Math.PI;
            case 'e':
                return Math.E;
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
                this.pushToTree(tree, 'Constant', this.parseConstant(l));
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
                if (stack == 'ln') {
                    this.pushToTree(tree, 'NaturalLog', '');
                    stack = '';
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
                case 'NaturalLog':
                    let eq = '';
                    let skips = -1;
                    for (let i = index; i <= tree.length; i++) {
                        const element = tree[i];
                        if ((element === null || element === void 0 ? void 0 : element.type) == 'BlockEnd') {
                            skips++;
                            break;
                        }
                        else {
                            eq += element === null || element === void 0 ? void 0 : element.content;
                            skips++;
                        }
                    }
                    console.log(index);
                    index = index + skips;
                    let logInside = this.evalTree(this.parse(eq), { x: (varValues.x || 0) });
                    let logValue = Math.log(eval(logInside));
                    equation += (this.evalTree([{ type: 'Number', content: logValue }], { x: varValues[branch.content] }));
                    break;
                default:
                    break;
            }
        }
        return eval(equation);
    }
}
exports.default = JMathEqParser;
