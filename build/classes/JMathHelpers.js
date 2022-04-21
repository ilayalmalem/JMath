"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JMathHelpers {
    isString(n) {
        return (n === null || n === void 0 ? void 0 : n.length) === 1 && (n === null || n === void 0 ? void 0 : n.match(/[a-z]/i));
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
}
exports.default = JMathHelpers;
