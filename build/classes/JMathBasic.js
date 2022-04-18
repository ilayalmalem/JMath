"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JMathBasic {
    constructor(queryCount) {
        this.queryCount = queryCount;
        queryCount++;
    }
    add(nums) {
        return nums.reduce((pNum, cNum) => pNum + cNum);
    }
    sub(nums) {
        return nums.reduce((pNum, cNum) => pNum - cNum);
    }
    mult(nums) {
        return nums.reduce((pNum, cNum) => pNum * cNum);
    }
    div(nums) {
        return nums.reduce((pNum, cNum) => pNum / cNum);
    }
    fact(n) {
        if (n == 0)
            return 1;
        if (n < 0)
            return -1;
        if (!this.isWhole(n))
            return -1;
        return n * this.fact(n - 1);
    }
    isWhole(n) {
        if (n % 1 != 0)
            return true;
        else
            return false;
    }
    exp(base, power) {
        return base ** power;
    }
    abs(n) {
        if (n < 0)
            return n * -1;
        else if (n > 0)
            return n;
        else
            return 0;
    }
    isPos(n) {
        if (n > 0)
            return true;
        else
            return false;
    }
}
exports.default = JMathBasic;
