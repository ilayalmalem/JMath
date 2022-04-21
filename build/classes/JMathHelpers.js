"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JMathHelpers {
    isString(n) {
        return (n === null || n === void 0 ? void 0 : n.length) === 1 && ((n === null || n === void 0 ? void 0 : n.match(/[a-z]/i)) || this.isConstant(n));
    }
    isWhitespace(n) {
        return n.trim() === '';
    }
    inArray(arr, el) {
        return arr.includes(el);
    }
    isNumber(n) {
        return !isNaN(n) && !this.isWhitespace(n);
    }
    cot(x) {
        return 1 / Math.tan(x);
    }
    isConstant(str) {
        return ['e', 'π', 'γ', 'Φ', 'Ω', 'K'].includes(str);
    }
    parseConstant(str) {
        switch (str) {
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
}
exports.default = JMathHelpers;
